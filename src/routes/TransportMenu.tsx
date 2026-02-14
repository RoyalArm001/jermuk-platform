import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "../components/ui/Card";

const Item = ({ to, icon, title, subtitle }: { to: string; icon: string; title: string; subtitle?: string }) => (
  <Link to={to} className="block">
    <div className="flex items-center gap-3 py-3">
      <div className="h-9 w-9 rounded-2xl border border-[var(--border)] flex items-center justify-center">
        <span className="text-base">{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-extrabold truncate">{title}</div>
        {subtitle ? <div className="text-xs text-[var(--muted)] truncate mt-0.5">{subtitle}</div> : null}
      </div>
      <div className="text-[var(--muted)] font-bold">›</div>
    </div>
  </Link>
);

export default function TransportMenu() {
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-lg font-black">{t("transport")}</div>
          <div className="text-xs text-[var(--muted)]">{t("transport_sub")}</div>
        </div>
        <Link className="text-xs font-bold text-[var(--accent)]" to="/more">{t("more")}</Link>
      </div>

      <Card className="mt-4 p-3">
        <div className="divide-y divide-[var(--border)]">
          <Item to="/list/transport?tag=taxi" icon="🚕" title={t("taxi")} subtitle={t("taxi_sub")} />
          <Item to="/list/transport?tag=transport" icon="🚌" title={t("transport_local")} subtitle={t("transport_local_sub")} />
          <Item to="/list/transport?tag=yerevan" icon="🛣️" title={t("to_yerevan")} subtitle={t("to_yerevan_sub")} />
          <Item to="/list/transport?tag=offroad4x4" icon="🚙" title={t("offroad4x4")} subtitle={t("offroad4x4_sub")} />
        </div>
      </Card>
    </motion.div>
  );
}
