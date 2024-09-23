import React from 'react';
import {
  OverlayContainer,
  OverlayContent,
  CloseButton,
  Sidebar,
  NoteList,
  NoteItem,
  NoteTitle,
  NoteDescription,
  SearchBar,
  AddButton,
  Header,
  Paragraph,
  Toolbar,
  ToolbarButton
} from './styles/OverlayStyles';

const Overlay = ({ onClose }) => {
  return (
    <OverlayContainer>
      <Sidebar>
        <h2>Notes</h2>
        <SearchBar placeholder="Search Notes..." />
        <NoteList>
          {[...Array(4)].map((_, idx) => (
            <NoteItem key={idx}>
              <NoteTitle>Project Update</NoteTitle>
              <NoteDescription>
                Project UpdateThe client requested additional features for the dashboard...
              </NoteDescription>
            </NoteItem>
          ))}
        </NoteList>
        <AddButton>+</AddButton>
      </Sidebar>

      <OverlayContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Toolbar>
          <ToolbarButton>General</ToolbarButton>
          <ToolbarButton>B</ToolbarButton>
          <ToolbarButton>I</ToolbarButton>
          {/* Add more toolbar buttons here */}
        </Toolbar>
        <Header>Profile Update</Header>
        <Paragraph>
          The client recently reached out to us with a request for additional features on the dashboard. These features include new data visualization charts, enhanced filtering options, and a user activity tracker. They believe these changes will provide more insights and a better user experience.
        </Paragraph>
        <Paragraph>
          Given the scope of these new requirements, we'll need to review our current timeline. Implementing these features could extend our initial estimates by a week or more, depending on the complexity of each feature. We should also consider if additional resources will be required to meet the new deadline.
        </Paragraph>
        <Paragraph>
          Before we proceed, it's important to analyze how these changes may affect the overall project structure and our team's workload. A meeting with the development team will be necessary to determine how best to distribute the tasks and avoid bottlenecks. This will also allow us to prioritize features based on client expectations.
        </Paragraph>
      </OverlayContent>
    </OverlayContainer>
  );
};

export default Overlay;
