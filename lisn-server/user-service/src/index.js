import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import user_roles_routes from './routes/user_roles.js'

const app = express();
const PORT = 5001

app.use(bodyParser.json())
app.use(cors({
    origin: "*",
}))

app.use('/user_roles', user_roles_routes)

app.get('/', (req, res) => {
    res.send('Welcome to the LISN User Service center')
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))