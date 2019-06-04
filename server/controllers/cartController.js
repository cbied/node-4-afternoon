const swag = require('../models/swag');

const add = (req,res) => {
    let { id } = req.params,
        { user } = req.session

    const index = user.cart.findIndex(swag => swag.id == id)

    if (index === -1) {
        const selectedSwag = swag.find(swag => swag.id == id)

        user.cart.push(selectedSwag)
        user.total += selectedSwag.price
    }

    res.status(200).send(user)
}

const deleteOne = (req,res) => {
    let { id } = req.params,
        { user } = req.session

    const index = user.cart.findIndex(swag => swag.id == id)
    const selectedSwag = swag.find(swag => swag.id == id)

    if(index !== -1) {
        user.cart.splice(index,1)
        user.total -= selectedSwag.price
    }

    res.status(200).send(user)
}

const checkout = (req,res) => {
    const { user } = req.session

    user.cart = []
    user.total = 0

    res.status(200).send(user)
}



module.exports = {
    add,
    deleteOne,
    checkout
}