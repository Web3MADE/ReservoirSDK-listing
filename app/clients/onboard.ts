"use client";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";

const injected = injectedModule();
const infuraUrl = process.env.NEXT_PUBLIC_INFURA_URL;

export default init({
  wallets: [injected],
  chains: [
    {
      id: "0x5",
      namespace: "evm",
      token: "ETH",
      label: "Goerli",
      rpcUrl: infuraUrl,
    },
  ],
  accountCenter: {
    desktop: {
      enabled: true,
    },
    mobile: {
      enabled: true,
    },
  },
});
