import React from 'react';
import './AboutFeature.css';
import featureOne from '../../images/about/about-mission.jpg';
import featureThree from '../../images/about/about-vision.jpg';
import featureTwo from '../../images/about/about-plan.jpg';

const AboutFeature = () => {
  return (
    <div>
      <section id="about">
        <div className="container" data-aos="fade-up">

          <div className="row about-cols">
            <div className="col-md-4"  data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
              <div className="about-col">
                <div className="img">
                  <img src={featureOne} alt="" className="img-fluid" />
                  <div className="icon"><i className="fa-solid fa-chart-simple"></i></div>
                </div>
                <h2 className="title"><a className='text-decoration-none' href="/">Our Mission</a></h2>
                <p className="titleDesc">
                  Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="col-md-4"  data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
              <div className="about-col">
                <div className="img">
                  <img src={featureTwo} alt="" className="img-fluid" />
                  <div className="icon"><i className="fa-solid fa-lightbulb"></i></div>
                </div>
                <h2 className="title"><a className='text-decoration-none' href="/">Our Plan</a></h2>
                <p className='titleDesc'>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </div>
            <div className="col-md-4"  data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
              <div className="about-col">
                <div className="img">
                  <img src={featureThree} alt="" className="img-fluid" />
                  <div className="icon"><i className="fa-solid fa-calendar-days"></i></div>
                </div>
                <h2 className="title"><a className='text-decoration-none' href="/">Our Vision</a></h2>
                <p className='titleDesc'>
                  Nemo enim ipsam voluptatem quia voluptas sit aut odit aut fugit, sed quia magni dolores eos qui ratione voluptatem sequi nesciunt Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutFeature;