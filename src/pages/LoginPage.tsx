import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ScrollReveal from '../components/common/ScrollReveal';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate('/profile');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-[120px] pb-20 bg-ivory-warm px-4 md:px-8 flex items-center justify-center">
      <ScrollReveal className="w-full max-w-md">
        <div className="bg-white p-8 md:p-12 shadow-sm border border-beige-dark/30 rounded-sm">
          <h1 className="font-heading text-3xl text-charcoal mb-8 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="block text-xs uppercase tracking-[0.1em] text-charcoal/70">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-ivory-warm/50 border border-beige-dark focus:outline-none focus:border-charcoal/30 transition-colors rounded-sm"
                    placeholder="Jane Doe"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.1em] text-charcoal/70">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-ivory-warm/50 border border-beige-dark focus:outline-none focus:border-charcoal/30 transition-colors rounded-sm"
                placeholder="jane@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.1em] text-charcoal/70">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-ivory-warm/50 border border-beige-dark focus:outline-none focus:border-charcoal/30 transition-colors rounded-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-wine text-xs font-medium">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-charcoal text-ivory text-xs tracking-[0.15em] uppercase hover:bg-wine transition-colors duration-300 font-medium"
            >
              {isLogin ? 'Sign In' : 'Register'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-charcoal/60 hover:text-charcoal transition-colors tracking-wide underline underline-offset-4"
            >
              {isLogin
                ? "Don't have an account? Create one"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
