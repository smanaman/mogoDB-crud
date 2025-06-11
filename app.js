const express = require('express');
const app = express();
const path = require('path')
const db = require('./config/db')
const admin = require('./models/admintbl')

app.set('view engine', 'ejs')
app.use('views', express.static(path.join(__dirname, 'views')))
app.use(express.urlencoded())


app.get('/adddata', (req, res) => {

    res.render('form')


})



app.post('/adddata', (req, res) => {

    const { name,
        email,
        phone,
        address,
        city,
        zip,
        country,
        shipping,
        cardname,
        cardnumber,
        expiry,
        cvv } = req.body;

    admin.create({
       name: name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        zip: zip,
        country: country,
        shipping: shipping,
        cardname: cardname,
        cardnumber: cardnumber,
        expiry: expiry,
        cvv: cvv
    })
    res.redirect('/')
})
app.get('/', async (req, res) => {
    try { 

        const users = await admin.find()
        res.render('showdata', { users })
    }
    catch (error) {
        console.log(error);

    }
})
app.get('/DeletData', async (req, res) => {
    const id = req.query.id

    await admin.findByIdAndDelete(id)


    res.redirect('/')

})

app.get('/editdata', async (req, res) => {

    const id = req.query.id
    console.log('id', id);

    const userupdate = await admin.findById(id)

    if (!userupdate) {
        return res.status(404).redirect('404')
    }
    res.render('EditData', { userupdate })


})

app.post('/editdata', async (req, res) => {
    const id = req.query.id
    
    const {      name,
        email,
        phone, 
        address,
        city,
        zip,
        country,
        shipping,
        cardname,
        cardnumber,
        expiry,
        cvv } = req.body

    await admin.findByIdAndUpdate(id, {
        name: name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        zip: zip,
        country: country,
        shipping: shipping,
        cardname: cardname,
        cardnumber: cardnumber,
        expiry: expiry,
        cvv: cvv

    })
    res.redirect('/')
}) 


    app.listen(3000, () => {
        console.log('http://localhost:3000');


    }) 