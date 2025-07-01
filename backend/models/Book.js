const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 100 },
    author: { type: String, required: true, trim: true, maxlength: 50 },
    description: { type: String, trim: true, maxlength: 1000 },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    coverImage: {
        type: String,
        required: true,
        validate: {
            validator: v => /^\/images\/[^ "]+\.(png|jpg|jpeg|webp)$|^https?:\/\/[^ "]+$/.test(v),
            message: props => `${props.value} is not a valid image path or URL!`
        }
    },
    category: {
        type: String,
        required: true,
        enum: ['fiction', 'non-fiction', 'islamic', 'biography', 'self-help', 'academic', 'psychology'],
        lowercase: true
    },
    language: {
        type: String,
        required: true,
        enum: ['english', 'urdu', 'arabic', 'french', 'spanish', 'german'],
        lowercase: true
    },
    stock: { type: Number, required: true, default: 0, min: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

bookSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

bookSchema.virtual('formattedPrice').get(function () {
    return `$${this.price.toFixed(2)}`;
});

bookSchema.index({ title: 'text', author: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);
