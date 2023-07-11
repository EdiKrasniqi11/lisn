const express = require('express')
const app = express()
const PORT = 8080

app.use(express.json())

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        name: 'Edi',
        age: 20
    })
})

app.listen(
    PORT,
    console.log('Good night!')
    )