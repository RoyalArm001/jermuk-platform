import fs from "node:fs";

const files = [
  "src/data/hotels.json",
  "src/data/places.json",
  "src/data/services.json",
  "src/data/mock.json"
];

let ok = true;

for (const f of files) {
  try {
    const raw = fs.readFileSync(f, "utf8");
    const j = JSON.parse(raw);
    if (!j || typeof j !== "object") throw new Error("not object");
    console.log("OK:", f);
  } catch (e) {
    ok = false;
    console.error("BAD JSON:", f, e.message);
  }
}

process.exit(ok ? 0 : 1);
