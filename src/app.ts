import express from 'express';
import router from './routes/userRoutes';
import auth from './routes/authRoutes';
import feedBack from './routes/feedbackRoutes';
import rateLimit from 'express-rate-limit';
import swaggerUi from "swagger-ui-express"
import swaggerDocument from '../swagger_output.json'

const app = express()
const port = 3000
const limitador = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message:
        'Muitas requisições vindas deste IP. Tente novamente mais tarde.',
    standardHeaders: true,
    legacyHeaders: false,
});


app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/api/feedbacks", feedBack)
app.use("/api", router)
app.use("/api", auth)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})