import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";

export default function NotFound() {
  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.2}}>
      <Card className="p-5">
        <div className="text-lg font-black">404</div>
        <div className="mt-2 text-sm text-[var(--muted)]">Էջը չի գտնվել։</div>
        <Link to="/home" className="mt-3 inline-block text-sm font-bold text-[var(--accent)]">Գնալ Home</Link>
      </Card>
    </motion.div>
  );
}
