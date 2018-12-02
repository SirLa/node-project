import User from "./user";
import Product from "./product";
export const modules = {
    User: User,
    Product: Product
};

// You need to use
// proposal-export-default-from plugin find here 
// export-default-from in https://babeljs.io/docs/en/plugins

// using this plugin you cane 

// export { default as User } from "./user";
// export { default as Product } from "./product";

// and import from index in app.js

// import { User, Product } from "./models/index";
