const router = require("express").Router();
const Item = require("../models/Item");
const Purchase = require("../models/Purchase");
const { isAuth } = require("../middlewares/auth");

router.get("/", (req, res) => {
  Item.find()
    .sort({ _id: -1 })
    .then((items) => res.json(items))
    .catch(() =>
      res.status(404).json({ message: "Not Found!", type: "ERROR" })
    );
});

router.get("/page=:page", (req, res) => {
  const page = req.params.page;
  Item.find()
    .sort({ _id: -1 })
    .skip((page - 1) * 10)
    .limit(10)
    .then((items) => res.json(items))
    .catch(() =>
      res.status(404).json({ message: "Not Found!", type: "ERROR" })
    );
});

router.get("/title/:string", (req, res) => {
  const regex = new RegExp(req.params.string, "i");
  Item.find({ title: regex })
    .then((items) => res.json(items))
    .catch(() =>
      res.status(404).json({ message: "Not Found!", type: "ERROR" })
    );
});

router.get("/category/:categoryString", (req, res) => {
  const categoryString = req.params.categoryString;
  Item.find({ category: categoryString })
    .then((items) => res.json(items))
    .catch(() =>
      res.status(404).json({ message: "Not Found!", type: "ERROR" })
    );
});

router.get(
  "/category/:categoryString/subcategory/:subcategoryString",
  (req, res) => {
    const categoryString = req.params.categoryString;
    const subcategoryString = req.params.subcategoryString;
    Item.find({ category: categoryString, subcategory: subcategoryString })
      .then((items) => res.json(items))
      .catch(() =>
        res.status(404).json({ message: "Not Found!", type: "ERROR" })
      );
  }
);

router.post("/", isAuth, (req, res) => {
  let item = new Item(req.body);
  item
    .save()
    .then((createdItem) => res.status(201).json({ _id: createdItem._id }))
    .catch(() =>
      res.status(403).json({ message: "Forbidden!", type: "ERROR" })
    );
});

router.get("/purchases", isAuth, (req, res) => {
  Purchase.find()
    .sort({ _id: -1 })
    .then((items) => res.json(items))
    .catch(() =>
      res.status(404).json({ message: "Not Found!", type: "ERROR" })
    );
});

router.get("/purchases/:table", isAuth, (req, res) => {
  Purchase.find({ numberOfTable: req.params.table })
    .sort({ _id: -1 })
    .then((items) => res.json(items))
    .catch(() =>
      res.status(404).json({ message: "Not Found!", type: "ERROR" })
    );
});

router.post("/purchases", isAuth, (req, res) => {
  let purchase = new Purchase(req.body);
  purchase
    .save()
    .then((createdPurchase) =>
      res.status(201).json({ _id: createdPurchase._id })
    )
    .catch(() =>
      res.status(400).json({ message: "Bad Request!", type: "ERROR" })
    );
});

router.delete("/purchases/:itemId", isAuth, (req, res) => {
  Purchase.findByIdAndRemove(req.params.itemId)
    .then((deleted) => res.json({ _id: deleted._id }))
    .catch(() =>
      res.status(400).json({ message: "Bad Request!", type: "ERROR" })
    );
});

router.delete("/purchases/table/:number", isAuth, (req, res) => {
  Purchase.deleteMany({ numberOfTable: req.params.number })
    .then((deleted) => res.json({ _id: deleted._id }))
    .catch(() =>
      res.status(400).json({ message: "Bad Request!", type: "ERROR" })
    );
});

router.delete("/:itemId", isAuth, (req, res) => {
  Item.findByIdAndRemove(req.params.itemId)
    .then((deleted) => res.json({ _id: deleted._id }))
    .catch(() =>
      res.status(403).json({ message: "Forbidden!", type: "ERROR" })
    );
});

router.put("/:itemId", isAuth, (req, res) => {
  const item = new Item({ _id: req.params.itemId, ...req.body });
  Item.findByIdAndUpdate(req.params.itemId, item)
    .then((updated) => res.status(201).json({ _id: updated._id }))
    .catch(() =>
      res.status(403).json({ message: "Forbidden!", type: "ERROR" })
    );
});

router.get("/:itemId", (req, res) => {
  Item.findById(req.params.itemId)
    .then((item) => res.json(item))
    .catch(() =>
      res.status(404).json({ message: "Not Found!", type: "ERROR" })
    );
});

module.exports = router;
