const express = require('express')
const cors = require('cors')

//twilio
const accountSid = 'AC2f77ef69736e18cb2f8a8ff214eda7c2';
const authToken = 'cc972540f722e590a270bfaee2c41bb0';

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
        messagingServiceSid: 'MG8a32f59531308c108ff4e5402a3d50c8',
        body: req.body.msg,
        to: req.body.phone
    })
    .then(message => res.json('Message sent'))
    .catch(e => res.send(e))

})


app.listen(8000, () => {
    console.log('Server is running on port 8000')
})