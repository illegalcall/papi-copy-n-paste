import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Copy‑n‑Paste PAPI - Multi-Chain Polkadot API Explorer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 25% 25%, #e6007a22 0%, transparent 50%), radial-gradient(circle at 75% 75%, #e6007a11 0%, transparent 50%)",
          }}
        />
        
        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 80px",
            zIndex: 1,
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "0 0 20px 0",
              textShadow: "0 4px 8px rgba(0,0,0,0.5)",
              lineHeight: 1.1,
            }}
          >
            Copy‑n‑Paste PAPI
          </h1>
          
          {/* Subtitle */}
          <p
            style={{
              fontSize: "32px",
              color: "#e6007a",
              margin: "0 0 40px 0",
              fontWeight: "600",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Multi-Chain Polkadot API Explorer
          </p>
          
          {/* Description */}
          <p
            style={{
              fontSize: "24px",
              color: "#cccccc",
              margin: "0",
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            Interactive explorer for Polkadot, Kusama & parachains. 
            Generate ready-to-use code snippets for blockchain interactions.
          </p>
        </div>
        
        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #e6007a 0%, #ffffff 50%, #e6007a 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}