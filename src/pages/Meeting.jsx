import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEllipsisH, faClock, faBars } from '@fortawesome/free-solid-svg-icons'; 

// Main Container to hold the sidebar and the content
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;

// Sidebar remains fixed on the left side
const SidebarContainer = styled.div`
  display: flex;
  background-color: #e5e8e8;
  box-sizing: border-box; 
`;

// Right Container for the content (middle content, calendar, and tasks)
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding: 20px;
  background-color: #f4f6f7;
  overflow-y: scroll;
`;

// Middle content (Upcoming and Previous Meetings)
const MiddleContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  padding-right: 20px;
`;

// Section Headers
const SectionHeader = styled.h2`
  font-size: 1.5rem;
  margin-top: 10px;
  margin-bottom: 30px;
  color: #333;
  text-align: left;
`;

// Toggle Button for smaller screens
const ToggleButton = styled.button`
  display: none;
  background-color: #629591;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Right-side calendar and tasks
const RightContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.8;
  max-width: 350px;
  margin-right: 20px;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 9;
    transform: ${({ showRightContent }) =>
      showRightContent ? 'translateX(0)' : 'translateX(100%)'};
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
  }
`;

// Calendar and tasks container styles
const CalendarContainer = styled.div`
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 20px;
`;

const MyTasksContainer = styled.div`
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 15px;
`;

// Additional styled components for meetings, avatars, etc.
const MeetingsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  width: 100%;
  margin-bottom: 30px;
  justify-content: space-between;

  & > div {
    flex-basis: 43%;
`;

const AttendiceJoin = styled.div`
  display: inline-flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const MeetingCard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${({ color }) => color || 'white'};
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MeetingTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
`;

const MeetingInfo = styled.div`
  font-size: 0.9rem;
  color: #777;
`;

const AttendeesContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
`;

const JoinButton = styled.button`
  background-color: ${({ color }) => color};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

const PreviousMeetingsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 35px;
  width: 100%;
  margin-bottom: 30px;
  padding-bottom: 20px;
  justify-content: space-between;

  & > div {
    flex-basis: 43%;
  }
`;

const MeetingDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #777;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const TaskIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: #629591;
  margin-right: 10px;
`;

const TaskTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskText = styled.span`
  font-size: 1rem;
  color: #333;
`;

const TaskTime = styled.span`
  font-size: 0.8rem;
  color: #777;
`;

// Main Meeting component
const Meeting = () => {
  const [date, setDate] = useState(new Date());
  const [showRightContent, setShowRightContent] = useState(false);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <MainContainer>
      {/* Sidebar */}
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      {/* Content Section */}
      <ContentContainer>
        <ToggleButton onClick={() => setShowRightContent(!showRightContent)}>
          <FontAwesomeIcon icon={faBars} />
        </ToggleButton>

        <MiddleContentContainer>
          <SectionHeader>Upcoming Meetings</SectionHeader>
          <MeetingsSection>
            {/* Add upcoming meeting cards */}
            <MeetingCard color="#fddddd">
              <Topbar>
                <MeetingTitle>Progress Meeting</MeetingTitle>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Topbar>
              <MeetingInfo>13:00 - 24/06</MeetingInfo>
              <AttendiceJoin>
                <AttendeesContainer>
                  <Avatar src="profile-image.jpg" alt="Avatar 1" />
                  <Avatar src="profile-image.jpg" alt="Avatar 2" />
                  <Avatar src="profile-image.jpg" alt="Avatar 3" />
                  <span>+1</span>
                </AttendeesContainer>
                <JoinButton color="#ff5b5b">Join</JoinButton>
              </AttendiceJoin>
            </MeetingCard>
            <MeetingCard color="#ddf7dd">
              <Topbar>
                <MeetingTitle>Progress Meeting</MeetingTitle>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Topbar>
              <MeetingInfo>13:00 - 24/06</MeetingInfo>
              <AttendiceJoin>
                <AttendeesContainer>
                  <Avatar src="profile-image.jpg" alt="Avatar 1" />
                  <Avatar src="profile-image.jpg" alt="Avatar 2" />
                  <Avatar src="profile-image.jpg" alt="Avatar 3" />
                  <span>+1</span>
                </AttendeesContainer>
                <JoinButton color="#4caf50">Join</JoinButton>
              </AttendiceJoin>
            </MeetingCard>
            <MeetingCard color="#dde5fd">
              <Topbar>
                <MeetingTitle>Progress Meeting</MeetingTitle>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Topbar>
              <MeetingInfo>13:00 - 24/06</MeetingInfo>
              <AttendiceJoin>
                <AttendeesContainer>
                  <Avatar src="profile-image.jpg" alt="Avatar 1" />
                  <Avatar src="profile-image.jpg" alt="Avatar 2" />
                  <Avatar src="profile-image.jpg" alt="Avatar 3" />
                  <span>+1</span>
                </AttendeesContainer>
                <JoinButton color="#5f5fff">Join</JoinButton>
              </AttendiceJoin>
            </MeetingCard>
            <MeetingCard color="#fddddd">
              <Topbar>
                <MeetingTitle>Progress Meeting</MeetingTitle>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Topbar>
              <MeetingInfo>13:00 - 24/06</MeetingInfo>
              <AttendiceJoin>
                <AttendeesContainer>
                  <Avatar src="profile-image.jpg" alt="Avatar 1" />
                  <Avatar src="profile-image.jpg" alt="Avatar 2" />
                  <Avatar src="profile-image.jpg" alt="Avatar 3" />
                  <span>+1</span>
                </AttendeesContainer>
                <JoinButton color="#ff5b5b">Join</JoinButton>
              </AttendiceJoin>
            </MeetingCard>
          </MeetingsSection>

          <SectionHeader>Previous Meetings</SectionHeader>
          <PreviousMeetingsSection>
            <MeetingCard>
              <Topbar>
                <MeetingTitle>Progress Meeting</MeetingTitle>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Topbar>
              <MeetingDetails>
                <span>13:00 - 24/06</span>
                <span>62 Minutes</span>
              </MeetingDetails>
              <p>
                The game features an anime-style open world environment and an action-based battle system using elemental magic and character-switching...
              </p>
              <AttendeesContainer>
                <Avatar src="profile-image.jpg" alt="Avatar 1" />
                <Avatar src="profile-image.jpg" alt="Avatar 2" />
                <Avatar src="profile-image.jpg" alt="Avatar 3" />
                <span>+1</span>
              </AttendeesContainer>
            </MeetingCard>
            <MeetingCard>
              <Topbar>
                <MeetingTitle>Progress Meeting</MeetingTitle>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Topbar>
              <MeetingDetails>
                <span>13:00 - 24/06</span>
                <span>62 Minutes</span>
              </MeetingDetails>
              <p>
                The game features an anime-style open world environment and an action-based battle system using elemental magic and character-switching...
              </p>
              <AttendeesContainer>
                <Avatar src="profile-image.jpg" alt="Avatar 1" />
                <Avatar src="profile-image.jpg" alt="Avatar 2" />
                <Avatar src="profile-image.jpg" alt="Avatar 3" />
                <span>+1</span>
              </AttendeesContainer>
            </MeetingCard>
            <MeetingCard>
              <Topbar>
                <MeetingTitle>Progress Meeting</MeetingTitle>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Topbar>
              <MeetingDetails>
                <span>13:00 - 24/06</span>
                <span>62 Minutes</span>
              </MeetingDetails>
              <p>
                The game features an anime-style open world environment and an action-based battle system using elemental magic and character-switching...
              </p>
              <AttendeesContainer>
                <Avatar src="profile-image.jpg" alt="Avatar 1" />
                <Avatar src="profile-image.jpg" alt="Avatar 2" />
                <Avatar src="profile-image.jpg" alt="Avatar 3" />
                <span>+1</span>
              </AttendeesContainer>
            </MeetingCard>
            <MeetingCard>
              <Topbar>
                <MeetingTitle>Progress Meeting</MeetingTitle>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Topbar>
              <MeetingDetails>
                <span>13:00 - 24/06</span>
                <span>62 Minutes</span>
              </MeetingDetails>
              <p>
                The game features an anime-style open world environment and an action-based battle system using elemental magic and character-switching...
              </p>
              <AttendeesContainer>
                <Avatar src="profile-image.jpg" alt="Avatar 1" />
                <Avatar src="profile-image.jpg" alt="Avatar 2" />
                <Avatar src="profile-image.jpg" alt="Avatar 3" />
                <span>+1</span>
              </AttendeesContainer>
            </MeetingCard>
          </PreviousMeetingsSection>
        </MiddleContentContainer>

        {/* Calendar and Tasks Section */}
        <RightContentContainer showRightContent={showRightContent}>
          <CalendarContainer>
            <Calendar onChange={onChange} value={date} />
          </CalendarContainer>

          <MyTasksContainer>
            <SectionHeader>My Tasks</SectionHeader>
            <TaskItem>
              <TaskIcon icon={faClock} />
              <TaskTextContainer>
                <TaskText>Presentation on the Project</TaskText>
                <TaskTime>12/09 - 20:30</TaskTime>
              </TaskTextContainer>
            </TaskItem>
            <TaskItem>
              <TaskIcon icon={faClock} />
              <TaskTextContainer>
                <TaskText>Presentation on the Project</TaskText>
                <TaskTime>12/09 - 20:30</TaskTime>
              </TaskTextContainer>
            </TaskItem>
            <TaskItem>
              <TaskIcon icon={faClock} />
              <TaskTextContainer>
                <TaskText>Presentation on the Project</TaskText>
                <TaskTime>12/09 - 20:30</TaskTime>
              </TaskTextContainer>
            </TaskItem>
            <TaskItem>
              <TaskIcon icon={faClock} />
              <TaskTextContainer>
                <TaskText>Presentation on the Project</TaskText>
                <TaskTime>12/09 - 20:30</TaskTime>
              </TaskTextContainer>
            </TaskItem>
          </MyTasksContainer>
        </RightContentContainer>
      </ContentContainer>
    </MainContainer>
  );
};

export default Meeting;
