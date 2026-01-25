import React from "react";
import { motion } from "framer-motion";
import { getString } from "../lib/storage";
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

function inferLang(): Lang {
  const nav = (navigator.language || "").toLowerCase();
  if (nav.startsWith("ru")) return "ru";
  if (nav.startsWith("en")) return "en";
  return "hy";
}

function LogoIntro() {
  // Layered PNG animation (based on motion_spec.json)
  return (
    <div className="relative w-[260px] h-[460px] sm:w-[320px] sm:h-[560px]">
      <img className="introLayer sky" src="/intro-logo/02_sky_sun.png" alt="" />
      <img className="introLayer mountains" src="/intro-logo/03_mountains_water.png" alt="" />
      <img className="introLayer deer" src="/intro-logo/04_deer.png" alt="" />
      <img className="introLayer ring" src="/intro-logo/05_ring_outline.png" alt="" />
      <img className="introLayer t1" src="/intro-logo/06_text_JERMUK.png" alt="" />
      <img className="introLayer t2" src="/intro-logo/07_text_TRAVEL.png" alt="" />
    </div>
  );
}

export default function Intro({ onDone }: Props) {
  const saved = getString("lang", "");
  const hasSavedLang = !!saved;

  // If user already chose a language before, use it.
  // If not, we play the story in 3 languages in a fixed order: HY -> RU -> EN
  const initialLang = (saved as Lang) || inferLang();

  const STORY_ORDER: Lang[] = hasSavedLang ? [initialLang] : ["hy", "ru", "en"];

  const [stage, setStage] = React.useState<"logo" | "story" | "flags">("logo");
  const [typed, setTyped] = React.useState("");
  const [storyIndex, setStoryIndex] = React.useState(0);

  const stageRef = React.useRef(stage);
  stageRef.current = stage;

  // Always play logo animation, then start story.
  React.useEffect(() => {
    const t = window.setTimeout(() => {
      setStage("story");
      setStoryIndex(0);
    }, 4300); // slightly earlier to avoid a "blank" gap
    return () => window.clearTimeout(t);
  }, []);

  // Typewriter for story (cycles languages if no saved language)
  React.useEffect(() => {
    if (stage !== "story") return;

    const lang = STORY_ORDER[Math.min(storyIndex, STORY_ORDER.length - 1)];
    const full = STORY[lang];

    let i = 0;
    setTyped("");

    const cleanup: Array<() => void> = [];
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));

      if (i >= full.length) {
        window.clearInterval(timer);

        const endPause = window.setTimeout(() => {
          // If user already has saved language -> finish after 1 story.
          if (hasSavedLang) {
            onDone();
            return;
          }

          // Otherwise, go to next language story, or show flags.
          if (storyIndex < STORY_ORDER.length - 1) {
            setStoryIndex((x) => x + 1);
          } else {
            setStage("flags");
          }
        }, 1400);

        cleanup.push(() => window.clearTimeout(endPause));
      }
    }, 32);

    return () => {
      window.clearInterval(timer);
      cleanup.forEach((fn) => fn());
    };
  }, [stage, storyIndex, hasSavedLang, onDone]);

  const skipAll = () => {
    if (hasSavedLang) {
      onDone();
      return;
    }
    // Jump to flags (language chooser)
    setStage("flags");
  };

  const pick = (l: Lang) => {
    setLang(l); // persists language
    onDone();
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#080E18] text-white"
      onClick={skipAll}
      role="presentation"
    >
      <style>{`
        .introLayer{
          position:absolute; inset:0;
          width:100%; height:100%;
          object-fit:contain;
          opacity:0;
          filter: blur(0px);
          transform: translate3d(0,0,0) scale(1);
          will-change: transform, opacity, filter;
        }
        @keyframes skyIn{
          0%{opacity:0; transform:scale(1.08); filter:blur(18px)}
          12.5%{opacity:1; transform:scale(1); filter:blur(0px)}
          100%{opacity:1; transform:scale(1); filter:blur(0px)}
        }
        .sky{ animation: skyIn 4.8s ease-out forwards; }

        @keyframes mountainsIn{
          0%{opacity:0; transform:translateY(-18px)}
          16.7%{opacity:1; transform:translateY(0px)}
          100%{opacity:1; transform:translateY(0px)}
        }
        @keyframes floatY{
          0%,100%{ transform:translateY(0px) }
          50%{ transform:translateY(2px) }
        }
        .mountains{ animation: mountainsIn 4.8s ease-out forwards, floatY 1.8s ease-in-out 0.8s infinite; }

        @keyframes deerIn{
          0%{opacity:0; transform:translateX(24px) scale(0.92)}
          29.2%{opacity:1; transform:translateX(0px) scale(1)}
          100%{opacity:1; transform:translateX(0px) scale(1)}
        }
        @keyframes deerBreath{
          0%,100%{ transform:scale(1) }
          50%{ transform:scale(1.02) }
        }
        .deer{ animation: deerIn 4.8s ease-out forwards, deerBreath 1.6s ease-in-out 1.6s infinite; }

        @keyframes ringIn{
          0%{opacity:0; transform:scale(0.98)}
          33.3%{opacity:0}
          45.8%{opacity:1; transform:scale(1)}
          100%{opacity:1; transform:scale(1)}
        }
        .ring{ animation: ringIn 4.8s ease-out forwards; }

        @keyframes t1In{
          0%{opacity:0; transform:translateY(12px)}
          50%{opacity:0}
          62.5%{opacity:1; transform:translateY(0px)}
          100%{opacity:1; transform:translateY(0px)}
        }
        .t1{ animation: t1In 4.8s ease-out forwards; }

        @keyframes t2In{
          0%{opacity:0; transform:translateY(12px)}
          56.2%{opacity:0}
          68.8%{opacity:.95; transform:translateY(0px)}
          100%{opacity:.95; transform:translateY(0px)}
        }
        .t2{ animation: t2In 4.8s ease-out forwards; }

        /* Removed full fade-out to avoid a blank gap before story */
        .globalHold{ opacity: 1; }

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

      {/* Logo stage */}
      {stage === "logo" && (
        <div className="globalHold">
          <LogoIntro />
        </div>
      )}

      {/* Story stage */}
      {stage === "story" && (
        <motion.div
          className="storyBox"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
          className="flex gap-4 text-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button aria-label="Հայերեն" onClick={() => pick("hy")} className="active:scale-95">🇦🇲</button>
          <button aria-label="Русский" onClick={() => pick("ru")} className="active:scale-95">🇷🇺</button>
          <button aria-label="English" onClick={() => pick("en")} className="active:scale-95">🇬🇧</button>
        </motion.div>
      )}
    </div>
  );
}

