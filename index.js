const express = require('express')
const server = express();
require('dotenv').config();
const rotaPrincipal = require('./rotas/home')
const rotaArtigo = require('./rotas/artigo')
const mongoose = require('mongoose')
const methOverride = require('method-override')

mongoose.connect(process.env.DB_URL, (error) => {
    if (error) console.log(error)

    console.log('Banco conectado')
})

server.use(express.urlencoded({ extended: true }))
server.use(methOverride('_method'))
server.set('view engine', 'ejs')
server.use('/', rotaPrincipal)
server.use('/artigos', rotaArtigo)

server.listen(process.env.PORT, () => console.log('Servidor rodando'))