import React from "react";

type Props = { onDone: () => void };

export default function IntroVideo({ onDone }: Props) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const end = () => onDone();
    v.addEventListener("ended", end);
    return () => v.removeEventListener("ended", end);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black flex items-center justify-center"
      onClick={onDone}
      role="presentation"
    >
      <video
        ref={videoRef}
        src="/intro/logo-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
