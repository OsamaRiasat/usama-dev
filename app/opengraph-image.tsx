import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#07080a",
          color: "#eceef1",
          backgroundImage: "radial-gradient(circle at 85% 10%, rgba(200,240,49,0.25), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#8a9099" }}>
          <div style={{ width: 48, height: 48, borderRadius: 10, background: "#c8f031", color: "#0a0b0d", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 22 }}>UR</div>
          {profile.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 40, color: "#8a9099", marginTop: 24, maxWidth: 950 }}>{profile.tagline}</div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#c8f031" }}>LangGraph · RAG · FastAPI · Django · React · AWS</div>
      </div>
    ),
    size,
  );
}
