require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "database-1.cogqbx8xkhvz.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "database-1.cogqbx8xkhvz.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "database-1.cogqbx8xkhvz.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  }
}
