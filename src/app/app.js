import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL  } from 'url'
import { handleValidationError } from '../middleware/validatoinError.js'

const { FRONTEND_URL } = process.env

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.resolve(path.dirname(__filename), '..')

const app = express()
app.use(cors({ origin: FRONTEND_URL || '*'}))
app.use(express.json())

const httpDir = path.join(__dirname, 'http')

await Promise.all(
  fs.readdirSync(httpDir).map(async file => {
    const routePath = path.join(httpDir, file, `${file}Routes.js`)
    try {
      const module = await import(pathToFileURL(routePath))
      app.use(`/api/${file.toLowerCase()}`, module.default)
    } catch (error) {
      console.log(`❌ ${file} Route error:`, error)
    }
  })
)

app.get('/', (_, h) => h.send('Servidor OK'))

app.use(handleValidationError)

export default app
