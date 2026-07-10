export interface ToolFaq {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface FormatRow {
  format: string;
  useCase: string;
  size: string;
  quality: string;
}

export interface BestSettingsRow {
  label: string;
  recommendation: string;
  why: string;
}

export interface CompatibilityNote {
  title: string;
  body: string;
}

export interface EditorialSection {
  title: string;
  body: string;
  points?: string[];
}

export interface ToolSeoData {
  toolId: string;
  h1: string;
  metaTitle?: string;
  metaDescription: string;
  keywords?: string[];
  howToTitle: string;
  howToSteps: HowToStep[];
  settingsGuide: string;
  formatTable?: FormatRow[];
  bestSettings?: BestSettingsRow[];
  compatibilityNotes?: CompatibilityNote[];
  limitations?: string[];
  privacyNote?: string;
  editorialSections?: EditorialSection[];
  faqs: ToolFaq[];
}
