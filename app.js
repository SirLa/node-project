import config from "./Config/config.json";
import {User} from "./Models/User";
import {Product} from "./Models/Product";

let user = new User();
let product = new Product();
console.log(config.name);