const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all library cards and perform a JOIN to include all associated Readers
    const catergoryData = await Catergory.findAll({
      include: { model: Product,
      attributes:['id', 'product_name', 'price', 'stock', 'category_id'] },
    });
    res.status(200).json(catergoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/id', async (req, res) => {
  try {
    // find all library cards and perform a JOIN to include all associated Readers
    const catergoryData = await Catergory.findOne({
      include: { model: Product,
      attributes:['id', 'product_name', 'price', 'stock', 'category_id'] },
    });
    res.status(200).json(catergoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find one category by its `id` value
// be sure to include its associated Products



router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData);
  } catch (err) {
  res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const catergoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!catergoryData) {
      res.status(404).json({ message: 'No catergory found with that id!' });
      return;
    }

    res.status(200).json(catergoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const catergoryData = await Category.destroy(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!catergoryData) {
      res.status(404).json({ message: 'No catergory found with that id!' });
      return;
    }

    res.status(200).json(catergoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
