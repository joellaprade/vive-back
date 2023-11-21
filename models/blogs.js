const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    titulo: String,
    prevista: String,
    cuerpo: String
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;