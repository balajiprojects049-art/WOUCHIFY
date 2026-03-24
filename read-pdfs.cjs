const fs = require('fs');
const pdf = require('pdf-parse');

async function readPdf(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        console.log(`\n\n------- CONTENT OF ${filePath} -------\n`);
        console.log(data.text);
    } catch (e) {
        console.error('Error reading PDF:', filePath, e);
    }
}

async function main() {
    await readPdf('Wouchify_Developement_Document.pdf');
    await readPdf('wouchify_website_content...pdf');
}

main();
