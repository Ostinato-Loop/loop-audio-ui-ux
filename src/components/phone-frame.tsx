import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen relative bg-background flex flex-col">
        {children}
      </div>
    </div>
  );
}
