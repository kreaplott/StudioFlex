import type { TemplateField } from "../types/Template.ts";

export function getAutoFontSize(field: TemplateField, text: string): number {
  if (!field.autoResize) {
    return field.fontSize;
  }

  const content = text || field.defaultValue || "";
  const lines = field.multiline ? content.split("\n") : [content];

  let fontSize = field.fontSize;

  while (fontSize > 10) {
    const longestLine = Math.max(...lines.map((line) => line.length), 1);

    const estimatedWidth = longestLine * fontSize * 0.55;
    const estimatedHeight = lines.length * fontSize * 1.2;

    if (estimatedWidth <= field.width && estimatedHeight <= field.height) {
      return fontSize;
    }

    fontSize -= 1;
  }

  return 10;
}