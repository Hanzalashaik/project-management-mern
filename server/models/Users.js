import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  projectName: { type: String },
  description: { type: String },
  status: { type: String }, 
  createdBy: { type: String },
  assignedTo: { type: String },
  startDate: { type: String },
  endDate: { type: String },
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  fullName: {
    type: String,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
  },
  title: {
    type: String,
  },
  password: {
    type: String,
  },
  projects: [projectSchema], 
});

const User = mongoose.model('User', userSchema, 'users');

export default User;
