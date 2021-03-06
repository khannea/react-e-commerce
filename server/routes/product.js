const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require("multer");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/build/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: 'uploads/'+res.req.file.filename,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadProduct", auth, (req, res) => {
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productId = req.query.id;

  if (type == "array") {
    let ids = req.query.id.split(",");
    productsId = [];
    productId = ids.map((item) => {
      return item;
    });
  }

  Product.find({ _id: { $in: productId } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      res.status(200).json(product);
    });
});

// router.post("/getProduct", (req, res) => {
//   Product.find({ _id: req.body.id }).exec((err, product) => {
//     if (err) return res.status(400).json({ success: false, err });
//     res.status(200).json({ success: true, product });
//   });
// });

router.post("/getProducts", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? req.body.limit : 100;
  let skip = parseInt(req.body.skip);
  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        if (
          parseInt(req.body.filters[key][0]) > 0 &&
          parseInt(req.body.filters[key][1]) > 0
        ) {
          findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1],
          };
        } else if (parseInt(req.body.filters[key][0]) > 0) {
          findArgs[key] = {
            $gte: req.body.filters[key][0],
          };
        } else if (parseInt(req.body.filters[key][1]) > 0) {
          findArgs[key] = {
            $lte: req.body.filters[key][1],
          };
        }
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    Product.find(findArgs)
      .find({
        $or: [
          { title: { $regex: term, $options: "i" } },
          { description: { $regex: term, $options: "i" } },
        ],
      })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }
});

module.exports = router;
