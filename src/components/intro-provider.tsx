"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IntroSequence } from "@/components/home/intro-sequence";

gsap.registerPlugin(ScrollTrigger);

type IntroContextValue = {
  introDone: boolean;
};

const IntroContext = createContext<IntroContextValue>({ introDone: true });

export function useIntroReady() {
  return useContext(IntroContext).introDone;
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    setIntroDone(false);
  }, [pathname]);

  const handleComplete = useCallback(() => {
    setIntroDone(true);
    window.dispatchEvent(new CustomEvent("nav-theme-sync"));
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <IntroContext.Provider value={{ introDone }}>
      {!introDone && <IntroSequence key={pathname} onComplete={handleComplete} />}
      {children}
    </IntroContext.Provider>
  );
}
