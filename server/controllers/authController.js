const users = require('../models/users');
let id = 1;

const login = (req,res) => {
    const { session } = req,
        { username, password } = req.body;

    const user = users.find(
        user => user.username === username && user.password === password
    )

    if(user) {
        session.user.username = user.username;
        res.status(200).send(session.user)
    } else {
        res.status(500).send('DENIED')
    }
}

const register = (req,res) => {
    const { session } = req,
    { username, password } = req.body;

    users.push({ id, username, password })
    id++

    session.user.username = username

    res.status(200).send(session.user)
}

const signout = (req,res) => {
    req.session.destroy()
    res.sendStatus(200)
}

const getUser = (req,res,next) => {
    const { session } = req;
    res.status(200).send(session.user);
}

module.exports = {
    login,
    register,
    signout,
    getUser
}