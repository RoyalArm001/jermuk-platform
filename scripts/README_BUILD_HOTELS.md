# Next Phase Patch — Auto-merge hotels

Այս patch-ը ավելացնում է build script, որը ավտոմատ հավաքում է `src/data/hotels.json`
`src/data/hotels/*.json` առանձին ֆայլերից։

## Run
- `node scripts/build-hotels.mjs`
- Եթե ուզում ես նաև draft-երը ներառել՝ `INCLUDE_DRAFT=1 node scripts/build-hotels.mjs`

## Why
Դու կարող ես պահել յուրաքանչյուր հյուրանոց առանձին ֆայլով (անհատական թարմացումների համար),
իսկ կայքը միշտ կկարդա մեկ ընդհանուր list-ը (`src/data/hotels.json`)՝ առանց ձեռքով copy/paste-ի։
