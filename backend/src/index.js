const express = require('express')
const bodyParser = require('body-parser')
const route = require('./Routes/route')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', route)

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 4000}`)
})






















