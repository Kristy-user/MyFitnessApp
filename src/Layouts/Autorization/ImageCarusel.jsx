import React, { useEffect, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import styled from 'styled-components';
import loginPageimg1 from '../../assets/images/loginPage/1.jpg';
import loginPageimg2 from '../../assets/images/loginPage/2.jpg';
import loginPageimg3 from '../../assets/images/loginPage/3.jpg';
import loginPageimg4 from '../../assets/images/loginPage/4.jpg';

const SyledSplede = styled.div`
  img {
    /* width: 100%; */
    max-height: 25rem;
    opacity: 0.85;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 986px) {
    display: none;
  }
`;

const ImageCarusel = () => {
  const ref = useRef();
  ref.current = null;
  // useEffect(() => {
  //   if (ref.current) {
  //     console.log(ref.current.splide.length);
  //   }
  // });
  return (
    <SyledSplede>
      <Splide
        ref={ref}
        options={{
          start: 0,
          type: 'fade',
        }}
      >
        <SplideSlide>
          <img src={loginPageimg1} alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src={loginPageimg2} alt="Image 2" />
        </SplideSlide>
        <SplideSlide>
          <img src={loginPageimg3} alt="Image 2" />
        </SplideSlide>
        <SplideSlide>
          <img src={loginPageimg4} alt="Image 2" />
        </SplideSlide>
      </Splide>
    </SyledSplede>
  );
};

export default ImageCarusel;
