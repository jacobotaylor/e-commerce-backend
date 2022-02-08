const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
     // find all tags
  // be sure to include its associated Product data
    const tagData = await Tag.findAll({
      include: { model: Product,
      attributes:['id', 'product_name', 'price', 'stock', 'category_id'] },
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/id', async (req, res) => {
    try {
      // find all library cards and perform a JOIN to include all associated Readers
      const tagData = await Tag.findOne({
        include: { model: Product,
        attributes:['id', 'product_name', 'price', 'stock', 'category_id'] },
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const tagData = await tag.create(req.body)
      res.status(200).json(tagData);
    } catch (err) {
    res.status(500).json(err);
    }
  });

  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const tagData = await tag.update(req.body, {
        where: {
          id: req.params.id
        }
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:id', async(req, res) => {
    // delete a category by its `id` value
    try {
      const tagData = await tag.destroy(req.body, {
        where: {
          id: req.params.id
        }
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
