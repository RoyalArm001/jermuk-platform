import React from "react";
import { motion } from "framer-motion";
import { getString, setBool, setString } from "../lib/storage";
import { setLang } from "../i18n";

type Lang = "hy" | "ru" | "en";
type Props = { onDone: () => void };

const STORY: Record<Lang, string> = {
  hy: [
    "Բարի գալուստ Ջերմուկ",
    "",
    "Ջերմուկը լեռնային քաղաք է, որտեղ բնությունը խոսում է լռությամբ։",
    "Մաքուր օդ, անտառների շունչ, ջրվեժների ձայն ու հանքային ջրերի ուժ։",
    "",
    "Այստեղ ամեն քայլը հանգստացնում է, իսկ ժամանակը սկսում է հոսել ավելի դանդաղ։",
    "",
    "Այս ուղեցույցը ստեղծված է, որպեսզի հեշտ գտնես Ջերմուկի հյուրանոցները,",
    "սնունդը, զբոսանքները, տեսարժան վայրերը",
    "և զգաս քաղաքը՝ ամբողջությամբ։",
  ].join("\n"),
  ru: [
    "Добро пожаловать в Джермук",
    "",
    "Джермук — горный город, где природа говорит тишиной.",
    "Чистый воздух, дыхание лесов, шум водопадов и сила минеральных вод.",
    "",
    "Здесь каждый шаг успокаивает, а время начинает течь медленнее.",
    "",
    "Этот гид создан, чтобы ты легко нашёл отели Джермука,",
    "еду, прогулки, достопримечательности",
    "и почувствовал город целиком.",
  ].join("\n"),
  en: [
    "Welcome to Jermuk",
    "",
    "Jermuk is a mountain town where nature speaks through silence.",
    "Fresh air, forest breath, the sound of waterfalls and the power of mineral waters.",
    "",
    "Here, every step brings calm, and time begins to flow more slowly.",
    "",
    "This guide was created to help you easily find Jermuk’s stays,",
    "food, walks, sights",
    "and experience the city as a whole.",
  ].join("\n"),
};

function FlagSvg({ code, className = "flagSvg" }: { code: Lang; className?: string }) {
  // Inline SVG so it renders одинаково on all devices (no emoji fonts).
  if (code === "hy") {
    // Armenia
    return (
      <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
        <rect width="3" height="2" fill="#D90012" />
        <rect width="3" height="1.333" y="0.666" fill="#0033A0" />
        <rect width="3" height="0.666" y="1.333" fill="#F2A800" />
      </svg>
    );
  }
  if (code === "ru") {
    // Russia
    return (
      <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
        <rect width="3" height="2" fill="#ffffff" />
        <rect width="3" height="1.333" y="0.666" fill="#0039A6" />
        <rect width="3" height="0.666" y="1.333" fill="#D52B1E" />
      </svg>
    );
  }
  // EN – UK (simplified)
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function inferLang(): Lang {
  const nav = (navigator.language || "").toLowerCase();
  if (nav.startsWith("ru")) return "ru";
  if (nav.startsWith("en")) return "en";
  return "hy";
}


export default function IntroFlow({ onDone }: Props) {
  const saved = getString("lang", "");
  const preferred = (saved as Lang) || inferLang();

  const [stage, setStage] = React.useState<"story" | "flags">("story");

  // Story sequence: always type HY → RU → EN, then show flags.
  const ORDER: Lang[] = ["hy", "ru", "en"];
  const [storyIdx, setStoryIdx] = React.useState(0);
  const [typed, setTyped] = React.useState("");
  const activeStoryLang = ORDER[Math.min(storyIdx, ORDER.length - 1)];

  // Typewriter for 3-language story sequence.
  React.useEffect(() => {
    if (stage !== "story") return;

    const full = STORY[activeStoryLang];
    let i = 0;
    setTyped("");

    const cleanup: Array<() => void> = [];

    const timer = window.setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        window.clearInterval(timer);

        // Pause at end of each language.
        const pause = window.setTimeout(() => {
          if (storyIdx < ORDER.length - 1) {
            setStoryIdx((v) => v + 1);
          } else {
            // Finished all languages.
            const donePause = window.setTimeout(() => {
              setStage("flags");
            }, 900);
            cleanup.push(() => window.clearTimeout(donePause));
          }
        }, 900);

        cleanup.push(() => window.clearTimeout(pause));
      }
    }, 28);

    return () => {
      window.clearInterval(timer);
      cleanup.forEach((fn) => fn());
    };
  }, [stage, activeStoryLang, storyIdx]);

  // Mandatory flow: user must select language once at the end.
  // Preselect inferred/saved language, but still require user to press "Start" once.
  const [selected, setSelected] = React.useState<Lang>(preferred);

  const fastForward = () => {
    if (stage === "story") {
      setStoryIdx(ORDER.length - 1);
      setTyped(STORY["en"]);
      setStage("flags");
    }
  };

  const confirm = () => {
    setLang(selected); // also persists i18nextLng
    setString("lang", selected);
    setBool("intro_seen", true);
    onDone();
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#080E18] text-white"
      onClick={fastForward}
      role="presentation"
    >
      <style>{`
        .flagPill{
          width: 40px;
          height: 28px;
          border-radius: 999px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          box-shadow: 0 16px 40px rgba(0,0,0,.35);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .flagSvg{ width: 28px; height: 18px; display:block; border-radius: 6px; overflow:hidden; }
        .flagBtn{ padding: 6px; border-radius: 999px; }
        .flagBtn:hover .flagPill{ background: rgba(255,255,255,.10); }

        .storyBox{
          max-width: 520px;
          width: min(92vw, 520px);
          padding: 22px 18px;
          border-radius: 22px;
          background: rgba(0,0,0,.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.08);
          box-shadow: 0 20px 60px rgba(0,0,0,.45);
          white-space: pre-wrap;
          font-size: 16px;
          line-height: 1.65;
        }
      `}</style>
      {/* Story stage */}
      {stage === "story" && (
        <motion.div
          className="storyBox"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-2 text-xs opacity-70 tracking-wider uppercase">
            {activeStoryLang === "hy" ? "Հայերեն" : activeStoryLang === "ru" ? "Русский" : "English"}
          </div>
          {typed}
          <span className="inline-block w-2 animate-pulse">▍</span>
        </motion.div>
      )}

      {/* Flags only at the end (only if no saved language) */}
      {stage === "flags" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-sm font-semibold opacity-90">Ընտրիր լեզուն / Выбери язык / Choose language</div>

          <div className="flex gap-3">
            <button
              aria-label="Հայերեն"
              onClick={() => setSelected("hy")}
              className={`active:scale-95 flagBtn ${selected === "hy" ? "ring-2 ring-white/60" : ""}`}
            >
              <span className="flagPill"><FlagSvg code="hy" className="flagSvg" /></span>
            </button>
            <button
              aria-label="Русский"
              onClick={() => setSelected("ru")}
              className={`active:scale-95 flagBtn ${selected === "ru" ? "ring-2 ring-white/60" : ""}`}
            >
              <span className="flagPill"><FlagSvg code="ru" className="flagSvg" /></span>
            </button>
            <button
              aria-label="English"
              onClick={() => setSelected("en")}
              className={`active:scale-95 flagBtn ${selected === "en" ? "ring-2 ring-white/60" : ""}`}
            >
              <span className="flagPill"><FlagSvg code="en" className="flagSvg" /></span>
            </button>
          </div>

          <button
            className="px-5 py-3 rounded-2xl font-black text-sm transition bg-white text-black active:scale-95"
            onClick={confirm}
          >
            Սկսել / Start
          </button>

          <div className="text-xs opacity-60">
            Առաջին անգամից հետո սա այլևս չի ցուցադրվի։
          </div>
        </motion.div>
      )}
    </div>
  );
}
