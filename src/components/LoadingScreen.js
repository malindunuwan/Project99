import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const blinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const LoadingLogo = styled.img`
  max-width: 350px;
  animation: ${blinkAnimation} 1s ease-in-out infinite;
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <LoadingLogo src="appslogo.png" alt="Loading..." />
    </LoadingContainer>
  );
};

export default LoadingScreen;
