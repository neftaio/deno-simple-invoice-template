import { rgb } from "https://cdn.skypack.dev/pdf-lib@^1.11.1?dts";

export const primaryColor = rgb(0, 0, 0);

export const secondaryColor = rgb(25 / 255, 25 / 255, 112 / 255);

export const lightGrayColor = rgb(220 / 255, 220 / 255, 220 / 255);

export const grayColor = rgb(128 / 255, 128 / 255, 128 / 255);

export const blackColor = rgb(0 / 255, 0 / 255, 0 / 255);

export const whiteColor = rgb(255 / 255, 255 / 255, 255 / 255);

const colors = {
  primaryColor: primaryColor,
  secondaryColor: secondaryColor,
  lightGrayColor: lightGrayColor,
  grayColor: grayColor,
  blackColor: blackColor,
  whiteColor: whiteColor,
};

export default colors;
