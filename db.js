const sqlite3 = require('sqlite3');
const dbPath = './tinder.db';

function getRecomendations(userProfile) {
    return new Promise((resolve, reject)=> {
        const db = new sqlite3.Database(dbPath);
        const sql = `
            SELECT * FROM users 
            WHERE university = ? OR interests = ?
            ORDER BY RANDOM()
            LIMIT 10
        `;

        db.all(sql, [userProfile.university, userProfile.interests], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }
            db.close();
        });
    })  
}

module.exports = { getRecomendations };