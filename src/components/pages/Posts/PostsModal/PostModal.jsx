import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PostCreateForm from "../../../PostsForm/PostForm";

function PostModal() {
    const [show, setShow] = useState(false);
    const initialFormState = {
        title: "",
        image: null,
        ingredients: "",
        recipe: "",
        cookingTime: "",
    };
    const [formData, setFormData] = useState(initialFormState);

    const handleResetAndClose = () => {
        setFormData(initialFormState);
        setShow(false);
    };

    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create New Post
            </Button>
            <Modal show={show} onHide={handleResetAndClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PostCreateForm 
                        formData={formData} 
                        setFormData={setFormData}
                        onResetAndClose={handleResetAndClose} 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleResetAndClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" form="postCreateForm">
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PostModal;