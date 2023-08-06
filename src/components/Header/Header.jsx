import React from 'react';
import './Header.css'
import bg from '../../images/blog-bg.jpg';
import { TypeAnimation } from 'react-type-animation';

const Header = () => {
    return (
        <div
         
        className='header'>
            <div className="headerTitle d-flex align-items-center flex-column">
                <TypeAnimation className='headerTitleSm'
                    sequence={[
                        '', // Types 'One'
                        1000, // Waits 1s
                        'Write Your Blog..', // Deletes 'One' and types 'Two'
                        2000, // Waits 2s
                        'Write Your Blog..',
                        2000, // Types 'Three' without deleting 'Two'
                        () => {
                            ; // Place optional callbacks anywhere in the array
                        }
                    ]}
                    wrapper="div"
                    cursor={true}
                    repeat={Infinity}
                    style={{ fontSize: '1.5em' }}
                />

                {/* <span className="headerTitleSm">Write Your Blog</span> */}
                <span className="headerTitleLg">BlogBook</span>
            </div>
            <img className='headerImg img-fluid' src={bg} alt="" />
        </div>
    );
};

export default Header;