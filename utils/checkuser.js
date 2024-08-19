// Function to calculate the distance between two coordinates using Haversine formula

const userSchema = require('../models/user');
const {sendSms}=require("./sms");
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

// Function to check if the user is within 30 km of the reported animal
const isCheckUser = async (lat, lng) => {
  try {
      // Fetch all users
      const users = await userSchema.find();

      for (let user of users) {
          const { latitude, longitude } = user.location;
          
          // Calculate the distance between user and reported animal
          const distance = getDistance(lat, lng, latitude, longitude);

          // Check if the distance is less than 30 km
          if (distance < 3000) {
              console.log(`User ${user.name} is within ${distance.toFixed(2)} km of the reported animal.`);
              // You can add additional logic here to notify the user or handle the situation
              sendSms("animal near arround you",user.phoneNumber)
          }
      }
  } catch (error) {
      console.log(error);
  }
};

module.exports={isCheckUser};