import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import { FaBell, FaUsers, FaVideo, FaListAlt, FaCog, FaBook, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa'; // Import FaSignOutAlt
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #e5e8e8;
  display: flex;
  flex-direction: column;
  align-items: start;
  box-sizing: border-box;
  padding-left: 10px;
  flex-grow: 1;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  padding: 20px;
`;

const NavItem = styled.div`
  padding: 20px 20px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  border-radius: 15px;
  text-decoration: none;

  &:hover {
    background-color: #d0d0d0;
    width: 190px;
  }

  &.active, &:active {
    background-color: #b2babb;
    width: 190px;
  }
`;

const NavText = styled.span`
  margin-left: 15px;
`;

const ClockContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const ClockWrapper = styled.div`
  width: 100px;
  height: 100px;
  transform: scale(0.5);
  transform-origin: center;
  margin-left: -45px;
  margin-top: -10px;
  padding-right: 15px;

  .react-clock__face {
    background-color: #333; /* Dark theme inside the clock */
  }

  .react-clock__mark__body {
    background-color: white; /* White ticks */
  }

  .react-clock__hour-hand__body {
    background-color: white; /* White hour hand */
  }

  .react-clock__minute-hand__body {
    background-color: white; /* White minute hand */
  }

  .react-clock__second-hand__body {
    background-color: red; /* Keep second hand red for visibility */
  }

  .react-clock__mark__number {
    color: #e5e7e9; /* White numbers */
  }
`;

const DigitalClockContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:12px;
`;

const DigitalClock = styled.div`
  font-size: 1.5rem;
  color: black;
`;

const Location = styled.div`
  font-size: 1rem;
  color: #333;
`;

const Divider = styled.hr`
  width: 100%;
  border: 0;
  height: 2px; /* Increase thickness */
  background-color: #bbb; /* Change color for better visibility */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Enhanced shadow effect */
  margin-top:40px;

  border-radius: 2px; /* Optional: Adds rounded corners */
`;

const LogoutButton = styled.button`
  padding: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 20px;

  &:hover {
    background-color: #e60000;
  }

  &:active {
    background-color: #b30000;
    transform: scale(0.98);
  }
`;

const Sidebar = () => {
  const [value, setValue] = useState(new Date());
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = moment().format('HH:mm');
  const location = "Colombo, Sri Lanka";

  const handleGeneralSettingsClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/'); // Redirect to login page or another route
  };

  return (
    <SidebarContainer>
      <Logo>
        <img src="appslogo.png" alt="Logo" style={{ width: '150px' }} />
      </Logo>
      <NavItem as={Link} to="/dashboard">
        <FaTachometerAlt />
        <NavText>Dashboard</NavText>
      </NavItem>
      <NavItem>
        <FaBell />
        <NavText>Notifications</NavText>
      </NavItem>
      <NavItem>
        <FaUsers />
        <NavText>Company Team</NavText>
      </NavItem>
      <NavItem as={Link} to="/meeting">
        <FaVideo />
        <NavText>Meetings</NavText>
      </NavItem>
      <NavItem as={Link} to="/project">
        <FaListAlt />
        <NavText>Projects</NavText>
      </NavItem>
      <NavItem>
        <FaBook />
        <NavText>Training Modules</NavText>
      </NavItem>
      <NavItem onClick={handleGeneralSettingsClick}>
        <FaCog />
        <NavText>General Settings</NavText>
      </NavItem>
      {showLogout && (
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </LogoutButton>
      )}
      <Divider/>
      <ClockContainer>
        <ClockWrapper>
          <Clock value={value} renderNumbers={true} />
        </ClockWrapper>
        <DigitalClockContainer>
          <DigitalClock>{time}</DigitalClock>
          <Location>{location}</Location>
        </DigitalClockContainer>
      </ClockContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
