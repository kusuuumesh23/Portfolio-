import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";


export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#101010",
          color: "#F5F5F5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              letterSpacing: "0.15em",
              color: "#999999",
              textTransform: "uppercase",
            }}
          >
            {siteConfig.heroIntro}
          </div>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#FF5A36",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#999999",
              letterSpacing: "-0.02em",
              maxWidth: "800px",
            }}
          >
            {siteConfig.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #262626",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#777777",
          }}
        >
          <div>{siteConfig.education.institution}</div>
          <div>{siteConfig.location}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
