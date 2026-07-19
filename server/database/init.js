const db = require("../config/db");
const bcrypt = require("bcrypt");




// Garment shops table
db.run(`
CREATE TABLE IF NOT EXISTS garment_shops(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shop_name TEXT,
    owner_name TEXT,
    phone TEXT,
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);
// Products table

db.run(`
CREATE TABLE IF NOT EXISTS products(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    category TEXT,

    size TEXT,

    color TEXT,

    cost_price REAL,

    selling_price REAL,

    stock INTEGER DEFAULT 0,

    image TEXT,

    shop_id INTEGER,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(shop_id)
    REFERENCES garment_shops(id)

)
`);

db.run(`
CREATE TABLE IF NOT EXISTS customers (

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT NOT NULL,

phone TEXT,

address TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`);


db.run(`
CREATE TABLE IF NOT EXISTS sales (

id INTEGER PRIMARY KEY AUTOINCREMENT,

invoice_no TEXT,

customer_id INTEGER,

total_amount REAL,

discount REAL DEFAULT 0,

final_amount REAL,

payment_method TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY(customer_id) REFERENCES customers(id)

)
`);


db.run(`
CREATE TABLE IF NOT EXISTS sale_items (

id INTEGER PRIMARY KEY AUTOINCREMENT,

sale_id INTEGER,

product_id INTEGER,

quantity INTEGER,

price REAL,

subtotal REAL,

FOREIGN KEY(sale_id) REFERENCES sales(id),

FOREIGN KEY(product_id) REFERENCES products(id)

)
`);

db.run(`

CREATE TABLE IF NOT EXISTS users(

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT NOT NULL,

email TEXT UNIQUE NOT NULL,

password TEXT NOT NULL,

role TEXT NOT NULL

)

`);
db.run(`
CREATE TABLE IF NOT EXISTS stock_history(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    product_id INTEGER NOT NULL,

    type TEXT NOT NULL,

    quantity INTEGER NOT NULL,

    note TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(product_id)
    REFERENCES products(id)

)
`);
db.run(`
CREATE TABLE IF NOT EXISTS suppliers(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    phone TEXT,

    email TEXT,

    address TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`);
db.run(`
CREATE TABLE IF NOT EXISTS purchases(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    purchase_no TEXT,

    shop_id INTEGER,

    total_amount REAL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(shop_id)
REFERENCES garment_shops(id)

)
`);
db.run(`
CREATE TABLE IF NOT EXISTS purchase_items(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    purchase_id INTEGER,

    product_id INTEGER,

    quantity INTEGER,

    cost_price REAL,

    subtotal REAL,

    FOREIGN KEY(purchase_id)
    REFERENCES purchases(id),

    FOREIGN KEY(product_id)
    REFERENCES products(id)

)
`);
db.run(`
CREATE TABLE IF NOT EXISTS deliveries(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    sale_id INTEGER,

    customer_id INTEGER,

    delivery_address TEXT,

    phone TEXT,

    status TEXT DEFAULT 'Pending',

    delivery_person TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(sale_id)
    REFERENCES sales(id),

    FOREIGN KEY(customer_id)
    REFERENCES customers(id)

)
`);
db.run(`
CREATE TABLE IF NOT EXISTS delivery_staff(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    phone TEXT,

    address TEXT,

    delivery_area TEXT,

    vehicle_type TEXT,

    status TEXT DEFAULT 'Active',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`);
bcrypt.hash("admin123", 10, (err, hash) => {

    if (err) {
        console.log(err);
        return;
    }

    db.get(
        "SELECT * FROM users WHERE email=?",
        ["admin@gmail.com"],
        (err, row) => {

            if (err) {
                console.log(err);
                return;
            }

            if (!row) {

                db.run(

                    `INSERT INTO users
                    (name,email,password,role)
                    VALUES(?,?,?,?)`,

                    [
                        "Admin",
                        "admin@gmail.com",
                        hash,
                        "admin"
                    ],

                    (err) => {

                        if (err) {

                            console.log(err);

                        } else {

                            console.log("Default Admin Created");

                        }

                    }

                );

            }

        }

    );

});


console.log("Database tables created");