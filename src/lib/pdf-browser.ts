const PDFLIB_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

type PdfLibWindow = Window & {
  PDFLib?: unknown;
};

type PdfJsWindow = Window & {
  pdfjsLib?: unknown;
};

export async function loadPdfLib(): Promise<unknown> {
  const win = window as PdfLibWindow;
  if (win.PDFLib) {
    return win.PDFLib;
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PDFLIB_CDN;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load pdf-lib."));
    document.head.appendChild(script);
  });

  return win.PDFLib;
}

export async function loadPdfJs(): Promise<any> {
  const win = window as PdfJsWindow;
  if (win.pdfjsLib) {
    return win.pdfjsLib;
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PDFJS_CDN;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load pdf.js."));
    document.head.appendChild(script);
  });

  if (!win.pdfjsLib) {
    throw new Error("PDF.js did not initialize correctly.");
  }

  (win.pdfjsLib as { GlobalWorkerOptions: { workerSrc: string } }).GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  return win.pdfjsLib;
}
