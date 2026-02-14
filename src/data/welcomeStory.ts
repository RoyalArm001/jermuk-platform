export type StorySlide = { title: string; text: string };

export const WELCOME_STORY: Record<"hy" | "ru" | "en", StorySlide[]> = {
  hy: [
    {
      title: "Բարի գալուստ Ջերմուկ",
      text:
        "Լեռների մեջ թաքնված առողջարանային քաղաք՝ մաքուր օդ, սոճու բույր ու խաղաղություն, որը զգացվում է հենց առաջին քայլից։"
    },
    {
      title: "Հանքային ջուր • արահետներ • տեսարաններ",
      text:
        "Ամենահայտնին՝ Ջերմուկի ջրվեժը, տաք աղբյուրները և զբոսանքային արահետները։ Այստեղ օրը սկսվում է լռությամբ, իսկ ավարտվում՝ լայն տեսարաններով։"
    },
    {
      title: "Քո ուղեցույցը պատրաստ է",
      text:
        "Ընտրիր լեզուն ու մտիր ներս․ հյուրանոցներ, սնունդ, տեսարժան վայրեր, քարտեզ ու ծառայություններ՝ մեկ տեղում։"
    }
  ],
  ru: [
    {
      title: "Добро пожаловать в Джермук",
      text:
        "Курортный город в горах: чистый воздух, аромат сосен и спокойствие, которое ощущается с первого шага."
    },
    {
      title: "Минеральная вода • тропы • виды",
      text:
        "Самое известное — водопад Джермука, тёплые источники и прогулочные маршруты. Здесь утро начинается тишиной, а заканчивается панорамами."
    },
    {
      title: "Ваш гид готов",
      text:
        "Выберите язык и начнём: отели, еда, места, карта и сервисы — всё в одном месте."
    }
  ],
  en: [
    {
      title: "Welcome to Jermuk",
      text:
        "A mountain resort town: crisp air, pine-scented streets, and a calm that you feel from the first step."
    },
    {
      title: "Mineral water • trails • views",
      text:
        "Signature spots include the Jermuk Waterfall, warm springs, and scenic walking routes. Mornings start quiet; evenings end with wide panoramas."
    },
    {
      title: "Your guide is ready",
      text:
        "Choose a language and step in: stays, food, sights, map, and local services — all in one place."
    }
  ]
};
