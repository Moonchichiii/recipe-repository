import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../../../../context/AuthContext";
import { fetchCloudinarySignature, updateProfile } from "../../../../service/Api";

function ProfileSetup() {
  const defaultImageUrl = import.meta.env.VITE_DEFAULT_IMG_URL;

  const [bio, setBio] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState(defaultImageUrl);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const signatureData = await fetchCloudinarySignature();

      formData.append("timestamp", signatureData.timestamp);
      formData.append("signature", signatureData.signature);
      formData.append("api_key", signatureData.api_key);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dakjlrean/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      // Display error message to the user
      console.error("Error uploading image:", error.message);
      alert("Error uploading image. Please try again.");
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = defaultImageUrl;
    if (profileImage) {
      imageUrl = await handleImageUpload(profileImage);
    }

    if (imageUrl) {
      try {
        await updateProfile(user.id, bio, imageUrl);
        navigate("/dashboard");
      } catch (error) {
        // Display error message to the user
        console.error("Error updating profile:", error.message);
        alert("Error updating profile. Please try again.");
      }
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    } else {
      setProfileImagePreview(defaultImageUrl);
    }
  };

  return (
    <div className="profile-setup-container">
      {profileImagePreview && (
        <img
          src={profileImagePreview}
          alt="Profile Preview"
          style={{ width: "100px", height: "100px" }}
        />
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="profileImage">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Save Profile
        </Button>
      </Form>
    </div>
  );
}

export default ProfileSetup;
