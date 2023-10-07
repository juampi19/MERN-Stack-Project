import dotenv from 'dotenv'
import express from 'express'


const app = express();

//poder leer formato json
app.use(express.json());

//utilizar variables de entorno
dotenv.config();


//port de la aplicacion
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`)
})