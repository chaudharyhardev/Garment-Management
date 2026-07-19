// const sqlite3 = require("sqlite3").verbose();


// const db = new sqlite3.Database(
//     "./database/database.db",
//     (err)=>{

//         if(err){
//             console.log("Database connection failed");
//         }
//         else{
//             console.log("SQLite Database Connected");
//         }

//     }
// );


// module.exports = db;

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../database/database.db");

const db = new sqlite3.Database(dbPath, (err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Database connected");
    }
});

module.exports = db;