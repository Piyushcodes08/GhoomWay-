import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { login } from '../services/authService';

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || t('auth.invalid'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#31468e] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200">
                <LogIn className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t('auth.portalTitle')}</h1>
              <p className="text-slate-400 font-bold mt-2">{t('auth.portalSub')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">{t('auth.emailLabel')}</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#31468e] transition-colors" size={20} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#31468e]/10 focus:bg-white transition-all"
                    placeholder="admin@ghoomway.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">{t('auth.passLabel')}</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#31468e] transition-colors" size={20} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#31468e]/10 focus:bg-white transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-rose-50 text-rose-500 p-4 rounded-2xl flex items-center gap-3 border border-rose-100"
                >
                  <AlertCircle size={18} />
                  <p className="text-xs font-black">{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#31468e] hover:bg-[#253675] text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
                {loading ? t('auth.loggingIn') : t('auth.loginBtn')}
              </button>
            </form>
          </div>
        </div>
        
        <p className="text-center text-slate-400 text-xs font-bold mt-8">
          {t('auth.copyright', { year: new Date().getFullYear() })}
        </p>
      </motion.div>
    </div>
  );
}
