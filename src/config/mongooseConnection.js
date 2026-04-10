import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import { pathToFileURL } from 'url'

mongoose.set('strictPopulate', false)

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB is connected!')
})
  
mongoose.connection.on('reconnecting', () => {
  console.log('🔄 Trying, MongoDB is reconnecting...')
})

mongoose.connection.on('connecting', () => {
  console.log('⏳ MongoDB is connecting...')
})

mongoose.connection.on('error', (err) => {
  console.log('❌ Error, unable to connect to MongoDB!')
  
  console.error(err)
})

mongoose.connection.on('reconnected', () => {
  console.log('👍 MongoDB is reconnected!')
})

export async function connect () {
  try {
    const { MONGO_URI } = process.env
    
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch {}
}

export async function registerModels (modelsPath) {
  const files = fs.readdirSync(modelsPath).filter(file => file.endsWith('.js'))

  await Promise.all(
    files.map(async file => {
      const fullPath = path.join(modelsPath, file)
      await import(pathToFileURL(fullPath))
    })
  )

  console.log('✅ Models registered successfuly')
}
