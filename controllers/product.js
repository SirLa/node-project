import products from "./products";

exports.getProducts = function(req, res){
    if(products.length){
        res.json(products);
    } else{
        res
            .status(404)
            .json({message: "There are no products"});
    }
};

exports.getProductById = function(req, res){
    let {id} = req.params,
        product = products.filter(product => product.id === +id);
    if(product.length){
        res.json(product);
    } else{
        res
            .status(404)
            .json({message: "There aren't such product"});
    }
};

exports.getProductsReviews = function(req, res){
    let {id} = req.params,
        product = products.filter(product => product.id === +id);
    if(product.length){
        res.json(product[0].reviews);
    } else{
        res
            .status(404)
            .json({message: "There aren't such product"});
    }
};

exports.createNewProduct = function(req, res){
    let {name, reviews} = req.body;
    let newProduct = {
        id: products.length + 1,
        name: name,
        reviews: reviews
    };
   // products.push(newProduct);
    res.json(newProduct);

};