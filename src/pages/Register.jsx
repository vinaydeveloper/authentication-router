import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthLayout } from '../components/AuthLayout';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      toast.success('Registration successful! Please log in.', {
        icon: '🎉',
        style: {
          background: 'linear-gradient(to right, #374151, #111827)',
          color: 'white',
        },
      });
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
      setErrors({ submit: error.response?.data?.message || 'An error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create an account" isLoading={isLoading}>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <FormInput
          label="Username"
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />

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
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <div className="space-y-4">
          <Button type="submit" isLoading={isLoading} icon={UserPlus}>
            Sign up
          </Button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Link
              to="/login"
              className="font-medium bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent hover:from-gray-800 hover:to-gray-950 transition-all duration-200"
            >
              Already have an account? Sign in
            </Link>
          </motion.div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;