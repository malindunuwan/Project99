import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import MainContent from '../components/MainContent';


// Sidebar remains fixed on the left side
const SidebarContainer = styled.div`
  display: flex;
  background-color: #e5e8e8;
  box-sizing: border-box; 
`;

// Main content container that takes up remaining space
const MainContentContainer = styled.div`
  flex-grow: 1; /* Takes up remaining space */
  padding: 6px; /* Padding inside main content */
  background-color: #f0f0f0;
  box-sizing: border-box; /* Ensure padding is included in width */
`;

const ProjectPage = () => {
    return (
    <SidebarContainer>
        <Sidebar />
    </SidebarContainer>
    
    )

  };
  
  export default ProjectPage;