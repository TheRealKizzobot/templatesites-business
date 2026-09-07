'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export interface CartItem {
  id: number;
  name: string;
  price_cents: number;
  image: string;
  slug: string;
  qty: number;
  maxQty: number;
}

export interface OrderRecord {
  order: Record<string, unknown>;
  items: Record<string, unknown>[];
}

const STORAGE_KEY = 'northlight-cart-v1';
const ORDER_KEY = 'northlight-last-order-v1';

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'SET_QTY'; id: number; qty: number }
  | { type: 'REMOVE'; id: number }
  | { type: 'CLEAR' };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id
            ? { ...i, qty: Math.min(i.qty + action.item.qty, i.maxQty) }
            : i
        );
      }
      return [...state, { ...action.item, qty: Math.min(action.item.qty, action.item.maxQty) }];
    }
    case 'SET_QTY': {
      if (action.qty <= 0) return state.filter((i) => i.id !== action.id);
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: Math.min(action.qty, i.maxQty) } : i
      );
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CartItem[];
  } catch {
    return [];
  }
}

function loadOrder(): OrderRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(ORDER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OrderRecord;
  } catch {
    return null;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotalCents: number;
  isHydrated: boolean;
  bump: number;
  addItem: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void;
  setQty: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  saveOrder: (order: OrderRecord) => void;
  getOrder: () => OrderRecord | null;
  clearOrder: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isHydrated, setIsHydrated] = useState(false);
  const [bump, setBump] = useState(0);
  const orderRef = useRef<OrderRecord | null>(null);
  const didInit = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!didInit.current) {
      didInit.current = true;
      const loaded = loadCart();
      for (const item of loaded) {
        dispatch({ type: 'ADD', item });
      }
      orderRef.current = loadOrder();
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — keep cart in memory
    }
  }, [items, isHydrated]);

  const { count, subtotalCents } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const i of items) {
      c += i.qty;
      s += i.price_cents * i.qty;
    }
    return { count: c, subtotalCents: s };
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      subtotalCents,
      isHydrated,
      bump,
      addItem: (item) => {
        dispatch({
          type: 'ADD',
          item: { ...item, qty: item.qty ?? 1, maxQty: item.maxQty || 20 },
        });
        setBump((b) => b + 1);
      },
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      saveOrder: (order) => {
        orderRef.current = order;
        try {
          window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
        } catch {
          // ignore
        }
      },
      getOrder: () => orderRef.current,
      clearOrder: () => {
        orderRef.current = null;
        try {
          window.localStorage.removeItem(ORDER_KEY);
        } catch {
          // ignore
        }
      },
    }),
    [items, count, subtotalCents, isHydrated, bump]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}