const Profile = require("../models/profile.model");

async function addProfile(req, res) {
    try {
      const userId = req.user.id;
  
      // 1. Check if profile already exists
      const existingProfile = await Profile.findOne({ where: { id: userId } });
  
      if (existingProfile) {
        return res.status(400).json({ message: "Profile already exists for this user." });
      }
  
      const {
        FirstName,
        MiddleName,
        LastName,
        PhoneNumber,
        Address,
        Occupation,
        WorkExperience
      } = req.body;
  
      // 2. Basic validation
      if (!FirstName || !LastName || !PhoneNumber) {
        return res.status(400).json({ message: "FirstName, LastName, and PhoneNumber are required." });
      }
  
      // 3. Create new profile
      const profile = await Profile.create({
        id: userId,
        FirstName,
        MiddleName,
        LastName,
        PhoneNumber,
        Address,
        Occupation,
        WorkExperience
      });
  
      return res.status(201).json({
        message: "Profile created successfully.",
        profile
      });
  
    } catch (error) {
      console.error("Add Profile Error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user.id;

    // Ensure user has a profile first
    const existingProfile = await Profile.findOne({ where: { id: userId } });

    if (!existingProfile) {
      return res.status(404).json({ message: "Profile not found for the user." });
    }

    // Don't allow updating username via profile update
    if (req.body.username) {
      return res.status(400).json({ message: "Username cannot be updated." });
    }

    const {
      FirstName,
      MiddleName,
      LastName,
      PhoneNumber,
      Address,
      Occupation,
      WorkExperience
    } = req.body;

    // Optional validation: At least one field to update
    if (
      !FirstName && !MiddleName && !LastName && !PhoneNumber &&
      !Address && !Occupation && !WorkExperience
    ) {
      return res.status(400).json({ message: "No valid fields provided to update." });
    }

    // Update the profile
    await Profile.update(
      {
        FirstName,
        MiddleName,
        LastName,
        PhoneNumber,
        Address,
        Occupation,
        WorkExperience
      },
      { where: { id: userId } }
    );

    const updatedProfile = await Profile.findOne({ where: { id: userId } });

    return res.status(200).json({
      message: "Profile updated successfully.",
      profile: updatedProfile
    });

  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}


module.exports = {
    addProfile,
    updateProfile
}