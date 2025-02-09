import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../api/userAPI";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!registerData.username || !registerData.password || !registerData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Register the user
      await registerUser({
        username: registerData.username,
        password: registerData.password
      });

      // Automatically log in after successful registration
      const loginResponse = await login({
        username: registerData.username,
        password: registerData.password
      });

      Auth.login(loginResponse.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to register account');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        {error && <div className="error-message">{error}</div>}
        
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={registerData.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={registerData.password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={registerData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;