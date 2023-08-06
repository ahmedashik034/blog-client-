import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import './Login.css';
import useFirebase from '../../hooks/useFirebase';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ClockLoader } from 'react-spinners';
import { css } from '@emotion/react';

const Login = () => {
    const [show, setShow] = useState(false);

    const handleClickShowPassword = () => {
        setShow(!show);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const emailRef = useRef();
    const passwordRef = useRef();

     // authentication-------------------------------------->

     const location = useLocation();

     const {
         dataLoading,
        //  signInWithGoogle,
        //  signInWithGithub,
        //  signInWithTwitter,
        //  signInWithFacebook,
         signInWithEmail,
         user,
     } = useFirebase(location);
 
     // email password authentication-------------------------------------->
 
     const signInhandler = (e) => {
         e.preventDefault();
         const email = emailRef.current.value;
         const password = passwordRef.current.value;
         if (password.length < 6) {
             new Swal({
                 title: "Oops!",
                 text: "Password Must Be At Least 6 Characters",
                 icon: "error",
             });
         } else {
             signInWithEmail(email, password,location)
                
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
        return <Navigate to={'/'} />
    }

    return (
        <div className='login d-flex flex-column align-items-center justify-content-center'>
            <span className="loginTitle">Login</span>
            <Form  onSubmit={signInhandler} className="loginForm mt-4 d-flex flex-column">
                <Form.Group controlId="formGroupEmail">
                    <Form.Label className='my-2 mx-0'>Email</Form.Label>
                    <Form.Control ref={emailRef} className='p-2 bg-white border-0' type="email" placeholder="Enter Your Email..." />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label className='my-2 mx-0'>Password</Form.Label>
                    <Form.Control ref={passwordRef} className='p-2 bg-white border-0' type="password" placeholder="Enter Your password..." />
                </Form.Group>

                <button type="submit" className="mt-4 btn text-white loginBtn">Login</button>
                <p style={{ fontSize: '20px' }} className='text-center mt-3'>New in here?</p>
                <Link to="/register"><button className="btn text-white loginRegisterBtn w-100">Register</button></Link>               
            </Form>
        </div>
    );
};

export default Login;