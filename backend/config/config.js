const dotenv = require ('dotenv')

dotenv.config()

export const config = {
    name_db : process.env.NAME_DB
}