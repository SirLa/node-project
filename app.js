import config from "./config/config.json";
import {modules} from "./models/index";

new modules.User();
new modules.Product();
console.log(config.name);