const Profile = require("../models/Profile");
const { generateProfileDocument } = require("../Utils/profileUtils.js");

// Get Profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
};

// Generate Document
const generateDocument = async (req, res) => {
  try {
    const documentUrl = await generateProfileDocument(req.params.id);
    res.json({ documentUrl });
  } catch (error) {
    res.status(500).json({ error: "Error generating document" });
  }
};

module.exports = { getProfile, updateProfile, generateDocument };
