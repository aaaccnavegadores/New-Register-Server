import dotenv from 'dotenv'
dotenv.config()

import { fileURLToPath } from 'url'
import path from 'path'
import { registerModels, connect } from './config/mongooseConnection.js'
import app from './app/app.js'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

await connect()

await registerModels(path.join(__dirname, 'database', 'models'))



const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))