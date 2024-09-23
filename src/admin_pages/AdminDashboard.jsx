import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient'; // Ensure this path is correct

const DashboardWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const NavLink = styled(Link)`
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border: 1px solid #ddd;
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const FilterSelect = styled.select`
  padding: 10px;
  margin: 20px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [filter, setFilter] = useState('all'); // State for filter

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('first_name, last_name, user_type, email, position, area, hire_date'); // Added hire_date

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  // Filtered users based on the selected filter
  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    return user.user_type === filter;
  });

  return (
    <DashboardWrapper>
      <Title>Admin Dashboard</Title>
      <NavLink to="/add-user">Add User</NavLink>
      <NavLink to="#" onClick={() => setShowUsers(!showUsers)}>
        {showUsers ? 'Hide User List' : 'Show User List'}
      </NavLink>
      {showUsers && (
        <>
          <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Users</option>
            <option value="admin">Admins</option>
            <option value="intern">Interns</option>
          </FilterSelect>
          <UserTable>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Position/Area</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Hire Date</TableHeader> {/* New column for Hire Date */}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell> {/* Full Name */}
                  <TableCell>{user.user_type === 'admin' ? user.position : user.area}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.hire_date).toLocaleDateString()}</TableCell> {/* Display Hire Date */}
                </tr>
              ))}
            </tbody>
          </UserTable>
        </>
      )}
    </DashboardWrapper>
  );
};

export default AdminDashboard;
