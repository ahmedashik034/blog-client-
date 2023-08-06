import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';
import './Home.css';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <h1 className='recentBlog mt-5 ps-5 shadow'>Recent Blogs</h1>
            <div className='home'>
                <Posts></Posts>
            </div>
            <div className="text-center mb-3">
                <Link className='text-decoration-none' to="/allBlogs">
                    <button className="btn-lg btn-see-more d-inline-flex align-items-center justify-content-center px-4 py-4 mt-0 mb-3"><span>See More</span>
                        {/* <i className="fa-solid fa-arrow-right"></i> */}
                        </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;