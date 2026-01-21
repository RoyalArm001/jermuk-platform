export function Slider({ images = [] }) {
  if (!images.length) return null;
  return (
    <div className="slider" aria-label="Gallery">
      {images.map((src, i) => (
        <div className="slide" key={src + i}>
          <img src={src} alt={"image " + (i + 1)} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
