require('dotenv').config()
const express = require('express'),
    session = require('express-session'),
    checkSessions = require('./middlewares/checkForSessions'),
    swagController = require('./controllers/swagController'),
    authController = require('./controllers/authController'),
    cartController = require('./controllers/cartController'),
    searchController = require('./controllers/searchController')
    app = express(),
    { PORT_SERVER, SESSION_SECRET } = process.env

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkSessions.auth)

// Endpoints
// Swag
app.get('/api/swag', swagController.read)
// Auth
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)
// Cart
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.deleteOne)
// Search
app.get('/api/search', searchController.search)

app.listen(PORT_SERVER, () => {
    console.log(`${PORT_SERVER} is listening`)
})