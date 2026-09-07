function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"
        fill={filled ? '#b07d2b' : '#e0ddd8'}
      />
    </svg>
  );
}

export default function Stars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const scale = size === 'sm' ? 0.75 : 1;
  const rounded = Math.round(rating);
  return (
    <div
      className="flex items-center"
      style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= rounded} />
      ))}
      <span className="sr-only">{rating.toFixed(1)} out of 5 stars</span>
    </div>
  );
}