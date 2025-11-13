interface LoadingSpinnerProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 48, 
  text = "Loading...",
  fullScreen = false,
  className = ""
}: LoadingSpinnerProps) {
  const spinner = (
    <div role="status" aria-live="polite" className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <svg
        className="animate-spin text-primary"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3"></circle>
        <path
          d="M22 12a10 10 0 00-10-10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        ></path>
      </svg>
      {text && <p className="text-sm text-muted-foreground animate-pulse">{text}</p>}
      <span className="sr-only">{text}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
