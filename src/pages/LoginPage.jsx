import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';
import LoadingScreen from '../components/LoadingScreen'; 

const LoginPageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
`;

const LoginCard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 900px;
  width: 100%;
`;

const WelcomeSection = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WelcomeText = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const WelcomeImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const LoginSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.img`
  max-width: 150px;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 45px;
  text-align: center;
  color: #1a5276;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #666;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 15px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  margin-left: 10px;
  font-size: 1rem;
  color: #666;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f7f;
    transform: scale(0.98);
  }
`;

const ForgotPassword = styled.a`
  margin-top: 10px;
  text-align: center;
  font-size: 0.9rem;
  color: #007bff;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 15px;
  text-align: center;
  font-size: 1rem;
`;


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Authenticate user with Supabase
    const { data: user, error: loginError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password) // This should be handled with hashed passwords in production
      .single();

    if (loginError || !user) {
      setLoading(false);
      setError('Invalid email or password');
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Redirect based on user type
    if (user.user_type === 'admin') {
      navigate('/admin-dashboard');
    } else if (user.user_type === 'intern') {
      navigate('/dashboard');
    }

    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <LoginPageContainer>
      <LoginCard>
        <WelcomeSection>
          <WelcomeText>WELCOME BACK</WelcomeText>
          <WelcomeImage src="welcome-image.jpg" alt="Welcome Image" />
        </WelcomeSection>
        <LoginSection>
          <Logo src="appslogo.png" alt="Logo" />
          <Title>Log In</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form onSubmit={handleSubmit}>
            <Label>Email *</Label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label>Password *</Label>
            <Input
              type="password"
              placeholder="......................."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <CheckboxContainer>
              <input type="checkbox" id="rememberMe" />
              <CheckboxLabel htmlFor="rememberMe">Remember Me</CheckboxLabel>
            </CheckboxContainer>
            <SubmitButton type="submit">Log in</SubmitButton>
            <ForgotPassword href="#">Forgot Password?</ForgotPassword>
          </Form>
        </LoginSection>
      </LoginCard>
    </LoginPageContainer>
  );
};

export default LoginPage;
