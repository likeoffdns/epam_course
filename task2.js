import fs from 'fs';
import helper from 'csvtojson';
import { pipeline } from 'stream/promises';

const readeableStream = fs.createReadStream('./csv/sample data.csv');
const writableStream = fs.createWriteStream('./csv/output.txt');
const transformStream = helper();

const converterRunner = async () => {
  try {
    pipeline(readeableStream, transformStream, writableStream);
  } catch (e) {
    process.stdout.write(e.message);
  }
};

converterRunner();
