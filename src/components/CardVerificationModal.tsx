import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { lookupVerifiedCard, registerVerifiedCard, PublicVerifiedCard } from '../services/firebase';
import { sanitizeCardId } from '../utils/security';
import { 
  scanQrFromCanvas, 
  scanQrFromImageFile, 
  parseQrPayload, 
  ExtractedMemberData 
} from '../utils/qrScanner';
import { 
  X, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Award, 
  Calendar,
  Building2,
  Copy,
  Check,
  Camera,
  Upload,
  RefreshCw,
  Eye,
  UserCheck,
  ExternalLink
} from 'lucide-react';

interface CardVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCardId?: string;
}

export const CardVerificationModal: React.FC<CardVerificationModalProps> = ({
  isOpen,
  onClose,
  initialCardId = '',
}) => {
  const { t, isUrdu } = useLanguage();
  const { registrations, settings } = useData();
  const [activeTab, setActiveTab] = useState<'id' | 'scan'>('id');
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifiedRecord, setVerifiedRecord] = useState<PublicVerifiedCard | null>(null);
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // QR Camera & Scan State
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedMemberData | null>(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [showRawPayload, setShowRawPayload] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const stopCamera = useCallback(() => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const performLookup = useCallback(async (idToSearch: string) => {
    const clean = sanitizeCardId(idToSearch);
    if (!clean) {
      setErrorText(
        isUrdu
          ? 'براہ کرم درست کارڈ نمبر درج کریں (مثال: AB-26-123456)'
          : 'Please enter a valid Card ID format (e.g. AB-26-123456)'
      );
      return;
    }

    setLoading(true);
    setErrorText(null);
    setSearched(true);

    try {
      const record = await lookupVerifiedCard(clean, registrations);
      setVerifiedRecord(record);
    } catch (err: any) {
      setErrorText(
        isUrdu 
          ? 'تصدیقی ریکارڈ لوڈ کرنے میں خرابی۔' 
          : 'Error querying verification registry.'
      );
      setVerifiedRecord(null);
    } finally {
      setLoading(false);
    }
  }, [isUrdu, registrations]);

  useEffect(() => {
    if (isOpen) {
      const cleanInitial = sanitizeCardId(initialCardId);
      if (cleanInitial) {
        setSearchId(cleanInitial);
        setActiveTab('id');
        performLookup(cleanInitial);
      } else {
        setVerifiedRecord(null);
        setSearched(false);
        setErrorText(null);
        setExtractedData(null);
      }
    } else {
      stopCamera();
    }
  }, [isOpen, initialCardId, performLookup, stopCamera]);

  // Clean up camera stream when unmounting or switching tabs
  useEffect(() => {
    if (activeTab !== 'scan') {
      stopCamera();
    }
  }, [activeTab, stopCamera]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const startCamera = async () => {
    setCameraError(null);
    setScanSuccess(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('CAMERA_UNSUPPORTED');
      }

      // Check permissions status where available
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const perm = await navigator.permissions.query({ name: 'camera' as PermissionName });
          if (perm.state === 'denied') {
            throw new Error('CAMERA_DENIED');
          }
        } catch (e: any) {
          if (e?.message === 'CAMERA_DENIED') throw e;
        }
      }

      // Stop any existing stream first
      stopCamera();

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
      } catch (e) {
        // Fallback to generic video constraint
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setCameraActive(true);
        requestScanFrame();
      }
    } catch (err: any) {
      console.warn('Camera start error:', err);
      setCameraActive(false);
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError' || err?.message === 'CAMERA_DENIED') {
        setCameraError(
          isUrdu
            ? 'کیمرہ کھولنے کی اجازت درکار ہے۔ براہ کرم براؤزر کے ایڈریس بار میں کیمرہ/لاک آئیکن پر کلک کر کے اجازت دیں، یا نیچے کارڈ کی تصویر اپ لوڈ کریں۔'
            : 'Camera permission is required. Please grant camera access in your browser address bar permissions, or upload a photo of the card below.'
        );
      } else {
        setCameraError(
          isUrdu
            ? 'کیمرہ تک رسائی ممکن نہیں ہوئی۔ براہ کرم نیچے دی گئی آپشن سے کارڈ کی تصویر یا کیو آر کوڈ اپ لوڈ کریں۔'
            : 'Unable to start camera. Please allow camera permissions or upload an image of the QR code below.'
        );
      }
    }
  };

  const requestScanFrame = () => {
    if (!videoRef.current || videoRef.current.readyState < 2) {
      animFrameIdRef.current = requestAnimationFrame(requestScanFrame);
      return;
    }

    const video = videoRef.current;
    if (!hiddenCanvasRef.current) {
      hiddenCanvasRef.current = document.createElement('canvas');
    }
    const canvas = hiddenCanvasRef.current;

    // Match canvas dimensions to video
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const scanResult = scanQrFromCanvas(canvas);

      if (scanResult && scanResult.data) {
        // Successfully scanned QR code!
        handleQrDetected(scanResult.data, scanResult.extracted);
        return;
      }
    }

    animFrameIdRef.current = requestAnimationFrame(requestScanFrame);
  };

  const handleQrDetected = (rawPayload: string, extracted: ExtractedMemberData) => {
    // Play light vibration if supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(100);
    }

    stopCamera();
    setScanSuccess(true);
    setExtractedData(extracted);

    if (extracted.cardId) {
      setSearchId(extracted.cardId);

      // If the scanned card payload includes signed member credentials, immediately record and verify
      if (extracted.fullName || extracted.fullNameUr) {
        const verifiedDirectly: PublicVerifiedCard = {
          cardId: extracted.cardId,
          fullNameEn: extracted.fullName || '',
          fullNameUr: extracted.fullNameUr || extracted.fullName || '',
          membershipTypeEn: extracted.membershipType || 'Official Member',
          membershipTypeUr: extracted.membershipType || 'باضابطہ رکن',
          status: 'verified',
          issuedAt: extracted.issuedDate || new Date().toLocaleDateString('en-GB'),
          councilName: extracted.authority || settings?.siteName || 'ARAAIN ASSOCIATION BANNU',
        };
        registerVerifiedCard(verifiedDirectly);
        setVerifiedRecord(verifiedDirectly);
        setSearched(true);
        setErrorText(null);
        return;
      }

      performLookup(extracted.cardId);
    } else {
      setSearched(true);
      setErrorText(
        isUrdu
          ? 'کیو آر کوڈ اسکین ہو گیا لیکن کارڈ نمبر نہیں مل سکا۔'
          : 'QR code scanned, but no recognized Card ID was detected in the payload.'
      );
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setCameraError(null);
    setScanSuccess(false);
    setErrorText(null);

    try {
      const result = await scanQrFromImageFile(file);
      if (result && result.data) {
        handleQrDetected(result.data, result.extracted);
      } else {
        setErrorText(
          isUrdu
            ? 'اس تصویر میں کوئی درست کیو آر کوڈ نہیں ملا۔ براہ کرم صاف اور واضح تصویر اپ لوڈ کریں۔'
            : 'No valid QR code was detected in this image. Please provide a clear, well-lit photo.'
        );
      }
    } catch (err: any) {
      setErrorText(
        isUrdu
          ? 'تصویر پڑھنے میں خرابی واقع ہوئی۔'
          : 'Failed to process the uploaded image file.'
      );
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(searchId);
  };

  const handleCopyCardId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#16232F] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#AD7A28]/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#AD7A28]/20 border border-[#AD7A28]/40 text-[#F5CA7B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {t('verifyModalTitle', 'Official Membership Verification')}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300">
                {t('verifyModalSub', 'Public authenticity check & QR data extraction')}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 p-1.5 gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              stopCamera();
              setActiveTab('id');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'id'
                ? 'bg-white text-[#16232F] shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'کارڈ نمبر سے تلاش' : 'Search by Card ID'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('scan');
              startCamera();
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'scan'
                ? 'bg-[#AD7A28] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'کیو آر کوڈ اسکین کریں' : 'Scan Card QR Code'}</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">

          {/* TAB 1: SEARCH BY CARD ID */}
          {activeTab === 'id' && (
            <div className="space-y-2">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                    placeholder={isUrdu ? "کارڈ نمبر یا شناختی کارڈ (AB-26-XXXXXX)" : "Card ID or CNIC (e.g. AB-26-XXXXXX)"}
                    className="w-full pl-9 rtl:pr-9 rtl:pl-3.5 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#AD7A28] text-sm uppercase tracking-wider font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-[#AD7A28] hover:bg-[#96681E] text-white font-semibold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {loading ? (isUrdu ? 'تلاش جاری...' : 'Checking...') : (isUrdu ? 'تصدیق کریں' : 'Verify')}
                </button>
              </form>

              <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-500 px-1">
                <span>{isUrdu ? 'کارڈ پر درج کارڈ آئی ڈی یا قومی شناختی کارڈ نمبر درج کریں' : 'Accepts printed Card ID or registered CNIC number'}</span>
                {registrations && registrations.length > 0 && registrations.find(r => r.cardId) && (
                  <button
                    type="button"
                    onClick={() => {
                      const sample = registrations.find(r => r.cardId);
                      if (sample?.cardId) {
                        setSearchId(sample.cardId);
                        performLookup(sample.cardId);
                      }
                    }}
                    className="text-[#AD7A28] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>{isUrdu ? 'نمونہ کارڈ چیک کریں:' : 'Test sample card:'}</span>
                    <span className="font-mono">{registrations.find(r => r.cardId)?.cardId}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE QR SCANNER & IMAGE UPLOADER */}
          {activeTab === 'scan' && (
            <div className="space-y-3">
              {/* Camera Scanner Box */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-4/3 sm:aspect-16/9 flex items-center justify-center border-2 border-slate-800 shadow-inner">
                {cameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />

                    {/* Scanner Framing Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-52 h-52 sm:w-60 sm:h-60 border-2 border-dashed border-[#F5CA7B] rounded-2xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.45)] flex items-center justify-center">
                        <div className="absolute -top-1 -left-1 w-5 h-5 border-t-3 border-l-3 border-[#AD7A28] rounded-tl-lg" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 border-t-3 border-r-3 border-[#AD7A28] rounded-tr-lg" />
                        <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-3 border-l-3 border-[#AD7A28] rounded-bl-lg" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-3 border-r-3 border-[#AD7A28] rounded-br-lg" />
                        
                        {/* Scanning Laser Animation */}
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#F5CA7B] to-transparent shadow-[0_0_8px_#F5CA7B] animate-pulse" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-auto">
                      <span className="text-[11px] text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                        {isUrdu ? 'کارڈ پر موجود کیو آر کوڈ فریم میں لائیں' : 'Align card QR inside frame'}
                      </span>
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="text-[11px] text-white/80 hover:text-white bg-black/70 px-2.5 py-1 rounded-full cursor-pointer hover:bg-black"
                      >
                        {isUrdu ? 'کیمرہ بند کریں' : 'Stop Camera'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#F5CA7B] flex items-center justify-center mx-auto border border-white/10">
                      <Camera className="w-7 h-7" />
                    </div>
                    <div className="text-slate-300 text-xs max-w-xs mx-auto">
                      {cameraError || (isUrdu 
                        ? 'اپنے موبائل یا لیپ ٹاپ کیمرے سے کارڈ کا کیو آر کوڈ اسکین کریں۔' 
                        : 'Use live camera to accurately scan & extract membership card QR code.')}
                    </div>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-4 py-2 rounded-xl bg-[#AD7A28] hover:bg-[#8C601A] text-white text-xs font-bold cursor-pointer inline-flex items-center gap-2 shadow-lg"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{isUrdu ? 'کیمرہ شروع کریں' : 'Start Camera Scanner'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Upload QR Image Fallback */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-600 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#AD7A28]" />
                  <span>{isUrdu ? 'یا کارڈ یا کیو آر کوڈ کی تصویر اپ لوڈ کریں:' : 'Or upload image/photo of the card or QR:'}</span>
                </div>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                    id="qr-image-upload"
                  />
                  <label
                    htmlFor="qr-image-upload"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Upload className="w-3 h-3" />
                    <span>{isUrdu ? 'تصویر منتخب کریں' : 'Browse Photo'}</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorText && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{errorText}</span>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="p-6 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-[#AD7A28] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-slate-600 font-medium">
                {isUrdu 
                  ? 'مرکزی کونسل کے ریکارڈ سے کارڈ کی تصدیق اور ڈیٹا نکالا جا رہا ہے...' 
                  : 'Validating credentials & extracting data from registry...'}
              </p>
            </div>
          )}

          {/* EXTRACTED QR DATA SECTION (Shown whenever a QR code is scanned) */}
          {extractedData && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>{isUrdu ? 'کیو آر کوڈ سے حاصل شدہ ڈیٹا (Extracted Data)' : 'Extracted QR Data Dossier'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRawPayload(!showRawPayload)}
                  className="text-[10px] text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>{showRawPayload ? (isUrdu ? 'مخفی کریں' : 'Hide Raw') : (isUrdu ? 'مکمل کوڈ دیکھیں' : 'View Raw')}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {extractedData.cardId && (
                  <div className="col-span-2 sm:col-span-1 bg-white p-2 rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 block">{isUrdu ? 'کارڈ نمبر' : 'Card ID'}:</span>
                    <span className="font-mono font-bold text-[#16232F]">{extractedData.cardId}</span>
                  </div>
                )}

                {extractedData.fullName && (
                  <div className="col-span-2 sm:col-span-1 bg-white p-2 rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 block">{isUrdu ? 'رکن کا نام' : 'Full Name'}:</span>
                    <span className="font-semibold text-slate-800">{extractedData.fullName}</span>
                  </div>
                )}

                {extractedData.fatherName && (
                  <div className="col-span-2 sm:col-span-1 bg-white p-2 rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 block">{isUrdu ? 'ولدیت' : 'Father / Guardian'}:</span>
                    <span className="font-semibold text-slate-800">{extractedData.fatherName}</span>
                  </div>
                )}

                {extractedData.caste && (
                  <div className="col-span-2 sm:col-span-1 bg-white p-2 rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 block">{isUrdu ? 'قومیت / قبیلہ' : 'Caste'}:</span>
                    <span className="font-bold text-[#AD7A28]">{extractedData.caste}</span>
                  </div>
                )}

                {extractedData.cnic && (
                  <div className="col-span-2 sm:col-span-1 bg-white p-2 rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 block">CNIC:</span>
                    <span className="font-mono font-semibold text-slate-700">{extractedData.cnic}</span>
                  </div>
                )}

                {extractedData.membershipType && (
                  <div className="col-span-2 sm:col-span-1 bg-white p-2 rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 block">{isUrdu ? 'کیٹگری' : 'Category'}:</span>
                    <span className="font-medium text-slate-700">{extractedData.membershipType}</span>
                  </div>
                )}
              </div>

              {/* Collapsible Raw Scanned Payload */}
              {showRawPayload && (
                <div className="pt-2 border-t border-blue-200">
                  <span className="text-[10px] text-slate-500 font-semibold block mb-1">Raw Scanned QR String:</span>
                  <pre className="p-2.5 rounded-lg bg-slate-900 text-emerald-400 text-[10px] font-mono whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed select-all">
                    {extractedData.raw}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* RESULT CARD: VERIFIED IN DATABASE */}
          {!loading && searched && verifiedRecord && (
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/30 p-4 sm:p-5 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200/60">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{isUrdu ? 'مصدق رکن / کارڈ فعال ہے' : 'VERIFIED OFFICIAL MEMBER'}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider border border-emerald-300">
                  {verifiedRecord.status || 'Active'}
                </span>
              </div>

              {/* Verified Details */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{isUrdu ? 'کارڈ نمبر' : 'Card ID'}:</span>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900">
                    <span>{verifiedRecord.cardId}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyCardId(verifiedRecord.cardId)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                      title="Copy Card ID"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{isUrdu ? 'رکن کا نام' : 'Member Name'}:</span>
                  <span className="font-bold text-slate-900">
                    {isUrdu 
                      ? (verifiedRecord.fullNameUr || verifiedRecord.fullNameEn) 
                      : (verifiedRecord.fullNameEn || verifiedRecord.fullNameUr)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{isUrdu ? 'رکنیت کی قسم' : 'Membership Category'}:</span>
                  <span className="font-medium text-slate-800 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#AD7A28]" />
                    {isUrdu 
                      ? (verifiedRecord.membershipTypeUr || verifiedRecord.membershipTypeEn) 
                      : (verifiedRecord.membershipTypeEn || verifiedRecord.membershipTypeUr)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{isUrdu ? 'جاری کنندہ ادارہ' : 'Issuing Council'}:</span>
                  <span className="font-medium text-slate-800 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    {verifiedRecord.councilName || 'Araain Association Bannu'}
                  </span>
                </div>

                {verifiedRecord.issuedAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{isUrdu ? 'تاریخ اجراء' : 'Issue Date'}:</span>
                    <span className="text-xs text-slate-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {verifiedRecord.issuedAt}
                    </span>
                  </div>
                )}
              </div>

              {/* Privacy Shield Notice */}
              <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-[11px] text-slate-600 flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#AD7A28] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'شہریوں اور اراکین کے ذاتی کوائف (شناختی کارڈ، رابطہ نمبر اور پتہ) سخت ترین حفاظتی ضوابط کے تحت محفوظ ہیں۔'
                    : 'Confidential member identifiers (CNIC, phone & address) are strictly protected under Community Data Privacy Standards.'}
                </span>
              </div>
            </div>
          )}

          {/* RESULT CARD: NOT FOUND IN DATABASE */}
          {!loading && searched && !verifiedRecord && (
            <div className="rounded-2xl border-2 border-amber-300/80 bg-amber-50/40 p-4 sm:p-5 space-y-2.5 text-center animate-fadeIn">
              <AlertTriangle className="w-9 h-9 text-amber-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-sm">
                {isUrdu ? 'کارڈ ریکارڈ مرکزی ڈیٹابیس میں نہیں ملا' : 'Card Record Not Found in Registry'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                {isUrdu
                  ? 'یہ کارڈ نمبر یا تو ابھی جاری نہیں ہوا یا ابھی تک تصدیق کے عمل سے نہیں گزرا۔ برائے تصدیق مرکزی دفتر سے رابطہ کریں۔'
                  : 'This Card ID could not be found in the verified registry. It may be pending review or invalid. Please contact the administration.'}
              </p>
            </div>
          )}

          {/* Help note */}
          <p className="text-[11px] text-slate-400 text-center">
            {isUrdu 
              ? 'کسی بھی سوال یا کارڈ تصدیق کے لیے رابطہ فارم استعمال کریں۔' 
              : 'For registration inquiries or card verification support, please use the official contact channels.'}
          </p>
        </div>

      </div>
    </div>
  );
};
