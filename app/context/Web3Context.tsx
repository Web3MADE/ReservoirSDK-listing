"use client";

import { Web3OnboardProvider } from "@web3-onboard/react";
import Web3Onboard from "../clients/onboard";
import reservoirClient from "../clients/reservoirClient";

interface Web3ContextProps {
  children: React.ReactNode;
}

export function Web3Context({ children }: Web3ContextProps) {
  reservoirClient();
  return (
    <Web3OnboardProvider web3Onboard={Web3Onboard}>
      {children}
    </Web3OnboardProvider>
  );
}
