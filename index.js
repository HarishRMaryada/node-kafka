const produce = require("./produce")
const {getUsers,getUsersById} = require("./consume")
const fs = require("fs");
const path = require("path");

const express = require('express')
const app = express()
const port = 3000


app.get('/users', async (req, res) => {
    //res.send(fs.readFileSync(path.join(__dirname,'topic_message.txt'), 'utf8'))

    getUsers(res).catch(err => {
        console.error("Error in consumer: ", err)
    })
})

app.get('/users/:id', async (req, res) => {
  //res.send(fs.readFileSync(path.join(__dirname,'topic_message.txt'), 'utf8'))
  const {id} = req.params
  getUsersById(res,id).catch(err => {
      console.error("Error in consumer: ", err)
  })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



// call the `produce` function and log an error if it occurs
produce().catch((err) => {
    console.error("error in producer: ", err)
})
