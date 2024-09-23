import React, { useEffect, useState } from 'react';
import { FaArrowCircleRight, FaClipboardList, FaPlus } from 'react-icons/fa'; 
import { Progress } from 'antd';
import Overlay from './Overlay'; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import {
  MainContentContainer, TopBar, Greeting, SearchBar, ProjectSummaryContainer,
  TabContainer, Tabs, Tab, ViewAllButton, ProjectTable, ProjectTableHeader,
  ProjectTableRow, ProjectTableCell, ProjectIcon, BottomContainer, ChartContainer,
  NotesContainer, AddNoteButton, SectionHeading, Note, NoteTitle, NoteText
} from './styles/MainContentStyles'; // Import styles from separate file

// Time Spent Data
const timeSpentData = [
  { name: 'Mon', hours: 9 },
  { name: 'Tue', hours: 8 },
  { name: 'Wed', hours: 6 },
  { name: 'Thu', hours: 7 },
  { name: 'Fri', hours: 7.5 },
];

// Sample project data for each tab
const projectData = {
  ongoing: [
    {
      name: 'Training Management System',
      type: 'Web App',
      startDate: 'Aug 01, 2024',
      endDate: 'Nov 31, 2024',
      progress: 10,
    },
    {
      name: 'Computer Shop Stock Management System',
      type: 'Web App',
      startDate: 'Jun 01, 2024',
      endDate: 'Sep 21, 2024',
      progress: 60,
    },
    {
      name: 'Blog Website',
      type: 'Web App',
      startDate: 'June 01, 2024',
      endDate: 'Aug 11, 2024',
      progress: 95,
    },
  ],
  completed: [
    {
      name: 'Project A',
      type: 'Web App',
      startDate: 'May 01, 2024',
      endDate: 'Aug 03, 2024',
      progress: 100,
    },
    {
      name: 'Project B',
      type: 'Mobile App',
      startDate: 'Feb 01, 2024',
      endDate: 'Jul 20, 2024',
      progress: 100,
    },
    {
      name: 'Project C',
      type: 'Website',
      startDate: 'Mar 01, 2024',
      endDate: 'Aug 15, 2024',
      progress: 100,
    },
  ],
  proposed: [
    {
      name: 'Project D',
      type: 'Web App',
      startDate: 'Not Decided Yet',
      endDate: 'Not Decided Yet',
      progress: 0,
    },
    {
      name: 'Project E',
      type: 'Mobile App',
      startDate: 'Not Decided Yet',
      endDate: 'Not Decided Yet',
      progress: 0,
    },
    {
      name: 'Project F',
      type: 'Website',
      startDate: 'Not Decided Yet',
      endDate: 'Not Decided Yet',
      progress: 0,
    },
  ],
};

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const MainContent = () => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(storedUser); // Directly set the user
  }, []);

  const [activeTab, setActiveTab] = useState('ongoing');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // Control overlay state
  const [overlayContent, setOverlayContent] = useState({ title: '', content: '' });

  const handleNoteClick = (noteTitle, noteContent) => {
    setOverlayContent({ title: noteTitle, content: noteContent });
    setIsOverlayOpen(true); // Open overlay with specific note details
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false); // Close the overlay
  };

  return (
    <MainContentContainer>
      <TopBar>
        <Greeting>
          {getGreeting()},
          {user ? `${user.first_name}` : 'User'}
        </Greeting>
        <SearchBar placeholder="Search for Options" />
      </TopBar>

      <ProjectSummaryContainer>
        <SectionHeading>Project Summary</SectionHeading>
        <TabContainer>
          <Tabs>
            <Tab active={activeTab === 'ongoing'} onClick={() => setActiveTab('ongoing')}>On Going</Tab>
            <Tab active={activeTab === 'completed'} onClick={() => setActiveTab('completed')}>Completed</Tab>
            <Tab active={activeTab === 'proposed'} onClick={() => setActiveTab('proposed')}>Proposed</Tab>
          </Tabs>
          <ViewAllButton>View All</ViewAllButton>
        </TabContainer>
        <ProjectTable>
          <thead>
            <tr>
              <ProjectTableHeader>Project Name</ProjectTableHeader>
              <ProjectTableHeader>Project Type</ProjectTableHeader>
              <ProjectTableHeader>Start Date</ProjectTableHeader>
              <ProjectTableHeader>End Date</ProjectTableHeader>
              <ProjectTableHeader>Progress</ProjectTableHeader>
            </tr>
          </thead>
          <tbody>
            {projectData[activeTab].map((project, index) => (
              <ProjectTableRow key={index}>
                <ProjectTableCell>
                  <ProjectIcon>
                    <FaClipboardList />
                  </ProjectIcon>
                  {project.name}
                </ProjectTableCell>
                <ProjectTableCell>{project.type}</ProjectTableCell>
                <ProjectTableCell>{project.startDate}</ProjectTableCell>
                <ProjectTableCell>{project.endDate}</ProjectTableCell>
                <ProjectTableCell>
                  <Progress percent={project.progress} strokeColor="#52c41a" />
                </ProjectTableCell>
              </ProjectTableRow>
            ))}
          </tbody>
        </ProjectTable>
      </ProjectSummaryContainer>

      <BottomContainer>
        <ChartContainer>
          <SectionHeading>Time Spent</SectionHeading>
          <ResponsiveContainer width="90%" height={200}>
            <BarChart data={timeSpentData} barCategoryGap="25%">
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis axisLine={false} tickLine={false} ticks={[0, 3, 6, 9, 12]} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip />
              <Bar dataKey="hours" fill="#475be8" background={{ fill: '#E8EAF6', radius: [10, 10, 10, 10] }} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <NotesContainer>
          <AddNoteButton onClick={() => handleNoteClick('New Note', 'Add details for a new note.')}>
            <FaPlus />
          </AddNoteButton>
          <SectionHeading>Notes</SectionHeading>
          <Note onClick={() => handleNoteClick('Design Meeting', 'Discuss the new dashboard design')}>
            <div>
              <NoteTitle>Design Meeting</NoteTitle>
              <NoteText>Discuss the new dashboard design</NoteText>
            </div>
            <FaArrowCircleRight />
          </Note>
          <Note onClick={() => handleNoteClick('Client Call', 'Follow up with the client on the project status')}>
            <div>
              <NoteTitle>Client Call</NoteTitle>
              <NoteText>Follow up with the client on the project status</NoteText>
            </div>
            <FaArrowCircleRight />
          </Note>
          <Note onClick={() => handleNoteClick('Team Sync', 'Weekly team sync-up to review progress')}>
            <div>
              <NoteTitle>Team Sync</NoteTitle>
              <NoteText>Weekly team sync-up to review progress</NoteText>
            </div>
            <FaArrowCircleRight />
          </Note>
        </NotesContainer>
      </BottomContainer>

      {isOverlayOpen && (
        <Overlay
          title={overlayContent.title}
          content={overlayContent.content}
          onClose={handleCloseOverlay}
        />
      )}
    </MainContentContainer>
  );
};

export default MainContent;
