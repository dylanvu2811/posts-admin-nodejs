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
module.exports = {
    getAllPost: getAllPost,
    addPost: addPost
}