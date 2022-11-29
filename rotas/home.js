const express = require('express')
const rotas = express.Router();
const Artigo = require('../models/artigos')

rotas.get('/', async (req, res) => {
    try {
        const { q } = req.query

        let artigos;
        let numero;
        switch (q) {
            case "visu":
                artigos = await Artigo.find().sort({ click: "desc" })

                numero = await Artigo.count()

                res.render('template', { artigos: artigos, numero: numero })

                break;
            case "antg":
                artigos = await Artigo.find().sort({ criadoEm: "asc" })

                numero = await Artigo.count()

                res.render('template', { artigos: artigos, numero: numero })
                break;
            case "rencet":
                artigos = await Artigo.find().sort({ criadoEm: "desc" })

                numero = await Artigo.count()

                res.render('template', { artigos: artigos, numero: numero })
                break;

            default:
                artigos = await Artigo.find().sort({ criadoEm: -1 })

                numero = await Artigo.count()

                res.render('template', { artigos: artigos, numero: numero })

                break;
        }

    } catch (error) {
        res.redirect("/")
    }

})

module.exports = rotas