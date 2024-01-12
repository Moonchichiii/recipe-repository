import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PostCreateForm from '../../Posts/PostsForm/PostForm';
function PostModal({ show, onHide }) {
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
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={handleResetAndClose}
      backdrop="static"
      keyboard={false}
    >
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
  );
}

export default PostModal;
