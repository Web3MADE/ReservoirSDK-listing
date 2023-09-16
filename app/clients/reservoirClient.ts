import { createClient } from "@reservoir0x/reservoir-sdk";

export default function reservoirClient() {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
  const reservoirBaseUrl = process.env.NEXT_PUBLIC_RESERVOIR_BASE_URL;
  const reservoirApiKey = process.env.NEXT_PUBLIC_RESERVOIR_API_KEY;

  if (!chainId || !reservoirBaseUrl || !reservoirApiKey) {
    throw new Error("Missing configuration");
  }

  createClient({
    chains: [
      {
        id: parseInt(chainId),
        baseApiUrl: reservoirBaseUrl,
        active: true,
        apiKey: reservoirApiKey,
      },
    ],
  });
}
