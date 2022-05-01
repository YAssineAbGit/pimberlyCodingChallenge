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

async function processLineByLine() {
    const csvFilePath = path.resolve(__dirname, '../products.csv');
    const fileStream = fs.createReadStream(csvFilePath);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let sku, colour, size;

    for await (const line of rl) {
        let array = line.split(",");
        [sku, colour, size] = array;

            product = {
                sku: sku,
                colour: colour,
                size: size,
            };
            
            products.push(product);
    }

    console.log(products);
}

processLineByLine();