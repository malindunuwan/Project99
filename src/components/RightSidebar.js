import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBell } from 'react-icons/fa';


// Styled Components
const RightSidebarContainer = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const ProfileCard = styled.div`
  width: 80%;
  max-height: 200px;
  background-color: #ebedef;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 30px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const ProfileName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const ProfileRole = styled.p`
  margin: 0;
  color: gray;
  font-size: 0.8rem;
  padding-top:5px;
`;

const WeekViewContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 8px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Arrow = styled.div`
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0 8px;
`;

const WeekDaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const WeekDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 14.1%;
  height: 65.6px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 18px;
  background-color: ${(props) => (props.isSelected ? "#34495e" : "#ffffff")};
  color: ${(props) => (props.isSelected ? "#ffffff" : "#333")};
  cursor: pointer;
  transition: background-color 0.5s, transform 0.5s;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#0056b3" : "#f0f0f0")};
    transform: scale(1.05);
    border-radius: 20px;
  }
`;

const DayName = styled.div`
  font-size: 0.75rem;
  color: ${(props) => (props.isSelected ? "#fff" : "#555")};
`;

const DayDate = styled.div`
  font-size: 0.85rem;
  color: ${(props) => (props.isSelected ? "#ffffff" : "#333")};
  font-weight: bold;
  background-color: ${(props) => (props.isSelected ? "#1f618d" : "transparent")};
  border-radius: 50%;
  padding: 6px;
  display: inline-block;
  margin-top: 6px;
`;

const UpcomingEventsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  min-height: 250px;
  max-height: 265px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a0;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 10px;
  }

  scrollbar-width: thin;
  scrollbar-color: #c4c4c4 #f1f1f1;
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
  &:last-child {
    border-bottom: none;
  }
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ffe3c2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-right: 15px;
  padding: 1px;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 60px);
`;

const EventName = styled.div`
  font-size: 0.82rem;
  color: #333;
`;

const EventTime = styled.div`
  font-size: 0.75rem;
  color: orange;
`;

const SectionTitle = styled.h4`
  width: 80%;
  text-align: left;
  color: #333;
  margin-bottom: 10px;
  margin-top: 0;
  font-size: 1rem;
  font-weight: bold;
`;

const getWeekDays = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });
};

const formatMonthYear = (date) => {
  const options = { month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const WeekView = () => {
  const [date, setDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(date);

  const weekDays = getWeekDays(date);

  const handlePreviousWeek = () => {
    const previousWeek = new Date(date);
    previousWeek.setDate(date.getDate() - 7);
    setDate(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(date);
    nextWeek.setDate(date.getDate() + 7);
    setDate(nextWeek);
  };

  return (
    <WeekViewContainer>
      <Header>
        <Arrow onClick={handlePreviousWeek}>&lt;</Arrow>
        <div>{formatMonthYear(date)}</div>
        <Arrow onClick={handleNextWeek}>&gt;</Arrow>
      </Header>
      <WeekDaysContainer>
        {weekDays.map((day, index) => (
          <WeekDay
            key={index}
            isSelected={day.toDateString() === selectedDate.toDateString()}
            onClick={() => setSelectedDate(day)}
          >
            <DayName isSelected={day.toDateString() === selectedDate.toDateString()}>
              {day.toLocaleDateString(undefined, { weekday: 'short' }).charAt(0)}
            </DayName>
            <DayDate isSelected={day.toDateString() === selectedDate.toDateString()}>
              {day.getDate()}
            </DayDate>
          </WeekDay>
        ))}
      </WeekDaysContainer>
    </WeekViewContainer>
  );
};


const RightSidebar = () => {
  const navigate = useNavigate(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(storedUser); // Directly set the user
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };
  if (!user) {
    return <p>Loading...</p>; // or a loading spinner
  }

  const events = [
    { name: "Weekly meeting", time: "Today, 6.30pm" },
    { name: "Project Proposal Submission", time: "Tomorrow, Before 5.00pm" },
    { name: "UI Design Deadline", time: "27th Aug, 5.00pm" },
    { name: "Weekly meeting", time: "Friday, 6.30pm" },
    { name: "Client Presentation", time: "Monday, 6.30pm" }
  ];

  return (
    <RightSidebarContainer>
      <ProfileCard onClick={handleProfileClick}>
        <SectionTitle>Profile</SectionTitle>
        <ProfileImage src="profile-image.jpg" alt="Profile" />
        <ProfileName>{user.first_name ? `${user.first_name} ${user.last_name}` : 'User'}</ProfileName>
        <ProfileRole>{user.area || 'N/A'}</ProfileRole>
      </ProfileCard>
      <WeekView />
      <SectionTitle>Upcoming</SectionTitle>
      <UpcomingEventsContainer>
        {events.map((event, index) => (
          <EventItem key={index}>
            <IconContainer>
              <FaBell color="#FF9500" />
            </IconContainer>
            <EventDetails>
              <EventName>{event.name}</EventName>
              <EventTime>{event.time}</EventTime>
            </EventDetails>
          </EventItem>
        ))}
      </UpcomingEventsContainer>
    </RightSidebarContainer>
  );
};

export default RightSidebar;
