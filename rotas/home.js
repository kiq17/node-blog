const express = require('express')
const rotas = express.Router();
const Artigo = require('../models/artigos')

rotas.get('/', async (req, res) => {
    const artigos = await Artigo.find().sort({criadoEm: -1})

    let numero = await Artigo.count()
    
    res.render('template', { artigos: artigos, numero: numero })
})

module.exports = rotas