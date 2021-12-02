const express = require('express');
const app = express()
const cors =require('cors')
const mysql = require('mysql');
const path = require('path');


app.use(express.static("public"));
app.get('/api/get', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const selectSQL = "SELECT * FROM people";
    db.query(selectSQL, (err,result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
        
    })
});
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
app.use(cors())
app.use(express.urlencoded({ extended: true}))
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE 
})
app.use(express.json())
app.post('/api/insert', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const person_image = req.body.person_image
    const name = req.body.name
    const surname = req.body.surname
    const sex = req.body.sex
    const country = req.body.country
    const adress = req.body.adress
    const studies = req.body.studies
    const studies_section = req.body.studies_section
    const married = req.body.married
    const work = req.body.work
    const email = req.body.email
    const phone = req.body.phone

    console.log([person_image, name, surname, sex,country, adress,studies,studies_section, married, work, email, phone])
    const insertSQL = "INSERT INTO people(person_image,name,surname,sex,country,adress,studies,studies_section,married,work,email,phone) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    const values =  [person_image, name, surname, sex,country, adress,studies,studies_section, married, work, email, phone]
    db.query(insertSQL,values, (err,result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
        
    })
});
app.delete('/api/delete/:phone', (req, res) => {
    const phoneDelete = req.params.phone
    console.log(req.params.phone)
    deleteItemComand ='DELETE FROM people WHERE phone = ?'
    db.query(deleteItemComand,phoneDelete, (err,result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
        
    })
});

app.put('/api/update', (req, res) => {
    
    const person_image = req.body.person_image
    const name = req.body.name
    const surname = req.body.surname
    const sex = req.body.sex
    const country = req.body.country
    const adress = req.body.adress
    const studies = req.body.studies
    const studies_section = req.body.studies_section
    const married = req.body.married
    const work = req.body.work
    const email = req.body.email
    const phone = req.body.phone

    console.log([person_image, name, surname, sex,country, adress,studies,studies_section, married, work, email, phone])
    const sqlUpdate = "UPDATE people SET person_image=?,name=?,surname=?,sex=?,country=?,adress=?,studies=?,studies_section=?,married=?,work=? WHERE email=? OR phone=?"
    updateData = [person_image,name,surname,sex,country,adress,studies,studies_section,married,work,email,phone]
    db.query(sqlUpdate,updateData, (err,result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
        
    })

});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`The server started on port ${PORT}`)
})