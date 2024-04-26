require('../models')
const request = require("supertest")
const app = require("../app")
const Category = require("../models/Category")
const BASE_URL = '/api/v1/products'

let category
let TOKEN 
let productId

beforeAll(async() => {

    const user = {
        email: "yaye12@gmail.com",
        password: "1234"
    }

    const res = await request(app)
    .post('/api/v1/users/login')
    .send(user)

    TOKEN = res.body.token

    category = await Category.create({name: 'Tecnology'})

})

test("POST -> 'BASE_URL', should return statusCode 201, and res.body.title === product.title", async() => {
    const product = {
        title:"Phone",
        description:"Iphone 15 256gb",
        price:890,
        categoryId: category.id
    }

    const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization', `Bearer ${TOKEN}`)

    productId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
   
})

test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 1", async() => {
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)


})

test("GET -> 'BASE_URL/:id', should return statusCode 200, and res.body.length === 1", async() => {
    const res = await request(app)
    .get(`${BASE_URL}/${productId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe('Phone')

   
})

test("PUT -> BASE_URL, should return statusCode 200, and res.body.title === bodyUpdate.title", async() => {
    const bodyUpdate = {
        title: "iphone 15 pro max"
    }

    const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(bodyUpdate)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(bodyUpdate.title)
})

test("DELETE -> BASE_URL, should return status code 204", async() => {
    const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)

    await category.destroy()
})