const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/enrollments', { useNewUrlParser: true, useUnifiedTopology: true });

const enrollmentSchema = new mongoose.Schema({
  student_name: String,
  program_name: String,
  email: String,
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/enroll', (req, res) => {
  const enrollmentData = new Enrollment({
    student_name: req.body.student_name,
    program_name: req.body.program_name,
    email: req.body.email,
  });

  enrollmentData.save((err) => {
    if (err) {
      console.error(err);
      res.send('Error occurred during enrollment.');
    } else {
      // Data saved to MongoDB successfully
      res.send('Enrollment successful.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});