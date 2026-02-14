import React from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "../ui/Accordion";
import NavPill from "../ui/NavPill";

export default function Sidebar() {
  const nav = useNavigate();

  const go = (to: string) => nav(to);
  const ext = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className="rounded-[26px] border border-white/35 bg-white/55 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,.14)] p-3">
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-emerald-500/90 grid place-items-center text-white font-black">
            J
          </div>
          <div>
            <div className="font-black leading-tight" data-i18n="app_name">
              Jermuk Guide
            </div>
            <div className="text-xs opacity-70" data-i18n="menu">
              Մենյու
            </div>
          </div>
        </div>
        <div className="h-9 w-9 rounded-full border border-white/40 bg-white/70 grid place-items-center">🇦🇲</div>
      </div>

      {/* Quick links */}
      <div className="mt-2 space-y-2 px-1">
        <NavPill icon="🏠" label="Տուն" dataKey="nav.home" onClick={() => go("/home")} />
        <NavPill icon="🔎" label="Որոնում" dataKey="nav.search" onClick={() => go("/search")} />
        <NavPill icon="🗺️" label="Քարտեզ" dataKey="nav.map" onClick={() => go("/map")} />
        <NavPill icon="⭐" label="Սիրված" dataKey="nav.favorites" onClick={() => go("/favorites")} />
      </div>

      <div className="my-4 h-px bg-black/10" />

      {/* Main menu */}
      <div className="space-y-2 px-1">
        <Accordion
          title="Հյուրանոցներ"
          titleKey="menu.stay"
          icon="🏨"
          items={[
            { label: "Հյուրանոցներ / Սանատորիաներ", dataKey: "menu.stay.hotels", onClick: () => go("/list/hotels") },
            { label: "Վարձու տներ", dataKey: "menu.stay.rent_houses", onClick: () => go("/list/rentals") },
            { label: "Վարձու վայրեր", dataKey: "menu.stay.rent_places", onClick: () => go("/list/rentals") },
          ]}
        />

        <Accordion
          title="Սնունդ"
          titleKey="menu.food"
          icon="🍽️"
          items={[
            { label: "Ռեստորաններ", dataKey: "menu.food.restaurants", onClick: () => go("/list/food") },
            { label: "Բարեր", dataKey: "menu.food.bars", onClick: () => go("/list/food") },
            { label: "Լոֆթ / Սրճարան", dataKey: "menu.food.cafes", onClick: () => go("/list/food") },
          ]}
        />

        <Accordion
          title="Ժամանց"
          titleKey="menu.fun"
          icon="🎉"
          items={[
            { label: "Ժամանցի վայրեր", dataKey: "menu.fun.places", onClick: () => go("/list/services") },
            { label: "Ակտիվություններ", dataKey: "menu.fun.activities", onClick: () => go("/list/trails") },
            { label: "Առցանց", dataKey: "menu.fun.online", onClick: () => go("/more") },
          ]}
        />

        <Accordion
          title="Շրջագայություններ"
          titleKey="menu.tours"
          icon="🧳"
          items={[{ label: "Շրջագայություններ", dataKey: "menu.tours.all", onClick: () => go("/list/trails") }]}
        />

        <Accordion
          title="Տեսարժան վայրեր"
          titleKey="menu.sights"
          icon="🧭"
          items={[
            { label: "Ջերմուկի", dataKey: "menu.sights.jermuk", onClick: () => go("/list/sights") },
            { label: "Վայոց ձոր", dataKey: "menu.sights.vayots_dzor", onClick: () => go("/list/sights") },
            { label: "Սյունիք", dataKey: "menu.sights.syunik", onClick: () => go("/list/sights") },
          ]}
        />

        <Accordion
          title="Տրանսպորտ"
          titleKey="menu.transport"
          icon="🚕"
          items={[
            { label: "Տաքսի", dataKey: "menu.transport.taxi", onClick: () => go("/list/transport") },
            { label: "Միջքաղաքային", dataKey: "menu.transport.intercity", onClick: () => go("/list/transport") },
            { label: "Դեպի Երևան", dataKey: "menu.transport.yerevan", onClick: () => go("/list/transport") },
            { label: "4x4 մեքենաներ", dataKey: "menu.transport.4x4", onClick: () => go("/list/transport") },
          ]}
        />

        <Accordion
          title="Ծառայություններ"
          titleKey="menu.services"
          icon="🧰"
          items={[
            { label: "Խանութներ", dataKey: "menu.services.shops", onClick: () => go("/list/services") },
            { label: "Վարսավիրանոցներ", dataKey: "menu.services.barber", onClick: () => go("/list/services") },
            { label: "Հարդարում / Սրահներ", dataKey: "menu.services.beauty", onClick: () => go("/list/services") },
            { label: "Շորի խանութներ", dataKey: "menu.services.clothes", onClick: () => go("/list/services") },
            { label: "Շինանյութ", dataKey: "menu.services.construction", onClick: () => go("/list/services") },
            { label: "Նկարահանում", dataKey: "menu.services.filming", onClick: () => go("/list/services") },
            { label: "Մուլտ հերոսներ", dataKey: "menu.services.cartoon", onClick: () => go("/list/services") },
            { label: "Տպագրություն", dataKey: "menu.services.printing", onClick: () => go("/list/services") },
          ]}
        />

        <Accordion
          title="Հետևեք սոցիալական ցանցերին"
          titleKey="menu.social"
          icon="📣"
          items={[
            { label: "Ֆեյսբուք", dataKey: "social.facebook", onClick: () => ext("https://facebook.com") },
            { label: "Ինստագրամ", dataKey: "social.instagram", onClick: () => ext("https://instagram.com") },
            { label: "YouTube", dataKey: "social.youtube", onClick: () => ext("https://youtube.com") },
            { label: "Թվիթթեր", dataKey: "social.twitter", onClick: () => ext("https://twitter.com") },
            { label: "WhatsApp", dataKey: "social.whatsapp", onClick: () => ext("https://wa.me/") },
            { label: "Telegram", dataKey: "social.telegram", onClick: () => ext("https://t.me/") },
          ]}
        />

        <Accordion
          title="Ավելին"
          titleKey="menu.more"
          icon="⋯"
          items={[
            { label: "Տեղեկություն", dataKey: "menu.more.info", onClick: () => go("/disclaimer") },
            { label: "Կապ", dataKey: "menu.more.contact", onClick: () => go("/contact") },
            { label: "Մասին", dataKey: "menu.more.about", onClick: () => go("/about") },
          ]}
        />
      </div>

      <div className="mt-6 flex items-center gap-3 px-2 text-[11px] opacity-70">
        <button className="hover:underline" onClick={() => go("/sitemap")} data-i18n="footer.sitemap">
          Կայքի քարտեզ
        </button>
        <button className="hover:underline" onClick={() => go("/privacy")} data-i18n="footer.privacy">
          Գաղտնիություն
        </button>
        <button className="hover:underline" onClick={() => go("/about")} data-i18n="footer.about">
          Մասին
        </button>
      </div>
    </div>
  );
}
