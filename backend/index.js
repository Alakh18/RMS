// prisma setup
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// express
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// 🔍 CHECK PRISMA CONNECTION ON STARTUP
async function checkPrismaConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Prisma connected to database successfully')
  } catch (error) {
    console.error('❌ Prisma failed to connect:', error.message)
    process.exit(1)
  }
}

// simple test route
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ status: 'ok', db: 'connected' })
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'not connected' })
  }
})

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`)
  await checkPrismaConnection()
})

// graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
