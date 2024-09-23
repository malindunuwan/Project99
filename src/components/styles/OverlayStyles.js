import styled from 'styled-components';

// Container for the whole overlay with precise shadow and dimensions
export const OverlayContainer = styled.div`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 85%;
  display: flex;
  background: #fff;
  border-radius: 25px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  z-index: 1000;
  overflow: hidden;
`;

// Left Sidebar containing Notes list
export const Sidebar = styled.div`
  width: 30%;
  background: #f7f7f8;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;

  h2 {
    font-size: 1.2em;
    font-weight: bold;
  }

`;

export const SearchBar = styled.input`
  width: 92%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
`;

export const NoteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  max-height: calc(100% - 80px); /* To ensure AddButton is visible and reserved space */
  overflow-y: auto;
`;


export const NoteItem = styled.div`
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const NoteTitle = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

export const NoteDescription = styled.div`
  font-size: 0.85rem;
  color: #888;
`;

export const AddButton = styled.button`
  background: #898989;
  color: #fff;
  font-size: 28px;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;
// Content area to the right of the sidebar
export const OverlayContent = styled.div`
  width: 70%;
  padding: 30px;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto; /* This makes the content scrollable */
  max-height: 100%; /* Restrict height for scroll */
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 8px;
`;

export const ToolbarButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #888;
`;

// Close button in the top-right corner of the overlay
export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
`;

export const Header = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
`;
