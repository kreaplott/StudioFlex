export type FieldType = "text" | "textarea";

export type TextAlign = "left" | "center" | "right";

export type VerticalAlign = "top" | "middle" | "bottom";

export interface TemplateField {
  id: string;
  label: string;
  type: FieldType;

  defaultValue: string;

  x: number;
  y: number;
  width: number;
  height: number;

  fontFamily: string;
  allowedFonts: string[];

  fontSize: number;
  minFontSize: number;
  maxFontSize: number;

  fontWeight: number;
  color: string;
  rotation: number;

  align: TextAlign;
  verticalAlign: VerticalAlign;

  multiline: boolean;
  maxCharacters: number;
  autoResize: boolean;

  editableText: boolean;
  editableFontFamily: boolean;
  editableFontSize: boolean;
  editableColor: boolean;
}

export interface TemplateConfig {
  templateId: string;
  name: string;
  background: string;
  version: string;

  canvas: {
    width: number;
    height: number;
  };

  fields: TemplateField[];
}