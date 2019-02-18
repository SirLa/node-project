const fs = require("fs");
const path = require("path");
const csv = require('csvtojson');
const concat = require("concat");

const actions = {
    reverse,
    transform,
    outputFile,
    convertFromFile,
    convertToFile,
    cssBundler
};

function reverse() {
    process.stdout.write('Write text to reverse\n');
    process.stdin.on('data', function (data) {
        process.stdout.write(`${data.reverse()}\n`);
        process.exit();
    });
}

function transform() {
    process.stdout.write('Write text to transform\n');
    process.stdin.on('data', function (data) {
        process.stdout.write(data.toString().toUpperCase());
        process.exit();
    });
}

function outputFile(program) {
    const { file } = program;

    checkFileIsProvided(file);
    const stream = fs.createReadStream(path.join(__dirname, `../${file}`), 'utf8');

    stream.on('error', handleStreamError);
    stream.on('data', chunk => process.stdout.write(`${chunk}\n`));
}

function convertFromFile(program) {
    const { file } = program;

    checkFileIsProvided(file);
    checkFileExtension(file, '.csv');

    const filePath = path.join(__dirname, `../${file}`);
    const readStream = fs.createReadStream(filePath, 'utf8');

    readStream.on('error', handleStreamError);
    readStream.on('data', chunk => {
        csv()
            .fromString(chunk)
            .subscribe(console.log);
    });
}

function convertToFile(program) {
    const { file } = program;

    checkFileIsProvided(file);
    checkFileExtension(file, '.csv');

    const filePath = path.join(__dirname, `../${file}`);
    const filename = path.basename(filePath, '.csv');
    const readStream = fs.createReadStream(filePath, 'utf8');
    const writeStream = fs.createWriteStream(path.join(__dirname, `../data/${filename}.json`));

    readStream
        .pipe(csv())
        .pipe(writeStream);
}

function cssBundler(program) {
    const dir = program.path;

    if (!dir) {
        process.stdout.write('ERR: You should write down a css file path!\n');
        process.exit();
    }
    const fullPath = path.join(__dirname, `../${dir}`);
    const cssFiles = getFilesList(fullPath);
    const writeStream = fs.createWriteStream(`${fullPath}/bundle.css`);
    concat([...cssFiles, `${__dirname}/../assets/extra.css`]).then(data => writeStream.write(data));
}

function handleStreamError(err) {
    if (err.code === 'ENOENT') {
        process.stdout.write('ERR: No such file or directory!\n');
    }
}

function checkFileIsProvided(file) {
    if (!file) {
        process.stdout.write('ERR: You should set file path (--file=${PATH})\n');
        process.exit();
    }
}

function checkFileExtension(file, extension) {
    if (path.extname(file) !== extension) {
        process.stdout.write(`ERR: To convert file you need to provide a ${extension.toUpperCase()} file!\n`);
        process.exit();
    }
}

function getFilesList(dir, filesList = []) {
    const files = fs
        .readdirSync(dir)
        .filter(item => {
            const itemPath = path.join(dir, item);

            return fs
                .statSync(itemPath)
                .isDirectory(itemPath) || (fs.statSync(itemPath).isFile(itemPath) && path.extname(item) === '.css');
        });

    files.forEach(file => {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory(filePath)) {
            filesList = getFilesList(filePath, filesList);
        } else {
            filesList.push(path.join(dir, file));
        }
    });

    return filesList;
}

module.exports = function action(program) {
    const args = process.argv.slice(2);
    const { action } = program;
    if (args.indexOf('-h') === 0 || args.indexOf('--help') === 0) return;
    if (args.indexOf('-h') > 0 || args.indexOf('--help') > 0) process.exit();

    if (actions.hasOwnProperty(action)) {
        actions[action](program);
    } else {
        process.stdout.write('ERR: Provided action is not supported!\n');
    }
};
