const User = require("../models/User")

const userCreate = async() => {

    const user = {
        firstName:  "Yoneison",
        lastName: "Bayona",
        email: "yaye12@gmail.com",
        password: "1234",
        phone:"12345"
    }

    await User.create(user)
}

module.exports = userCreate