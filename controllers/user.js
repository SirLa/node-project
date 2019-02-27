import users from "./users";

exports.getUsers = function(req, res){
    if(users.length){
        res.json(users);
    } else{
        res
            .status(404)
            .json({message: "There are no users"});
    }
};