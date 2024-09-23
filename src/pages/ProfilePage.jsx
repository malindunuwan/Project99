import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const ProfilePageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #f0f0f0;
`;

const SidebarWrapper = styled.div`
  width: 250px;
  flex-shrink: 0;
  background-color: #f8f9fa;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const ProfileHeader = styled.h1`
  align-self: flex-start;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const ProfileBanner = styled.div`
  width: 97%;
  max-width: 1500px;
  min-height: 200px;
  background-image: url('banner.jpg'); /* Replace this with the correct path */
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
`;

const ProfileName = styled.h1`
  margin-top: 60px;
  text-align: center;
  font-size: 1.5rem;
  color: #333;
`;

const StatusBadge = styled.span`
  display: inline-block;
  background-color: #28a745;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const InfoSectionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 97%;
  max-width: 1500px;
  margin-top: 40px;
  gap: 20px;
`;

const InfoCard = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
  width: 30%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: #333;
  margin-top:5px;
  padding-bottom:10px;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const SkillIcon = styled.img`
  width: 35px;
  height: 35px;
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 10px;
`;

const AddSkillContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const SkillSearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%;
  margin-bottom: 10px;
`;

const SuggestionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  position: relative;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ConversationListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const AddConversationIcon = styled(FaPlus)`
  cursor: pointer;
  color: #007bff;
  font-size: 1.2rem;
`;

const ConversationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ConversationDetails = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const ConversationImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ConversationText = styled.div`
  margin-left: 10px;
  color: #666;
  font-size: 12px;
`;

const ConversationName = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 14px;
`;

const ReplyButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const ProjectsSection = styled.div`
  width: 93%;
  max-width: 1500px;
  margin-top: 40px;
  padding: 20px;
  background-color: #f8f9f9;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProjectsHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: #333;
  margin-top:10px;
`;

const ProjectsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const ProjectCard = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 30%;
  display: flex;
  flex-direction: column;   
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px); /* Slightly lift the card */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Deepen the shadow */
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectContent = styled.div`
  padding: 15px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 10px;
`;

const ProjectSubtitle = styled.p`
  font-size: 0.9rem;
  color: gray;
  margin-bottom: 15px;
`;

const ProjectButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;
  align-self: flex-start;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f7f;
    transform: scale(0.98);
  }
`;

const NewProjectCard = styled(ProjectCard)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #007bff;
  cursor: pointer;
`;

const NewProjectText = styled.h3`
  font-size: 1.2rem;
  color: #007bff;
  text-align: center;
`;

const NewProjectModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
`;

const ModalInput = styled.input`
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ModalTextArea = styled.textarea`
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  background-color: red;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: darkred;
  }
`;


const ProfilePage = () => {
  const [skills, setSkills] = useState([
    'Java', 'React', 'Node.js', 'HTML', 'CSS', 'JavaScript', 'Python', 'MySQL', 'PostgreSQL', 'Firebase', 'SQLite', 'MongoDB'
  ]);

  const [availableSkills] = useState([
    'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Go', 'TypeScript', 'Scala', 'Rust'
  ]);
  const [projects, setProjects] = useState([]);

  const [skillSearch, setSkillSearch] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);

  const handleSkillSearch = (e) => {
    const query = e.target.value;
    setSkillSearch(query);
    if (query) {
      const filtered = availableSkills.filter(skill =>
        skill.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  };

  const handleAddSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSkillSearch('');
    setFilteredSkills([]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectType, setNewProjectType] = useState('');
  const [newProjectLanguages, setNewProjectLanguages] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSaveProject = async () => {
    try {
      // Getting current user details from local storage
      const user = JSON.parse(localStorage.getItem('currentUser'));
      const email = user?.email;
      const name = `${user?.first_name} ${user?.last_name}`;

      const { error } = await supabase.from('experience').insert([
        {
          user_email: email,
          project_title: newProjectTitle,
          project_type: newProjectType,
          skills: newProjectLanguages,
          project_description: newProjectDescription,
          user_name: name,
        },
      ]);

      if (error) {
        throw error;
      }

      // Reset form fields
      setNewProjectTitle('');
      setNewProjectType('');
      setNewProjectLanguages('');
      setNewProjectDescription('');

      toggleModal(); // Close the modal after saving
    } catch (error) {
      console.error('Error adding new project:', error.message);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch user data from local storage
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const email = user?.email;

        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .eq('user_email', email); // Filter projects by the current user's email

        if (error) {
          throw error;
        }

        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    fetchProjects();
  }, []);

  const [user, setUser] = useState(null);
  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(storedUser); // Directly set the user
  }, []);

  return (
    <ProfilePageContainer>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <Content>
        <ProfileHeader>Profile</ProfileHeader>
        <ProfileBanner>
          <ProfileImage src="profile-image.jpg" alt="Profile" />
        </ProfileBanner>
        <ProfileName>{user ? `${user.first_name} ${user.last_name}` : 'User'}</ProfileName>
        <StatusBadge>Active</StatusBadge>

        <InfoSectionsContainer>
          <InfoCard>
            <CardTitle>Profile Information</CardTitle>
            <p><strong>Position:</strong> Intern - Software Developer</p>
            <p><strong>E-mail:</strong> nethminavihanga275@gmail.com</p>
            <p><strong>Phone:</strong> +94 70 166 8976</p>
            <p><strong>University:</strong> Informatics Institute of Technology</p>
            <p><strong>Hire Date:</strong> 01.08.2024</p>
            <p><strong>Duration:</strong> 12 Months</p>
          </InfoCard>

          <InfoCard>
            <CardTitle>Skills</CardTitle>
            <SkillsContainer>
              {skills.map(skill => (
                <SkillIcon key={skill} src={`/icons/${skill.toLowerCase()}.png`} alt={skill} />
              ))}
            </SkillsContainer>

            <AddSkillContainer>
              <SkillSearchInput
                type="text"
                placeholder="Search for a skill..."
                value={skillSearch}
                onChange={handleSkillSearch}
              />
              {filteredSkills.length > 0 && (
                <SuggestionList>
                  {filteredSkills.map(skill => (
                    <SuggestionItem key={skill} onClick={() => handleAddSkill(skill)}>
                      {skill}
                    </SuggestionItem>
                  ))}
                </SuggestionList>
              )}
            </AddSkillContainer>
          </InfoCard>

          <InfoCard>
            <CardTitle>
              <ConversationListHeader>
                Conversations
                <AddConversationIcon />
              </ConversationListHeader>
            </CardTitle>
            <ConversationItem>
              <ConversationDetails>
                <ConversationImage src="profile-image.jpg" alt="Mahinda Maama" />
                <ConversationText>
                  <ConversationName>Taylor Smith</ConversationName>
                  Hey, Can you send me the...
                </ConversationText>
              </ConversationDetails>
              <ReplyButton>Reply</ReplyButton>
            </ConversationItem>
            <ConversationItem>
              <ConversationDetails>
                <ConversationImage src="profile-image.jpg" alt="Mahinda Maama" />
                <ConversationText>
                  <ConversationName>Casey Taylor</ConversationName>
                  Yeah, its today at 6.30pm
                </ConversationText>
              </ConversationDetails>
              <ReplyButton>Reply</ReplyButton>
            </ConversationItem>
            <ConversationItem>
              <ConversationDetails>
                <ConversationImage src="profile-image.jpg" alt="Mahinda Maama" />
                <ConversationText>
                  <ConversationName>Cameron White</ConversationName>
                  Sure, will do!
                </ConversationText>
              </ConversationDetails>
              <ReplyButton>Reply</ReplyButton>
            </ConversationItem>
            <ConversationItem>
              <ConversationDetails>
                <ConversationImage src="profile-image.jpg" alt="Mahinda Maama" />
                <ConversationText>
                  <ConversationName>Avery Harris</ConversationName>
                  Can you check the repo...
                </ConversationText>
              </ConversationDetails>
              <ReplyButton>Reply</ReplyButton>
            </ConversationItem>
          </InfoCard>
        </InfoSectionsContainer>

        <ProjectsSection>
          <ProjectsHeader>Personal Projects</ProjectsHeader>
          <ProjectsContainer>
            {projects.map((project) => (
              <ProjectCard key={project.id}>
                <ProjectImage src="banner.jpg" alt={project.project_title} />
                <ProjectContent>
                  <ProjectTitle>{project.project_title}</ProjectTitle>
                  <ProjectSubtitle>{project.project_type}</ProjectSubtitle>
                  <p>{project.project_description}</p>
                  <ProjectButton>VIEW PROJECT</ProjectButton>
                </ProjectContent>
              </ProjectCard>
            ))}

            <NewProjectCard onClick={toggleModal}>
              <FaPlus size={50} color="#007bff" />
              <NewProjectText>Add New Project</NewProjectText>
            </NewProjectCard>
          </ProjectsContainer>
        </ProjectsSection>
        {isModalOpen && (
          <NewProjectModal>
            <ModalContent>
              <ModalHeader>Add New Project</ModalHeader>
              <ModalInput
                type="text"
                placeholder="Project Title"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
              />
              <ModalInput
                type="text"
                placeholder="Project Type"
                value={newProjectType}
                onChange={(e) => setNewProjectType(e.target.value)}
              />
              <ModalInput
                type="text"
                placeholder="Languages Used"
                value={newProjectLanguages}
                onChange={(e) => setNewProjectLanguages(e.target.value)}
              />
              <ModalTextArea
                rows="3"
                placeholder="Project Description (max 50 words)"
                maxLength={50}
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
              />
              <div>
                <ModalButton onClick={handleSaveProject}>Save Project</ModalButton>
                <CloseButton onClick={toggleModal}>Cancel</CloseButton>
              </div>
            </ModalContent>
          </NewProjectModal>
        )}

      </Content>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
