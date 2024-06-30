import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with your actual EmailJS service ID, template ID, and public key
    const serviceId = 'service_nw7uvla';
    const templateId = 'template_gfofyf5';
    const publicKey = '96-YqPGCL1NeQ5lHs';

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      email_from: email,
      to_name: 'PetJs', // Replace with the recipient's name or email
      message: message,
    };

    try {
      // Send the email using EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('Email sent successfully!', response);

      // Clear the form after successful submission
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4} className="contactForm">
      <Input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button type="submit" colorScheme="blue">Send Message</Button>
    </VStack>
  );
};

export default ContactForm;










// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   Button,
//   Box,
//   Heading,
// } from '@chakra-ui/react';

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         'http://localhost:8000/api/contact/submit', // Ensure this matches your backend route
//         formData
//       );
//       console.log('Form submitted successfully:', response.data);
//       // Optionally, reset form fields after successful submission
//       setFormData({ name: '', email: '', message: '' });
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       // Handle error state or display error message to the user
//     }
//   };

//   return (
//     <Box className="contact-form" maxW="500px" mx="auto" p="4">
//       <Heading as="h2" mb="4">
//         Contact Us
//       </Heading>
//       <form onSubmit={handleSubmit}>
//         <FormControl mb="4">
//           <FormLabel htmlFor="name">Name:</FormLabel>
//           <Input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </FormControl>
//         <FormControl mb="4">
//           <FormLabel htmlFor="email">Email:</FormLabel>
//           <Input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </FormControl>
//         <FormControl mb="4">
//           <FormLabel htmlFor="message">Message:</FormLabel>
//           <Textarea
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             required
//           />
//         </FormControl>
//         <Button type="submit" colorScheme="blue">
//           Submit
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default ContactForm;

