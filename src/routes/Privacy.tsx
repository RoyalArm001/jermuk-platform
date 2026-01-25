import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";

export default function Privacy() {
  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.2}}>
      <Card className="p-5">
        <div className="text-lg font-black">Privacy</div>
        <div className="mt-2 text-sm text-[var(--muted)]">
          Գաղտնիության համառոտ քաղաքականություն։
        </div>

        <div className="mt-4 space-y-3 text-sm leading-6">
          <p>
            • Այս demo տարբերակը չի պահանջում հաշիվ և չի հավաքում անձնական տվյալներ ձևով։
          </p>
          <p>
            • Հավելվածը կարող է պահել որոշ settings (օր. լեզու, intro state) միայն ձեր սարքում (localStorage)՝ UX-ի համար։
          </p>
          <p>
            • Եթե բացվում են արտաքին հղումներ (Booking, քարտեզ, սոց․ ցանցեր), դրանք կարգավորվում են տվյալ ծառայության քաղաքականությամբ։
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <Link to="/more" className="text-sm font-bold text-[var(--accent)]">Հետ → More</Link>
          <Link to="/disclaimer" className="text-sm font-bold text-[var(--accent)]">Disclaimer</Link>
        </div>
      </Card>
    </motion.div>
  );
}
