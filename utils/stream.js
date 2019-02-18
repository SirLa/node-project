const program = require('commander');
const action = require('./actions');
const fs = require("fs");
const path = require("path");
const csv = require('csvtojson');
const concat = require("concat");

program
    .version('0.0.1', '-v, --version')
    .option('-a, --action <action>', 'An action')
    .option('-f, --file <filePath>', 'File path')
    .option('-p, --path <filePath>', 'CSS File path')
    .parse(process.argv);

if (typeof program.action === 'function') {
    process.stdout.write('WARNING: You should write down at least one option!\n');
    program.help();
} else {
    action(program);
}