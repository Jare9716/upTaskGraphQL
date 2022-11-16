const mongoose = require('mongoose')
require('dotenv').config({path: 'variables.env'})

const conectarDB = async () => {
    try {
            mongoose.connect(process.env.DB_MONGO, {
                useNewUrlParser: true,
        })
        console.log('DB conectada')
    } catch (error) {
        console.log('Error')
        console.log(error)
        process.exit(1) //Detener la app
    }
}

module.exports = conectarDB