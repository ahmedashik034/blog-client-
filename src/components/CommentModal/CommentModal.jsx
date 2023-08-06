import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./CommentModal.css";
import useFetch from "../../hooks/useFetch";
import useFirebase from "../../hooks/useFirebase";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function CommentModal({ data }) {
    // console.log(data);
    const [show, setShow] = useState(false);
    const { setDataLoading, postData, patchData, error, loading } = useFetch();
    const { user, updateName } = useFirebase();
    const { postId } = useParams();

    const modalEmailRef = useRef();
    const modalCommentRef = useRef();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleModalComment = (e) => {
        e.preventDefault();
        const modalEmail = modalEmailRef.current.value;
        const modalComment = modalCommentRef.current.value;
        const commentData = {
            comments: [...data?.comments, { email: modalEmail, comment: modalComment }],
        };
        // console.log(commentData);
        patchData(
          `https://bloge-server-devsobuj910.vercel.app/api/v1/blogs?_id=${postId}`,
          commentData
        );
        modalEmailRef.current.value = "";
        modalCommentRef.current.value = "";
        // new Swal.fire(
        //     'Good job!',
        //     'Your comment is added!',
        //     'success'
        //   )
    };

    return (
        <>
            <Button className="anonymousCommentBtn" onClick={handleShow}>
                Comment on this Blog
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Post Your Comment on This Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Enter your Email address</Form.Label>
                            <Form.Control
                                ref={modalEmailRef}
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Enter your Comment</Form.Label>
                            <Form.Control ref={modalCommentRef} as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="anonymousCommentClose"
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button onClick={handleModalComment} className="anonymousCommentSubmit">
                        Comment
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CommentModal;