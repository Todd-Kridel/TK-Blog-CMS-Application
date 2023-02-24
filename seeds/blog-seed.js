

const { Blog } = require('../models'); 

const blogData = [
    {
        title: "TEST Blog Title 1", 
        message_text: "TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1. TEST blog message 1.", 
        author_id: 1, 
        post_date: "2023-02-12" 
    }, 
    {
        title: "TEST Blog Title 2", 
        message_text: "TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2. TEST blog message 2.", 
        author_id: 2, 
        post_date: "2023-02-13" 
    }, 
    {
        title: "TEST Blog Title 3", 
        message_text: "TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3. TEST blog message 3.", 
        author_id: 1, 
        post_date: "2023-02-14" 
    }, 
    {
        title: "TEST Blog Title 4", 
        message_text: "TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4. TEST blog message 4.", 
        author_id: 5, 
        post_date: "2023-02-15" 
    }, 
    {
        title: "TEST Blog Title 5", 
        message_text: "TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5. TEST blog message 5.", 
        author_id: 5, 
        post_date: "2023-02-16" 
    }, 
    {
        title: "TEST Blog Title 6", 
        message_text: "TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6. TEST blog message 6.", 
        author_id: 1, 
        post_date: "2023-02-16" 
    }, 
    {
        title: "TEST Blog Title 7", 
        message_text: "TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7. TEST blog message 7.", 
        author_id: 1, 
        post_date: "2023-02-17" 
    }, 
    {
        title: "TEST Blog Title 8", 
        message_text: "TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8. TEST blog message 8.", 
        author_id: 3, 
        post_date: "2023-02-17" 
    }
]

const seedBlog = () => Blog.bulkCreate(blogData); 

module.exports = seedBlog; 

