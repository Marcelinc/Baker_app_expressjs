const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');

//const zamowienia = require('./Zamowienia')
const logger = require('./middleware/logger');

//Routes
/*app.get('/api/zamowienia',(req,res) => {
    res.json(zamowienia);
})

app.get('/api/zamowienia/:produkt',(req,res) => {
    const znaleziono = zamowienia.some(z => z.produkt === req.params.produkt);
    if(znaleziono)
        res.json(zamowienia.filter(z => z.produkt === req.params.produkt))
    else res.status(400).json({msg: `Brak zamówień produktu ${req.params.produkt}`});
})*/
app.use(cors());
app.use(logger);

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/*app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'resources','main.html'));
})*/
app.use(express.static(path.join(__dirname,'resources')));

//API zamowien
app.use('/api/zamowienia',require('./routes/api/zamowienia'));

mongoose.connect('mongodb://localhost:27017/piekarnia', () => {
    console.log('Połączono z bazą');
});

app.listen(5000,()=> console.log('Serwer dziala'));