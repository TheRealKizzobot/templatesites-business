import { getBookings, setBookings, type StoredBooking } from './cookie-store';

export async function seedBookings(): Promise<void> {
  const existing = await getBookings();
  if (existing.length > 0) return;
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  
  const bookings: StoredBooking[] = [
    {
      id: 1001,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1234567890',
      date: tomorrow.toISOString().split('T')[0],
      time: '19:00',
      party_size: 4,
      notes: 'Anniversary dinner',
      status: 'confirmed',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 1002,
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '+1234567891',
      date: tomorrow.toISOString().split('T')[0],
      time: '18:30',
      party_size: 2,
      notes: '',
      status: 'pending',
      created_at: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: 1003,
      name: 'Carol Davis',
      email: 'carol@example.com',
      phone: '+1234567892',
      date: dayAfter.toISOString().split('T')[0],
      time: '20:00',
      party_size: 6,
      notes: 'Birthday celebration',
      status: 'confirmed',
      created_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ];
  
  await setBookings(bookings);
}
