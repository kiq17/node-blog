const express = require('express')
const rotas = express.Router()
const Artigo = require('../models/artigos')

rotas.get('/novo', (req, res) => {
    res.render('novo', { artigo: new Artigo() })
})

rotas.get('/:slug', async (req, res) => {
    let id = req.params.slug
    const artigo = await Artigo.findOneAndUpdate({slug: id}, {$inc: {click: 1}})
    if (artigo == null) res.redirect('/')
    res.render('mostrar', { artigo: artigo })
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

rotas.delete('/:id', async (req,res)=>{
    await Artigo.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = rotas