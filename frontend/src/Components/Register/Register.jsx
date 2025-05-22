import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    prenom: '',
    nom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage("Tous les champs obligatoires doivent être remplis.");
      return false;
    }
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Veuillez entrer un email valide.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage('Inscription réussie !');
      setTimeout(() => navigate('/'), 800);
    } catch (error) {
      const msg = error.response?.data?.error;
      if (msg && msg.toLowerCase().includes("duplicate")) {
        setMessage("Cet email est déjà utilisé.");
      } else {
        setMessage(msg || "Erreur lors de l'inscription");
      }
    }
  };

  return (
    <RegisterForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      message={message}
    />
  );
};

export default Register;
