import ChatWidget from "../components/ChatWidget";

export default function Companion() {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Jost', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
        color: "var(--m-ink)",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <img
          src="/uploads/IMG_5105.JPG"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5,
            filter: "saturate(.85)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--m-bg) 62%, transparent) 0%, color-mix(in srgb, var(--m-bg) 85%, transparent) 55%, color-mix(in srgb, var(--m-bg) 95%, transparent) 100%)",
          }}
        />
      </div>

      <section
        style={{
          paddingTop: 64,
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "grid",
          gridTemplateRows: "1fr",
          gridTemplateColumns: "100%",
          width: "100%",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <ChatWidget mode="inline" flush />
      </section>
    </div>
  );
}
