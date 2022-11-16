const {ApolloServer} = require('apollo-server')
const jwt = require('jsonwebtoken')
require('dotenv').config('variables.env')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolver')

const conectarDB = require('./config/db')


//Conectar a la DB
conectarDB()

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({req}) =>{
        //console.log(req.headers['authorization'])

        const token = req.headers['authorization'] || ''
        if(token) {
            try { 
                const usuario = jwt.verify(token.replace('Bearer ',''), process.env.SECRETA) 
                console.log(usuario)
                return{
                    usuario
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})


server.listen({port: process.env.port||4000}).then(({url})=> {
    console.log(`servidor listo en la URL ${url}`)
})