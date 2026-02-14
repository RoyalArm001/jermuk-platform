import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { applyUpdate, canPromptInstall, isStandalone, promptInstall } from "../lib/pwa";

export default function Install() {
  const nav = useNavigate();
  const [canInstall, setCanInstall] = React.useState(canPromptInstall());
  const [status, setStatus] = React.useState<"idle"|"installing"|"installed"|"dismissed">("idle");

  React.useEffect(() => {
    const onAvail = () => setCanInstall(true);
    const onInstalled = () => {
      setStatus("installed");
      setTimeout(() => nav("/home", { replace: true }), 300);
    };
    window.addEventListener("pwa:installAvailable", onAvail);
    window.addEventListener("pwa:installed", onInstalled);
    return () => {
      window.removeEventListener("pwa:installAvailable", onAvail);
      window.removeEventListener("pwa:installed", onInstalled);
    };
  }, [nav]);

  React.useEffect(() => {
    if (isStandalone()) {
      nav("/home", { replace: true });
    }
  }, [nav]);

  const doInstall = async () => {
    setStatus("installing");
    const res = await promptInstall();
    if (res === "accepted") return;
    if (res === "dismissed") setStatus("dismissed");
    if (res === "unavailable") setStatus("dismissed");
  };

  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.2}}>
      <Card className="p-5">
        <div className="text-lg font-black">Install app</div>
        <div className="mt-2 text-sm text-[var(--muted)]">
          Շարունակելու համար պետք է տեղադրես հավելվածը (Add to Home Screen)։
        </div>

        {canInstall ? (
          <Button className="mt-4 w-full" onClick={doInstall} disabled={status==="installing"}>
            {status==="installing" ? "Բացում եմ Install..." : "Install"}
          </Button>
        ) : (
          <div className="mt-4 text-sm text-[var(--muted)]">
            Եթե iPhone է՝ Safari → Share → <b>Add to Home Screen</b>։
          </div>
        )}

        <div className="mt-4 text-xs text-[var(--muted)]">
          Թարմացումների համար՝ app-ը ավտոմատ ցույց կտա “Թարմացում կա”։
        </div>

        {/* hidden update hook (optional) */}
        <button style={{display:"none"}} onClick={() => applyUpdate()} />
      </Card>
    </motion.div>
  );
}
