const q = require('q');
const db = require('../common/database');
const connec = db.getConnection();

const addUser = (user) => {
    if(user) {
        const defer = q.defer();
        const query = connec.query('INSERT INTO users SET ?', user, function (error, results, fields) {
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

const getUserByEmail = (email) => {
    if (email) {
        const defer = q.defer();
        
        const query = connec.query('SELECT * FROM users WHERE ?', {email: email}, function (error, results, fields) {
            if (error) {
                defer.reject(error);
            }else {
                defer.resolve(results);
            }
        });
        return defer.promise;
    }

}
module.exports = {
    addUser: addUser,
    getUserByEmail: getUserByEmail
}