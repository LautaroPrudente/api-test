const express = require('express')
const routes = express.Router()
const mysql = require('mysql2')
const cors = require('cors');

routes.use(cors({
    origin:'*'
}));

//GET
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM contact', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

//SEARCH
routes.post('/search', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        // console.log([req.body]);
        const { name } = req.body;
        
        conn.query(`SELECT email, subject, message FROM contact WHERE name='${name}'`, [], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


//POST
routes.post('/', (req, res) => {
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO contact set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Added!')
        })
    })
})


//DELETE
routes.delete('/delete', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        console.log([req.body]);
        conn.query('DELETE FROM contact WHERE ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Deleted!')
        })
    })
})

module.exports = routes