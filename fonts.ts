import {
  PDFDocument,
  StandardFonts,
} from "https://cdn.skypack.dev/pdf-lib@^1.11.1?dts";

const getFonts = async (pdfDoc: PDFDocument) => {
  const fontBase = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  return { fontBase: fontBase, fontBold: fontBold, fontOblique: fontOblique };
};

export default getFonts;
