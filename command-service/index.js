const express = require("express");
const app = express();
const PORT = 4001;
const mongoose = require("mongoose");
const Commande = require("./Commande.js");
const axios = require('axios');
const dotenv = require('dotenv');


app.use(express.json());
dotenv.config()
const connectWithRetry = async () => {
    try {
        await mongoose.connect('mongodb://db:27017/commands');
        console.log('Connected to MongoDB');
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


function prixTotal(produits) {
let total = 0;
for (let t = 0; t < produits.length; ++t) {
total += produits[t].prix;
}
console.log("prix total :" + total);
return total;
}

async function httpRequest(ids) {
    console.log(ids)
try {
const URL = `http://localhost:4000/api/produit/acheter/${ids}`
const response = await axios.get(URL,  {
 

headers: {
'Content-Type': 'application/json'
}
});
console.log(response.data)
return prixTotal(response.data);

} catch (error) {
console.error(error.message);
}
}
app.post("/api/commande/ajouter", async (req, res, next) => {

const { ids, email_utilisateur } = req.body;
httpRequest(req.body.ids).then(total => {
const newCommande = new Commande({
ids,
email_utilisateur: email_utilisateur,
prix_total: total,
});
newCommande.save()
.then(commande => res.status(201).json(commande))
.catch(error => res.status(400).json({ error }));
});
});

