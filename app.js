const express = require('express');
const app = express();
const path = require('path')
const db = require('./config/db')
const admin = require('./models/admintbl')
const multer = require('multer')
const fs = require('fs')
app.set('view engine', 'ejs')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded())


app.get('/adddata', (req, res) => {

    res.render('form')


})


const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const Imgupload = multer({ storage: fileStorage }).single('image')


app.post('/adddata', Imgupload, (req, res) => {
    let image = ""

    if (req.file) {
        image = req.file.path
    }
    const {
        name,
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
        cvv,

    } = req.body;

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
        cvv: cvv,
        image: image
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

  let deletdata=  await admin.findByIdAndDelete(id)
  fs.unlinkSync(deletdata.image)

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

app.post('/editdata', Imgupload, async (req, res) => {
    const id = req.query.id
    let image = ""
    if (req.file) {
        const userImgUpdate = await admin.findById(id)
        fs.unlinkSync(userImgUpdate.image)
        image = req.file.path
    }
    const {
        name,
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
        cvv: cvv,
        image: image
    })
    res.redirect('/')
})


app.listen(3000, () => {
    console.log('http://localhost:3000');


}) 