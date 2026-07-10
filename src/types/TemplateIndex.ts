export type TemplateMeta = {
  id: string;
  name: string;
  folder: string;
  background: string;
  adminBackground?: string;
  preview?: string;
};

export type TemplateCategory = {
  id: string;
  name: string;
  templates: TemplateMeta[];
  adminBackground?: string;
};

export type TemplateIndex = {
  categories: TemplateCategory[];
};