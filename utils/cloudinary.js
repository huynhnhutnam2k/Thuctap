const dotenv = require("dotenv");

dotenv.config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: 'dhct',
    api_key: '489818737693918',
    api_secret: 'F7z5eOUN1aYGArDLBIwb1GotWQw',
  });
  
module.exports= cloudinary;