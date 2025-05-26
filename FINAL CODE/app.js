const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/registrationDB', { useNewUrlParser: true, useUnifiedTopology: true });
require('dotenv').config({ path: path.join(__dirname, '.env') }); // Load environment variables from .env file

const registrationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    schoolName: String,
    schoolCode: String,
    email: String,
    username: String,
    password: String,
    confirmationCode: String,
    isConfirmed: { type: Boolean, default: false },
});

const Registration = mongoose.model('Registration', registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/register', async (req, res) => {
    const registrationData = req.body;
    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newRegistration = new Registration({
        ...registrationData,
        confirmationCode,
    });

    try {
        await newRegistration.save();

        sendConfirmationEmail(newRegistration.email, confirmationCode);

        res.status(200).send('Registration successful. Please check your email for confirmation.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving registration data.');
    }
});

app.get('/confirm/:confirmationCode', async (req, res) => {
    const { confirmationCode } = req.params;

    try {
        const registration = await Registration.findOne({ confirmationCode });

        if (!registration) {
            return res.status(404).send('Invalid confirmation code.');
        }

        registration.isConfirmed = true;
        await registration.save();

        res.sendFile(path.join(__dirname, 'public', 'confirmation.html'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error confirming registration.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function sendConfirmationEmail(email, confirmationCode) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,    // Using environment variables for enhanced security
            pass: process.env.PASSWORD, // Using environment variables for enhanced security
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Confirmation Code for Student Registration',
        text: `Your confirmation code is: ${confirmationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
}
