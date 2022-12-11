# SIMPLE INVOICE TEMPLATE

This is an example code to generate a PDF using [pdf-lib](https://pdf-lib.js.org/) library with Deno.

In a use case of my life, I needed to create an "automatic" way to generate a bill for each month, then I will be created this small code using Deno because it seems funny.

## Create the Pdf

You need to have installed DENO, and simply execute the make build command:

```
make build
```

This command executes the main code with read and write permissions and generates the pdf in the output directory.

## The Code

Although the code and structure of the pdf are just a draft, I decided to split it into different files:

- `colos.ts`: Define RGB colors used in the pdf.
- `fonts.ts`: Define font selected from the offered by pdf-lib.
- `helpers.ts`: Some utilities like a function to calculate the invoice number.
- `index.d.ts`: Basic types definitions.
- `parts.ts`: Code split into functions responsible of print each part of pdf.
- `create-charge.ts`: Main script to create, print sections, and save the final pdf.

:)
