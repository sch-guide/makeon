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
        <filter id={`${uid}-shadow`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="var(--art-ink)" floodOpacity=".18" />
        </filter>
      </defs>
      <ellipse cx="50" cy="82" rx="28" ry="6" fill="var(--art-ink)" opacity=".1" />
      <circle cx="50" cy="48" r="38" fill={`url(#${uid}-wash)`} />
      <circle cx="31" cy="28" r="5" fill="#fff" opacity=".7" />
      <path d="M75 22c1.5 4 4 6.5 8 8-4 1.5-6.5 4-8 8-1.5-4-4-6.5-8-8 4-1.5 6.5-4 8-8Z" fill="var(--art-ink)" opacity=".22" />
      <g filter={`url(#${uid}-shadow)`} transform="translate(0 -1)">
        <g fill="var(--art-ink)" stroke="var(--art-ink)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity=".12">{shape(iconKey)}</g>
        <g fill="none" stroke="#fffdf8" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" opacity=".9">{shape(iconKey)}</g>
        <g fill="none" stroke="var(--art-ink)" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">{shape(iconKey)}</g>
      </g>
    </svg>
  );
}
