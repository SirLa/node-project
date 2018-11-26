import config from "./Config/config.json";
import {modules} from "./Models/index";

new modules.User();
new modules.Product();
console.log(config.name);