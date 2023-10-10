import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'

//utilizar variables de entorno
dotenv.config();


//conectar base de datos
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB')
}).catch((err) => {
  console.log(err)
});


const app = express();

//poder leer formato json
app.use(express.json());


//port de la aplicacion
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`)
});


//rutas de la API
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error'

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})