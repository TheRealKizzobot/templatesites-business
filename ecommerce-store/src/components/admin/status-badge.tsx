export type OrderStatusLabel = 'placed' | 'shipped' | 'cancelled';

const STYLES: Record<OrderStatusLabel, string> = {
  placed: 'bg-warning/10 text-warning',
  shipped: 'bg-success/10 text-success',
  cancelled: 'bg-text-secondary/10 text-text-secondary',
};

export default function StatusBadge({ status }: { status: string }) {
  const style = STYLES[status as OrderStatusLabel] ?? 'bg-text-secondary/10 text-text-secondary';
  return <span className={`pill ${style}`}>{status}</span>;
}