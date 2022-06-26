const mongoose = require('mongoose')
const slugify = require('slugify')
const marked = require('marked')
const CriarDomPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = CriarDomPurify(new JSDOM().window)


const artigoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    criadoEm: {
        type: Date,
        default: Date()
    },
    click: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    limparHtml:{
        type:String,
        required: true
    }
})

artigoSchema.pre('validate', function (next) {
    if (this.titulo) {
        this.slug = slugify(this.titulo, { lower: true, strict: true })
    }

    if(this.markdown){
        this.limparHtml = dompurify.sanitize(marked.parse(this.markdown))
    }

    next()
})

module.exports = mongoose.model('artigos', artigoSchema)