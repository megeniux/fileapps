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

export interface ToolSeoData {
  toolId: string;
  h1: string;
  metaDescription: string;
  howToTitle: string;
  howToSteps: HowToStep[];
  settingsGuide: string;
  formatTable?: FormatRow[];
  faqs: ToolFaq[];
}
