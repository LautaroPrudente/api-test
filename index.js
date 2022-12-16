const express = require('express')
const mysql = require('mysql2')
const myconn = require('express-myconnection')
const cors = require("cors")

const routes = require('./rutas')

let app = express()

app.set('port', process.env.PORT || 3000)
const dbOptions = {
    host: 'localhost',
    port: 5000,
    user: 'root',
    password: 'lol123',
    database: 'formapi'
}

app.use(cors({
    origin:'*'
}));

app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())


app.get('/', (req, res)=>{
    res.send('API Mapache')
})


app.use('/api', routes)


app.listen(app.get('port'), ()=>{
    console.log('SERVIDOR OK EN PUERTA', app.get('port'))
})