import express from "express";
const app = express();
const PORT =  4000;

import Produit from "./Produit.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
app.use(express.json());
dotenv.config()





app.use(express.json())




const connectWithRetry = async () => {
    try {
        await mongoose.connect('mongodb://db:27017/produits');
        console.log('Connected to MongoDB wewe');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // Retry connection after a delay
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    }
};

const connect = async () => {
    await connectWithRetry();
};

app.listen(PORT, ()=> {
    connect();
    console.log(`Server is running on port ${PORT}`);
});



app.get("/", (req, res, next) => {
   res.json('hello')
});


app.post("/api/produit/ajouter", (req, res, next) => {
const { nom, description, prix } = req.body;
const newProduit = new Produit({
nom,
description,
prix
});

newProduit.save() 
.then(produit => res.status(201).json(produit))
.catch(error => res.status(400).json({ error }));
});



app.get("/api/produit/acheter/:ids", (req, res, next) => {
//const { ids } = req.body;
const { ids } = req.params;

console.log(ids)
    Produit.find({ _id: { $in: ids } })
.then(produits => res.status(201).json(produits))
.catch(error => res.status(400).json({ error }));
});
