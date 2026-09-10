import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { compressImage } from '../services/firebase';
import confetti from 'canvas-confetti';
import { 
  X, 
  Heart, 
  Building2, 
  Smartphone, 
  Globe2, 
  Copy, 
  Check, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const { t, isUrdu } = useLanguage();
  const { settings, recordDonation } = useData();

  const [activeTab, setActiveTab] = useState<'details' | 'confirm'>('details');
  const [detailsSubTab, setDetailsSubTab] = useState<'bank' | 'mobile' | 'int'>('bank');
  
  const [selectedAmount, setSelectedAmount] = useState<string>('2500');
  const [customAmount, setCustomAmount] = useState<string>('');

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Confirmation form fields
  const [donorName, setDonorName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState('Bank Transfer (Meezan Bank)');
  const [txId, setTxId] = useState('');
  const [note, setNote] = useState('');
  const [photoData, setPhotoData] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsCompressing(true);
      const base64 = await compressImage(file, 800, 0.75);
      setPhotoData(base64);
    } catch (err: any) {
      console.error('Receipt compression error:', err);
      setErrorMessage(t('errScreenshot', 'Could not load screenshot. Please retry.'));
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmitConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const finalAmount = customAmount.trim() ? customAmount : selectedAmount;
    if (!donorName.trim()) {
      setErrorMessage(t('errDonorName', 'Please enter donor name.'));
      return;
    }
    if (!phone.trim()) {
      setErrorMessage(t('errPhone', 'Please enter phone / WhatsApp number.'));
      return;
    }

    try {
      setIsSubmitting(true);
      const docId = await recordDonation({
        donorName,
        phone,
        email,
        amount: finalAmount,
        method,
        txId,
        note,
        photoData,
      });

      setSubmittedRefId(docId);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      console.error('Donation confirmation error:', err);
      setErrorMessage(err.message || t('errSubmitDonation', 'Failed to submit payment verification.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedRefId(null);
    setErrorMessage(null);
    onClose();
  };

  const currentAmountDisplay = customAmount.trim() ? customAmount : selectedAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#2A1E0E] to-[#16232F] text-white p-6 sm:p-7 flex items-center justify-between border-b border-[#AD7A28]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#AD7A28]/30 border border-[#AD7A28]/50 text-amber-300 text-xs font-semibold mb-1">
              <Heart className="w-3 h-3 fill-current" />
              <span>{t('welfareFundTitle', 'ARAAIN BANNU Welfare Fund')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {t('donModalTitle', 'Make a Donation')}
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80 mt-0.5">
              {t('donModalSubtitle', 'Support education, welfare, and community initiatives.')}
            </p>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Selection Tabs */}
        {!submittedRefId && (
          <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'details'
                  ? 'border-[#AD7A28] text-[#AD7A28]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t('tabTransferDetails', '1. Transfer Details')}
            </button>
            <button
              onClick={() => setActiveTab('confirm')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'confirm'
                  ? 'border-[#AD7A28] text-[#AD7A28]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t('tabConfirmPaymentStep', '2. Confirm Payment & Receipt')}
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1">
          
          {submittedRefId ? (
            /* Success Receipt */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-[#AD7A28] flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-bold text-[#16232F] mb-2">
                {t('donationSuccessTitle', 'Donation Recorded!')}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
                {t('donationSuccessDesc')}
              </p>

              <div className="p-4 rounded-xl bg-[#F8F4E8] border border-[#AD7A28]/20 text-center max-w-md mx-auto mb-6">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                  {t('trackingIdLabel', 'Confirmation Tracking ID')}
                </div>
                <div className="text-lg font-mono font-bold text-[#16232F] select-all">
                  {submittedRefId}
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="px-8 py-3 rounded-xl bg-[#16232F] hover:bg-[#203244] text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                {t('closeModal', 'Close')}
              </button>
            </div>
          ) : activeTab === 'details' ? (
            /* Tab 1: Account details and amounts */
            <div className="space-y-6">
              
              {/* Suggested Amount Pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  {t('selectAmount', 'Select or Enter Amount (PKR)')}
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {['1000', '2500', '5000', '10000'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                      className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                        selectedAmount === amt && !customAmount
                          ? 'bg-[#AD7A28] text-white border-[#AD7A28]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-[#AD7A28]/40'
                      }`}
                    >
                      {isUrdu ? `${parseInt(amt).toLocaleString()} روپے` : `PKR ${parseInt(amt).toLocaleString()}`}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  placeholder={t('phEnterCustomAmt', 'Or enter custom amount in PKR...')}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                />
              </div>

              {/* Payment Methods Sub-tabs */}
              <div>
                <div className="flex gap-2 p-1 rounded-xl bg-slate-100 mb-4">
                  <button
                    type="button"
                    onClick={() => setDetailsSubTab('bank')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      detailsSubTab === 'bank' ? 'bg-white text-[#16232F] shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{t('meezanBankTab', 'Meezan Bank')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDetailsSubTab('mobile')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      detailsSubTab === 'mobile' ? 'bg-white text-[#16232F] shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{t('mobileWalletsTab', 'Easypaisa / JazzCash')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDetailsSubTab('int')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      detailsSubTab === 'int' ? 'bg-white text-[#16232F] shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>{t('swiftWireTab', 'SWIFT Wire')}</span>
                  </button>
                </div>

                {/* Account Details Box */}
                {detailsSubTab === 'bank' && (
                  <div className="p-4 rounded-2xl bg-[#F8F4E8] border border-[#AD7A28]/20 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-[#AD7A28]/15">
                      <span className="text-slate-600">{t('fieldBankName')}:</span>
                      <span className="font-bold text-[#16232F]">{settings.bankName}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-[#AD7A28]/15">
                      <span className="text-slate-600">{t('fieldAccountTitle')}:</span>
                      <span className="font-bold text-[#16232F]">{settings.bankTitle}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-[#AD7A28]/15">
                      <span className="text-slate-600">{t('fieldAccountNumber')}:</span>
                      <div className="flex items-center gap-2 font-mono font-bold text-[#16232F]">
                        <span>{settings.bankAccount}</span>
                        <button
                          onClick={() => copyToClipboard(settings.bankAccount, 'bankAcc')}
                          className="p-1 rounded hover:bg-[#AD7A28]/20 text-[#AD7A28] cursor-pointer"
                          title="Copy Account Number"
                        >
                          {copiedField === 'bankAcc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-[#AD7A28]/15">
                      <span className="text-slate-600">{t('fieldIBAN')}:</span>
                      <div className="flex items-center gap-2 font-mono font-bold text-[#16232F]">
                        <span className="text-xs">{settings.bankIBAN}</span>
                        <button
                          onClick={() => copyToClipboard(settings.bankIBAN, 'iban')}
                          className="p-1 rounded hover:bg-[#AD7A28]/20 text-[#AD7A28] cursor-pointer"
                          title="Copy IBAN"
                        >
                          {copiedField === 'iban' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-600">{t('fieldBranchCode')}:</span>
                      <span className="font-medium text-[#16232F]">{settings.bankBranch}</span>
                    </div>
                  </div>
                )}

                {detailsSubTab === 'mobile' && (
                  <div className="space-y-3 text-xs sm:text-sm">
                    {/* Easypaisa */}
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                      <div className="font-bold text-emerald-800 text-sm flex items-center justify-between">
                        <span>{t('fieldEasypaisa', 'Easypaisa Mobile Account')}</span>
                        <button
                          onClick={() => copyToClipboard(settings.epNumber, 'epNum')}
                          className="px-2 py-1 rounded bg-white text-emerald-700 font-mono text-xs flex items-center gap-1 shadow-sm cursor-pointer"
                        >
                          {copiedField === 'epNum' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'epNum' ? t('copiedBtn', 'Copied') : t('copyBtn', 'Copy')}</span>
                        </button>
                      </div>
                      <div className="text-slate-600">{t('titleLabel', 'Title')}: <strong>{settings.epTitle}</strong></div>
                      <div className="text-slate-900 font-mono font-bold text-base">{settings.epNumber}</div>
                    </div>

                    {/* JazzCash */}
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                      <div className="font-bold text-amber-900 text-sm flex items-center justify-between">
                        <span>{t('fieldJazzcash', 'JazzCash Mobile Account')}</span>
                        <button
                          onClick={() => copyToClipboard(settings.jcNumber, 'jcNum')}
                          className="px-2 py-1 rounded bg-white text-amber-800 font-mono text-xs flex items-center gap-1 shadow-sm cursor-pointer"
                        >
                          {copiedField === 'jcNum' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'jcNum' ? t('copiedBtn', 'Copied') : t('copyBtn', 'Copy')}</span>
                        </button>
                      </div>
                      <div className="text-slate-600">{t('titleLabel', 'Title')}: <strong>{settings.jcTitle}</strong></div>
                      <div className="text-slate-900 font-mono font-bold text-base">{settings.jcNumber}</div>
                    </div>
                  </div>
                )}

                {detailsSubTab === 'int' && (
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-blue-200">
                      <span className="text-slate-600">{t('beneficiaryBank', 'Beneficiary Bank')}:</span>
                      <span className="font-bold text-[#16232F]">{settings.intBank}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-blue-200">
                      <span className="text-slate-600">{t('swiftBic', 'SWIFT / BIC')}:</span>
                      <span className="font-mono font-bold text-[#16232F]">{settings.intSwift}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-600">{t('fieldIBAN', 'IBAN')}:</span>
                      <span className="font-mono font-bold text-[#16232F] text-xs">{settings.intIBAN}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Step CTA */}
              <button
                type="button"
                onClick={() => setActiveTab('confirm')}
                className="w-full py-3.5 rounded-xl bg-[#AD7A28] hover:bg-[#96681E] text-white font-semibold text-sm sm:text-base shadow-md transition-colors cursor-pointer"
              >
                {t('fundsSentSubmitProof', 'I Have Sent Funds — Submit Proof')}
              </button>

            </div>
          ) : (
            /* Tab 2: Confirm donation transaction proof */
            <form onSubmit={handleSubmitConfirmation} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-[#F8F4E8] border border-[#AD7A28]/20 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-600">{t('recordedAmount', 'Recorded Amount')}:</span>
                <span className="font-bold text-[#AD7A28] text-base">
                  {isUrdu ? `${(currentAmountDisplay || '2,500')} روپے` : `PKR ${currentAmountDisplay || '2,500'}`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('fieldDonorName', 'Donor Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder={t('phDonorName', 'e.g. Asad Chaudhary')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('fieldDonorPhone', 'Phone / WhatsApp')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('phDonorPhone', '+92 300 0000000')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('fieldPaymentMethod', 'Payment Method')}
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm bg-white"
                  >
                    <option value="Bank Transfer (Meezan Bank)">{t('optMeezanBank', 'Bank Transfer (Meezan Bank)')}</option>
                    <option value="Easypaisa">{t('optEasypaisa', 'Easypaisa')}</option>
                    <option value="JazzCash">{t('optJazzcash', 'JazzCash')}</option>
                    <option value="International Wire / SWIFT">{t('optInternationalTransfer', 'International Wire / SWIFT')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('fieldTxId', 'Transaction ID / Reference')}
                  </label>
                  <input
                    type="text"
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                    placeholder={t('phTxnRef', 'e.g. TXN-98765432')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('fieldDonationNote', 'Donation Purpose / Note (Optional)')}
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t('phDonationNote', 'e.g. Education scholarship fund, Bannu medical camp')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm"
                />
              </div>

              {/* Upload Payment Screenshot */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  {t('fieldProofPhoto', 'Upload Payment Screenshot / Slip')}
                </label>

                <div className="flex items-center gap-4">
                  {photoData ? (
                    <div className="relative">
                      <img
                        src={photoData}
                        alt="Receipt"
                        className="w-20 h-20 rounded-lg object-cover border-2 border-[#AD7A28]"
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
                    <div className="w-20 h-20 rounded-lg bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                      <FileCheck className="w-8 h-8" />
                    </div>
                  )}

                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleReceiptUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isCompressing}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#AD7A28]" />
                      <span>{photoData ? t('changeScreenshot', 'Change Screenshot') : t('uploadScreenshot', 'Upload Screenshot')}</span>
                    </button>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {t('screenshotHelp', 'Helps our accounts department verify and acknowledge immediately.')}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#AD7A28] to-[#8C601A] hover:from-[#C89238] hover:to-[#9F6E20] text-white font-semibold text-sm sm:text-base shadow-lg transition-all duration-150 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? t('btnSubmitting', 'Submitting...') : t('btnSubmitDonation', 'Submit Confirmation')}
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
