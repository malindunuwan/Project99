import styled from 'styled-components';

export const MainContentContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #f0f0f0;
  display:flex;
  flex-direction:column;
`;

// Top Bar Components
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Greeting = styled.h2`
  font-weight: bold;
  color: #2c3e50;
  font-family: 'Lato', sans-serif;
`;

export const SearchBar = styled.input`
  padding: 8px 15px;
  border-radius: 25px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  width: 250px;
  background-color: #f8f9fa;
`;

// Project Summary Components
export const ProjectSummaryContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
`;

export const Tabs = styled.div`
  display: flex;
`;

export const Tab = styled.div`
  margin-right: 20px;
  padding-bottom: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: ${(props) => (props.active ? "#333" : "#aaa")};
  border-bottom: ${(props) => (props.active ? "2px solid #333" : "none")};
`;

export const ViewAllButton = styled.button`
  background-color: #52c41a;
  color: white;
  padding: 8px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: -18px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #42a115;
    transform: scale(1.05);
  }

  &:active {
    background-color: #36910e;
    transform: scale(0.98);
  }
`;


export const ProjectTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  text-align: left;
`;

export const ProjectTableHeader = styled.th`
  padding: 10px 0;
  font-size: 0.9rem;
  color: #555;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:nth-child(1) {
    width: 30%;
  }
  
  &:nth-child(2) {
    padding-left: 20px;
    width: 20%;
  }

  &:nth-child(3), &:nth-child(4) {
    width: 15%;
  }

  &:nth-child(5) {
    width: 20%;
  }
`;

export const ProjectTableRow = styled.tr`
  border-top: 1px solid #eee;
`;

export const ProjectTableCell = styled.td`
  padding: 10px 0;
  font-size: 0.9rem;
  color: #333;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:nth-child(2) {
    padding-left: 30px;
  }
`;

export const ProjectIcon = styled.div`
  margin-right: 10px;
  color: #a855f7;
  display: inline-block;
`;

// Time Spent and Notes Components
export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

`;

export const ChartContainer = styled.div`
  background-color: #f7f8fa;
  border-radius: 15px;
  padding-top:20px;
  width: 60%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const NotesContainer = styled.div`
  background-color: #f7f8fa;
  border-radius: 15px;
  padding: 12px;
  width: 35%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

// AddNoteButton for the plus icon
export const AddNoteButton = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  background-color: #34495e;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.6rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #283747;
  }

  &:active {
    background-color: #1b2631;
  }
`;

export const Note = styled.div`
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 43px;
  cursor: pointer; /* Add cursor pointer for clickability */

  @media (max-width: 768px) {
    padding: 8px;
    height: 30px;
  }

  &:hover {
    background-color: #f0f0f0; /* Change background color on hover */
  }
`;

export const NoteTitle = styled.h5`
  padding: 2px 0;
  margin: 0;
  font-size: 0.8rem;
  color: #333;
  display: flex;
  align-items: center;
`;

export const NoteText = styled.p`
  margin: 5px 0 0 0;
  color: #555;
  font-size: 0.7rem;

  @media (max-width: 968px) {
    display: none;
  }

  @media (max-width: 1200px) {
    font-size: 0.6rem;
  }
`;

// Section Headings
export const SectionHeading = styled.h3`
  margin: 0 0 16px 0;
  color: #333;
  font-size: 1.2rem;
  font-weight: 500;
`;