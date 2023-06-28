require('dotenv').config({
  path: `.${ process.env.BASE_ENV }.env`
})

import express from 'express'

import render from './render'

const server = express()

server.use(express.static('dist'))
server.use((req, res) => {
  render(req, res)
})

const PORT = Number(process.env.PORT_WAP_PC)
server.listen(PORT, () => {
  console.log(`🚀 ssr started at http://localhost:${PORT}`)
})