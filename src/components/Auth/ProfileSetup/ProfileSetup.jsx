import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { setupProfile } from '../../../service/Api';

function ProfileSetup() {
    const defaultImageUrl = import.meta.env.VITE_DEFAULT_IMG_URL;
    const [bio, setBio] = useState('');
    const [profileImagePreview, setProfileImagePreview] = useState(defaultImageUrl);
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleImageUpload = async (file) => {
        // const { signature, timestamp, api_key } = await getCloudinarySignature();
        //const formData = new FormData();
    // formData.append('file', file);
    // formData.append('signature', signature);
    // formData.append('timestamp', timestamp);
        //

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);


        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dakjlrean/image/upload',                
                formData
            );
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image', error);
            return null; 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = defaultImageUrl; 
        if (profileImage) {
            profileImageUrl = await handleImageUpload(profileImage);
        }
        
        if (profileImageUrl) {
            try {
                await setupProfile(user.id, bio, profileImageUrl);
                navigate('/dashboard');
            } catch (error) {
                console.error('Error updating profile', error);
            }
        }
    };

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
                <img src={profileImagePreview} alt="Profile Preview" style={{ width: '100px', height: '100px' }} />
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
                    <Form.Control 
                        type="file"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save Profile
                </Button>
            </Form>
        </div>
    );
}

export default ProfileSetup;

