import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";

export default function Disclaimer() {
  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.2}}>
      <Card className="p-5">
        <div className="text-lg font-black">Disclaimer</div>
        <div className="mt-2 text-sm text-[var(--muted)]">
          Այս հավելվածը demo/տեղեկատվական հարթակ է։ Տեղեկատվությունը կարող է փոփոխվել։
        </div>

        <div className="mt-4 space-y-3 text-sm leading-6">
          <p>
            • Հասցեներ, գներ, հեռախոսահամարներ և ժամեր կարող են լինել ոչ ամբողջական կամ հնացած։
          </p>
          <p>
            • Ցանկացած ուղևորության/ծառայության ընտրությունից առաջ ստուգեք տվյալները՝ զանգով կամ պաշտոնական աղբյուրով։
          </p>
          <p>
            • Կայքի հեղինակները պատասխանատվություն չեն կրում սխալ/հնացած տվյալների կամ երրորդ կողմի ծառայությունների համար։
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <Link to="/more" className="text-sm font-bold text-[var(--accent)]">Հետ → More</Link>
          <Link to="/privacy" className="text-sm font-bold text-[var(--accent)]">Privacy</Link>
        </div>
      </Card>
    </motion.div>
  );
}
