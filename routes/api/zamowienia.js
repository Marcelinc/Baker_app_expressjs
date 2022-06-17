const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');

router.get('/', async (req,res) => {
    try{
        const zamowienia = await Order.find();
        res.json(zamowienia);
        console.log(zamowienia);
    }catch(err){
        res.status(400).json({msg: 'Brak zamówień'});
        console.log(err);
    }
})

router.get('/:produkt', async (req,res) => {
   try{
        const zamowienia = await Order.find({ produkt: req.params.produkt});
        if(!zamowienia.length)
            res.status(400).json({msg: `Brak zamówień produktu ${req.params.produkt}`})
        res.json(zamowienia);
   }catch(err){
        res.status(400).json({msg: 'Błąd podczas pobierania danych'});
   }
    
})

router.post('/',(req,res) => {
    if(!req.body.produkt || !(req.body.ilosc > 0))
        return res.status(400).json({msg: 'Nieporawne dane!'})

    const order = new Order({
        produkt: req.body.produkt,
        ilosc: parseInt(req.body.ilosc)
    })

    order.save()
    .then(data => res.json(data))
    .catch(err => res.json({msg: 'Błąd podczas składania zamówienia!'}));
});

router.put('/:id', async (req,res) => {
    try{
        const update = await Order.updateOne({ _id: req.params.id }, {$set: {status: 'anulowane'}});
        if(update)
            res.json({msg:`Anulowano zamówienie`});
        res.status(400).json({msg: 'Błąd podczas anulowania'});
    }catch(err){
        res.status(400).json({msg:'Wystąpił błąd podczas anulowania wybranego zamówienia'});
    }
})


module.exports = router;