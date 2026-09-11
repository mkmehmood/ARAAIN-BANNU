import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Registration } from '../../types';
import QRCode from 'qrcode';
import { X, Printer, ShieldCheck, Download, Check, Eye } from 'lucide-react';
import { 
  translateNameToEnglish, 
  translateAddressToEnglish, 
  translateOccupationToEnglish, 
  translateCityToEnglish, 
  translateStateToEnglish, 
  translateCountryToEnglish, 
  translateGenderToEnglish, 
  translateMembershipTypeToEnglish,
  translateResidentialStatusToEnglish,
  translateEducationToEnglish,
  translateNameToUrdu, 
  translateAddressToUrdu, 
  translateOccupationToUrdu, 
  translateCityToUrdu, 
  translateStateToUrdu, 
  translateCountryToUrdu, 
  translateGenderToUrdu, 
  translateMembershipTypeToUrdu,
  translateResidentialStatusToUrdu,
  translateEducationToUrdu
} from '../../utils/urduTransliterator';

interface MembershipCardModalProps {
  registration: Registration | null;
  onClose: () => void;
}

export const MembershipCardModal: React.FC<MembershipCardModalProps> = ({
  registration,
  onClose,
}) => {
  const { t, isUrdu } = useLanguage();
  const { settings, getOrCreateMemberCardId } = useData();

  const [cardId, setCardId] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [qrPayloadText, setQrPayloadText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [showPayloadModal, setShowPayloadModal] = useState(false);

  // Resolved English values for the card (English-only card)
  const englishFullName = registration ? (registration.fullNameEn || translateNameToEnglish(registration.fullName)) : '';
  const englishFatherName = registration ? (registration.fatherNameEn || translateNameToEnglish(registration.fatherName)) : '';
  const englishWork = registration ? (registration.workEn || translateOccupationToEnglish(registration.work || '')) : '';
  const englishStreet = registration ? (registration.streetEn || (registration.street ? translateAddressToEnglish(registration.street) : '')) : '';
  const englishCity = registration ? (registration.cityEn || translateCityToEnglish(registration.city)) : 'Bannu';
  const englishState = registration ? (registration.stateEn || translateStateToEnglish(registration.state || 'KPK')) : 'KPK';
  const englishCountry = registration ? (registration.countryEn || translateCountryToEnglish(registration.country || 'Pakistan')) : 'Pakistan';
  const englishGender = registration ? (registration.genderEn || translateGenderToEnglish(registration.gender)) : 'Male';
  const englishType = registration ? (registration.membershipTypeEn || translateMembershipTypeToEnglish(registration.membershipType)) : 'General Member';
  const englishEducation = registration ? (registration.educationEn || translateEducationToEnglish(registration.education || '')) : '';
  const englishResidentialStatus = registration ? (registration.residentialStatusEn || translateResidentialStatusToEnglish(registration.residentialStatus)) : 'Resident (Pakistan)';

  const fullEnglishAddress = [englishStreet, englishCity, englishState, englishCountry].filter(Boolean).join(', ');

  useEffect(() => {
    if (!registration) return;

    let isMounted = true;
    const initCard = async () => {
      setIsLoading(true);
      try {
        const id = await getOrCreateMemberCardId(registration);
        if (!isMounted) return;
        setCardId(id);

        // Translated Urdu values for bidirectional record
        const urduFullName = registration.fullNameUr || translateNameToUrdu(registration.fullName);
        const urduFatherName = registration.fatherNameUr || translateNameToUrdu(registration.fatherName);
        const urduWork = registration.workUr || translateOccupationToUrdu(registration.work || '');
        const urduCity = registration.cityUr || translateCityToUrdu(registration.city);
        const urduState = registration.stateUr || translateStateToUrdu(registration.state || 'KPK');
        const urduCountry = registration.countryUr || translateCountryToUrdu(registration.country || 'Pakistan');
        const urduGender = registration.genderUr || translateGenderToUrdu(registration.gender);
        const urduMemberType = registration.membershipTypeUr || translateMembershipTypeToUrdu(registration.membershipType);
        const urduResidentStatus = registration.residentialStatusUr || translateResidentialStatusToUrdu(registration.residentialStatus);
        const urduEducation = registration.educationUr || translateEducationToUrdu(registration.education || '');
        const urduAddress = [
          registration.streetUr || translateAddressToUrdu(registration.street || ''),
          urduCity,
          urduState,
          urduCountry
        ].filter(Boolean).join('، ');

        // Construct COMPLETE QR CODE PAYLOAD containing ALL user registration data:
        const comprehensiveQrPayload = [
          `═══ ARAAIN BANNU KPK OFFICIAL MEMBER ═══`,
          `Card ID: ${id}`,
          `Full Name (English): ${englishFullName}`,
          `نام (Urdu): ${urduFullName}`,
          `Father / Guardian (English): ${englishFatherName}`,
          `ولدیت (Urdu): ${urduFatherName}`,
          `CNIC: ${registration.cnic || '—'}`,
          `DOB: ${registration.dob || '—'}`,
          `Gender: ${englishGender} (${urduGender})`,
          `Membership Type: ${englishType} (${urduMemberType})`,
          `WhatsApp / Phone: ${registration.whatsapp}`,
          `Email: ${registration.email || '—'}`,
          `Residential Status: ${englishResidentialStatus} (${urduResidentStatus})`,
          `Affiliated Org: ${registration.affiliated || 'None'}`,
          `Education: ${englishEducation || '—'} (${urduEducation})`,
          `Occupation / Work: ${englishWork || '—'} (${urduWork})`,
          `Reason / Interest: ${registration.reason || 'Community Welfare'}`,
          `Address (English): ${fullEnglishAddress}`,
          `پتہ (Urdu): ${urduAddress}`,
          `Submitted Date: ${registration.submittedAt ? (typeof registration.submittedAt === 'string' ? registration.submittedAt : new Date(registration.submittedAt.seconds * 1000).toISOString().slice(0, 10)) : new Date().toISOString().slice(0, 10)}`,
          `Verification: Official Verified Member`,
          `Authority: Executive Council Araain Bannu`,
          `Website: https://araainbannu.org`,
        ].join('\n');

        setQrPayloadText(comprehensiveQrPayload);

        // Generate High-Density QR code containing ALL registration data
        const qrData = await QRCode.toDataURL(comprehensiveQrPayload, {
          width: 320,
          margin: 1,
          errorCorrectionLevel: 'M',
          color: {
            dark: '#16232F',
            light: '#FFFFFF',
          },
        });

        if (isMounted) setQrCodeUrl(qrData);
      } catch (err) {
        console.error('Error generating card and QR:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initCard();
    return () => { isMounted = false; };
  }, [registration, englishFullName, englishFatherName, englishWork, fullEnglishAddress, englishGender, englishType, englishEducation, englishResidentialStatus]);

  if (!registration) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyQrData = () => {
    if (!qrPayloadText) return;
    navigator.clipboard.writeText(qrPayloadText);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const issueDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      {/* Print stylesheet for ISO/IEC 7810 ID-1 standard physical card printing (85.60 mm x 53.98 mm) */}
      <style>{`
        @media print {
          @page {
            size: auto;
            margin: 6mm;
          }
          body * {
            visibility: hidden;
          }
          #printable-card-area, #printable-card-area * {
            visibility: visible;
          }
          #printable-card-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 8mm !important;
            justify-content: center !important;
            align-items: center !important;
            background: transparent !important;
            padding: 0 !important;
          }
          .cr80-standard-card {
            width: 85.6mm !important;
            height: 53.98mm !important;
            min-width: 85.6mm !important;
            min-height: 53.98mm !important;
            max-width: 85.6mm !important;
            max-height: 53.98mm !important;
            box-shadow: none !important;
            border: 0.5pt solid #999 !important;
            border-radius: 3.18mm !important;
            margin: 0 !important;
            page-break-inside: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full my-4 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Modal Top Control Bar */}
        <div className="no-print bg-[#16232F] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-[#AD7A28]/30 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#AD7A28]/20 flex items-center justify-center text-[#F5CA7B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base leading-tight">
                Official Membership ID Card (Standard CR80 Size)
              </div>
              <div className="text-[11px] text-slate-400">
                {englishFullName} ({cardId || 'ID Pending'}) • English ID Card & Full QR Payload
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPayloadModal(!showPayloadModal)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              title="View Raw QR Registration Data"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View QR Data</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#AD7A28] hover:bg-[#96681E] text-white text-xs sm:text-sm font-bold shadow transition-all active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Card</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View QR Payload Details Drawer/Modal (if opened) */}
        {showPayloadModal && (
          <div className="no-print bg-slate-900 text-slate-200 px-6 py-4 border-b border-slate-700 text-xs animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-amber-300">
                All User Registration Data Encoded in QR Code:
              </span>
              <button
                onClick={copyQrData}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#AD7A28] hover:bg-[#96681E] text-white text-[11px] font-semibold transition-colors cursor-pointer"
              >
                {copiedPayload ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                <span>{copiedPayload ? 'Copied!' : 'Copy Payload'}</span>
              </button>
            </div>
            <pre className="bg-black/50 p-3 rounded-lg overflow-x-auto text-[11px] font-mono leading-relaxed text-emerald-300 whitespace-pre-wrap max-h-40 overflow-y-auto">
              {qrPayloadText}
            </pre>
          </div>
        )}

        {/* Card Stage Container */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-slate-200/70 flex-1 flex flex-col items-center justify-center gap-6">
          
          {isLoading ? (
            <div className="py-20 text-center text-slate-500 font-medium">
              <div className="w-8 h-8 border-3 border-[#AD7A28] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              Generating standard English ID card and complete QR dataset...
            </div>
          ) : (
            <div 
              id="printable-card-area" 
              className="flex flex-col xl:flex-row gap-6 sm:gap-8 items-center justify-center w-full max-w-5xl"
            >
              
              {/* ════════════════════════════════════════════════════════════════
                  FRONT FACE: Standard ISO CR80 Landscape ID Card (85.6mm x 53.98mm)
                  All Data and Labels in English
                  Standard English/Latin typography & formatting
                 ════════════════════════════════════════════════════════════════ */}
              <div 
                className="cr80-standard-card w-full max-w-[430px] aspect-[85.6/53.98] rounded-xl sm:rounded-2xl bg-white shadow-xl border border-slate-300 overflow-hidden flex flex-col justify-between relative select-none"
                style={{ direction: 'ltr' }}
              >
                {/* Micro Security Pattern Watermark */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.035]"
                  style={{
                    backgroundImage: 'radial-gradient(#16232F 1.5px, transparent 1.5px)',
                    backgroundSize: '12px 12px'
                  }}
                />

                {/* Top Header Bar */}
                <div className="bg-gradient-to-r from-[#16232F] via-[#1E3040] to-[#16232F] text-white px-3 py-2 border-b-2 border-[#AD7A28] flex items-center justify-between relative z-10 shrink-0">
                  <div className="flex items-center gap-2">
                    {/* Official Association Seal */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#AD7A28] to-[#F5CA7B] p-0.5 shadow shrink-0 flex items-center justify-center">
                      {settings.logoData ? (
                        <img 
                          src={settings.logoData} 
                          alt="Logo" 
                          className="w-full h-full rounded-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-[#16232F] flex items-center justify-center text-[#F5CA7B] text-[10px] font-black font-sans">
                          AB
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-extrabold text-[11px] sm:text-[12px] tracking-tight leading-none text-[#F5CA7B] uppercase">
                        ARAAIN BANNU WELFARE ASSOCIATION
                      </div>
                      <div className="text-[8px] sm:text-[9px] text-slate-300 tracking-wide mt-0.5">
                        Khyber Pakhtunkhwa, Pakistan
                      </div>
                    </div>
                  </div>

                  {/* Card ID Badge */}
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded bg-[#AD7A28] text-white text-[8px] sm:text-[9px] font-bold font-mono tracking-wider">
                      {cardId}
                    </span>
                  </div>
                </div>

                {/* Front Card Body: Photo & English Details */}
                <div className="px-3 sm:px-4 py-2 flex-1 flex items-center gap-3 relative z-10">
                  
                  {/* Member Photo */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-[72px] h-[90px] sm:w-[82px] sm:h-[102px] rounded-lg border-2 border-[#AD7A28] bg-slate-100 overflow-hidden shadow-sm flex items-center justify-center">
                      {registration.photoData ? (
                        <img 
                          src={registration.photoData} 
                          alt={englishFullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-400 font-bold text-2xl font-sans">
                          {englishFullName?.[0]?.toUpperCase() || 'M'}
                        </div>
                      )}
                    </div>
                    <div className="mt-1 px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 text-[8px] font-bold uppercase tracking-wider text-center max-w-[85px] truncate">
                      {englishType}
                    </div>
                  </div>

                  {/* Personal Particulars in English */}
                  <div className="flex-1 min-w-0 text-left space-y-1">
                    {/* Full Name */}
                    <div>
                      <div className="text-[9px] text-slate-500 font-medium leading-none uppercase tracking-wider">Member Name:</div>
                      <div className="text-[14px] sm:text-[15px] font-extrabold text-[#16232F] truncate leading-tight mt-0.5">
                        {englishFullName}
                      </div>
                    </div>

                    {/* Father / Guardian Name */}
                    <div>
                      <div className="text-[9px] text-slate-500 font-medium leading-none uppercase tracking-wider">Father / Guardian:</div>
                      <div className="text-[11px] sm:text-[12px] font-bold text-slate-800 truncate mt-0.5">
                        {englishFatherName}
                      </div>
                    </div>

                    {/* CNIC */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="text-[9px] text-slate-500 font-medium uppercase tracking-wider shrink-0">CNIC No:</span>
                      <span className="text-[11px] sm:text-[12px] font-mono font-bold text-[#16232F] tracking-wider">
                        {registration.cnic || '—'}
                      </span>
                    </div>

                    {/* DOB & Gender */}
                    <div className="flex items-center justify-between text-[9px] pt-0.5">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500 uppercase tracking-wider">DOB:</span>
                        <span className="font-mono font-semibold text-slate-800">
                          {registration.dob || '—'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500 uppercase tracking-wider">Gender:</span>
                        <span className="font-bold text-slate-800">{englishGender}</span>
                      </div>
                    </div>

                    {/* Issue Date */}
                    <div className="flex items-center gap-1 text-[8px] text-slate-500 pt-0.5">
                      <span className="uppercase tracking-wider">Issue Date:</span>
                      <span className="font-mono font-semibold text-slate-700">
                        {issueDate}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Front Footer Bar */}
                <div className="bg-[#F8F5EE] px-3 py-1.5 border-t border-slate-200 flex items-center justify-between relative z-10 shrink-0">
                  <div className="text-[8px] text-[#AD7A28] font-bold flex items-center gap-1 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Verified Official Member • Bannu KPK</span>
                  </div>
                  <div className="text-[8px] text-slate-600 font-medium">
                    Authorized Signatory / President
                  </div>
                </div>

              </div>


              {/* ════════════════════════════════════════════════════════════════
                  BACK FACE: Standard ISO CR80 Landscape ID Card (85.6mm x 53.98mm)
                  All Data and Labels in English
                  Complete QR Code Containing ALL Registration Information
                 ════════════════════════════════════════════════════════════════ */}
              <div 
                className="cr80-standard-card w-full max-w-[430px] aspect-[85.6/53.98] rounded-xl sm:rounded-2xl bg-white shadow-xl border border-slate-300 overflow-hidden flex flex-col justify-between relative select-none"
                style={{ direction: 'ltr' }}
              >
                {/* Micro Security Pattern Watermark */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.035]"
                  style={{
                    backgroundImage: 'radial-gradient(#16232F 1.5px, transparent 1.5px)',
                    backgroundSize: '12px 12px'
                  }}
                />

                {/* Back Top Header */}
                <div className="bg-[#16232F] text-white px-3 py-1.5 border-b-2 border-[#AD7A28] flex items-center justify-between relative z-10 shrink-0">
                  <div className="font-bold text-[10px] sm:text-[11px] text-[#F5CA7B] uppercase tracking-wider">
                    Official Identification & Verification
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-amber-200 font-mono tracking-wider">
                    VERIFIED MEMBER • {cardId}
                  </div>
                </div>

                {/* Back Card Body: Address, Profession, Contact & COMPLETE REGISTRATION QR CODE */}
                <div className="px-3 sm:px-4 py-2 flex-1 flex items-center justify-between gap-2.5 relative z-10">
                  
                  {/* Left Column: English Particulars */}
                  <div className="flex-1 min-w-0 space-y-1 text-[9px] text-left">
                    
                    {/* Address in English */}
                    <div>
                      <span className="text-slate-500 font-medium uppercase tracking-wider">Address: </span>
                      <span className="font-semibold text-slate-800 leading-snug break-words">
                        {fullEnglishAddress}
                      </span>
                    </div>

                    {/* Profession / Work in English */}
                    <div>
                      <span className="text-slate-500 font-medium uppercase tracking-wider">Profession: </span>
                      <span className="font-bold text-slate-800">
                        {englishWork || 'Member'}
                      </span>
                    </div>

                    {/* WhatsApp / Phone in English */}
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500 font-medium uppercase tracking-wider shrink-0">Contact:</span>
                      <span className="font-mono font-bold text-[#16232F]">
                        {registration.whatsapp}
                      </span>
                    </div>

                    {/* Email in English Format */}
                    {registration.email && (
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500 font-medium uppercase tracking-wider shrink-0">Email:</span>
                        <span className="font-mono text-[8px] text-slate-700 truncate">
                          {registration.email}
                        </span>
                      </div>
                    )}

                    {/* Official Website */}
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500 font-medium uppercase tracking-wider shrink-0">Website:</span>
                      <span className="font-mono text-[8px] text-[#AD7A28] font-bold">
                        www.araainbannu.org
                      </span>
                    </div>

                    {/* Terms Notice */}
                    <div className="text-[7.5px] text-slate-500 leading-tight pt-0.5 border-t border-slate-100">
                      This card is the property of Araain Bannu Welfare Association. If found, please return to the central office.
                    </div>
                  </div>

                  {/* Right Column: COMPLETE DATA QR CODE */}
                  <div className="shrink-0 flex flex-col items-center justify-center">
                    <div className="p-1 rounded-lg bg-white border border-slate-300 shadow-sm flex items-center justify-center">
                      {qrCodeUrl ? (
                        <img 
                          src={qrCodeUrl} 
                          alt="Registration QR Code" 
                          className="w-[78px] h-[78px] sm:w-[88px] sm:h-[88px] object-contain"
                        />
                      ) : (
                        <div className="w-[78px] h-[78px] flex items-center justify-center text-[9px] text-slate-400">
                          QR Code
                        </div>
                      )}
                    </div>
                    <div className="text-[7.5px] text-[#AD7A28] font-bold mt-1 text-center leading-none uppercase tracking-wider">
                      SCAN FOR FULL DOSSIER
                    </div>
                    <div className="text-[6.5px] text-slate-400 text-center font-mono mt-0.5">
                      ALL REGISTERED DATA
                    </div>
                  </div>

                </div>

                {/* Back Footer */}
                <div className="bg-[#F8F5EE] px-3 py-1 border-t border-slate-200 flex items-center justify-between text-[7.5px] text-slate-600 relative z-10 shrink-0">
                  <div>
                    Central Office: Mohallah Qasaban, Bannu City, Khyber Pakhtunkhwa
                  </div>
                  <div className="font-mono">
                    ISO 7810 ID-1 CR80
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="no-print bg-slate-50 px-4 sm:px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <div className="text-xs text-slate-600 text-center sm:text-left">
            <span className="font-semibold text-slate-800">
              Standard Card Printing Size:
            </span>{' '}
            <span className="font-mono text-[#AD7A28] font-bold">85.60 mm × 53.98 mm (CR80)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyQrData}
              className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copiedPayload ? 'Copied!' : 'Copy All QR Data'}
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-[#AD7A28] hover:bg-[#96681E] text-white text-xs sm:text-sm font-bold shadow transition-all active:scale-95 cursor-pointer"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
