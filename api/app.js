const express = require('express')
const cors = require('cors')

require('dotenv').config()

//twilio
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = require('twilio')(accountSid, authToken);


//app
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('Informent API')
})

app.post('/sendsms', (req, res) => {
    client.messages.create({
        messagingServiceSid: process.env.MESSAGINGSERVICESID,
        body: req.body.msg,
        to: req.body.phone
    })
    .then(message => res.json('Message sent'))
    .catch(e => res.send(e))

})


app.listen(8000, () => {
    console.log('Server is running on port 8000')
})
