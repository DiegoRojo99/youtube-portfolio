import React from 'react';
import styled from 'styled-components';

const Casette = () => {
  return (
    <StyledWrapper>
      <div className="Casette" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Casette {
    margin: auto;
    width: 100px;
    height: 30px;
    overflow: hidden;
    position: relative;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    box-shadow: 0px 35px 0 -5px #aaa, 0 -5px 0 0px #ddd, 0 -25px 0 -5px #fff,
      -25px -30px 0 0px #ddd, -25px 30px 0 0px #ddd, 25px -30px 0 0px #ddd,
      25px 30px 0 0px #ddd, 20px 10px 0 5px #ddd, 20px -10px 0 5px #ddd,
      -20px -10px 0 5px #ddd, -20px 10px 0 5px #ddd;
  }

  .Casette:after,
  .Casette:before {
    content: "";
    border-radius: 100%;
    width: 35px;
    height: 35px;
    display: block;
    position: absolute;
    border: 4px dashed #fff;
    bottom: -4px;
    transform: rotate(0deg);
    box-sizing: border-box;
    animation: tape 4s linear infinite;
  }

  .Casette:before {
    right: 0;
    box-shadow: 0 0 0 4px #fff, 0 0 0 34px #000;
  }

  .Casette:after {
    left: 0;
    box-shadow: 0 0 0 4px #fff, 0 0 0 65px #000;
  }

  @keyframes tape {
    0% {
      transform: rotate(0deg) scale(0.4);
    }

    100% {
      transform: rotate(-360deg) scale(0.4);
    }
  }`;

export default Casette;