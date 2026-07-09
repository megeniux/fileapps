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

export interface ToolSeoData {
  toolId: string;
  h1: string;
  metaDescription: string;
  howToTitle: string;
  howToSteps: HowToStep[];
  settingsGuide: string;
  formatTable?: FormatRow[];
  bestSettings?: BestSettingsRow[];
  compatibilityNotes?: CompatibilityNote[];
  limitations?: string[];
  privacyNote?: string;
  faqs: ToolFaq[];
}
