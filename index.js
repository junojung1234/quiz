const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const formHTML = fs.readFileSync(path.join(__dirname, 'form.html'), 'utf8');
    res.send(formHTML);
});

app.post('/', (req, res) => {
    const uri = req.body.myuri;
    mongoose.connect(`${uri}/Winter24`, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected successfully");

        const Schema = mongoose.Schema;
        const studentSchema = new Schema({
            name: String,
            studentID: String
        });

        const Student = mongoose.model('Student', studentSchema, 'w24students');

        const student = new Student({ name: 'Juno Jung', studentID: '300338965' });
        student.save(function (err, student) {
            if (err) return console.error(err);
            console.log(student.name + " saved to w24students collection.");
        });
    });

    res.send('Form Submitted. Check your console.');
});

app.listen(3000, () => {
    console.log('Server is running on localhost:3000')
});
