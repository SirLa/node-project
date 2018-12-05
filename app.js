import config from "./config/config.json";
import { User, Product } from "./models/index";

new User();
new Product();
console.log(config.name);