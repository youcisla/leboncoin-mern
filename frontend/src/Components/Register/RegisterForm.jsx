import React from 'react';

const RegisterForm = ({ formData, handleChange, handleSubmit, message }) => (
  <div className="container mt-5">
    <h2 className="text-success mb-4">Inscription</h2>
    {message && (
      <div className="alert alert-warning text-dark fw-semibold border border-warning rounded mb-4">
        {message}
      </div>
    )}
    <form onSubmit={handleSubmit} className="card p-4 bg-dark text-white">
      <div className="mb-3">
        <input type="text" name="username" className="form-control" placeholder="Nom d'utilisateur" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <input type="text" name="prenom" className="form-control" placeholder="Prénom" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="text" name="nom" className="form-control" placeholder="Nom" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <input type="password" name="password" className="form-control" placeholder="Mot de passe" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <input type="password" name="confirmPassword" className="form-control" placeholder="Confirmer le mot de passe" onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-success">S'inscrire</button>
    </form>
  </div>
);

export default RegisterForm;
