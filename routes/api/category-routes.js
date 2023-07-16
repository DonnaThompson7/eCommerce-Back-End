const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

  // GET all categories, including associated Products
  router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // GET one category by id, including associated Products
  router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: 'Product' }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // CREATE a category
  router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      name: req.body.name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a category by its `id` value
router.put('/:id', (req, res) => {
  try {
    const categoryData = await Category.create({
      name: req.body.name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }



});

// DELETE a category by id
router.delete('/:id', (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
