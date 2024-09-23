import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import styled from 'styled-components';

const FormWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-bottom: 10px;
`;

const AddUser = () => {
  const [userType, setUserType] = useState('intern');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [area, setArea] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages

    // Prepare data
    const userData = {
      first_name: firstName,
      last_name: lastName,
      user_type: userType,
      email,
      password,
      position: userType === 'admin' ? position : null,
      area: userType === 'intern' ? area : null,
      hire_date: hireDate,
    };

    try {
      const { error } = await supabase.from('users').insert([userData]);

      if (error) {
        setError('Error adding user: ' + error.message);
      } else {
        setSuccess('User added successfully!');
        // Reset form fields
        setUserType('intern');
        setFirstName('');
        setLastName('');
        setPosition('');
        setArea('');
        setEmail('');
        setPassword('');
        setHireDate('');
      }
    } catch (err) {
      setError('Unexpected error: ' + err.message);
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <InputField>
          <Label>First Name</Label>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            required
          />
        </InputField>

        <InputField>
          <Label>Last Name</Label>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            required
          />
        </InputField>

        <InputField>
          <Label>User Type</Label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="intern">Intern</option>
            <option value="admin">Admin</option>
          </select>
        </InputField>

        {userType === 'admin' && (
          <InputField>
            <Label>Position</Label>
            <Input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter position"
            />
          </InputField>
        )}

        {userType === 'intern' && (
          <InputField>
            <Label>Area</Label>
            <Input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter area"
            />
          </InputField>
        )}

        <InputField>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </InputField>

        <InputField>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </InputField>

        <InputField>
          <Label>Hire Date</Label>
          <Input
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            required
          />
        </InputField>

        <Button type="submit">Add User</Button>
      </form>
    </FormWrapper>
  );
};

export default AddUser;
