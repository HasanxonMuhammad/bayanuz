interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initial: string;
  dark?: boolean;
  avatarBg?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Fe'l tuslanishi bo'limi — haqiqiy xazina. Har bir zamon, shaxs va son joy-joyida. Tezligi esa bir nafasda javob beradi.",
    name: "Abdullo M.",
    role: "Toshkent · Islom o'quvchi",
    initial: "A",
    avatarBg: "#2D5E3A",
  },
  {
    quote:
      "Maqol-hikmatlarni do'stlarga ulashaman — har safar izzat bilan qabul qilishadi. Xorijdagi hamkasblar ham havas qiladi.",
    name: "Feruza T.",
    role: "Andijon · Filolog",
    initial: "F",
    dark: true,
    avatarBg: "#FFD666",
  },
  {
    quote:
      "Baheth maqolalari arab tili grammatikasini chuqur idrok etishga yordam berdi. Ilova sodda, yo'lboshlovchidek.",
    name: "Sardor K.",
    role: "Buxoro · Talaba",
    initial: "S",
    avatarBg: "#DC2626",
  },
];

export function Testimonials() {
  return (
    <section className="w-full px-6 lg:px-16 py-24 bg-cream">
      <div className="max-w-7xl mx-auto flex flex-col gap-14 items-center">
        <div className="flex flex-col gap-4 items-center text-center">
          <span className="inline-flex px-4 py-2 bg-gold-soft rounded-full">
            <span className="text-[11px] font-bold tracking-[2.2px] text-gold">
              FOYDALANUVCHILAR
            </span>
          </span>
          <h2
            className="text-[40px] lg:text-[44px] leading-[1.2] font-medium text-forest tracking-[-0.02em] max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            O&apos;zbekistonning har burchagi —
            <br className="hidden lg:block" />
            BAYAN bilan bir ritmda
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {testimonials.map((t) => (
            <Card key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ quote, name, role, initial, dark, avatarBg }: Testimonial) {
  const bgClass = dark ? "bg-forest" : "bg-white";
  const titleClass = dark ? "text-white" : "text-forest";
  const mutedClass = dark ? "text-forest-light" : "text-muted";
  const starColor = dark ? "#FFD666" : "#D4AF37";
  const avatarTextColor = avatarBg === "#FFD666" ? "#1B3A28" : "#FFFFFF";

  return (
    <div className={`flex flex-col gap-4 p-7 rounded-3xl ${bgClass}`}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={starColor}>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <p
        className={`italic leading-[1.55] text-[17px] ${titleClass}`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        “{quote}”
      </p>
      <div className="flex items-center gap-3 mt-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
          style={{ background: avatarBg, color: avatarTextColor }}
        >
          {initial}
        </div>
        <div className="flex flex-col">
          <span className={`text-sm font-bold ${titleClass}`}>{name}</span>
          <span className={`text-xs font-medium ${mutedClass}`}>{role}</span>
        </div>
      </div>
    </div>
  );
}
