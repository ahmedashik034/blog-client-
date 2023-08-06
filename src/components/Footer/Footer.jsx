import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div id="footer" className="footer">
            <div className="footer-content py-5">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-4 footerItem">
                            <h5 className="footerTitle my-3 py-1 fs-5 text-center fw-bold">ABOUT US</h5>
                            <p className='pt-4 pb-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, repellendus cum. Maiores, nulla quia voluptatem consequuntur unde mollitia iste!</p>
                            <p><a href="/about" className="footer-link-more">Learn More</a></p>
                        </div>

                        <div className="col-6 col-lg-3 footerItem">
                            <h5 className="footerTitle my-3 py-1 fs-5 text-center fw-bold">NAVIGATION</h5>
                            <ul className="footer-links list-unstyled">
                                <li><a href="/"><i className=""></i> Home</a></li>
                                <li><a href="/home"><i className=""></i> Blog</a></li>
                                <li><a href="/footer"><i className=""></i> Categories</a></li>
                                <li><a href="/singlePost"><i className=""></i> Single Post</a></li>
                                <li><a href="/about"><i className=""></i> About us</a></li>
                                <li><a href="/contact"><i className=""></i> Contact</a></li>
                            </ul>
                        </div>

                        <div className="col-6 col-lg-3">
                            <div className='footerItem d-flex flex-column align-items-center'>
                                <h5 className="footerTitle my-3 py-1 fs-5 text-center fw-bold">CATEGORIES</h5>
                                <ul className="footerList mb-5">
                                    <li className="footerListItem d-inline-block w-50 mt-2">Lifestyle</li>
                                    <li className="footerListItem d-inline-block w-50 mt-2">Photography</li>
                                    <li className="footerListItem d-inline-block w-50 mt-2">Sports</li>
                                    <li className="footerListItem d-inline-block w-50 mt-2">Movie</li>
                                    <li className="footerListItem d-inline-block w-50 mt-2">Tech</li>
                                    <li className="footerListItem d-inline-block w-50 mt-2">Food</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-2 ms-0">
                            <div className='footerItem d-flex flex-column align-items-center'>
                            <h5 className="footerTitle my-3 py-1 fs-5 text-center fw-bold">FOLLOW US</h5>
                            <div className="footerSocial d-flex aligh-items-center justify-content-center mt-2">
                                <i className="footerIcon fa-brands fa-square-facebook"></i>
                                <i className="footerIcon ms-2 fa-brands fa-square-twitter"></i>
                                <i className="footerIcon ms-2 fa-brands fa-square-instagram"></i>
                                <i className="footerIcon ms-2 fa-brands fa-square-pinterest"></i>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;