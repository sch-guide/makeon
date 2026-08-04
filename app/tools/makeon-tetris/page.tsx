import { permanentRedirect } from "next/navigation";

export default function LegacyBlockPuzzlePage() {
  permanentRedirect("/tools/pastel-block-puzzle");
}
