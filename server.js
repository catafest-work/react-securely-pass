const PORT = 8000 
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())

const ASTRA_TOKEN = "AstraCS:"
const ASTRA_URL = "https://astradb_collection"
app.post('/signup', async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body 
  console.log( username )
  console.log( password )

  const userId = uuidv4()
  const hashedPassword = await bcrypt.hash(password, 10)

  const options = {
    method: "POST",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": ASTRA_TOKEN,
      "Content-Type":"application/json"
    },
    data: { username, userId, hashedPassword }
  }

  try {
    const response = await axios(ASTRA_URL, options)
    res.status(200).json( response.data )
  } catch (err) {
    console.log(err)
    res.status(500).json( {message: err} )
  }
})

app.listen(PORT, () => console.log("Server is running on PORT "+PORT)) 