import { Icon } from "@/components/Icon";

interface SuccessModalProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

/** Lightweight success popup (React state only — no backend, no toasts). */
export function SuccessModal({ open, title, message, onClose }: SuccessModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="card-soft relative w-full max-w-md p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Icon name="close" className="size-5" />
        </button>
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/15 text-success">
          <Icon name="check" className="size-8" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{message}</p>
        <button onClick={onClose} className="btn btn-gradient btn-sm mt-6">
          Done
        </button>
      </div>
    </div>
  );
}
