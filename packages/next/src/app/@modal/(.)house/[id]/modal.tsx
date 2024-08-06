"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="h-3/4 w-3/4 rounded-2xl bg-base-300/90 text-white"
      onClose={onDismiss}
    >
      <button onClick={onDismiss} className="close-button h-2 w-2">
        Close modal
      </button>
      {children}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
