import React from 'react';
import { Link } from 'react-router-dom';
import aboutImg from '../../images/about/about-img.png';
import './About.css';

const About = () => {
    return (
        <div>
            <section className="about d-flex align-items-center w-100">
                <div  data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000" className="container">
                    <div className="row">
                        <div className="col-lg-6 d-flex flex-column justify-content-center">
                            <h1 className='m-0' data-aos="fade-up">We offer modern solutions for writing your Blogs</h1>
                            <h2 data-aos="fade-up" data-aos-delay="400">We are the team of talented designers making websites for writing blogs and for more connectivity.</h2>
                            <div data-aos="fade-up" data-aos-delay="600">
                                <div className="text-center text-lg-start">
                                    <Link className='text-decoration-none' to="/home">
                                        <button className="btn-lg btn-get-started d-inline-flex align-items-center justify-content-center align-self-center border-0 px-4 py-3"><span>Get Started</span>
                                            <i className="fa-solid fa-arrow-right"></i></button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 about-img" data-aos="zoom-out" data-aos-delay="200">
                            <img src={aboutImg} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;