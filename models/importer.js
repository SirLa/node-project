import {emitter} from "../common/emitter";
import csv from "convert-csv-to-json";
import {DirWatcher} from "./dirwatcher";

export class Importer{
    constructor() {
        this.dirwatcher = new DirWatcher();
        emitter.on('​dirwatcher:changed', this.importData.bind(this));
    }

    importSync(dir) {
        const files = this.dirwatcher.getFilesSync(dir);
        const output = this.getFilesContent(files);
        console.log(output);
        return output;
    }
    importData(files) {
        const data = this.getFilesContent(files);
        console.log(data);
        return new Promise(resolve => resolve(data));
    }

    getFilesContent(files) {
        const output = [];

        files.forEach(file => {
            const fileName = file.name;
            const data = csv.getJsonFromCsv(file.path);

            output.push({
                fileName,
                data
            });
        });
        return output;
    }
}