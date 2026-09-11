import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { compressImage } from '../services/firebase';
import { Registration } from '../types';
import { MembershipCardModal } from './admin/MembershipCardModal';
import { processRegistrationTranslations } from '../utils/urduTransliterator';
import confetti from 'canvas-confetti';
import { 
  X, 
  User, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  CreditCard
} from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const { t, isUrdu } = useLanguage();
  const { registerMember } = useData();

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    gender: 'Male',
    membershipType: 'General Member',
    cnic: '',
    dob: '',
    email: '',
    whatsapp: '',
    residentialStatus: 'Resident (Pakistan)',
    affiliated: '',
    education: "Bachelor's Degree",
    work: '',
    reason: '',
    street: '',
    city: 'Bannu',
    state: 'Khyber Pakhtunkhwa',
    country: 'Pakistan',
  });

  const [photoData, setPhotoData] = useState<string>('');
  const [isCompressingPhoto, setIsCompressingPhoto] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [submittedRegistration, setSubmittedRegistration] = useState<Registration | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsCompressingPhoto(true);
      const base64 = await compressImage(file, 600, 0.75);
      setPhotoData(base64);
    } catch (err: any) {
      console.error('Photo compression error:', err);
      setErrorMessage(t('errScreenshot', 'Could not process selected image. Please choose another.'));
    } finally {
      setIsCompressingPhoto(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage(t('errDonorName', 'Please enter full name.'));
      return;
    }
    if (!formData.whatsapp.trim()) {
      setErrorMessage(t('errPhone', 'Please enter phone / WhatsApp number.'));
      return;
    }
    if (!agreed) {
      setErrorMessage(t('errAcceptTerms', 'Please accept the declaration terms before submitting.'));
      return;
    }

    try {
      setIsSubmitting(true);
      const rawSubmission = {
        ...formData,
        photoData,
      };
      const processedSubmission = processRegistrationTranslations(rawSubmission);
      const docId = await registerMember(processedSubmission);

      setSubmittedRefId(docId);
      setSubmittedRegistration({
        ...processedSubmission,
        _id: docId,
      });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      console.error('Registration failed:', err);
      setErrorMessage(err.message || 'Failed to submit registration. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedRefId(null);
    setSubmittedRegistration(null);
    setShowCardModal(false);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#16232F] text-white p-6 sm:p-7 flex items-center justify-between border-b border-[#AD7A28]/30">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#AD7A28]/20 border border-[#AD7A28]/40 text-amber-300 text-xs font-semibold mb-1">
              {t('siteName', 'ARAAIN BANNU')}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {t('memFormTitle', 'Membership Registration')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t('memFormSubtitle', 'Complete this form to apply for official membership.')}
            </p>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {submittedRefId ? (
            /* Success View */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-bold text-[#16232F] mb-2">
                {t('submissionSuccessTitle', 'Registration Submitted Successfully!')}
              </h3>
              
              <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
                {t('submissionSuccessDesc')}
              </p>

              <div className="p-4 rounded-xl bg-[#F8F4E8] border border-[#AD7A28]/20 text-center max-w-md mx-auto mb-6">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                  {t('appRefId', 'Application Reference ID')}
                </div>
                <div className="text-lg font-mono font-bold text-[#16232F] select-all">
                  {submittedRefId}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowCardModal(true)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#AD7A28] hover:bg-[#8F6420] text-white font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{isUrdu ? 'شناختی کارڈ دیکھیں / پرنٹ کریں' : 'View & Print ID Card'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#16232F] hover:bg-[#203244] text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  {t('closeModal', 'Close Window')}
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Personal Details */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-bold text-[#AD7A28] tracking-wider border-b border-[#AD7A28]/20 pb-1">
                  {t('memStep1', '1. Personal Details')}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldFullName', 'Full Name')} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder={t('phFullName', 'e.g. Muhammad Tahir')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldFatherName', 'Father / Guardian Name')} *
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                      placeholder={t('phFatherName', 'e.g. Haji Meer Muhammad')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldGender', 'Gender')}
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm bg-white"
                    >
                      <option value="Male">{t('fieldMale', 'Male')}</option>
                      <option value="Female">{t('fieldFemale', 'Female')}</option>
                      <option value="Other">{t('fieldOther', 'Other')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldDob', 'Date of Birth')}
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldCnic', 'CNIC / B-Form')}
                    </label>
                    <input
                      type="text"
                      name="cnic"
                      value={formData.cnic}
                      onChange={handleChange}
                      placeholder="11101-XXXXXXX-X"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Contact & Identity */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-bold text-[#AD7A28] tracking-wider border-b border-[#AD7A28]/20 pb-1">
                  {t('memStep2', '2. Contact & Identity')}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldWhatsapp', 'WhatsApp Number')} *
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                      placeholder="+92 300 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldEmail', 'Email Address')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('phEmail', 'you@domain.com')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('fieldResidentialStatus', 'Residential Status')}
                  </label>
                  <select
                    name="residentialStatus"
                    value={formData.residentialStatus}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm bg-white"
                  >
                    <option value="Resident (Pakistan)">{t('optResident', 'Resident (Pakistan)')}</option>
                    <option value="Overseas Pakistani">{t('optOverseas', 'Overseas Pakistani')}</option>
                    <option value="Foreign National">{t('optForeign', 'Foreign National')}</option>
                  </select>
                </div>
              </div>

              {/* 3. Professional & Membership */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-bold text-[#AD7A28] tracking-wider border-b border-[#AD7A28]/20 pb-1">
                  {t('memStep3', '3. Professional & Membership')}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldMembershipType', 'Membership Type')}
                    </label>
                    <select
                      name="membershipType"
                      value={formData.membershipType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm bg-white"
                    >
                      <option value="General Member">{t('optGeneralMember', 'General Member')}</option>
                      <option value="Life Member">{t('optLifeMember', 'Life Member')}</option>
                      <option value="Youth Member">{t('optYouthMember', 'Youth Member')}</option>
                      <option value="Associate Member">{t('optAssociateMember', 'Associate Member')}</option>
                      <option value="Senior Member">{t('optSeniorMember', 'Senior Member')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldEducation', 'Education')}
                    </label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm bg-white"
                    >
                      <option value="Matriculation / O-Level">{t('optMetric', 'Matriculation / O-Level')}</option>
                      <option value="Intermediate / A-Level">{t('optIntermediate', 'Intermediate / A-Level')}</option>
                      <option value="Bachelor's Degree">{t('optBachelors', "Bachelor's Degree")}</option>
                      <option value="Master's Degree">{t('optMasters', "Master's Degree")}</option>
                      <option value="Doctorate (PhD)">{t('optDoctorate', 'Doctorate (PhD)')}</option>
                      <option value="Other / Vocational">{t('optOther', 'Other / Vocational')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldWork', 'Occupation / Profession')}
                    </label>
                    <input
                      type="text"
                      name="work"
                      value={formData.work}
                      onChange={handleChange}
                      placeholder={t('phWork', 'e.g. Teacher, Engineer, Businessman')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldAffiliated', 'Affiliated Organisation')}
                    </label>
                    <input
                      type="text"
                      name="affiliated"
                      value={formData.affiliated}
                      onChange={handleChange}
                      placeholder={t('phAffiliated', 'e.g. Arain Youth Bannu / None')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('fieldReason', 'Reason for Joining')}
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows={2}
                    placeholder={t('phReason', 'Tell us how you would like to contribute or participate in welfare initiatives...')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                  ></textarea>
                </div>
              </div>

              {/* 4. Address & Photograph */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-bold text-[#AD7A28] tracking-wider border-b border-[#AD7A28]/20 pb-1">
                  {t('memStep4', '4. Address & Photo')}
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('fieldStreet', 'Street Address / Area')}
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder={t('phStreet', 'Mohallah / Street / House #')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldCity', 'City / District')}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldState', 'Province / State')}
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('fieldCountry', 'Country')}
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                    />
                  </div>
                </div>

                {/* Photo Upload Container */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    {t('fieldPhoto', 'Profile Photograph')}
                  </label>
                  
                  <div className="flex items-center gap-4">
                    {photoData ? (
                      <div className="relative">
                        <img
                          src={photoData}
                          alt="Applicant"
                          className="w-16 h-20 rounded-lg object-cover border-2 border-[#AD7A28]"
                        />
                        <button
                          type="button"
                          onClick={() => setPhotoData('')}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="w-16 h-20 rounded-lg bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                        <User className="w-8 h-8" />
                      </div>
                    )}

                    <div className="flex-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handlePhotoSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isCompressingPhoto}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#AD7A28]" />
                        <span>{photoData ? t('changePhoto', 'Change Photo') : t('uploadPhoto', 'Upload Photograph')}</span>
                      </button>
                      <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                        {t('photoHint', 'Upload a clear passport-style photo (JPEG/PNG, auto-compressed).')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#AD7A28] focus:ring-[#AD7A28]"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    {t('agreeTerms')}
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm sm:text-base shadow-lg transition-all duration-150 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? t('btnSubmitting', 'Submitting...') : t('btnSubmitApplication', 'Submit Application')}
              </button>

            </form>
          )}

        </div>
      </div>

      {/* Official Membership ID Card Modal */}
      {showCardModal && submittedRegistration && (
        <MembershipCardModal
          registration={submittedRegistration}
          onClose={() => setShowCardModal(false)}
        />
      )}
    </div>
  );
};
