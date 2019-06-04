let swag = require('../models/swag');

const read = (req,res,next) => {
    res.status(200).json(swag)
}

module.exports = {
    read
}