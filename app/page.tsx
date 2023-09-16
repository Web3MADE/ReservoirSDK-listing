"use client";
import { adaptEthersSigner } from "@reservoir0x/ethers-wallet-adapter";
import { getClient } from "@reservoir0x/reservoir-sdk";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [{ wallet }, connect, disconnect] = useConnectWallet();

  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [isSuccess, setIsSuccess] = useState(false);

  function handleConnect() {
    if (!wallet) {
      connect();
    } else {
      disconnect(wallet);
    }
  }

  function handlePrice(e: React.ChangeEvent<HTMLInputElement>) {
    setPrice(e.target.valueAsNumber);
  }

  function handleQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(e.target.valueAsNumber);
  }

  async function handleList() {
    if (!signer) return console.error("no signer");
    console.log();
    await getClient()?.actions.listToken({
      listings: [
        {
          token: "0x4692c5e80d5e8e721c65697d90c143f36200e2bf:1",
          weiPrice: ethers.utils.parseEther(price.toString()).toString(),
          orderbook: "opensea",
          orderKind: "seaport-v1.5",
          quantity: quantity,
        },
      ],
      wallet: adaptEthersSigner(signer),
      onProgress: (progress) => {
        console.log(progress);
      },
    });
  }

  console.log(price);
  useEffect(() => {
    function init() {
      if (wallet) {
        const ethersProvider = new ethers.providers.Web3Provider(
          wallet.provider
        );

        const signer = ethersProvider.getSigner();
        setSigner(signer);
      }
    }
    init();
  }, [wallet]);

  useEffect(() => {
    getClient().addEventListener((event, chainId) => {
      switch (event.name) {
        case "listing_complete": {
          setIsSuccess(true);
          console.log("listing complete ", event.data);
          break;
        }
        case "listing_error": {
          setIsSuccess(false);
          console.error("listing error ", event.data);
          break;
        }
      }
    });
    return () => {
      getClient().clearEventListeners();
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full gap-4 flex items-center justify-between font-mono text-sm lg:flex">
        <button
          onClick={handleConnect}
          className="bg-gray-100 p-2 rounded-lg text-black"
        >
          connect
        </button>
        <label>Price</label>
        <input
          type="number"
          onChange={handlePrice}
          step="0.01"
          value={price}
          className="bg-gray-100 p-2 rounded-lg text-black"
        />
        <label>quantity</label>
        <input
          type="number"
          onChange={handleQuantity}
          value={quantity}
          className="bg-gray-100 p-2 rounded-lg text-black"
        />
        <button
          onClick={handleList}
          className="bg-gray-100 p-2 rounded-lg text-black"
        >
          list
        </button>
        <h1>Is listed: {isSuccess ? "Success!" : "Not listed"}</h1>
      </div>
    </main>
  );
}
