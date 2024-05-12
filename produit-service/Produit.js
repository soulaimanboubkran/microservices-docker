
import mongoose from "mongoose";
const ProduitSchema = mongoose.Schema({
nom: String,
description: String,
prix: Number,
created_at: {
type: Date,
default: Date.now(),
},
});

const Produit = mongoose.model('produit', ProduitSchema);

export default Produit;