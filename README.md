# HTML to PDF testing with PDFNet

This repo demonstrates a blank PDF issue I'm experiencing when converting an HTML string to PDF using PDFNet's HTML2PDF module.

About 1 in 10 runs of this script generates the PDF as expected. I think there's a timeout occuring because of the complexity of the HTML and the number of network requests we have to load images, scripts & stylesheets.

## Installation

1. Install NPM Dependencies

```shell
$ npm install
```

2. [Download the HTML2PDF Module](https://www.pdftron.com/documentation/linux/info/modules/#html2pdf-module) and save the file to a new `vendor` directory in this repo

3. Unpack the Html2Pdf module into the pdfnet-node directory

```shell
$ tar -zxf vendor/HTML2PDFLinux.tar.gz --directory node_modules/@pdftron/pdfnet-node/lib
```

## Running

Run the npm script with your license key to generate a PDF from sample HTML

```shell
$ PDFNET_KEY=YOUR_LICENSE_KEY_HERE npm run get-pdf
```
