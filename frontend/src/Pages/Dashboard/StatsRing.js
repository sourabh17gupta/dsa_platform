export default function StatsRing({ solved, total, color, label }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? (solved / total) * circumference : 0;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#2a2a2e" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="40" y="37" textAnchor="middle" fill="#f1f5f9" fontSize="14" fontWeight="700">{solved}</text>
        <text x="40" y="51" textAnchor="middle" fill="#6b7280" fontSize="9">/{total}</text>
      </svg>
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
        {label}
      </span>
    </div>
  );
}