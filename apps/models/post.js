const q = require('q');
const db = require('../common/database');
const connec = db.getConnection();

const getAllPost = () => {
    const defer = q.defer();
    const query = connec.query('SELECT * FROM posts', function (error, posts, fields) {
        if (error) {
            defer.reject(error);
        }else {
            defer.resolve(posts);
        }
    });
    return defer.promise;
}
const addPost = (params) => {
    if(params) {
        const defer = q.defer();
        const query = connec.query('INSERT INTO posts SET ?', params, function (error, results, fields) {
            if (error) {
                defer.reject(error);
            }else {
                defer.resolve(results);
            }
        });
        return defer.promise;
    }

    return false;
}

const getPostById = (id) => {
    const defer = q.defer();
    const query = connec.query('SELECT * FROM posts WHERE ?', {id: id},function (error, posts, fields) {
        if (error) {
            defer.reject(error);
        }else {
            defer.resolve(posts);
        }
    });
    return defer.promise;
}

const updatePost = (params) => {
    if (params) {
        const defer = q.defer();
        const query = connec.query('UPDATE posts SET title = ?, author = ?, content = ?, updated_at = ? WHERE id = ?', 
        [params.title, params.author, params.content, new Date(), params.id],function (error, result, fields) {
            if (error) {
                defer.reject(error);
            }else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}


const deletePost = (id) => {
    if (id) {
        const defer = q.defer();
        const query = connec.query('DELETE FROM posts WHERE id = ?', [id],function (error, result, fields) {
            if (error) {
                defer.reject(error);
            }else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

module.exports = {
    getAllPost: getAllPost,
    addPost: addPost,
    getPostById: getPostById,
    updatePost: updatePost,
    deletePost: deletePost
}