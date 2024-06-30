// const Contact = require('../models/contact.model');
// const nodemailer = require('nodemailer');

// // Create a transporter using SMTP
// const transporter = nodemailer.createTransport({
//   host: 'smtp.example.com',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'bonomario1999@gmail.com', // Your email address
//     pass: 'S@fepa77' // Your email password
//   }
// });

// exports.submitContactForm = async (req, res) => {
//   const { name, email, message } = req.body;

//   try {
//     const newContact = new Contact({
//       name,
//       email,
//       message
//     });

//     await newContact.save();

//     // Send email notification
//     await transporter.sendMail({
//       from: 'your-email@example.com', // sender address
//       to: 'bonomario1999@gmail.com', // list of receivers
//       subject: 'New Contact Form Submission', // Subject line
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
//     });

//     res.status(201).json({ message: 'Contact form submitted successfully' });
//   } catch (err) {
//     console.error('Error submitting contact form:', err);
//     res.status(500).json({ error: 'Failed to submit contact form' });
//   }
// };

const Contact = require('../models/contact.model');
const nodemailer = require('nodemailer');

// Load environment variables if using dotenv or similar
require('dotenv').config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

exports.submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;
    const senderEmail = req.body.senderEmail || process.env.DEFAULT_SENDER_EMAIL;

    try {
        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        // Send email notification
        await transporter.sendMail({
            from: senderEmail,
            to: 'sandbox.smtp.mailtrap.io', // Replace with your recipient email
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (err) {
        console.error('Error submitting contact form:', err);
        res.status(500).json({ error: 'Failed to submit contact form' });
    }
};
