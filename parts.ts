import {
  PDFDocument,
  PDFPage,
} from "https://cdn.skypack.dev/pdf-lib@^1.11.1?dts";
import colors from "./colors.ts";
import getFonts from "./fonts.ts";
import {
  getCurrentDate,
  getData,
  getInvoiceNumber,
  NumberToCharactes,
  splitText,
  totalFormatter,
} from "./helpers.ts";
import { ChargeItem, Options } from "./index.d.ts";

export const printDate = async (
  pdfDoc: PDFDocument,
  page: PDFPage,
  opts?: Options
) => {
  const current_date = getCurrentDate();

  const data = getData();

  const { width, height } = page.getSize();

  const font = await getFonts(pdfDoc);

  const fontSize = 14;

  page.drawText(` ${data.city} ${current_date}`, {
    x: width * 0.1 + (opts?.delta_x || 0),
    y: height - 5 * fontSize + (opts?.delta_y || 0),
    size: fontSize * 0.9,
    font: font.fontOblique,
  });
};

export const printInvoiceNumber = async (
  pdfDoc: PDFDocument,
  page: PDFPage,
  opts?: Options
) => {
  const invoice_number = getInvoiceNumber();

  const { width, height } = page.getSize();

  const font = await getFonts(pdfDoc);

  const fontSize = 14;

  const form = pdfDoc.getForm();

  page.drawText(`Cuentra de Cobro No.`, {
    x: width * 0.585 + (opts?.delta_x || 0),
    y: height - 5 * fontSize + (opts?.delta_y || 0),
    size: fontSize * 0.9,
    font: font.fontBase,
  });

  const invoiceNumberField = form.createTextField("invoiceNumber");

  invoiceNumberField.setText(` ${invoice_number} `);

  invoiceNumberField.addToPage(page, {
    x: width * 0.8 + (opts?.delta_x || 0),
    y: height - 5.3 * fontSize + (opts?.delta_y || 0),
    width: fontSize * 1.4,
    height: fontSize * 1.4,
    borderColor: colors.whiteColor,
    backgroundColor: colors.lightGrayColor,
    font: font.fontBold,
  });
};

export const printSupplierInformation = async (
  pdfDoc: PDFDocument,
  page: PDFPage,
  opts?: Options
) => {
  const data = getData();

  const { width, height } = page.getSize();

  const font = await getFonts(pdfDoc);

  const fontSize = 12;

  page.drawText(`${data.company}`, {
    x: width * 0.12 + (opts?.delta_x || 0),
    y: height * 0.75 + (opts?.delta_y || 0),
    size: fontSize,
    font: font.fontBase,
  });

  page.drawText(`NIT: ${data.company_id}`, {
    x: width * 0.12 + (opts?.delta_x || 0),
    y: height * 0.738 + (opts?.delta_y || 0),
    size: fontSize * 0.7,
    font: font.fontOblique,
  });

  page.drawText(`Debe a:`, {
    x: width * 0.12 + (opts?.delta_x || 0),
    y: height * 0.7 + (opts?.delta_y || 0),
    size: fontSize,
    font: font.fontBase,
  });

  const form = pdfDoc.getForm();

  const supplierName = form.createTextField("supplierName");

  supplierName.setText(` ${data.user_name} `);

  supplierName.addToPage(page, {
    x: width * 0.2 + (opts?.delta_x || 0),
    y: height * 0.7 + (opts?.delta_y || 0),
    height: fontSize * 1.4,
    width: fontSize * 10,
    font: font.fontBase,
    borderColor: colors.whiteColor,
    backgroundColor: colors.lightGrayColor,
  });

  const supplierId = form.createTextField("supplierId");

  supplierId.setText(` C.C. ${data.user_id} `);

  supplierId.addToPage(page, {
    x: width * 0.2 + (opts?.delta_x || 0),
    y: height * 0.686 + (opts?.delta_x || 0),
    height: fontSize * 1,
    width: fontSize * 10,
    borderColor: colors.whiteColor,
    backgroundColor: colors.lightGrayColor,
  });
};

export const printChargeItems = async (
  pdfDoc: PDFDocument,
  page: PDFPage,
  opts?: Options
) => {
  const data = getData();

  const { width, height } = page.getSize();

  const font = await getFonts(pdfDoc);

  const fontSize = 12;

  const x_aligment_concept = width * 0.12 + (opts?.delta_x || 0);

  const x_aligment_value = width * 0.65 + (opts?.delta_x || 0);

  page.drawText(`Concepto`, {
    x: x_aligment_concept,
    y: height * 0.65 + (opts?.delta_y || 0),
    size: fontSize * 0.8,
    font: font.fontBold,
  });

  page.drawText(`Valor`, {
    x: x_aligment_value,
    y: height * 0.65 + (opts?.delta_y || 0),
    size: fontSize * 0.8,
    font: font.fontBold,
  });

  page.moveUp(520);

  data.items.map((item) => {
    page.drawText(splitText(item.name, 50), {
      size: fontSize * 0.7,
      lineHeight: fontSize,
      x: x_aligment_concept,
    });

    const total = totalFormatter().format(item.total);

    page.drawText(`. . . . . . . . . . . . . . . . . . . . . .    ${total}`, {
      size: fontSize * 0.7,
      lineHeight: fontSize,
      x: x_aligment_concept + fontSize * 17,
    });

    page.moveDown(fontSize * 3);
  });

  page.moveDown(fontSize * 2.5);

  page.drawText(`Total`, {
    size: fontSize * 0.6,
    lineHeight: fontSize,
    x: x_aligment_concept,
    font: font.fontBold,
  });

  const totalValue = data.items.reduce(
    (accumulator: number, currentValue: ChargeItem) =>
      accumulator + currentValue.total,
    0
  );

  const total = totalFormatter().format(totalValue);

  page.drawText(`. . . . . . . . . . . . . . . . . . . . . .    ${total}`, {
    size: fontSize * 0.7,
    lineHeight: fontSize,
    x: x_aligment_concept + fontSize * 17,
  });
};

export const printTaxes = async (
  pdfDoc: PDFDocument,
  page: PDFPage,
  opts?: Options
) => {
  const data = getData();

  const { width, height } = page.getSize();

  const font = await getFonts(pdfDoc);

  const fontSize = 12;

  const x_aligment_concept = width * 0.12 + (opts?.delta_x || 0);

  const x_aligment_value = width * 0.65 + (opts?.delta_x || 0);

  page.drawText(`Impuesto`, {
    x: x_aligment_concept,
    y: height * 0.48 + (opts?.delta_y || 0),
    size: fontSize * 0.8,
    font: font.fontBold,
  });

  page.drawText(`Valor`, {
    x: x_aligment_value,
    y: height * 0.48 + (opts?.delta_y || 0),
    size: fontSize * 0.8,
    font: font.fontBold,
  });
  const totalValue = data.items.reduce(
    (accumulator: number, currentValue: ChargeItem) =>
      accumulator + currentValue.total,
    0
  );

  page.moveDown(fontSize * 6);

  let totalTaxesA = 0;

  let totalTaxesB = 0;

  if (data.percent_tax_a) {
    page.drawText(
      splitText(
        (data.name_tax_a || "") +
          " " +
          (data.percent_tax_a ? `(${data.percent_tax_a}%)` : ""),
        50
      ),
      {
        size: fontSize * 0.7,
        lineHeight: fontSize,
        x: x_aligment_concept,
      }
    );

    totalTaxesA = (totalValue * (data?.percent_tax_a || 0)) / 100;

    const totalA = totalFormatter().format(totalTaxesA);

    page.drawText(`. . . . . . . . . . . . . . . . . . . . . .    ${totalA}`, {
      size: fontSize * 0.7,
      lineHeight: fontSize,
      x: x_aligment_concept + fontSize * 17,
    });
  }

  page.moveDown(fontSize * 1.5);

  if (data.percent_tax_b) {
    page.drawText(
      splitText(
        (data.name_tax_b || "") +
          " " +
          (data.percent_tax_b ? `(${data.percent_tax_b}%)` : ""),
        50
      ),
      {
        size: fontSize * 0.7,
        lineHeight: fontSize,
        x: x_aligment_concept,
      }
    );

    totalTaxesB = (totalValue * (data?.percent_tax_b || 0)) / 100;

    const totalB = totalFormatter().format(totalTaxesB);

    page.drawText(`. . . . . . . . . . . . . . . . . . . . . .    ${totalB}`, {
      size: fontSize * 0.7,
      lineHeight: fontSize,
      x: x_aligment_concept + fontSize * 17,
    });
  }

  page.moveDown(fontSize * 2.5);
};

export const printTotal = async (
  pdfDoc: PDFDocument,
  page: PDFPage,
  opts?: Options
) => {
  const data = getData();

  const { width } = page.getSize();

  const font = await getFonts(pdfDoc);

  const fontSize = 12;

  const x_aligment_concept = width * 0.12 + (opts?.delta_x || 0);

  page.drawText(`Total a pagar`, {
    size: fontSize * 1.2,
    lineHeight: fontSize,
    x: x_aligment_concept,
    font: font.fontBold,
  });

  const totalValue = data.items.reduce(
    (accumulator: number, currentValue: ChargeItem) =>
      accumulator + currentValue.total,
    0
  );

  const totalTaxesA = (totalValue * (data?.percent_tax_a || 0)) / 100;

  const totalTaxesB = (totalValue * (data?.percent_tax_b || 0)) / 100;

  const totalWithTaxes = totalValue - totalTaxesA - totalTaxesB;

  const total = totalFormatter().format(totalWithTaxes);

  page.drawText(`. . . . . . . . . . . . . . . . . . . . . .    ${total}`, {
    size: fontSize * 0.7,
    font: font.fontBold,
    lineHeight: fontSize,
    x: x_aligment_concept + fontSize * 17,
  });

  page.moveDown(fontSize * 1.2);

  page.drawText("(" + NumberToCharactes(totalWithTaxes) + ")", {
    size: fontSize * 0.55,
    lineHeight: fontSize,
    x: x_aligment_concept,
    font: font.fontBold,
  });
};

export const printSupplierData = async (
  pdfDoc: PDFDocument,
  page: PDFPage,
  opts?: Options
) => {
  const data = getData();

  const { width, height } = page.getSize();

  const font = await getFonts(pdfDoc);

  const fontSize = 12;

  const supplierData = [
    { label: "Nombre", value: data.user_name },
    { label: "Cedula", value: data.user_id },
    { label: "Direccion", value: data.user_address },
    { label: "Telefono", value: data.user_phone },
    { label: "Ciudad", value: data.user_city },
  ];

  const form = pdfDoc.getForm();

  supplierData.map((data, index) => {
    page.drawText(`${data.label}: `, {
      x: width * 0.12 + (opts?.delta_x || 0),
      y: height * 0.2 - index * 20 + (opts?.delta_y || 0),
      size: fontSize * 0.8,
      font: font.fontBase,
    });

    const dataTextField = form.createTextField("dataTextField" + Math.random());

    dataTextField.setText(` ${data.value} `);

    dataTextField.addToPage(page, {
      x: width * 0.2 + (opts?.delta_x || 0),
      y: height * 0.197 - index * 20 + (opts?.delta_y || 0),
      width: fontSize * 12.0,
      height: fontSize * 1.0,
      borderColor: colors.whiteColor,
      backgroundColor: colors.lightGrayColor,
      font: font.fontBold,
    });
  });
};

export const printSupplierSignature = async (
  pdfDoc: PDFDocument,
  page: PDFPage,
  opts?: Options
) => {
  const { width, height } = page.getSize();

  const font = await getFonts(pdfDoc);

  const fontSize = 10;

  const signatureUrl = "./signature.png";

  const signatureImageBytes = await Deno.readFile(signatureUrl);

  const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

  const signatureDimension = signatureImage.scale(0.06);

  page.drawImage(signatureImage, {
    y: height * 0.08 + (opts?.delta_y || 0),
    x: width * 0.52 + (opts?.delta_x || 0),
    width: signatureDimension.width,
    height: signatureDimension.height,
  });

  page.drawLine({
    start: {
      y: height * 0.12,
      x: width * 0.47,
    },
    end: {
      y: height * 0.12,
      x: width * 0.8,
    },
    thickness: 0.4,
  });

  page.drawText(`Firma`, {
    y: height * 0.12 - fontSize,
    x: width * 0.6,
    size: fontSize,
    font: font.fontOblique,
  });
};
