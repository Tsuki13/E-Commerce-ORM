const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: { model: Product }
    });

    const categories = categoryData.map(category => category.get({ plain: true }));
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json(e)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product }
    });
    const category = categoryData.get({ plain: true });
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err))
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({ category_name: req.body.category_name }, {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(updateCategory);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deleteCategory);
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = router;
