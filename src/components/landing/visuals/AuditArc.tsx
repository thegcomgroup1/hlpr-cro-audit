interface Props {
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** How much of the circle to render, in degrees. Default 270 (3/4 circle). */
  arcDegrees?: number;
}

/**
 * Brand visual signature: the open arc lifted from the audit-report score gauge.
 * Stroke uses currentColor so callers control color via text-* utility classes.
 */
export default function AuditArc({
  size = 32,
  strokeWidth = 2.5,
  className = "",
  arcDegrees = 270,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const visibleLength = (arcDegrees / 360) * circumference;
  const dashArray = `${visibleLength} ${circumference}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`-rotate-90 ${className}`}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeLinecap="round"
      />
    </svg>
  );
}
