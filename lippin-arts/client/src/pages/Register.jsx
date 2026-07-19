import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5001/api/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: 'Full Name', name: 'fullName', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Phone Number', name: 'phone', type: 'text' },
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
  ];

  return (
    <div className="mx-auto max-w-sm px-4 py-12 sm:px-0">
      <h1 className="font-display text-2xl font-semibold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="mb-1 block text-sm font-medium">{f.label}</label>
            <input
              type={f.type}
              name={f.name}
              value={formData[f.name]}
              onChange={handleChange}
              required
              className="w-full rounded border border-mirror px-3 py-2 focus:border-indigo focus:outline-none"
            />
          </div>
        ))}
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded bg-rust px-4 py-2.5 font-medium text-ivory hover:bg-rust/90 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-charcoal/70">
        Already have an account? <Link to="/login" className="text-rust underline">Login</Link>
      </p>
    </div>
  );
}

export default Register;
