import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthLayout } from '../components/AuthLayout';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(response.data);
      toast.success('Successfully logged in!', {
        icon: '🎉',
        style: {
          background: 'linear-gradient(to right, #374151, #111827)',
          color: 'white',
        },
      });
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
      setErrors({ submit: error.response?.data?.message || 'An error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back!" isLoading={isLoading}>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <FormInput
          label="Email address"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormInput
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="space-y-4">
          <Button type="submit" isLoading={isLoading} icon={LogIn}>
            Sign in
          </Button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Link
              to="/register"
              className="font-medium bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent hover:from-gray-800 hover:to-gray-950 transition-all duration-200"
            >
              Don't have an account? Sign up
            </Link>
          </motion.div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;