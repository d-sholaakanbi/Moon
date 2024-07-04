const Category = require("../models/category");
const asyncWrapper = require("../middleware/async");

// Create a Category
const createCategory = asyncWrapper(async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });

    if (!category) {
        return res.status(400).json({ msg: "The category cannot be created" });
    }

    category = await category.save();
    res.status(201).json({ msg: "Category created", category });
});

module.exports = { createCategory };
