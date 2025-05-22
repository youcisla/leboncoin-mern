
const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, message }) => (
  <div className="container mt-5">
    <h2 className="text-success mb-4">Connexion</h2>
    {message && (
  <div className="alert alert-warning text-dark fw-semibold border border-warning rounded mb-4">
    {message}
  </div>
)}
    <form onSubmit={handleLogin} className="card p-4 bg-dark text-white">
      <div className="mb-3">
        <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <input type="password" className="form-control" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-success">Se connecter</button>
    </form>
  </div>
);

export default LoginForm;
