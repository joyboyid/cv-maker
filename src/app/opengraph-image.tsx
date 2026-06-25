import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #7c3aed 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          100% Gratis · Tanpa Daftar
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            lineHeight: 1.4,
            maxWidth: 820,
            opacity: 0.92,
          }}
        >
          CV · Portofolio · Cover Letter — ATS-friendly, export PDF, data di browser
        </div>
      </div>
    ),
    { ...size },
  );
}