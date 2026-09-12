import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { checkRateLimit, sanitizeText, sanitizeEmail } from '../utils/security';

export const ContactSection: React.FC = () => {
  const { t, isUrdu, tSetting } = useLanguage();
  const { settings, sendContactMessage } = useData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Anti-Bot Honeypot Defense
    if (honeypot.trim()) {
      setIsSent(true);
      return;
    }

    // 2. Submission Rate Limiter (max 3 inquiries per 2 minutes)
    const rateCheck = checkRateLimit('contact_submit', 3, 120000);
    if (!rateCheck.allowed) {
      setError(
        isUrdu 
          ? `بہت زیادہ پیغامات موصول ہو رہے ہیں۔ براہ کرم ${rateCheck.retryAfterSec} سیکنڈ بعد کوشش کریں۔`
          : `Too many inquiries sent. Please wait ${rateCheck.retryAfterSec} seconds before sending another.`
      );
      return;
    }

    const cleanName = sanitizeText(name, 100);
    const cleanEmail = sanitizeEmail(email);
    const cleanSubject = sanitizeText(subject, 150);
    const cleanMessage = sanitizeText(message, 1500);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setError(isUrdu ? 'براہ کرم تمام مطلوبہ خانے درست طریقے سے پُر کریں۔' : 'Please fill out all required fields properly.');
      return;
    }

    try {
      setIsSending(true);
      await sendContactMessage({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject || (isUrdu ? 'عمومی رابطہ' : 'General Inquiry'),
        message: cleanMessage,
      });
      setIsSent(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      console.error(err);
      setError(isUrdu ? 'پیغام بھیجنے میں خرابی پیش آئی۔' : 'Failed to send message. Please retry.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#F8F4E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#AD7A28]/15 text-[#8A5F19] text-xs font-bold uppercase tracking-wider mb-3">
            {t('navContact', 'Contact Us')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16232F] ltr:tracking-tight rtl:tracking-normal ltr:leading-tight rtl:leading-[1.45]">
            {t('contactHeading', 'Get In Touch')}
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 font-medium ltr:leading-relaxed rtl:leading-[1.85] rtl:tracking-normal">
            {t('contactSubheading', 'Have questions about our initiatives or wish to visit our regional center? We welcome your message.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-5xl mx-auto">
          
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-white border border-[#16232F]/10 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#AD7A28]/15 text-[#AD7A28] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#16232F] mb-1">
                  {t('contactAddressTitle', 'Our Office')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tSetting('contactAddress', settings)}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#16232F]/10 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#AD7A28]/15 text-[#AD7A28] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#16232F] mb-1">
                  {t('contactHoursTitle', 'Office Hours')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tSetting('contactHours', settings)}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#16232F]/10 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#AD7A28]/15 text-[#AD7A28] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#16232F] mb-1">
                  {t('contactPhoneTitle', 'Helpline & WhatsApp')}
                </h4>
                <a 
                  href={`tel:${settings.contactPhone}`}
                  className="text-xs sm:text-sm text-[#AD7A28] font-semibold hover:underline block"
                >
                  {tSetting('contactPhone', settings)}
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#16232F]/10 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#AD7A28]/15 text-[#AD7A28] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#16232F] mb-1">
                  {t('contactEmailTitle', 'Official Email')}
                </h4>
                <a 
                  href={`mailto:${settings.contactEmail}`}
                  className="text-xs sm:text-sm text-[#AD7A28] font-semibold hover:underline block"
                >
                  {tSetting('contactEmail', settings)}
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-[#16232F]/10 shadow-sm">
            <h3 className="text-xl font-bold text-[#16232F] mb-1">
              {t('contactFormTitle', 'Send Direct Inquiry')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              {t('contactFormDesc', 'Our communications team responds promptly to all community members.')}
            </p>

            {isSent && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{t('msgSentSuccess')}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anti-Bot Honeypot */}
              <input
                type="text"
                name="user_msg_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('formName', 'Your Full Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('phFullName', 'e.g. Asad Chaudhary')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('formEmail', 'Email Address')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('phEmail', 'you@domain.com')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formSubject', 'Subject')}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={t('phSubject', 'e.g. Volunteering, Scholarships inquiry')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formMessage', 'Your Message')} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('phMessage', 'Please write your detailed message...')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#16232F] hover:bg-[#233547] text-white font-semibold text-sm shadow-md transition-all duration-150 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
                <span>{isSending ? t('sendingBtn', 'Sending...') : t('btnSendMessage', 'Send Message')}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
