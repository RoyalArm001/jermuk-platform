import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { setJson, getJson } from "../lib/storage";

type DataPack = Record<string, any[]>;
const KEY = "data_override_v1";

export default function AdminImport() {
  const { t } = useTranslation();
  const [msg, setMsg] = React.useState<string>("");
  const [raw, setRaw] = React.useState<string>("");
  const [saved, setSaved] = React.useState<DataPack>(() => getJson(KEY, {} as DataPack));

  const onFile = async (file: File) => {
    const text = await file.text();
    setRaw(text);
  };

  const save = () => {
    try {
      const parsed = JSON.parse(raw);
      setJson(KEY, parsed);
      setSaved(parsed);
      setMsg("Saved to device (localStorage). Refresh pages to see changes.");
    } catch (e) {
      setMsg("Invalid JSON.");
    }
  };

  const clear = () => {
    setJson(KEY, {});
    setSaved({});
    setMsg("Cleared override.");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
      <div className="text-lg font-black">Import / Override (Local)</div>
      <div className="text-xs text-[var(--muted)] mt-1">
        Phase 4 tool: import one JSON pack with keys: hotels, rentals, food, sights, services, transport, trails.
      </div>

      <Card className="mt-3 p-4">
        <input type="file" accept="application/json" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        <div className="mt-3">
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder='Paste JSON pack here...'
            className="w-full h-48 bg-transparent border border-[var(--border)] rounded-2xl p-3 text-xs outline-none"
          />
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={save}>Save</Button>
          <Button variant="ghost" onClick={clear}>Clear</Button>
        </div>
        {msg && <div className="mt-2 text-xs text-[var(--muted)]">{msg}</div>}
      </Card>

      <Card className="mt-3 p-4">
        <div className="text-sm font-extrabold">Current override keys</div>
        <div className="mt-2 text-xs text-[var(--muted)]">
          {Object.keys(saved || {}).length ? Object.keys(saved).join(", ") : "No override loaded."}
        </div>
      </Card>
    </motion.div>
  );
}
