import express from 'express';
import router from './routes/userRoutes';
import auth from './routes/authRoutes';



const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/api", router)
app.use("/api/login", auth)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})