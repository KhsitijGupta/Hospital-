const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctors_name: { type: String },
  qualifications: { type: String },
  image: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other', 'M', 'F'], required: true },
  date_of_birth: { type: Date, required: true },
  contact_number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postal_code: { type: String, required: true },
  country: { type: String, required: true },
  specialization: { type: String, required: true },
  years_of_experience: { type: Number, required: true },
  education: { type: String, required: true },
  hospital_affiliations: { type: String },
  languages_spoken: { type: String },
  profile_picture: { type: String },
  bio: { type: String },
  position: { type: String, required: true },
  institution: { type: String, required: true },
  certification_name: { type: String, required: true },
  date_awarded: { type: Date, required: true },
  expiration_date: { type: Date },
  start_date: { type: Date, required: true },
  end_date: { type: String },
  description: { type: String }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
