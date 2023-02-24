

const { Category } = require('../models'); 

const categoryData = [
    {
        category_name: "Category 1",
        filename: "category_1.jpg", 
    }, 
    {
        category_name: "Category 2",
        filename: "category_2.jpg", 
    }, 
    {
        category_name: "Category 3",
        filename: "category_3.jpg", 
    },
]; 

const seedCategory = () => Category.bulkCreate(categoryData); 

module.exports = seedCategory; 

