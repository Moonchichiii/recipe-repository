import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";

function PostCreateForm({ formData, setFormData, onResetAndClose }) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: URL.createObjectURL(file),
                imageFile: file, 
            }));
        }
    };

    const handleCreatePost = async (event) => {
        event.preventDefault();
        
        createPost(
            formData.title,
            formData.imageFile, 
            formData.ingredients,
            formData.recipe,
            formData.cookingTime
        )
            .then((data) => {
                console.log('Post created successfully:', data);
                onResetAndClose(); 
            })
            .catch((error) => {
                console.error('Error creating post:', error);
            });
    };

    return (
        <form id="postCreateForm" onSubmit={handleCreatePost}>
            <div className="mb-3">
                {formData.image && (
                    <div className="preview">
                        <Image src={formData.image} alt="Recipe Preview" fluid />
                    </div>
                )}
                <label htmlFor="image" className="form-label">Image:</label>
                <input 
                    type="file" 
                    className="form-control" 
                    id="image" 
                    name="image" 
                    onChange={handleChangeImage}
                />
                <button type="button" className="btn btn-primary mt-2">Upload</button>
                <button type="button" className="btn btn-primary mt-2">Change image</button>
            </div>

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    name="title" 
                    placeholder="Recipe Title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="ingredients" className="form-label">Ingredients:</label>
                <textarea 
                    className="form-control" 
                    id="ingredients" 
                    name="ingredients" 
                    rows="4" 
                    placeholder="Ingredient 1&#10;Ingredient 2&#10;Ingredient 3"
                    value={formData.ingredients}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="recipe" className="form-label">Recipe:</label>
                <textarea 
                    className="form-control" 
                    id="recipe" 
                    name="recipe" 
                    rows="6" 
                    placeholder="Recipe instructions..."
                    value={formData.recipe}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="cookingTime" className="form-label">Cooking Time:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="cookingTime" 
                    name="cookingTime" 
                    placeholder="Cooking Time"
                    value={formData.cookingTime}
                    onChange={handleChange}
                />
            </div>
            
        </form>
    );
}

export default PostCreateForm;