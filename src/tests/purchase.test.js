// const request = require("supertest")
// const app = require('../app')
// const Purchase = require("../models/Purchase")


// const URL_BASE = '/api/v1/cart'
// let TOKEN
// let cart
// let userId
// let product

// beforeAll(async () => {
//     const user = {
//         email: "yaye12@gmail.com",
//         password: "1234"
//     }

//     const res = await request(app)
//     .post('/api/v1/users/login')
//     .send(user)

//     TOKEN = res.body.token 
//     userId = res.body.user.id

//     productBody = {
//         title:'iphone test',
//         description: 'iphone description',
//         price: 3.34
//     }

//     product = await Product.create(productBody)
// })