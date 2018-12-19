import config from "./config/config.json";
import { User, Product, DirWatcher, Importer } from "./models/index";
import path from "path";

new User();
new Product();
console.log(config.name);
const dirWatcher = new DirWatcher();
const importer = new Importer();
const dir = path.join(__dirname, "data");
dirWatcher.watch(dir, 3000);