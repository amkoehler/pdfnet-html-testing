import PDFNetNode from '@pdftron/pdfnet-node';
import * as fs from 'fs';

if (!process.env.PDFNET_KEY) {
  throw new Error(
    'License key for PDFNet not specified. This should be set as the PDFNET_KEY environment variable.',
  );
}

const { PDFNet } = PDFNetNode;
const FILE_PATH = './result.pdf';

const reportHtml = await fs.promises.readFile('./report.html', {
  encoding: 'utf-8',
});
const simpleHtml = `
  <html>
    <body>
      <h1>Heading</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
        mollit anim id est laborum.
      </p>
    </body>
  </html>
`;

const main = async () => {
  await PDFNet.HTML2PDF.setModulePath('node_modules/@pdftron/pdfnet-node/lib');
  if (await !PDFNet.HTML2PDF.isModuleAvailable()) {
    throw new Error('PDFTron SDK HTML2PDF module not available');
  }

  const doc = await PDFNet.PDFDoc.create();
  const converter = await PDFNet.HTML2PDF.create();

  /**
   * TODO: Using `reportHtml` here isn't working. It results in a blank PDF. It may
   * be because of the complexity but I'm not sure.
   *
   * Using `simpleHtml` works consistently.
   */
  await converter.insertFromHtmlString(reportHtml);

  if (await converter.convert(doc)) {
    console.info(
      `PDF created from HTML successfully. Saving to ${FILE_PATH} ...`,
    );
    await doc.save(FILE_PATH, PDFNet.SDFDoc.SaveOptions.e_linearized);
  } else {
    console.log(
      'Conversion failed. HTTP Code: ' + (await converter.getHttpErrorCode()),
    );
    console.log(await converter.getLog());
  }
};

await PDFNet.runWithCleanup(main, process.env.PDFNET_KEY);
await PDFNet.shutdown();

console.info(`Opening ${FILE_PATH} ... `);
await fs.promises.open(FILE_PATH, 'r');
console.info('✅ Done');
