import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getArticleBySlug, articles } from "@/lib/articles";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Maqola topilmadi" };
  return {
    title: `${article.titleUz} · BAYAN`,
    description: article.heroSubtitle,
    openGraph: {
      title: article.titleUz,
      description: article.heroSubtitle,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.authorName],
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.titleUz,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.titleUz,
      description: article.heroSubtitle,
      images: [article.coverImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <article id="iv-article" className="w-full px-6 lg:px-16 pt-8 pb-20">
        <div className="max-w-[780px] mx-auto flex flex-col gap-6">
          <Breadcrumb article={article} />
          <CategoryPill article={article} />
          <TitleBlock article={article} />
          <AuthorRow article={article} />
          {/* Cover image — visible on the web page and picked up by IV */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="iv-cover"
            src={article.coverImage}
            alt={article.titleUz}
            className="w-full rounded-2xl border border-border"
          />
          <HeroQuote article={article} />
          <TableOfContents items={article.tableOfContents} />
          <div id="iv-body">
            <Body article={article} />
          </div>
          <Tags tags={article.tags} />
          <SourceFooter article={article} />
          <ShareRow article={article} />
        </div>
      </article>
      <Footer />
    </main>
  );
}

function Breadcrumb({ article }: { article: ReturnType<typeof getArticleBySlug> }) {
  if (!article) return null;
  return (
    <nav className="flex items-center gap-2 text-[12px]">
      <Link href="/maqolalar" className="font-semibold text-muted hover:text-forest">
        Maqolalar
      </Link>
      <span className="text-muted-2">/</span>
      <span className="font-semibold text-muted">{article.categoryNameUz}</span>
      <span className="text-muted-2">/</span>
      <span className="ar text-[13px] font-semibold text-forest truncate">
        {article.titleAr}
      </span>
    </nav>
  );
}

function CategoryPill({ article }: { article: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-soft rounded-full w-fit">
      <span className="ar text-sm font-semibold text-blue-deep">
        {article.categoryNameAr}
      </span>
      <span className="text-[11px] font-semibold text-blue-deep">·</span>
      <span className="text-[11px] font-bold tracking-wider text-blue-deep">
        {article.categoryNameUz}
      </span>
    </div>
  );
}

function TitleBlock({ article }: { article: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
  return (
    <div className="flex flex-col gap-4">
      <h1
        dir="rtl"
        className="ar text-[36px] lg:text-[44px] leading-[1.5] font-bold text-forest text-right"
      >
        {article.titleAr}
      </h1>
      <p
        className="text-xl lg:text-[22px] italic text-muted leading-[1.4]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {article.titleUz}
      </p>
    </div>
  );
}

function AuthorRow({ article }: { article: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
  return (
    <div className="flex flex-wrap items-center gap-3.5 py-3 border-y border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={article.authorAvatar}
        alt={article.authorName}
        className="w-11 h-11 rounded-full object-cover shrink-0 border border-border"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <span className="ar text-[15px] font-bold text-forest text-right truncate">
          {article.authorName}
        </span>
        <span className="ar text-xs font-medium text-muted-2 text-right">
          باحثو اللغة العربية
        </span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted">
        <span>{article.publishedAt}</span>
        <span className="w-1 h-1 rounded-full bg-border-2" />
        <span>{article.readingMinutes} daqiqa</span>
      </div>
    </div>
  );
}

function HeroQuote({ article }: { article: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
  return (
    <section className="bg-white border-2 border-red/30 rounded-sm px-8 lg:px-12 py-10 flex flex-col items-center gap-5">
      <span
        className="self-start text-[96px] leading-none font-black text-forest"
        style={{ fontFamily: "var(--font-display)" }}
      >
        &ldquo;
      </span>
      <h2
        dir="rtl"
        className="ar text-center text-[32px] lg:text-[40px] font-bold text-forest leading-[1.4]"
      >
        {article.heroTitle}
      </h2>
      <p
        dir="rtl"
        className="ar text-center text-lg lg:text-xl font-medium text-muted leading-[1.5]"
      >
        {article.heroSubtitle}
      </p>
      <div className="flex items-center gap-2.5 pt-2">
        <span className="w-3 h-3 bg-red" />
        <span className="text-[13px] font-bold tracking-wide text-forest">
          www.bahethoarabia.com
        </span>
      </div>
      <span
        className="self-end text-[96px] leading-none font-black text-forest rotate-180"
        style={{ fontFamily: "var(--font-display)" }}
      >
        &ldquo;
      </span>
    </section>
  );
}

function TableOfContents({ items }: { items: string[] }) {
  return (
    <details className="bg-white rounded-xl border border-border group">
      <summary className="flex items-center justify-between cursor-pointer px-5 py-4 list-none">
        <span className="flex items-center gap-2.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A6B52" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <span className="text-sm font-medium text-muted">Ochish</span>
        </span>
        <span className="flex items-center gap-2.5">
          <span
            className="ar text-lg font-bold text-forest"
            style={{ fontFamily: "var(--font-arabic)" }}
          >
            جدول المحتويات
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3A28" strokeWidth="2" strokeLinecap="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </span>
      </summary>
      <ol className="px-5 pb-5 pt-2 border-t border-border flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="ar flex items-start gap-2 text-right" dir="rtl">
            <span className="text-red font-bold shrink-0">{i + 1}.</span>
            <span className="text-base font-semibold text-red underline decoration-red">
              {item}
            </span>
          </li>
        ))}
      </ol>
    </details>
  );
}

function Body({ article }: { article: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
  return (
    <div className="flex flex-col">
      {article.body.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              dir="rtl"
              className="ar mt-8 mb-4 px-5 py-3.5 bg-white border-r-4 border-red rounded-sm text-right text-[26px] font-bold text-forest leading-[1.5]"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "readAlso") {
          return (
            <a
              key={i}
              href={block.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block my-3 px-5 py-3.5 bg-[#FCFAF7] border-r-4 border-red rounded-sm hover:-translate-y-0.5 transition-transform"
            >
              <div dir="rtl" className="ar text-right flex flex-col gap-1.5">
                <span className="text-base font-extrabold text-forest">
                  اقرأ أيضاً:
                </span>
                <span className="text-lg font-bold text-blue-deep underline decoration-blue-deep leading-[1.6]">
                  {block.text}
                </span>
              </div>
            </a>
          );
        }
        return (
          <p
            key={i}
            dir="rtl"
            className="ar mb-4 text-right text-xl lg:text-[22px] font-medium text-forest leading-[1.9]"
            style={{ textAlign: "justify" }}
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-col gap-3 pt-5">
      <span className="text-[11px] font-bold tracking-[2px] text-muted">
        TEGLAR
      </span>
      <div dir="rtl" className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="ar px-3 py-1.5 bg-red-soft rounded-full text-sm font-semibold text-red"
          >
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}

function SourceFooter({ article }: { article: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
  return (
    <div className="mt-4 bg-white rounded-sm border border-border p-7 lg:p-8 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "#1E3A8A" }}
        >
          <span className="ar text-3xl font-bold text-white">ف</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-[2px] text-muted">
            MANBA
          </span>
          <span className="ar text-xl font-bold text-forest">
            باحثو اللغة العربية
          </span>
        </div>
      </div>
      <a
        href={article.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-blue-deep text-white rounded-sm hover:bg-blue-deep/90 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
        <span className="text-sm font-bold">
          Asl maqolani ochish — bahethoarabia.com
        </span>
      </a>
      <p className="text-xs italic text-muted-2 leading-[1.5]">
        Maqola asl manbadan rasmiy ruxsat bilan chop etilgan. Matn o&apos;zgartirilmagan.
      </p>
    </div>
  );
}

function ShareRow({ article }: { article: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
  return (
    <div className="flex items-center gap-4 pt-5">
      <span className="text-[11px] font-bold tracking-[2px] text-muted">
        ULASHISH
      </span>
      <div className="flex items-center gap-2">
        <ShareBtn href={`https://t.me/share/url?url=${encodeURIComponent(`https://bayan.app/maqola/${article.slug}`)}&text=${encodeURIComponent(article.titleUz)}`} label="Telegram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
          </svg>
        </ShareBtn>
        <ShareBtn href={`https://wa.me/?text=${encodeURIComponent(article.titleUz + ' — https://bayan.app/maqola/' + article.slug)}`} label="WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </ShareBtn>
        <ShareBtn href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.titleUz)}&url=${encodeURIComponent(`https://bayan.app/maqola/${article.slug}`)}`} label="X">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </ShareBtn>
        <ShareBtn href={`https://bayan.app/maqola/${article.slug}`} label="Havolani ko'chirish">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </ShareBtn>
      </div>
    </div>
  );
}

function ShareBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-forest hover:-translate-y-0.5 transition-transform"
    >
      {children}
    </a>
  );
}
