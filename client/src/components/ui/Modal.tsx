import React from "react";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ children, open, setOpen }: ModalProps) {
  if (!open) return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-30 h-screen w-screen bg-black opacity-80" />
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-50 pointer-events-auto w-full h-full flex items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white flex flex-col items-center min-w-auto max-w-[40%] justify-baseline p-10 rounded-lg"
        >
          {children}
        </div>
      </div>
    </>
  );
}
