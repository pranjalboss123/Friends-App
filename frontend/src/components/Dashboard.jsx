import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard, {user}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
