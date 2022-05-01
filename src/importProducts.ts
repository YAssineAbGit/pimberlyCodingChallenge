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
let importedProductsMap = new Map<string, product>();
let generatedProductsMap = new Map<string, product>();

let skipFirstLine = true;
let createdCount = 0;
let unchangedCount = 0;
let skippedCount = 0;
let sku, colour, size;

async function processLineByLine() {
    const csvFilePath = path.resolve(__dirname, '../products.csv');
    const fileStream = fs.createReadStream(csvFilePath);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    // Read from products.json:
    const jsonFilePath = path.resolve(__dirname, '../products.json');

    if (fs.existsSync(jsonFilePath)) {
        let output = fs.readFileSync(jsonFilePath, 'utf-8')
        if (output.length > 0) {
            products = JSON.parse(output);
        }
    }

    if (products.length) {
        importedProductsMap = new Map(products.map(object => {
            return [object.sku, object]
        }));
    }

    // Populate gerenratedProductsMap:
    for await (const line of rl) {
        let array = line.split(",");
        [sku, colour, size] = array;

        if (skipFirstLine) {
            skipFirstLine = false;
            continue;
        } else if (!!!(sku && colour && size) || generatedProductsMap.has(sku)) {
            skippedCount++;
            if (generatedProductsMap.has(sku)) {
                generatedProductsMap.delete(sku);
                skippedCount++;
            }
        } else {
            product = {
                sku: sku,
                colour: colour,
                size: size,
            };

            generatedProductsMap.set(sku, product);
        }
    }

    // If the products.json doesn't exist or has no data then we copy the generated map.
    if ((!importedProductsMap)) {
        for (const [sku, product] of generatedProductsMap) {
                products.push(product);
                createdCount++;
          }
    } else {
        for (const [sku, product] of generatedProductsMap) {
            if (!importedProductsMap.has(sku)) {
                products.push(product);
                createdCount++;
            } else {
                unchangedCount++;
            }
          }
    }

    // Create a products.json file:
    let jsonData = JSON.stringify(products);

    fs.writeFile(jsonFilePath, jsonData, function(err) {
        if (err) {
            process.stdout.write(`${err}`);
        }
    });

    // Logging:
    process.stdout.write(`Number of products created: ${createdCount}\n`);
    process.stdout.write(`Number of products unchanged: ${unchangedCount}\n`);
    process.stdout.write(`Number of rows skipped: ${skippedCount}\n`);
}

processLineByLine();

module.exports = processLineByLine;