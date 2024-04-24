const request = require("supertest")
const app = require("../app")
const BASE_URL = '/api/v1/users'
let TOKEN
let userId

beforeAll(async()=>{

    const user =  {
        email: "yaye12@gmail.com",
        password: "1234"
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    // console.log(res.body.token)
    TOKEN = res.body.token
})

// GET
test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 1", async() => {
    const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

// CREATE
test("POST ->'BASE_URL', should return status code 201, and re.body.name === userCreate.name", async() => {
    const user = {
        firstName:  "Maicol",
        lastName: "Salazar",
        email: "maicol12@gmail.com",
        password: "1234",
        phone:"12345"
    }

  const res = await request(app)
  .post(BASE_URL)
  .send(user)

  
  userId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body.firstName).toBe(user.firstName)
  expect(res.body).toBeDefined()
})