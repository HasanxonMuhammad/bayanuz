import Image from "next/image";

/**
 * Real app screenshot inside a drawn phone frame (no baked mockup PNGs).
 * Screenshots in /public/screens/v2 are 720×1467 with the status bar cropped,
 * so the frame draws its own status strip with the island and the time.
 * Sizes inside scale with the frame width (container query units).
 */
export function PhoneFrame({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 60vw, 300px",
  className = "",
  dark = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** dark status strip for dark screenshots */
  dark?: boolean;
}) {
  const ink = dark ? "#FFFFFF" : "#1B3A28";
  return (
    <div
      className={`relative aspect-[9/19.2] rounded-[14%/6.6%] bg-[#0d1712] p-[2.6%] shadow-phone ${className}`}
      style={{ containerType: "inline-size" }}
    >
      <div
        className="relative flex h-full w-full flex-col overflow-hidden rounded-[12%/5.7%]"
        style={{ background: dark ? "#0b1220" : "#F5F3EE" }}
      >
        <div
          className="relative flex h-[5.4%] shrink-0 items-center justify-between font-semibold"
          style={{ color: ink, fontSize: "4.2cqw", paddingInline: "9cqw" }}
        >
          <span>9:41</span>
          <span className="absolute left-1/2 top-[22%] h-[56%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center" style={{ gap: "1.2cqw" }} aria-hidden="true">
            <i className="block rounded-[1px]" style={{ width: "4cqw", height: "2.6cqw", background: ink, opacity: 0.8 }} />
            <i className="block rounded-[2px] border" style={{ width: "5.4cqw", height: "2.8cqw", borderColor: ink, opacity: 0.8 }} />
          </span>
        </div>
        <div className="relative flex-1">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
