const router = require('express').Router();
const Item = require('../models/Item');

router.get('/', (req, res) => {
    Item.find().sort({ '_id': -1 })
        .then(items => res.json(items))
        .catch(() => res.status(404).json({ message: 'Not Found!', type: 'ERROR' }));
});

router.post('/', (req, res) => {
    let item = new Item(req.body);
    item.save()
        .then(createdItem => res.status(201).json({ _id: createdItem._id }))
        .catch(() => res.status(403).json({ message: 'Forbidden!', type: 'ERROR' }));
});

router.get('/title/:string', (req, res) => {
    const string = req.params.string;
    console.log(string)
    Item.find({ title: string })
    .then(items => res.json(items))
        .catch(() => res.status(404).json({ message: 'Not Found!', type: 'ERROR' }));
});

router.get('/category/:string', (req, res) => {
    const string = req.params.string;
    Item.find({ category: string })
        .then(items => res.json(items))
        .catch(() => res.status(404).json({ message: 'Not Found!', type: 'ERROR' }));
});

router.get('/:itemId', (req, res) => {
    Item.findById(req.params.itemId)
        .then(item => res.json(item))
        .catch(() => res.status(404).json({ message: 'Not Found!', type: 'ERROR' }));
});


router.delete('/:itemId', (req, res) => {
    Item.findByIdAndRemove(req.params.itemId)
        .then(deleted => res.json({ _id: deleted._id }))
        .catch(() => res.status(403).json({ message: 'Forbidden!', type: 'ERROR' }));
});

router.put('/:itemId', (req, res) => {
    const item = new Item({ _id: req.params.itemId, ...req.body });
    Item.findByIdAndUpdate(req.params.itemId, item)
        .then(updated => res.status(201).json({ _id: updated._id }))
        .catch(() => res.status(403).json({ message: 'Forbidden!', type: 'ERROR' }));
});

module.exports = router;