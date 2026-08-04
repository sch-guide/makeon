import { useId, type CSSProperties, type ReactNode } from "react";
import type { ThemeId } from "./memory-data";

type Props = { theme: ThemeId; iconKey: string; label: string; accent?: string; soft?: string; decorative?: boolean };

function shape(key: string): ReactNode {
  switch (key) {
    case "cat-face": return <><path d="m25 42 5-22 14 11a27 27 0 0 1 12 0l14-11 5 22v9a25 25 0 0 1-50 0Z"/><circle cx="41" cy="48" r="2"/><circle cx="59" cy="48" r="2"/><path d="m46 57 4 3 4-3M50 60v4"/></>;
    case "paw": return <><path d="M32 61c3-12 12-20 18-20s15 8 18 20c3 12-9 15-18 8-9 7-21 4-18-8Z"/><circle cx="29" cy="39" r="7"/><circle cx="43" cy="29" r="7"/><circle cx="57" cy="29" r="7"/><circle cx="71" cy="39" r="7"/></>;
    case "fish": return <><path d="M25 51c12-18 32-21 47-3-15 18-35 16-47 3Z"/><path d="m25 51-13-12v24Zm47-3 13-8v20l-13-8"/><circle cx="62" cy="47" r="2"/></>;
    case "yarn": return <><circle cx="47" cy="50" r="25"/><path d="M28 37c13-2 26 4 38 18M25 51c14 8 29 7 44 1M36 27c12 14 17 29 13 47M68 68c8 0 13 4 15 10"/></>;
    case "cat-house": return <><path d="m18 43 32-25 32 25v34H18Z"/><path d="M38 77V59a12 12 0 0 1 24 0v18M70 34v-9"/></>;
    case "bell": return <><path d="M29 64h42c-7-8-8-15-8-25a13 13 0 0 0-26 0c0 10-1 17-8 25Z"/><path d="M44 70c2 8 10 8 12 0M45 22c0-7 10-7 10 0"/></>;
    case "tail": return <path d="M28 69c-15-24 3-43 21-30 14 10-2 24 8 32 11 9 27-3 22-18"/>;
    case "feather": return <><path d="M23 77c14-22 28-43 54-55-2 26-17 45-42 47"/><path d="M23 77 62 38M35 58h17M48 43l3 11"/></>;
    case "milk": return <><path d="M27 40h46l-5 34H32Z"/><ellipse cx="50" cy="40" rx="23" ry="8"/><path d="M36 40c5 6 23 6 28 0"/></>;
    case "box-cat": return <><path d="M24 48h52l-5 29H29Z"/><path d="M35 48c-5-23 7-31 15-19 8-12 20-4 15 19M42 36h1M57 36h1M46 42l4 3 4-3"/></>;
    case "sleeping-cat": return <><path d="M22 63c4-20 18-29 37-22 16 6 20 28 3 33-14 4-29-2-40-11Z"/><path d="m34 44-4-13 13 8M34 58c5 4 12 4 17 0M68 50c14-8 19 8 7 17"/></>;
    case "heart-cat": return <><path d="M50 75C20 58 20 35 34 31c8-2 14 3 16 9 2-6 8-11 16-9 14 4 14 27-16 44Z"/><path d="m34 32 1-12 10 10M66 32l-1-12-10 10M43 46h1M56 46h1M47 53l3 2 3-2"/></>;

    case "cake": return <><path d="M23 44h54v31H23Z"/><path d="M23 55c8 7 12-5 20 1 8 6 12-6 20 0 6 4 9 0 14-3M30 44c3-12 37-12 40 0"/><path d="M50 32V20M44 20h12"/></>;
    case "donut": return <><circle cx="50" cy="50" r="29"/><circle cx="50" cy="50" r="10"/><path d="M25 42c8-4 12 5 20 0 8-5 13 5 20 0 5-3 9 0 12 2"/></>;
    case "macaron": return <><path d="M23 46c2-15 52-15 54 0M23 59c2 15 52 15 54 0M23 46h54v13H23Z"/><path d="M28 52h44"/></>;
    case "pudding": return <><path d="m30 35 5 35h30l5-35Z"/><ellipse cx="50" cy="35" rx="20" ry="7"/><path d="M35 28c6-7 24-7 30 0"/></>;
    case "cookie": return <><circle cx="50" cy="50" r="28"/><circle cx="40" cy="39" r="3"/><circle cx="59" cy="36" r="3"/><circle cx="62" cy="57" r="3"/><circle cx="42" cy="63" r="3"/></>;
    case "strawberry-milk": return <><path d="M32 30h36l5 48H27Z"/><path d="M36 30V20h28v10M34 47h32"/><path d="M44 60c0-8 12-8 12 0-2 7-10 10-12 0Z"/></>;
    case "icecream": return <><path d="m36 47 14 33 14-33Z"/><circle cx="41" cy="39" r="13"/><circle cx="58" cy="39" r="13"/><circle cx="50" cy="27" r="13"/></>;
    case "cupcake": return <><path d="m31 47 5 30h28l5-30Z"/><path d="M31 47c0-10 8-13 14-10 1-12 20-10 18 2 7-1 11 2 11 8Z"/></>;
    case "croissant": return <path d="M20 59c5-27 17-37 30-19 13-18 25-8 30 19-11 17-22 14-30 3-8 11-19 14-30-3Zm18-20c-2 10-1 18 12 23 13-5 14-13 12-23"/>;
    case "waffle": return <><path d="m26 30 47 7-7 42-47-8Z"/><path d="m30 38 38 6M27 50l38 6M25 62l38 6M39 32l-7 42M52 34l-7 42M65 36l-7 42"/></>;
    case "chocolate": return <><rect x="25" y="20" width="50" height="61" rx="5"/><path d="M25 40h50M25 60h50M42 20v61M59 20v61"/><path d="m66 27 5 5-5 5"/></>;
    case "tart": return <><path d="M22 48h56L69 76H31Z"/><path d="M27 48c3-15 43-18 49 0"/><circle cx="42" cy="38" r="8"/><circle cx="57" cy="37" r="8"/><path d="M50 34c-2-9 5-13 11-14"/></>;

    case "cloud": return <path d="M25 68c-18-3-16-27 1-28 4-18 28-22 38-8 18-3 26 24 9 33-10 5-37 3-48 3Z"/>;
    case "sun": return <><circle cx="50" cy="50" r="18"/><path d="M50 15v11M50 74v11M15 50h11M74 50h11M25 25l8 8M67 67l8 8M75 25l-8 8M33 67l-8 8"/></>;
    case "moon": return <path d="M68 71c-27 10-49-18-34-42 7-11 18-16 29-14-18 15-11 44 10 49-1 3-3 5-5 7Z"/>;
    case "star": return <path d="m50 16 9 22 24 2-18 16 6 24-21-13-21 13 6-24-18-16 24-2Z"/>;
    case "flower": return <><circle cx="50" cy="50" r="8"/><circle cx="50" cy="31" r="12"/><circle cx="68" cy="44" r="12"/><circle cx="61" cy="64" r="12"/><circle cx="39" cy="64" r="12"/><circle cx="32" cy="44" r="12"/></>;
    case "leaf": return <><path d="M24 70c2-31 20-48 53-45-2 31-19 48-53 45Z"/><path d="M24 75c14-19 29-31 46-43M42 56l-2-14M54 45l14 2"/></>;
    case "rainbow": return <><path d="M19 67a31 31 0 0 1 62 0M30 67a20 20 0 0 1 40 0M41 67a9 9 0 0 1 18 0"/><path d="M14 68h72"/></>;
    case "snowflake": return <path d="M50 15v70M20 32l60 36M20 68l60-36M50 15l-7 10M50 15l7 10M50 85l-7-10M50 85l7-10M20 32l12 1M20 32l5 11M80 68l-12-1M80 68l-5-11"/>;
    case "butterfly": return <><path d="M48 47C37 22 17 25 22 44c3 10 14 13 26 10M52 47c11-25 31-22 26-3-3 10-14 13-26 10M48 55C34 57 26 72 39 78c8 3 12-8 11-20M52 55c14 2 22 17 9 23-8 3-12-8-11-20"/><path d="M50 43v28M47 39l-6-9M53 39l6-9"/></>;
    case "tree": return <><path d="M44 70h12v15H44Z"/><path d="M50 17 25 51h13L22 70h56L62 51h13Z"/></>;
    case "drop": return <path d="M50 17c9 16 24 31 24 44a24 24 0 0 1-48 0c0-13 15-28 24-44Zm-11 45c2 7 6 10 12 11"/>;
    case "mushroom": return <><path d="M24 47c0-18 12-29 26-29s26 11 26 29Z"/><path d="M40 47c2 9 0 19-5 29 8 6 22 6 30 0-5-10-7-20-5-29"/><circle cx="39" cy="34" r="3"/><circle cx="58" cy="29" r="4"/></>;

    case "code": return <><rect x="17" y="22" width="66" height="56" rx="8"/><path d="M17 35h66M34 48l-9 8 9 8M66 48l9 8-9 8M57 45 44 68"/></>;
    case "terminal": return <><rect x="17" y="22" width="66" height="56" rx="8"/><path d="M17 35h66M29 48l9 8-9 8M45 65h20"/></>;
    case "folder": return <path d="M17 31h29l7 8h30v35H17Z"/>;
    case "cloud-data": return <><path d="M25 65c-18-3-14-27 3-27 7-18 31-17 38-2 17-2 23 24 6 29Z"/><path d="M50 43v27M41 62l9 9 9-9"/></>;
    case "database": return <><ellipse cx="50" cy="28" rx="27" ry="10"/><path d="M23 28v44c5 14 49 14 54 0V28M23 48c5 14 49 14 54 0M23 67c5 14 49 14 54 0"/></>;
    case "browser": return <><rect x="16" y="20" width="68" height="60" rx="8"/><path d="M16 34h68M26 27h1M35 27h1M44 27h1M30 49h40M30 61h26"/></>;
    case "robot": return <><rect x="24" y="30" width="52" height="43" rx="10"/><path d="M50 30V19M44 18h12M24 48H15M76 48h9M37 73v9M63 73v9"/><circle cx="40" cy="49" r="4"/><circle cx="60" cy="49" r="4"/><path d="M39 62h22"/></>;
    case "bulb": return <><path d="M34 54c-15-21 2-38 16-38s31 17 16 38c-6 8-6 12-6 15H40c0-3 0-7-6-15Z"/><path d="M40 76h20M43 84h14"/></>;
    case "keyboard": return <><rect x="15" y="30" width="70" height="43" rx="8"/><path d="M25 41h5M39 41h5M53 41h5M67 41h5M25 52h5M39 52h5M53 52h5M67 52h5M30 63h40"/></>;
    case "git-branch": return <><circle cx="31" cy="27" r="7"/><circle cx="31" cy="73" r="7"/><circle cx="69" cy="38" r="7"/><path d="M31 34v32M38 52h9c12 0 22-6 22-14"/></>;
    case "server": return <><rect x="22" y="20" width="56" height="24" rx="5"/><rect x="22" y="48" width="56" height="24" rx="5"/><path d="M31 32h1M40 32h1M31 60h1M40 60h1M52 32h17M52 60h17M50 72v9"/></>;
    case "mobile-app": return <><rect x="31" y="13" width="38" height="74" rx="9"/><path d="M43 22h14M46 78h8"/><rect x="39" y="33" width="22" height="22" rx="5"/><path d="m44 61 6-5 6 5"/></>;
    default: return <path d="m50 18 9 22 24 2-18 16 6 24-21-13-21 13 6-24-18-16 24-2Z"/>;
  }
}

function filledArt(key: string): ReactNode {
  switch (key) {
    case "cat-face": return <><path d="m25 43 4-22 15 11c4-2 8-2 12 0l15-11 4 22v10c0 15-11 25-25 25S25 68 25 53Z" fill="#d9a17f"/><path d="m31 31 8 6-10 5Zm38 0-8 6 10 5Z" fill="#f1c4b2"/><ellipse cx="50" cy="59" rx="13" ry="10" fill="#f7ddca"/><ellipse cx="40" cy="49" rx="3" ry="4" fill="#51483f"/><ellipse cx="60" cy="49" rx="3" ry="4" fill="#51483f"/><path d="m47 57 3 2 3-2-3-2Z" fill="#bc6f75"/></>;
    case "paw": return <><path d="M31 61c3-13 12-21 19-21s16 8 19 21c2 11-10 16-19 8-9 8-21 3-19-8Z" fill="#ed9eaa"/><circle cx="29" cy="38" r="8" fill="#f2afba"/><circle cx="43" cy="27" r="8" fill="#f6bdc5"/><circle cx="58" cy="27" r="8" fill="#f6bdc5"/><circle cx="72" cy="38" r="8" fill="#f2afba"/><ellipse cx="48" cy="55" rx="8" ry="6" fill="#ffd6dc" opacity=".7"/></>;
    case "yarn": return <><circle cx="45" cy="49" r="27" fill="#c98ca3"/><path d="M26 37c16-5 29 2 39 18M21 50c15 11 34 10 49 1M34 25c15 15 19 34 13 51M63 67c10 1 17 5 21 12" fill="none" stroke="#f4d7e2" strokeWidth="4"/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".3"/></>;
    case "fish": return <><path d="M24 50c13-19 35-21 50-2-14 20-37 18-50 2Z" fill="#df9b73"/><path d="m26 50-14-13v26Zm47-2 14-9v21l-14-8" fill="#e8af87"/><path d="M41 34c7 6 9 13 6 24" fill="none" stroke="#f8d8bd" strokeWidth="4"/><circle cx="63" cy="45" r="3" fill="#4f514b"/></>;
    case "cat-house": return <><path d="m17 45 33-27 33 27-5 4-28-21-28 21Z" fill="#ad7f72"/><path d="M22 45h56v32H22Z" fill="#e3b89f"/><path d="M37 77V59c0-9 6-15 13-15s13 6 13 15v18Z" fill="#7a5c53"/><path d="M26 49h48v5H26Z" fill="#f2d8c5"/></>;
    case "bell": return <><path d="M28 64h44c-7-9-8-16-8-25 0-10-6-18-14-18s-14 8-14 18c0 9-1 16-8 25Z" fill="#d9ac4d"/><path d="M35 57h30l4 7H31Z" fill="#b98632"/><circle cx="50" cy="72" r="7" fill="#c88b39"/><path d="M41 33c3-6 12-9 18-4" fill="none" stroke="#ffe4a5" strokeWidth="4"/></>;
    case "feather": return <><path d="M24 76c13-23 28-43 54-55-1 27-17 46-43 48Z" fill="#8eb7b2"/><path d="M24 76 64 36M36 57l17-1M49 43l2 13" fill="none" stroke="#edf8f4" strokeWidth="4"/><path d="M60 31c5-3 10-6 17-9-2 8-5 14-10 20Z" fill="#c0d7d2"/></>;
    case "milk": return <><ellipse cx="50" cy="41" rx="24" ry="9" fill="#b7c8d2"/><path d="m26 41 6 35h36l6-35c-6 7-42 7-48 0Z" fill="#dbe7ea"/><ellipse cx="50" cy="41" rx="19" ry="6" fill="#fffdf4"/><path d="M34 50c8 4 24 4 32 0" fill="none" stroke="#fff" strokeWidth="4" opacity=".8"/></>;
    case "box-cat": return <><path d="M23 47h54l-6 31H29Z" fill="#c69b6e"/><path d="M28 53h44l-2 8H30Z" fill="#e0b888"/><path d="M35 47c-5-24 7-32 15-18 8-14 20-6 15 18Z" fill="#d6a07b"/><path d="m38 34 2-10 8 7m14 3-2-10-8 7" fill="#edc9b0"/><circle cx="43" cy="39" r="2.5" fill="#4f463f"/><circle cx="57" cy="39" r="2.5" fill="#4f463f"/></>;
    case "tail": return <><path d="M28 70c-16-24 2-45 21-31 15 11-1 24 9 32 11 9 28-3 22-19" fill="none" stroke="#c58f6e" strokeWidth="14" strokeLinecap="round"/><path d="M29 67c-8-18 3-27 13-21" fill="none" stroke="#e8b795" strokeWidth="4" strokeLinecap="round"/></>;
    case "sleeping-cat": return <><path d="M20 64c5-22 21-31 40-23 17 7 20 28 2 34-15 5-31-2-42-11Z" fill="#c98f72"/><path d="m33 44-3-14 14 9" fill="#dca888"/><ellipse cx="42" cy="56" rx="14" ry="10" fill="#eac2a7"/><path d="M35 57c5 4 11 4 16 0" fill="none" stroke="#6b554c" strokeWidth="3"/><path d="M67 52c14-9 20 8 7 17" fill="none" stroke="#c98f72" strokeWidth="10" strokeLinecap="round"/></>;
    case "heart-cat": return <><path d="M50 77C18 59 21 34 34 31c8-2 14 3 16 10 2-7 8-12 16-10 14 3 16 28-16 46Z" fill="#e5969e"/><path d="m33 33 2-13 11 11m21 2-2-13-11 11" fill="#d9a17f"/><path d="M35 31c3 22 27 22 30 0-7-8-23-8-30 0Z" fill="#d9a17f"/><circle cx="43" cy="41" r="2.5" fill="#55473f"/><circle cx="57" cy="41" r="2.5" fill="#55473f"/></>;

    case "cake": return <><path d="M24 43h52v33H24Z" fill="#f5cfbf"/><path d="M24 53c8 8 12-5 20 1 8 7 13-6 21 0 4 3 8 1 11-2v-9H24Z" fill="#fff5e8"/><path d="M29 43c5-14 37-14 42 0Z" fill="#efb4b5"/><circle cx="50" cy="29" r="8" fill="#dc6672"/><path d="M50 27c-1-7 5-10 9-10" fill="none" stroke="#7e9d67" strokeWidth="3"/></>;
    case "donut": return <><circle cx="50" cy="50" r="29" fill="#d9a16b"/><circle cx="50" cy="50" r="10" fill="#f7efe3"/><path d="M25 43c8-6 14 4 21-1 8-6 14 5 21-1 5-3 9 0 11 2-4-13-15-22-28-22-12 0-22 7-27 18Z" fill="#e991a5"/><circle cx="37" cy="35" r="2" fill="#fff1b8"/><circle cx="62" cy="35" r="2" fill="#a8c9be"/><circle cx="68" cy="48" r="2" fill="#fff1b8"/></>;
    case "macaron": return <><path d="M23 46c3-16 51-16 54 0Z" fill="#d49bb8"/><path d="M23 59c3 16 51 16 54 0Z" fill="#c886a7"/><rect x="23" y="46" width="54" height="13" rx="5" fill="#fff0dc"/><path d="M29 49h42M29 56h42" stroke="#e5cbb0" strokeWidth="2"/></>;
    case "pudding": return <><path d="m29 34 6 38h30l6-38Z" fill="#efc66d"/><ellipse cx="50" cy="34" rx="21" ry="8" fill="#a96848"/><path d="M36 45c1 13 3 18 7 22" fill="none" stroke="#ffe6a1" strokeWidth="4"/><ellipse cx="50" cy="73" rx="20" ry="5" fill="#d39d52" opacity=".45"/></>;
    case "cookie": return <><circle cx="50" cy="50" r="29" fill="#d4a064"/><circle cx="39" cy="38" r="4" fill="#6f4d3e"/><circle cx="60" cy="35" r="4" fill="#795041"/><circle cx="63" cy="57" r="4" fill="#6f4d3e"/><circle cx="42" cy="64" r="4" fill="#795041"/><path d="M30 46c8 2 12 0 17-5" fill="none" stroke="#efd09b" strokeWidth="3"/></>;
    case "strawberry-milk": return <><path d="M31 30h38l5 49H26Z" fill="#efb2be"/><path d="M35 30V19h30v11Z" fill="#f8e7d7"/><path d="M31 44h40l3 35H26Z" fill="#f5c3cc"/><path d="M43 60c0-9 14-9 14 0-2 8-12 11-14 0Z" fill="#d95e70"/><path d="M39 38h22" stroke="#fff" strokeWidth="3" opacity=".8"/></>;
    case "cupcake": return <><path d="m30 47 6 31h28l6-31Z" fill="#ca9cb8"/><path d="M31 47c0-11 8-14 15-10 1-13 21-11 19 2 7-2 11 2 11 8Z" fill="#fff1df"/><circle cx="51" cy="30" r="7" fill="#db6875"/><path d="M38 55h25" stroke="#e9cbe0" strokeWidth="3"/></>;
    case "icecream": return <><path d="m34 46 16 36 16-36Z" fill="#d4a76c"/><path d="m39 52 11 25 11-25" fill="none" stroke="#f2d5a4" strokeWidth="3"/><circle cx="40" cy="39" r="14" fill="#efb4c5"/><circle cx="60" cy="39" r="14" fill="#b9d7ca"/><circle cx="50" cy="25" r="14" fill="#f5d49a"/><circle cx="46" cy="20" r="4" fill="#fff" opacity=".45"/></>;
    case "waffle": return <><path d="m24 29 50 8-8 43-50-8Z" fill="#d9a45c"/><path d="m29 38 40 6M26 51l40 6M24 64l40 6M40 32l-8 43M54 34l-8 43M68 36l-8 43" stroke="#f1cc8a" strokeWidth="3"/><path d="M45 37c7-8 18-5 20 3" fill="none" stroke="#cf6e76" strokeWidth="5"/></>;
    case "croissant": return <><path d="M19 59c5-29 18-39 31-19 13-20 26-10 31 19-11 19-23 15-31 3-8 12-20 16-31-3Z" fill="#dca45d"/><path d="M37 39c-2 11-1 19 13 24 14-5 15-13 13-24M29 48c2 7 5 12 11 16M71 48c-2 7-5 12-11 16" fill="none" stroke="#f4cf8d" strokeWidth="4"/></>;
    case "chocolate": return <><rect x="24" y="19" width="52" height="63" rx="6" fill="#7d4f42"/><path d="M24 40h52M24 61h52M42 19v63M59 19v63" stroke="#a7745d" strokeWidth="3"/><path d="M31 25h8v9h-8Z" fill="#c69b80" opacity=".55"/><path d="m66 26 6 6-6 6" fill="none" stroke="#e1b79c" strokeWidth="3"/></>;
    case "tart": return <><path d="M21 48h58L69 77H31Z" fill="#d09a59"/><path d="M27 48c4-16 43-19 49 0Z" fill="#fff0d5"/><circle cx="41" cy="38" r="9" fill="#df6f7d"/><circle cx="59" cy="37" r="9" fill="#e9a35e"/><path d="M49 34c-2-10 6-14 12-15" fill="none" stroke="#7fa171" strokeWidth="4"/></>;

    case "sun": return <><circle cx="50" cy="50" r="20" fill="#efbd58"/><g stroke="#efbd58" strokeWidth="7" strokeLinecap="round"><path d="M50 14v9M50 77v9M14 50h9M77 50h9M25 25l7 7M68 68l7 7M75 25l-7 7M32 68l-7 7"/></g><circle cx="43" cy="46" r="2" fill="#7c6643"/><circle cx="58" cy="46" r="2" fill="#7c6643"/><path d="M43 57c5 4 10 4 15 0" fill="none" stroke="#7c6643" strokeWidth="2.5"/></>;
    case "moon": return <><path d="M69 72c-29 11-52-19-36-45 7-11 19-17 31-14-18 15-12 44 10 50-1 4-3 7-5 9Z" fill="#d9c783"/><circle cx="49" cy="31" r="4" fill="#b6a86f" opacity=".55"/><circle cx="42" cy="55" r="6" fill="#b6a86f" opacity=".35"/></>;
    case "star": return <><path d="m50 14 10 24 26 3-20 17 6 26-22-14-22 14 6-26-20-17 26-3Z" fill="#e9bd57"/><path d="m50 24 6 18 18 2" fill="none" stroke="#ffe9a5" strokeWidth="4" opacity=".8"/></>;
    case "cloud": return <><path d="M24 70c-19-3-17-29 1-30 5-19 30-23 41-8 19-3 27 26 8 36-10 5-39 2-50 2Z" fill="#d5e5ea"/><path d="M30 46c7-12 21-16 33-8" fill="none" stroke="#f8fcfd" strokeWidth="5"/><ellipse cx="51" cy="73" rx="27" ry="4" fill="#95b3bd" opacity=".2"/></>;
    case "rainbow": return <><path d="M17 69a33 33 0 0 1 66 0" fill="none" stroke="#e9919d" strokeWidth="10"/><path d="M27 69a23 23 0 0 1 46 0" fill="none" stroke="#efc66d" strokeWidth="9"/><path d="M38 69a12 12 0 0 1 24 0" fill="none" stroke="#9dc4b0" strokeWidth="8"/><circle cx="20" cy="70" r="10" fill="#e3eef1"/><circle cx="80" cy="70" r="10" fill="#e3eef1"/></>;
    case "flower": return <><circle cx="50" cy="50" r="10" fill="#e9bd56"/><circle cx="50" cy="29" r="13" fill="#e7a4b7"/><circle cx="70" cy="44" r="13" fill="#dfa0b3"/><circle cx="62" cy="66" r="13" fill="#e7a4b7"/><circle cx="38" cy="66" r="13" fill="#dfa0b3"/><circle cx="30" cy="44" r="13" fill="#e7a4b7"/><circle cx="46" cy="46" r="4" fill="#fff4bd" opacity=".7"/></>;
    case "leaf": return <><path d="M22 72c2-33 21-51 56-47-2 33-21 51-56 47Z" fill="#86aa73"/><path d="M22 77c15-20 31-34 49-46M41 57l-2-15M54 46l15 2" fill="none" stroke="#d9e8cb" strokeWidth="4"/><path d="M30 65c11-18 24-27 38-34" fill="none" stroke="#658b59" strokeWidth="2"/></>;
    case "snowflake": return <><g stroke="#8fc2d2" strokeWidth="8" strokeLinecap="round"><path d="M50 16v68M21 33l58 34M21 67l58-34"/></g><g stroke="#dff4f8" strokeWidth="3" strokeLinecap="round"><path d="M50 16v68M21 33l58 34M21 67l58-34"/></g><circle cx="50" cy="50" r="7" fill="#bfe0e9"/></>;
    case "mushroom": return <><path d="M23 47c0-19 13-31 27-31s27 12 27 31Z" fill="#d7867f"/><path d="M39 47c2 10 0 20-5 31 8 6 24 6 32 0-5-11-7-21-5-31Z" fill="#f0dcc3"/><circle cx="38" cy="33" r="5" fill="#f8e8d8"/><circle cx="59" cy="28" r="6" fill="#f8e8d8"/><path d="M44 60c4 2 8 2 12 0" stroke="#d1b999" strokeWidth="3"/></>;
    case "butterfly": return <><path d="M47 48C36 22 15 25 21 44c3 11 15 14 26 10Z" fill="#dba0bd"/><path d="M53 48c11-26 32-23 26-4-3 11-15 14-26 10Z" fill="#9ebfce"/><path d="M47 55c-15 2-23 18-9 24 8 3 12-8 11-21Zm6 0c15 2 23 18 9 24-8 3-12-8-11-21Z" fill="#efd38a"/><rect x="47" y="40" width="6" height="34" rx="3" fill="#695d5a"/></>;
    case "drop": return <><path d="M50 15c10 17 26 33 26 47a26 26 0 0 1-52 0c0-14 16-30 26-47Z" fill="#81b8cf"/><path d="M37 60c2 8 7 13 14 14" fill="none" stroke="#dff4fa" strokeWidth="5"/><ellipse cx="43" cy="43" rx="5" ry="8" fill="#fff" opacity=".38"/></>;
    case "tree": return <><path d="M43 67h14v19H43Z" fill="#9a6b4c"/><path d="M50 14 24 50h13L20 71h60L63 50h13Z" fill="#7ea66d"/><path d="m50 24-15 23h10L30 64" fill="none" stroke="#b8d3a8" strokeWidth="5"/><ellipse cx="50" cy="84" rx="24" ry="4" fill="#6d8f5f" opacity=".25"/></>;

    case "code": return <><rect x="16" y="21" width="68" height="58" rx="9" fill="#65728b"/><path d="M16 36h68" stroke="#cbd5e4" strokeWidth="4"/><circle cx="27" cy="29" r="3" fill="#ef9ca6"/><circle cx="37" cy="29" r="3" fill="#e9c46f"/><circle cx="47" cy="29" r="3" fill="#93bd9f"/><path d="M35 49l-9 8 9 8M65 49l9 8-9 8M57 45 43 69" fill="none" stroke="#ecf2fa" strokeWidth="4"/></>;
    case "terminal": return <><rect x="16" y="21" width="68" height="58" rx="9" fill="#4e5b5b"/><path d="M16 36h68" stroke="#859697" strokeWidth="4"/><path d="m28 48 10 9-10 9M46 66h21" fill="none" stroke="#cce3d2" strokeWidth="4"/><circle cx="27" cy="29" r="3" fill="#d89595"/><circle cx="37" cy="29" r="3" fill="#d9bd72"/></>;
    case "folder": return <><path d="M16 32h30l8 8h30v36H16Z" fill="#e1b25c"/><path d="M16 44h68l-5 32H21Z" fill="#edc873"/><path d="M26 52h48" stroke="#ffe4a0" strokeWidth="3"/></>;
    case "database": return <><ellipse cx="50" cy="28" rx="28" ry="11" fill="#8ba9c5"/><path d="M22 28v44c5 15 51 15 56 0V28c-5 15-51 15-56 0Z" fill="#7392b0"/><path d="M22 48c5 15 51 15 56 0M22 67c5 15 51 15 56 0" fill="none" stroke="#c6d9e8" strokeWidth="4"/><ellipse cx="50" cy="28" rx="20" ry="5" fill="#b7cfe1" opacity=".7"/></>;
    case "browser": return <><rect x="15" y="19" width="70" height="62" rx="9" fill="#eef2f5"/><path d="M15 35h70" stroke="#8ca0b8" strokeWidth="4"/><path d="M28 49h44M28 61h31" stroke="#9eb0c4" strokeWidth="5" strokeLinecap="round"/><circle cx="26" cy="27" r="3" fill="#e88f99"/><circle cx="36" cy="27" r="3" fill="#e4bd65"/><circle cx="46" cy="27" r="3" fill="#8eb79a"/></>;
    case "cloud-data": return <><path d="M24 67c-19-3-15-29 3-29 7-19 32-18 40-2 18-2 24 26 6 31Z" fill="#9fc6d5"/><path d="M50 43v28M40 63l10 10 10-10" fill="none" stroke="#eff9fb" strokeWidth="5"/><ellipse cx="48" cy="39" rx="13" ry="5" fill="#cbe2e9" opacity=".7"/></>;
    case "robot": return <><rect x="23" y="29" width="54" height="45" rx="11" fill="#a4b3c4"/><rect x="28" y="35" width="44" height="31" rx="8" fill="#dfe8ed"/><circle cx="41" cy="49" r="5" fill="#6e8fa4"/><circle cx="60" cy="49" r="5" fill="#6e8fa4"/><path d="M40 61h21M50 29V18M44 18h12" stroke="#67798a" strokeWidth="4"/><path d="M23 47H14M77 47h9M37 74v9M63 74v9" stroke="#8e9fae" strokeWidth="6"/></>;
    case "bulb": return <><path d="M33 54c-16-22 1-40 17-40s33 18 17 40c-6 9-6 13-6 17H39c0-4 0-8-6-17Z" fill="#efca67"/><path d="M40 76h20M43 84h14" stroke="#7d7664" strokeWidth="5"/><path d="M41 30c4-6 11-8 18-5" fill="none" stroke="#fff0a8" strokeWidth="5"/></>;
    case "keyboard": return <><rect x="14" y="29" width="72" height="45" rx="9" fill="#73839c"/><g fill="#dce4ee"><rect x="23" y="39" width="8" height="7" rx="2"/><rect x="37" y="39" width="8" height="7" rx="2"/><rect x="51" y="39" width="8" height="7" rx="2"/><rect x="65" y="39" width="8" height="7" rx="2"/><rect x="23" y="51" width="8" height="7" rx="2"/><rect x="37" y="51" width="8" height="7" rx="2"/><rect x="51" y="51" width="8" height="7" rx="2"/><rect x="65" y="51" width="8" height="7" rx="2"/><rect x="30" y="63" width="40" height="6" rx="2"/></g><path d="M22 34h53" stroke="#aebbd0" strokeWidth="2"/></>;
    case "git-branch": return <><circle cx="31" cy="26" r="9" fill="#dd8d84"/><circle cx="31" cy="74" r="9" fill="#89a881"/><circle cx="70" cy="38" r="9" fill="#86a9c5"/><path d="M31 35v30M40 52h8c13 0 22-6 22-14" fill="none" stroke="#65758b" strokeWidth="7" strokeLinecap="round"/><circle cx="31" cy="26" r="3" fill="#fff"/><circle cx="31" cy="74" r="3" fill="#fff"/><circle cx="70" cy="38" r="3" fill="#fff"/></>;
    case "server": return <><rect x="21" y="18" width="58" height="27" rx="6" fill="#7388a2"/><rect x="21" y="49" width="58" height="27" rx="6" fill="#657a95"/><circle cx="31" cy="31" r="4" fill="#9fce9e"/><circle cx="31" cy="62" r="4" fill="#f0c777"/><path d="M43 31h27M43 62h27" stroke="#d7e0ea" strokeWidth="4"/><path d="M50 76v9" stroke="#586c82" strokeWidth="5"/></>;
    case "mobile-app": return <><rect x="30" y="12" width="40" height="76" rx="10" fill="#61728d"/><rect x="34" y="21" width="32" height="57" rx="4" fill="#e7edf4"/><rect x="40" y="33" width="20" height="20" rx="5" fill="#9ebca6"/><path d="M43 62h14M46 69h8" stroke="#8a9bb0" strokeWidth="4" strokeLinecap="round"/><circle cx="50" cy="83" r="2" fill="#d9e2eb"/></>;
    default: return null;
  }
}

const themeInk: Record<ThemeId, string> = {
  cats: "#9b665e", desserts: "#a86670", nature: "#668269", coding: "#667697",
};

export function MemoryIcon({ theme, iconKey, label, accent, soft = "#f7efe3", decorative = false }: Props) {
  const uid = useId().replaceAll(":", "");
  const ink = accent ?? themeInk[theme];
  const style = { "--art-ink": ink, "--art-soft": soft } as CSSProperties;
  return (
    <svg viewBox="0 0 100 100" role={decorative ? undefined : "img"} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : label} data-theme={theme} style={style}>
      <defs>
        <linearGradient id={`${uid}-wash`} x1="18" y1="12" x2="80" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffdf7" />
          <stop offset="1" stopColor="var(--art-soft)" />
        </linearGradient>
        <radialGradient id={`${uid}-glaze`} cx="0" cy="0" r="1" gradientTransform="translate(34 28) rotate(47) scale(48 42)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity=".58" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".08" />
          <stop offset="1" stopColor="var(--art-ink)" stopOpacity=".08" />
        </radialGradient>
        <filter id={`${uid}-shadow`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="var(--art-ink)" floodOpacity=".18" />
        </filter>
      </defs>
      <ellipse cx="50" cy="82" rx="28" ry="6" fill="var(--art-ink)" opacity=".1" />
      <circle cx="50" cy="48" r="38" fill={`url(#${uid}-wash)`} />
      <circle cx="31" cy="28" r="5" fill="#fff" opacity=".7" />
      <path d="M75 22c1.5 4 4 6.5 8 8-4 1.5-6.5 4-8 8-1.5-4-4-6.5-8-8 4-1.5 6.5-4 8-8Z" fill="var(--art-ink)" opacity=".22" />
      <g filter={`url(#${uid}-shadow)`} transform="translate(0 -1)">
        <g>{filledArt(iconKey)}</g>
        <g fill="var(--art-ink)" stroke="var(--art-ink)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity=".12">{shape(iconKey)}</g>
        <g fill="none" stroke="#fffdf8" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" opacity=".45">{shape(iconKey)}</g>
        <g fill="none" stroke="var(--art-ink)" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" opacity=".72">{shape(iconKey)}</g>
        <circle cx="50" cy="48" r="36" fill={`url(#${uid}-glaze)`} opacity=".2" pointerEvents="none" />
      </g>
    </svg>
  );
}
