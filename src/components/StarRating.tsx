interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className ?? ""}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="size-4"
          fill={rating >= i ? "#F59E0B" : rating >= i - 0.5 ? "url(#star-half)" : "#D8DEE9"}
        >
          {rating >= i - 0.5 && rating < i && (
            <defs>
              <linearGradient id="star-half">
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#D8DEE9" />
              </linearGradient>
            </defs>
          )}
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}
