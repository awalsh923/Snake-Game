if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const leaderboardsRouter = require("./routes/leaderboards")

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/', leaderboardsRouter)

app.get('*', function(req, res) {
    res.render('error/error', {errorMessage:'Page Not Found'})
})

app.listen(process.env.PORT || 3000)