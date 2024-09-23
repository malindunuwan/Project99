import React from 'react';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import styled from 'styled-components';  
import MainContent from '../components/MainContent';

// Container for the dashboard layout
const DashboardContainer = styled.div`
  display: flex;
  box-sizing: border-box; 
`;

// Sidebar container with fixed width
const SidebarContainer = styled.div`
  display: flex;
  background-color: #e5e8e8;
  box-sizing: border-box; 
`;

// Right Sidebar container with fixed width
const RightSidebarContainer = styled.div`
  width: 300px; /* Fixed width for the right sidebar */
  background-color: #f8f9fa;
  box-sizing: border-box; 
`;

// Main content container that takes up remaining space
const MainContentContainer = styled.div`
  flex-grow: 1; /* Takes up remaining space */
  padding: 6px; /* Padding inside main content */
  background-color: #f0f0f0;
  box-sizing: border-box; /* Ensure padding is included in width */
`;


const Dashboard = () => {
  return (
    <DashboardContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContentContainer>
        <MainContent />
      </MainContentContainer>
      <RightSidebarContainer>
        <RightSidebar />
      </RightSidebarContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
