const request = require("supertest")
const app = require("../app")
const BASE_URL = '/api/v1/categories'
let TOKEN
let categoryId


// hook inicio de sesion
beforeAll(async()=>{

    const user =  {
        email: "yaye12@gmail.com",
        password: "1234"
    }

    const res = await request(app)
    .post('/api/v1/users/login')
    .send(user)

    // console.log(res.body.token)
    TOKEN = res.body.token
})


// POST
test("POST 'BASE_URL', should return statud code 201, and res.body.name === category.name", async() => {
    const category = {
        name: "tecno"
    }

    const res = await request(app)
    .post(BASE_URL)
    .send(category)
    .set("Authorization", `Bearer ${TOKEN}`)

    categoryId = res.body.id 

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})

// GET
test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 1", async() => {
    const res = await request(app)
    .get(BASE_URL)
 

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

})

// DELETE 
test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async() => {
    const res = await request(app)
    .delete(`${BASE_URL}/${categoryId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})