import ChatWidget from "../components/ChatWidget";

export default function Companion() {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden font-sans text-ink">
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src="/uploads/IMG_5105.JPG"
          alt=""
          className="h-full w-full object-cover opacity-50"
          style={{ filter: "saturate(.85)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--m-bg) 62%, transparent) 0%, color-mix(in srgb, var(--m-bg) 85%, transparent) 55%, color-mix(in srgb, var(--m-bg) 95%, transparent) 100%)",
          }}
        />
      </div>

      <section className="relative z-[1] grid min-h-0 w-full flex-1 grid-cols-[100%] grid-rows-1 overflow-hidden pt-16">
        <ChatWidget mode="inline" flush />
      </section>
    </div>
  );
}
