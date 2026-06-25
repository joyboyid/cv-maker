import { pxToMm } from "@/lib/resume-layout";

export class PdfExportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PdfExportError";
  }
}

export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  if (typeof window === "undefined") {
    throw new PdfExportError("Export PDF hanya tersedia di browser.");
  }

  const widthPx = element.offsetWidth;
  const heightPx = element.offsetHeight;

  if (!widthPx || !heightPx) {
    throw new PdfExportError("Preview belum siap. Tunggu sebentar lalu coba lagi.");
  }

  const widthMm = pxToMm(widthPx);
  const heightMm = pxToMm(heightPx);

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.position = "fixed";
  clone.style.left = "-10000px";
  clone.style.top = "0";
  clone.style.zIndex = "-1";
  clone.style.transform = "none";
  clone.style.width = `${widthPx}px`;
  clone.style.height = `${heightPx}px`;
  clone.style.background = "#ffffff";
  document.body.appendChild(clone);

  let canvas: HTMLCanvasElement | null = null;

  try {
    canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: widthPx,
      height: heightPx,
      windowWidth: widthPx,
      windowHeight: heightPx,
    });
  } catch (error) {
    console.error("PDF export failed:", error);
    throw new PdfExportError(
      "Gagal merender preview. Coba refresh halaman lalu unduh lagi.",
    );
  } finally {
    if (clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }
  }

  if (!canvas || !canvas.width || !canvas.height) {
    throw new PdfExportError("Hasil render kosong. Pastikan preview terisi.");
  }

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [widthMm, heightMm],
  });

  pdf.addImage(imgData, "PNG", 0, 0, widthMm, heightMm);
  pdf.save(filename);
}