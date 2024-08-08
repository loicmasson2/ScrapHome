"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {X} from "lucide-react";

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
      className="flex h-[36rem] w-[36rem] flex-col rounded-2xl bg-base-300 text-white"
      onClose={onDismiss}
    >
      <button onClick={onDismiss} className="self-end pt-2 pr-4">
        <X />
      </button>
      {children}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
