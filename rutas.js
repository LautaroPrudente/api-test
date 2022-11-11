const express = require('express')
const routes = express.Router()
const cors = require('cors');

routes.use(cors({
    origin:'*'
}));


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM contact', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res) => {
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO contact set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Added!')
        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM contact WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Deleted!')
        })
    })
})

module.exports = routes