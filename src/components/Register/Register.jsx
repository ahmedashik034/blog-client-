import React from "react";
import { Form } from "react-bootstrap";
import "./Register.css";
import useFetch from "../../hooks/useFetch";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import Swal from "sweetalert2";
import { ClockLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import { css } from '@emotion/react';

const Register = () => {
    const { data, postData, error, loading } = useFetch();
    const { signUpWithEmailAndPassword, setUser, user, updateName,dataLoading } = useFirebase();

    const location = useLocation();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const registrationHandler = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (password.length < 6) {
            new Swal({
                title: "Oops!",
                text: "Password Must Be At Least 6 Characters",
                icon: "error",
            });
        } else {
            // console.log({ name, email, password });
            nameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            signUpWithEmailAndPassword(email, password, location)
                .then((userCredential) => {
                    updateName(name);
                    setUser(userCredential.user);
                    console.log(user);

                    const userData = { name, email };
                    const userUpload = postData(
                        "https://bloge-server.vercel.app/api/v1/users",
                        userData
                    );

                    new Swal({
                        title: "Hurray!",
                        text: "Your're successfully registered :)",
                        icon: "success",
                    });
                })

                .catch((err) => {
                    // setError(err.message);
                    console.log(err.message);
                    new Swal({
                        title: "Oops!",
                        text: err.message,
                        icon: "error",
                    });
                });
        }
    };

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    if (dataLoading) {
        return (
            <ClockLoader
                color="#E12454"
                size={"300"}
                loading={true}
                css={override}
                display={"block"}
            />
        );
    }

    if (user?.auth) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="register d-flex flex-column align-items-center justify-content-center">
            <span className="registerTitle pt-0">Register</span>
            <Form onSubmit={registrationHandler} className="registerForm d-flex flex-column">
                <Form.Group controlId="formGroupName">
                    <Form.Label className="my-2 mx-0">Username</Form.Label>
                    <Form.Control
                        ref={nameRef}
                        className="p-2 bg-white border-0"
                        type="text"
                        placeholder="Enter Your Name"
                    />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label className="my-2 mx-0">Email</Form.Label>
                    <Form.Control
                        ref={emailRef}
                        className="p-2 bg-white border-0"
                        type="email"
                        placeholder="Enter Your Email"
                    />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label className="my-2 mx-0">Password</Form.Label>
                    <Form.Control
                        ref={passwordRef}
                        className="p-2 bg-white border-0"
                        type="password"
                        placeholder="Enter Your password"
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Check
                        required
                        name="terms"
                        label="Agree to terms and conditions"
                        // onChange={handleChange}
                        // isInvalid={!!errors.terms}
                        // feedback={errors.terms}
                        feedbackType="invalid"
                        id="validationFormik0"
                    />
                </Form.Group>

                <button type="submit" className="mt-3 btn text-white registerBtn">
                    Register
                </button>
                <p style={{ fontSize: "20px" }} className="text-center mt-3">
                    Already have an account?
                </p>
                <Link to="/login">
                    <button className="btn text-white registerLoginBtn w-100">Login</button>
                </Link>
            </Form>
        </div>
    );
};

export default Register;
