

module.exports = {
    getExistUser : "SELECT * FROM users WHERE email = ?", 
    registerUser : "INSERT INTO users SET ?",
    getAllBlogList : "SELECT * FROM blog ORDER BY id DESC",
    addBlog : "INSERT INTO blog SET ?",
    editBlog : "UPDATE blog SET ? WHERE id = ?",
    getBlogDetails : "SELECT * FROM blog WHERE id = ?",
    deleteBlog : "DELETE FROM blog WHERE id = ?",
    getUserDetails : "SELECT * FROM users WHERE id = ?",
    getuserBlogList : "SELECT * FROM blog WHERE user_id = ?"
}
