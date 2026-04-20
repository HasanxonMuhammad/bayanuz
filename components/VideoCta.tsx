export function VideoCta() {
  return (
    <section className="w-full px-6 lg:px-16 py-20 bg-forest text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div className="flex flex-col gap-5">
          <span className="inline-flex items-center px-4 py-2 rounded-full w-fit bg-[rgba(220,38,38,0.2)]">
            <span className="text-[11px] font-bold tracking-[2px] text-[#FFA8A8]">
              VIDEO · 1:20
            </span>
          </span>
          <h2
            className="text-[40px] lg:text-[48px] leading-[1.15] font-medium tracking-[-0.015em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Bir daqiqada —
            <br />
            butun ilovani his eting
          </h2>
          <p className="text-base text-forest-light leading-[1.55] max-w-[480px]">
            Qidiruv, fe&apos;l tuslanishi, hikmat ulashish — yagona kadrdan ko&apos;rib oling.
          </p>
        </div>
        <button
          type="button"
          className="group relative h-60 w-full rounded-3xl overflow-hidden border-2 border-forest-soft transition-transform hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #2D5E3A, #1B3A28)",
          }}
          aria-label="Video ochish"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-red flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(182,226,122,0.15) 0%, transparent 50%)",
            }}
          />
        </button>
      </div>
    </section>
  );
}
