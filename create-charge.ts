import { PDFDocument } from "https://cdn.skypack.dev/pdf-lib@^1.11.1?dts";

import { getInvoiceNumber } from "./helpers.ts";
import {
  printChargeItems,
  printDate,
  printInvoiceNumber,
  printSupplierData,
  printSupplierInformation,
  printSupplierSignature,
  printTaxes,
  printTotal,
} from "./parts.ts";

export const createDocumentAndPage = async () => {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage();

  return { pdfDoc, page };
};

const saveDocument = async (pdfDoc: PDFDocument) => {
  const pdfBytes = await pdfDoc.save();

  const invoice_number = getInvoiceNumber();

  await Deno.writeFile(`./output/invoice_${invoice_number}.pdf`, pdfBytes);
};

const main = async () => {
  const { pdfDoc, page } = await createDocumentAndPage();

  await printDate(pdfDoc, page);

  await printInvoiceNumber(pdfDoc, page);

  await printSupplierInformation(pdfDoc, page);

  await printChargeItems(pdfDoc, page);

  await printTaxes(pdfDoc, page);

  await printTotal(pdfDoc, page);

  await printSupplierData(pdfDoc, page);

  await printSupplierSignature(pdfDoc, page);

  await saveDocument(pdfDoc);

  console.log("PDF created!!!");
};

await main();
