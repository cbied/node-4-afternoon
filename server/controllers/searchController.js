const swag = require('../models/swag')

const search = (req,res) => {
    const { category } = req.query

    if(!category) {
        res.status(200).send(category)
    } else {
        const filteredSwag = swag.filter(swag => swag.category === category)
        res.status(200).send(filteredSwag)
    }
}


module.exports = {
    search
}