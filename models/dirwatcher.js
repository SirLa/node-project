import fs from "fs";
import path from "path";
import util from "util";
import { emitter } from "../common/emitter"

export class DirWatcher {
    files = [];

    watch(dir, delay){
        setInterval(() => this.checkFiles(dir), delay);
    }
    checkFiles(dir){
        const files = this.getFiles(dir);
        if (!util.isDeepStrictEqual(files, this.files)) {
            this.files = files;
            emitter.emit('​dirwatcher:changed', files);
        }
    }
    getFiles(dir, fileList = []){
        const files = fs.readdirSync(dir).filter((item) => {
            const itemPath = path.join(dir, item);
            return fs.statSync(itemPath).isDirectory(itemPath) || (fs.statSync(itemPath).isFile(itemPath) && path.extname(item) === ".csv")
        });
        files.forEach((item) => {
            const itemPath = path.join(dir, item);
            if(fs.statSync(itemPath).isDirectory(itemPath)){
                this.getFiles(itemPath, fileList)
            } else {
                fileList.push({
                    name: item,
                    path: itemPath,
                    modifiedDate: fs.statSync(itemPath).mtime.getTime()
                });
            }
        });
        return fileList;
    }
}