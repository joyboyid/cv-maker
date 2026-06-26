interface FieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, children, className = "" }: FieldProps) {
  return (
    <label className={`block space-y-1.5 ${className}`}>
      <span className="shell-muted text-xs font-medium">{label}</span>
      {children}
    </label>
  );
}

export const inputClass = "shell-input";

export const textareaClass = "shell-textarea";