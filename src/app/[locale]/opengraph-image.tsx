import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const iconPath = join(process.cwd(), "public", "logo-icon.png");
  const iconBase64 = readFileSync(iconPath).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbfaf7",
        }}
      >
        <img
          src={`data:image/png;base64,${iconBase64}`}
          width={200}
          height={200}
          alt=""
        />
        <div
          style={{
            marginTop: 28,
            fontSize: 54,
            fontWeight: 700,
            color: "#223829",
            fontFamily: "serif",
          }}
        >
          Simonyan Family Clinic
        </div>
        <div style={{ marginTop: 10, fontSize: 26, color: "#39655d" }}>
          Семейная клиника Симонянов
        </div>
      </div>
    ),
    { ...size }
  );
}
