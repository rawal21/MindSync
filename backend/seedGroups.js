const mongoose = require('mongoose');
const ChatGroup = require('./models/ChatGroup');
const wellnessRoutes = require("./models/WellnessRoutine");
const WellnessRoutine = require('./models/WellnessRoutine');
require("dotenv").config()
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB Connection Error:', err));

const chatGroups = [
  { name: 'Mental Wellness', shortName: 'MW', activeMembers: 0 },
  { name: 'Depression Support', shortName: 'DS', activeMembers: 0 },
  { name: 'Anxiety Relief', shortName: 'AR', activeMembers: 0 },
  { name: 'Mindfulness & Meditation', shortName: 'MM', activeMembers: 0 },
  { name: 'Addiction Recovery', shortName: 'AR', activeMembers: 0 },
  { name: 'LGBTQ+ Mental Health', shortName: 'LMH', activeMembers: 0 },
  { name: 'Stress Management', shortName: 'SM', activeMembers: 0 },
  { name: 'Emotional Support', shortName: 'ES', activeMembers: 0 },
  { name: 'Self-Improvement & Growth', shortName: 'SG', activeMembers: 0 },
  { name: 'Sleep & Insomnia Help', shortName: 'SI', activeMembers: 0 },
];

async function seedDB() {
  try {
    await ChatGroup.deleteMany({}); // Clear existing data
    await WellnessRoutine.deleteMany({});
    await ChatGroup.insertMany(chatGroups);
    console.log('Chat groups added successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
  
}

seedDB();
