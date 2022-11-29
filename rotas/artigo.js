const express = require('express')
const rotas = express.Router()
const Artigo = require('../models/artigos')

rotas.get('/novo', (req, res) => {
    res.render('novo', { artigo: new Artigo() })
})

rotas.get('/:slug', async (req, res) => {
    let id = req.params.slug
    const artigo = await Artigo.findOneAndUpdate({ slug: id }, { $inc: { click: 1 } })
    if (artigo == null) res.redirect('/')
    res.render('mostrar', { artigo: artigo })
})

rotas.get("/editar/:slug", async (req, res) => {
    try {
        let artigo = await Artigo.findOne({ slug: req.params.slug });
        res.render("editar", { artigo: artigo });
    } catch (error) {
        console.log(error)
    }
})

rotas.post('/', async (req, res) => {
    let artigo = new Artigo({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        markdown: req.body.markdown,
    })

    try {
        artigo = await artigo.save()
        res.redirect(`artigos/${artigo.slug}`)
    } catch (error) {
        res.render('novo', { artigo: artigo })
        console.log(error)
    }
})

rotas.delete('/:id', async (req, res) => {
    await Artigo.findByIdAndDelete(req.params.id)
    res.redirect('/')
});

rotas.put("/editar/:slug", async (req, res) => {
    try {
        await Artigo.findOneAndUpdate({
            slug: req.params.slug
        }, {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            markdown: req.body.markdown,
        })
        res.redirect(`/artigos/${req.params.slug}`)
    } catch (error) {
        res.redirect(`/artigos/${req.params.slug}`)
        console.log(error)
    }
})

module.exports = rotas