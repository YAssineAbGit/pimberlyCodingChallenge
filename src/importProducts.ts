import * as fs from "fs";
import * as readline from 'readline';
import * as path from "path";

interface product {
    sku: string;
    colour: string;
    size: string;
}

let product: product;
let products: product[] = [];
let productsMap = new Map<string, product>();

async function processLineByLine() {
    const csvFilePath = path.resolve(__dirname, '../products.csv');
    const fileStream = fs.createReadStream(csvFilePath);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let skipFirstLine = true;
    let createdCount = 0;
    let unchangedCount = 0;
    let skippedCount = 0;
    let sku, colour, size;

    for await (const line of rl) {
        let array = line.split(",");
        [sku, colour, size] = array;

        if (skipFirstLine) {
            skipFirstLine = false;
            continue;
        } else if (!!!(sku && colour && size) || productsMap.has(sku)) {
            skippedCount++;
            if (productsMap.has(sku)) {
                productsMap.delete(sku);
                skippedCount++;
            }
        } else {
            product = {
                sku: sku,
                colour: colour,
                size: size,
            };

            productsMap.set(sku, product);
            createdCount++;
        }
    }

    products = [...productsMap.values()];

    process.stdout.write(`Number of products created: ${createdCount}\n`);
    process.stdout.write(`Number of products unchanged: ${unchangedCount}\n`);
    process.stdout.write(`Number of rows skipped: ${skippedCount}\n`);

    let jsonData = JSON.stringify(products);

    // creating a json file:
    const jsonFilePath = path.resolve(__dirname, '../products.json');
    fs.writeFile(jsonFilePath, jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

processLineByLine();