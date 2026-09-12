import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { X, ShieldCheck, Lock, Mail, AlertCircle, Clock } from 'lucide-react';
import { 
  sanitizeEmail, 
  getLoginSecurityStatus, 
  recordFailedLoginAttempt, 
  resetLoginSecurity 
} from '../../utils/security';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userEmail: string) => void;
}

/**
 * AdminLoginModal
 * 
 * SECURITY ENHANCEMENTS:
 * 1. Rate-limiting & Brute Force Lockout: Automatically locks out repeated failed login attempts
 * 2. Strict Firebase Authentication Boundary: No hardcoded accounts or client-side bypasses
 * 3. Sanitized credential inputs
 * 4. Memory wiping of password fields upon authentication
 */
export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { t, isUrdu } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lockoutSec, setLockoutSec] = useState<number>(0);

  // Check login security status on mount/open
  useEffect(() => {
    if (isOpen) {
      const status = getLoginSecurityStatus();
      if (status.isLocked) {
        setLockoutSec(status.remainingSec);
      }
    }
  }, [isOpen]);

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutSec <= 0) return;
    const timer = setInterval(() => {
      setLockoutSec((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSec]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Enforce brute-force lockout
    const secStatus = getLoginSecurityStatus();
    if (secStatus.isLocked) {
      setLockoutSec(secStatus.remainingSec);
      setError(
        isUrdu
          ? `مسلسل ناکام کوششوں کی وجہ سے پورٹل عارضی طور پر مقفل ہے۔ براہ کرم ${secStatus.remainingSec} سیکنڈ بعد کوشش کریں۔`
          : `Portal temporarily locked due to excessive failed attempts. Please wait ${secStatus.remainingSec} seconds.`
      );
      return;
    }

    const cleanEmail = sanitizeEmail(email);
    if (!cleanEmail) {
      setError(
        isUrdu ? 'براہ کرم درست ای میل ایڈریس درج کریں۔' : 'Please provide a valid administrator email.'
      );
      return;
    }

    setLoading(true);

    try {
      // Sole authorized authentication path — relies strictly on Firebase Auth
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      resetLoginSecurity();
      setPassword('');
      onLoginSuccess(cred.user.email || cleanEmail);
      onClose();
    } catch (err: any) {
      setPassword('');
      const failStatus = recordFailedLoginAttempt();
      if (failStatus.isLocked) {
        setLockoutSec(failStatus.remainingSec);
        setError(
          isUrdu
            ? `حد سے زیادہ ناکام لاگ ان کوششیں! سسٹم کو ${failStatus.remainingSec} سیکنڈ کے لیے محفوظ لاک کر دیا گیا ہے۔`
            : `Too many failed attempts. Login locked for ${failStatus.remainingSec} seconds.`
        );
      } else {
        setError(
          isUrdu
            ? 'غلط ایڈمن کوائف۔ براہ کرم درست ای میل اور پاس ورڈ درج کریں۔'
            : 'Invalid administrator credentials. Please verify your email and password.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#16232F] text-white p-6 flex items-center justify-between border-b border-[#AD7A28]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#AD7A28]/20 border border-[#AD7A28]/40 text-[#F5CA7B] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">
                {t('adminLoginTitle', 'Administrator Sign In')}
              </h3>
              <p className="text-xs text-slate-300">
                {t('adminLoginSub', 'Central council database and content manager.')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('adminEmail', 'Admin Email')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-9 rtl:pr-9 rtl:pl-3.5 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('adminPassword', 'Password')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 rtl:pr-9 rtl:pl-3.5 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#AD7A28] hover:bg-[#96681E] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (isUrdu ? 'توثیق جاری ہے...' : 'Authenticating...') : t('btnLogin', 'Sign In to Admin')}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
