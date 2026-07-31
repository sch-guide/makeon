import type { ReactNode } from "react";
import type { ThemeId } from "./memory-data";

type Props = { theme: ThemeId; iconKey: string; label: string };

function shape(key: string): ReactNode {
  switch (key) {
    case "cat-face": return <><path d="m25 42 5-22 14 11a27 27 0 0 1 12 0l14-11 5 22v9a25 25 0 0 1-50 0Z"/><circle cx="41" cy="48" r="2"/><circle cx="59" cy="48" r="2"/><path d="m46 57 4 3 4-3M50 60v4"/></>;
    case "paw": return <><path d="M32 61c3-12 12-20 18-20s15 8 18 20c3 12-9 15-18 8-9 7-21 4-18-8Z"/><circle cx="29" cy="39" r="7"/><circle cx="43" cy="29" r="7"/><circle cx="57" cy="29" r="7"/><circle cx="71" cy="39" r="7"/></>;
    case "fish": return <><path d="M25 51c12-18 32-21 47-3-15 18-35 16-47 3Z"/><path d="m25 51-13-12v24Zm47-3 13-8v20l-13-8"/><circle cx="62" cy="47" r="2"/></>;
    case "yarn": return <><circle cx="47" cy="50" r="25"/><path d="M28 37c13-2 26 4 38 18M25 51c14 8 29 7 44 1M36 27c12 14 17 29 13 47M68 68c8 0 13 4 15 10"/></>;
    case "cat-house": return <><path d="m18 43 32-25 32 25v34H18Z"/><path d="M38 77V59a12 12 0 0 1 24 0v18M70 34v-9"/></>;
    case "bell": return <><path d="M29 64h42c-7-8-8-15-8-25a13 13 0 0 0-26 0c0 10-1 17-8 25Z"/><path d="M44 70c2 8 10 8 12 0M45 22c0-7 10-7 10 0"/></>;
    case "treat": return <><rect x="24" y="28" width="52" height="47" rx="8"/><path d="M24 42h52M38 57h24M43 67h14M34 20h32"/></>;
    case "tail": return <path d="M28 69c-15-24 3-43 21-30 14 10-2 24 8 32 11 9 27-3 22-18"/>;
    case "mouse": return <><path d="M29 58c0-15 13-25 29-20 13 4 18 20 7 30-10 9-36 4-36-10Z"/><circle cx="38" cy="34" r="8"/><circle cx="61" cy="45" r="2"/><path d="M67 65c13 7 18-1 14-8"/></>;
    case "cushion": return <><path d="M23 35c5-10 15-10 27-5 12-5 22-5 27 5-5 11-5 19 0 30-5 10-15 10-27 5-12 5-22 5-27-5 5-11 5-19 0-30Z"/><path d="M50 30v40M26 50h48"/></>;
    case "feather": return <><path d="M23 77c14-22 28-43 54-55-2 26-17 45-42 47"/><path d="M23 77 62 38M35 58h17M48 43l3 11"/></>;
    case "milk": return <><path d="M27 40h46l-5 34H32Z"/><ellipse cx="50" cy="40" rx="23" ry="8"/><path d="M36 40c5 6 23 6 28 0"/></>;

    case "cake": return <><path d="M23 44h54v31H23Z"/><path d="M23 55c8 7 12-5 20 1 8 6 12-6 20 0 6 4 9 0 14-3M30 44c3-12 37-12 40 0"/><path d="M50 32V20M44 20h12"/></>;
    case "donut": return <><circle cx="50" cy="50" r="29"/><circle cx="50" cy="50" r="10"/><path d="M25 42c8-4 12 5 20 0 8-5 13 5 20 0 5-3 9 0 12 2"/></>;
    case "macaron": return <><path d="M23 46c2-15 52-15 54 0M23 59c2 15 52 15 54 0M23 46h54v13H23Z"/><path d="M28 52h44"/></>;
    case "pudding": return <><path d="m30 35 5 35h30l5-35Z"/><ellipse cx="50" cy="35" rx="20" ry="7"/><path d="M35 28c6-7 24-7 30 0"/></>;
    case "cookie": return <><circle cx="50" cy="50" r="28"/><circle cx="40" cy="39" r="3"/><circle cx="59" cy="36" r="3"/><circle cx="62" cy="57" r="3"/><circle cx="42" cy="63" r="3"/></>;
    case "strawberry-milk": return <><path d="M32 30h36l5 48H27Z"/><path d="M36 30V20h28v10M34 47h32"/><path d="M44 60c0-8 12-8 12 0-2 7-10 10-12 0Z"/></>;
    case "icecream": return <><path d="m36 47 14 33 14-33Z"/><circle cx="41" cy="39" r="13"/><circle cx="58" cy="39" r="13"/><circle cx="50" cy="27" r="13"/></>;
    case "cupcake": return <><path d="m31 47 5 30h28l5-30Z"/><path d="M31 47c0-10 8-13 14-10 1-12 20-10 18 2 7-1 11 2 11 8Z"/></>;
    case "croissant": return <path d="M20 59c5-27 17-37 30-19 13-18 25-8 30 19-11 17-22 14-30 3-8 11-19 14-30-3Zm18-20c-2 10-1 18 12 23 13-5 14-13 12-23"/>;
    case "candy": return <><path d="m26 40-12-8 3 15-3 15 12-8M74 40l12-8-3 15 3 15-12-8"/><rect x="25" y="35" width="50" height="24" rx="12"/></>;
    case "pie": return <><path d="M22 42h56L68 73H32Z"/><path d="m31 42 13-13h22l12 13M37 34l28 8M61 33 39 42"/></>;
    case "tea": return <><path d="M25 35h45v32c-7 10-31 10-38 0Z"/><path d="M70 43h6c13 0 11 20-4 19M38 25c-5-5 5-8 0-13M53 25c-5-5 5-8 0-13"/></>;

    case "cloud": return <path d="M25 68c-18-3-16-27 1-28 4-18 28-22 38-8 18-3 26 24 9 33-10 5-37 3-48 3Z"/>;
    case "sun": return <><circle cx="50" cy="50" r="18"/><path d="M50 15v11M50 74v11M15 50h11M74 50h11M25 25l8 8M67 67l8 8M75 25l-8 8M33 67l-8 8"/></>;
    case "moon": return <path d="M68 71c-27 10-49-18-34-42 7-11 18-16 29-14-18 15-11 44 10 49-1 3-3 5-5 7Z"/>;
    case "star": return <path d="m50 16 9 22 24 2-18 16 6 24-21-13-21 13 6-24-18-16 24-2Z"/>;
    case "flower": return <><circle cx="50" cy="50" r="8"/><circle cx="50" cy="31" r="12"/><circle cx="68" cy="44" r="12"/><circle cx="61" cy="64" r="12"/><circle cx="39" cy="64" r="12"/><circle cx="32" cy="44" r="12"/></>;
    case "leaf": return <><path d="M24 70c2-31 20-48 53-45-2 31-19 48-53 45Z"/><path d="M24 75c14-19 29-31 46-43M42 56l-2-14M54 45l14 2"/></>;
    case "rainbow": return <><path d="M19 67a31 31 0 0 1 62 0M30 67a20 20 0 0 1 40 0M41 67a9 9 0 0 1 18 0"/><path d="M14 68h72"/></>;
    case "snowflake": return <path d="M50 15v70M20 32l60 36M20 68l60-36M50 15l-7 10M50 15l7 10M50 85l-7-10M50 85l7-10M20 32l12 1M20 32l5 11M80 68l-12-1M80 68l-5-11"/>;
    case "mountain": return <><path d="m14 75 26-43 10 16 9-13 27 40Z"/><path d="m32 45 8 7 7-7M53 45l6 5 6-6"/></>;
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
    case "chip": return <><rect x="27" y="27" width="46" height="46" rx="8"/><rect x="38" y="38" width="24" height="24" rx="4"/><path d="M37 16v11M50 16v11M63 16v11M37 73v11M50 73v11M63 73v11M16 37h11M16 50h11M16 63h11M73 37h11M73 50h11M73 63h11"/></>;
    case "brackets": return <path d="M37 24H25v52h12M63 24h12v52H63M55 31 44 69"/>;
    case "cursor": return <path d="m25 18 45 40-22 2-12 20Zm24 42 12 20"/>;
    case "gear": return <><circle cx="50" cy="50" r="12"/><path d="M44 18h12l3 11 10 6 11-3 6 11-8 8v11l8 8-6 11-11-3-10 6-3 11H44l-3-11-10-6-11 3-6-11 8-8V51l-8-8 6-11 11 3 10-6Z"/></>;
    default: return <path d="m50 18 9 22 24 2-18 16 6 24-21-13-21 13 6-24-18-16 24-2Z"/>;
  }
}

export function MemoryIcon({ theme, iconKey, label }: Props) {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={label} data-theme={theme}>
      <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        {shape(iconKey)}
      </g>
    </svg>
  );
}
