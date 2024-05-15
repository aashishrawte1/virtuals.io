const sqlite3 = require('sqlite3').verbose();

const dbPath = './tinder.db';

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        gender TEXT,
        location TEXT,
        university TEXT,
        interests TEXT
    )`);

    // Sample data
    const sampleUsers = [
        { name: 'Alice', gender: 'Female', location: 'City A', university: 'University A', interests: 'Books' },
        { name: 'Bob', gender: 'Male', location: 'City B', university: 'University A', interests: 'Music' },
        { name: 'Charlie', gender: 'Male', location: 'City C', university: 'University A', interests: 'Sports' },
        { name: 'David', gender: 'Male', location: 'City D', university: 'University A', interests: 'Movies' },
        { name: 'Eve', gender: 'Female', location: 'City E', university: 'University A', interests: 'Traveling' },
        { name: 'Frank', gender: 'Male', location: 'City F', university: 'University B', interests: 'Music' },
        { name: 'Grace', gender: 'Female', location: 'City G', university: 'University C', interests: 'Sports' },
        { name: 'Henry', gender: 'Male', location: 'City H', university: 'University D', interests: 'Movies' },
        { name: 'Ivy', gender: 'Female', location: 'City I', university: 'University E', interests: 'Books' },
        { name: 'Jack', gender: 'Male', location: 'City J', university: 'University F', interests: 'Traveling' },
        { name: 'Kelly', gender: 'Female', location: 'City K', university: 'University G', interests: 'Music' },
        { name: 'Liam', gender: 'Male', location: 'City L', university: 'University H', interests: 'Sports' },
        { name: 'Mia', gender: 'Female', location: 'City M', university: 'University I', interests: 'Movies' },
        { name: 'Noah', gender: 'Male', location: 'City N', university: 'University J', interests: 'Books' },
        { name: 'Olivia', gender: 'Female', location: 'City O', university: 'University K', interests: 'Traveling' }
    ];

    const insertStmt = db.prepare('INSERT INTO users (name, gender, location, university, interests) VALUES (?, ?, ?, ?, ?)');
    sampleUsers.forEach(user => insertStmt.run(user.name, user.gender, user.location, user.university, user.interests));
    insertStmt.finalize();

    db.close();
});

console.log('Sample database created successfully.');
