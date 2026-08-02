interface getCleanedChunkAnchorProps {
  arrayOfStrings: (string | null | undefined)[];
}

export default function getCleanedChunkAnchor({
  arrayOfStrings,
}: getCleanedChunkAnchorProps) {
  const chunkAnchor = arrayOfStrings.filter(Boolean).join("-");

  if (!chunkAnchor || typeof chunkAnchor !== "string") return "";

  return (
    chunkAnchor
      .trim()
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      // Diakritische Zeichen entfernen (z.B. é -> e, ñ -> n)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // Alles entfernen, was KEIN Buchstabe, KEINE Zahl und KEIN Leerzeichen/Bindestrich ist
      .replace(/[^a-z0-9\s-]/g, "")
      // Whitespaces (Leerzeichen, Tabs, Newlines) durch ein Minus ersetzen
      .replace(/[\s_]+/g, "-")
      // Mehrfache aufeinanderfolgende Minuszeichen kollabieren
      .replace(/-+/g, "-")
      // Führende oder abschließende Minuszeichen entfernen
      .replace(/^-+|-+$/g, "")
  );
}
