import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { 
  Registration, 
  Donation, 
  ContactMessage, 
  Program, 
  Leader, 
  EventItem, 
  PageItem, 
  GalleryItem 
} from '../../types';
import { compressImage } from '../../services/firebase';
import { MembershipCardModal } from './MembershipCardModal';
import { 
  ShieldCheck, 
  Users, 
  Heart, 
  Mail, 
  Settings, 
  ExternalLink, 
  LogOut, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  CreditCard, 
  Trash2, 
  Plus, 
  Save, 
  Image as ImageIcon,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  FileText
} from 'lucide-react';

interface AdminDashboardProps {
  onExitAdmin: () => void;
  onLogout: () => void;
  adminEmail: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onExitAdmin,
  onLogout,
  adminEmail,
}) => {
  const { t, isUrdu, lang, setLanguage, tSetting } = useLanguage();
  const {
    settings,
    programs,
    leaders,
    events,
    pages,
    gallery,
    registrations,
    donations,
    messages,
    isCloudConnected,
    saveSettings,
    savePrograms,
    saveLeaders,
    saveEvents,
    savePages,
    saveGallery,
    updateRegistrationStatus,
    deleteRegistration,
    updateDonationStatus,
    deleteDonation,
  } = useData();

  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'donations' | 'messages' | 'cms'>('overview');
  const [cmsTab, setCmsTab] = useState<'identity' | 'hero' | 'about' | 'programs' | 'leaders' | 'events' | 'pages' | 'gallery' | 'bank' | 'contact'>('identity');

  // Search & Filter states
  const [memberSearch, setMemberSearch] = useState('');
  const [memberStatusFilter, setMemberStatusFilter] = useState('all');
  const [donationSearch, setDonationSearch] = useState('');
  const [donationStatusFilter, setDonationStatusFilter] = useState('all');

  // Modals inside Admin
  const [selectedRegForCard, setSelectedRegForCard] = useState<Registration | null>(null);
  const [viewingRegDetails, setViewingRegDetails] = useState<Registration | null>(null);
  const [viewingDonationProof, setViewingDonationProof] = useState<Donation | null>(null);

  // Local CMS edits
  const [tempSettings, setTempSettings] = useState(settings);
  const [tempPrograms, setTempPrograms] = useState<Program[]>(programs);
  const [tempLeaders, setTempLeaders] = useState<Leader[]>(leaders);
  const [tempEvents, setTempEvents] = useState<EventItem[]>(events);
  const [tempPages, setTempPages] = useState<PageItem[]>(pages);
  const [tempGallery, setTempGallery] = useState<GalleryItem[]>(gallery);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Stats
  const totalDonationAmount = donations.reduce((sum, d) => {
    const num = parseInt(String(d.amount || '').replace(/[^0-9]/g, '')) || 0;
    return sum + num;
  }, 0);

  // Export registrations as CSV
  const exportMembersCsv = () => {
    const headers = ['Full Name', 'Father Name', 'CNIC', 'Gender', 'Type', 'WhatsApp', 'Email', 'City', 'Status', 'Submitted At'];
    const rows = registrations.map(r => [
      `"${r.fullName || ''}"`,
      `"${r.fatherName || ''}"`,
      `"${r.cnic || ''}"`,
      `"${r.gender || ''}"`,
      `"${r.membershipType || ''}"`,
      `"${r.whatsapp || ''}"`,
      `"${r.email || ''}"`,
      `"${r.city || ''}"`,
      `"${r.status || ''}"`,
      `"${r.submittedAt || ''}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Arain_Bannu_Members_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export donations as CSV
  const exportDonationsCsv = () => {
    const headers = ['Donor Name', 'Amount (PKR)', 'Phone', 'Method', 'Transaction ID', 'Status', 'Note', 'Date'];
    const rows = donations.map(d => [
      `"${d.donorName || ''}"`,
      `"${d.amount || ''}"`,
      `"${d.phone || ''}"`,
      `"${d.method || ''}"`,
      `"${d.txId || ''}"`,
      `"${d.status || ''}"`,
      `"${d.note || ''}"`,
      `"${d.submittedAt || ''}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Arain_Bannu_Donations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save changes handler for CMS
  const handleSaveCms = async () => {
    setSaveStatus('Saving to Firebase Firestore...');
    try {
      await saveSettings(tempSettings);
      await savePrograms(tempPrograms);
      await saveLeaders(tempLeaders);
      await saveEvents(tempEvents);
      await savePages(tempPages);
      await saveGallery(tempGallery);
      setSaveStatus('Saved & Synced Successfully!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err: any) {
      console.error(err);
      setSaveStatus('Error saving: ' + err.message);
    }
  };

  // Filtered members
  const filteredMembers = registrations.filter(r => {
    const matchesSearch = 
      (r.fullName?.toLowerCase() || '').includes(memberSearch.toLowerCase()) ||
      (r.cnic || '').includes(memberSearch) ||
      (r.whatsapp || '').includes(memberSearch) ||
      (r.city?.toLowerCase() || '').includes(memberSearch.toLowerCase());
    const matchesStatus = memberStatusFilter === 'all' || (r.status || 'new').toLowerCase() === memberStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filtered donations
  const filteredDonations = donations.filter(d => {
    const matchesSearch = 
      (d.donorName?.toLowerCase() || '').includes(donationSearch.toLowerCase()) ||
      (d.phone || '').includes(donationSearch) ||
      (d.txId || '').includes(donationSearch);
    const matchesStatus = donationStatusFilter === 'all' || (d.status || 'unverified').toLowerCase() === donationStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      
      {/* Admin Top Header */}
      <header className="bg-[#16232F] text-white border-b border-[#AD7A28]/30 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#AD7A28] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              AB
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base leading-tight flex items-center gap-2">
                <span>{tSetting('siteName', settings)}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#AD7A28]/20 border border-[#AD7A28]/40 text-[#F5CA7B] text-[10px] font-semibold uppercase">
                  {isUrdu ? 'سینٹرل ایڈمن' : 'Central Admin'}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                {isUrdu ? 'لاگ ان بطور: ' : 'Logged in as: '}<span className="text-amber-200">{adminEmail}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Firestore indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t('cloudSynced', 'Cloud Synced')}</span>
            </div>

            {/* Language Switcher in Admin */}
            <button
              onClick={() => setLanguage(lang === 'en' ? 'ur' : 'en')}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-200 hover:bg-amber-500/30 text-xs font-bold transition-colors cursor-pointer"
              title="Switch Language"
            >
              {lang === 'en' ? 'اردو' : 'English'}
            </button>

            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t('btnPublicSite', 'View Public Site')}</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
              title={isUrdu ? 'لاگ آؤٹ' : 'Sign Out'}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 border-t border-white/5 py-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#AD7A28] text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('tabOverview', 'Dashboard Overview')}</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'members' ? 'bg-[#AD7A28] text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t('tabRegistrations', 'Membership Applications')} ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'donations' ? 'bg-[#AD7A28] text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>{t('tabDonations', 'Donations')} ({donations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'messages' ? 'bg-[#AD7A28] text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>{t('tabMessages', 'Inquiries')} ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'cms' ? 'bg-[#AD7A28] text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{t('tabCMS', 'Site Content CMS')}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* ===================== TAB 1: OVERVIEW ===================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Total Registrations
                  </div>
                  <div className="text-3xl font-extrabold text-[#16232F] mt-1">
                    {registrations.length}
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    {registrations.filter(r => (r.status || 'new') === 'approved').length} approved members
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Donations Received
                  </div>
                  <div className="text-2xl font-extrabold text-[#AD7A28] mt-1 truncate max-w-[180px]">
                    PKR {totalDonationAmount.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    {donations.length} total transaction records
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#AD7A28] flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Flagship Programs
                  </div>
                  <div className="text-3xl font-extrabold text-[#16232F] mt-1">
                    {programs.length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Active welfare wings
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Upcoming Events
                  </div>
                  <div className="text-3xl font-extrabold text-[#16232F] mt-1">
                    {events.length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Public calendar gatherings
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recent Applications Preview */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#16232F]">
                    Recent Membership Applications
                  </h3>
                  <button
                    onClick={() => setActiveTab('members')}
                    className="text-xs font-semibold text-[#AD7A28] hover:underline"
                  >
                    View All ({registrations.length})
                  </button>
                </div>

                {registrations.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-sm">
                    No applications submitted yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {registrations.slice(0, 5).map((reg, idx) => (
                      <div
                        key={reg._id || idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          {reg.photoData ? (
                            <img
                              src={reg.photoData}
                              alt={reg.fullName}
                              className="w-10 h-10 rounded-full object-cover border border-[#AD7A28]/40"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">
                              {reg.fullName?.[0]?.toUpperCase() || 'M'}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-sm text-[#16232F]">
                              {reg.fullName}
                            </div>
                            <div className="text-xs text-slate-500">
                              {reg.membershipType} · {reg.city || 'Bannu'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            reg.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                            reg.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {reg.status || 'New'}
                          </span>

                          <button
                            onClick={() => setSelectedRegForCard(reg)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-[#AD7A28] hover:bg-white transition-colors"
                            title="Print Card"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Operation shortcuts */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-[#16232F] mb-4">
                    Quick Operations
                  </h3>
                  <div className="space-y-2.5">
                    <button
                      onClick={exportMembersCsv}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#AD7A28]" />
                        <span>Export All Members (CSV)</span>
                      </span>
                      <span className="text-slate-400">Excel / Sheets</span>
                    </button>

                    <button
                      onClick={exportDonationsCsv}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#AD7A28]" />
                        <span>Export Donations Ledger (CSV)</span>
                      </span>
                      <span className="text-slate-400">Excel / Sheets</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('cms'); setCmsTab('identity'); }}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-[#AD7A28]" />
                        <span>Edit Site Title & Logo</span>
                      </span>
                      <span className="text-slate-400">Branding</span>
                    </button>
                  </div>
                </div>

                {/* Cloud Status Card */}
                <div className="bg-gradient-to-br from-[#16232F] to-[#25394C] text-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-[#F5CA7B] text-xs font-bold uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>Firebase Backend Status</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Connected directly to production Firestore database. All public registrations, donation confirmations, and CMS adjustments synchronize in real-time.
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 bg-black/30 p-2.5 rounded-lg truncate">
                    Collection: siteConfig, registrations, donations
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ===================== TAB 2: MEMBERSHIP APPLICATIONS ===================== */}
        {activeTab === 'members' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              
              <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, CNIC, phone, city..."
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#AD7A28]"
                  />
                </div>

                <select
                  value={memberStatusFilter}
                  onChange={(e) => setMemberStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#AD7A28]"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={exportMembersCsv}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="px-4 py-3.5">Applicant</th>
                      <th className="px-4 py-3.5">CNIC / Gender</th>
                      <th className="px-4 py-3.5">Category</th>
                      <th className="px-4 py-3.5">WhatsApp / City</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMembers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                          No matching member applications found.
                        </td>
                      </tr>
                    ) : (
                      filteredMembers.map((reg) => (
                        <tr key={reg._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              {reg.photoData ? (
                                <img
                                  src={reg.photoData}
                                  alt={reg.fullName}
                                  className="w-10 h-12 rounded-lg object-cover border border-[#AD7A28]/40 shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-12 rounded-lg bg-slate-200 flex items-center justify-center font-bold text-slate-500 shrink-0">
                                  {reg.fullName?.[0]?.toUpperCase() || 'M'}
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-[#16232F]">
                                  {reg.fullName}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  S/O: {reg.fatherName}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            <div className="font-mono text-xs font-semibold text-slate-700">
                              {reg.cnic || '—'}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {reg.gender}
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                              {reg.membershipType}
                            </span>
                          </td>

                          <td className="px-4 py-3.5">
                            <div className="font-medium text-slate-700">
                              {reg.whatsapp}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {reg.city}, {reg.country}
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            <select
                              value={reg.status || 'new'}
                              onChange={(e) => reg._id && updateRegistrationStatus(reg._id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                                reg.status === 'approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                reg.status === 'rejected' ? 'bg-red-50 text-red-800 border-red-300' :
                                'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>

                          <td className="px-4 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setViewingRegDetails(reg)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                title="View Dossier"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => setSelectedRegForCard(reg)}
                                className="p-1.5 rounded-lg text-[#AD7A28] hover:text-[#8C601A] hover:bg-amber-50"
                                title="Print Membership ID Card"
                              >
                                <CreditCard className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => reg._id && confirm('Delete this application record?') && deleteRegistration(reg._id)}
                                className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50"
                                title="Delete Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 3: DONATIONS ===================== */}
        {activeTab === 'donations' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by donor name, phone, TX ID..."
                    value={donationSearch}
                    onChange={(e) => setDonationSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#AD7A28]"
                  />
                </div>

                <select
                  value={donationStatusFilter}
                  onChange={(e) => setDonationStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#AD7A28]"
                >
                  <option value="all">All Verification</option>
                  <option value="unverified">Unverified</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportDonationsCsv}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Donations Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="px-4 py-3.5">Donor Details</th>
                      <th className="px-4 py-3.5">Amount (PKR)</th>
                      <th className="px-4 py-3.5">Method & Reference</th>
                      <th className="px-4 py-3.5">Screenshot / Slip</th>
                      <th className="px-4 py-3.5">Verification</th>
                      <th className="px-4 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                          No donation transactions recorded yet.
                        </td>
                      </tr>
                    ) : (
                      filteredDonations.map((don) => (
                        <tr key={don._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3.5">
                            <div className="font-bold text-[#16232F]">
                              {don.donorName}
                            </div>
                            <div className="text-xs text-slate-500">
                              {don.phone} {don.email && `· ${don.email}`}
                            </div>
                          </td>

                          <td className="px-4 py-3.5 font-bold text-[#AD7A28] text-sm sm:text-base font-mono">
                            PKR {parseInt(String(don.amount || '').replace(/[^0-9]/g, '') || '0').toLocaleString()}
                          </td>

                          <td className="px-4 py-3.5">
                            <div className="text-xs font-semibold text-slate-800">
                              {don.method}
                            </div>
                            <div className="font-mono text-[11px] text-slate-500">
                              TX: {don.txId || 'N/A'}
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            {don.photoData ? (
                              <button
                                onClick={() => setViewingDonationProof(don)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                              >
                                <ImageIcon className="w-3.5 h-3.5 text-[#AD7A28]" />
                                <span>View Slip</span>
                              </button>
                            ) : (
                              <span className="text-slate-400 text-xs italic">No slip attached</span>
                            )}
                          </td>

                          <td className="px-4 py-3.5">
                            <select
                              value={don.status || 'unverified'}
                              onChange={(e) => don._id && updateDonationStatus(don._id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                                don.status === 'verified' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                don.status === 'rejected' ? 'bg-red-50 text-red-800 border-red-300' :
                                'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="unverified">Unverified</option>
                              <option value="verified">Verified</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>

                          <td className="px-4 py-3.5 text-right">
                            <button
                              onClick={() => don._id && confirm('Delete this donation transaction?') && deleteDonation(don._id)}
                              className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 4: INQUIRIES & MESSAGES ===================== */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#16232F] mb-4">
                Received Public Inquiries ({messages.length})
              </h3>

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-sm">
                    No inquiries received yet.
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-bold text-base text-[#16232F]">{m.name}</span>
                          <span className="text-xs text-slate-500 ml-2">({m.email})</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(m.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="font-semibold text-sm text-[#AD7A28]">
                        Subject: {m.subject}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                        {m.message}
                      </p>

                      <div className="flex items-center gap-3 pt-1">
                        <a
                          href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16232F] text-white text-xs font-semibold hover:bg-[#25394C]"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply via Email</span>
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: CMS CONTENT MANAGER ===================== */}
        {activeTab === 'cms' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Bar for CMS with Save button */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#16232F]">
                  Website Content Management
                </h3>
                <p className="text-xs text-slate-500">
                  Edit texts, banners, programs, leadership, and accounts. Pushes directly to Firebase.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {saveStatus && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    {saveStatus}
                  </span>
                )}
                <button
                  onClick={handleSaveCms}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#AD7A28] hover:bg-[#96681E] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Push to Cloud</span>
                </button>
              </div>
            </div>

            {/* CMS Section Pills */}
            <div className="flex overflow-x-auto gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              {[
                { id: 'identity', label: 'Identity & Brand' },
                { id: 'hero', label: 'Hero & Stats' },
                { id: 'about', label: 'About & Quote' },
                { id: 'programs', label: 'Programs' },
                { id: 'leaders', label: 'Leadership' },
                { id: 'events', label: 'Events' },
                { id: 'pages', label: 'Dynamic Pages' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'bank', label: 'Donation Accounts' },
                { id: 'contact', label: 'Contact Details' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setCmsTab(sub.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    cmsTab === sub.id ? 'bg-[#16232F] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* CMS Form Containers */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              
              {/* Identity CMS */}
              {cmsTab === 'identity' && (
                <div className="space-y-4 max-w-2xl">
                  <h4 className="text-sm font-bold text-[#16232F] border-b pb-2">
                    Branding & Organisation Seal
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Site Title</label>
                    <input
                      type="text"
                      value={tempSettings.siteName}
                      onChange={(e) => setTempSettings({ ...tempSettings, siteName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Sub Title / Chapter Tag</label>
                    <input
                      type="text"
                      value={tempSettings.siteSubName}
                      onChange={(e) => setTempSettings({ ...tempSettings, siteSubName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Core Motto / Tagline</label>
                    <input
                      type="text"
                      value={tempSettings.siteTagline}
                      onChange={(e) => setTempSettings({ ...tempSettings, siteTagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Custom Logo Emblem</label>
                    <div className="flex items-center gap-4">
                      {tempSettings.logoData && (
                        <img src={tempSettings.logoData} alt="Logo" className="w-14 h-14 rounded-full object-cover border" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const b64 = await compressImage(file, 400, 0.8);
                            setTempSettings({ ...tempSettings, logoData: b64 });
                          }
                        }}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Hero CMS */}
              {cmsTab === 'hero' && (
                <div className="space-y-4 max-w-2xl">
                  <h4 className="text-sm font-bold text-[#16232F] border-b pb-2">
                    Hero Presentation & Stats Counters
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={tempSettings.heroBadge}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroBadge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Title</label>
                    <input
                      type="text"
                      value={tempSettings.heroTitle}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Subtitle</label>
                    <input
                      type="text"
                      value={tempSettings.heroSub}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroSub: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Tagline</label>
                    <textarea
                      rows={3}
                      value={tempSettings.heroTagline}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroTagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Stat: Members</label>
                      <input
                        type="text"
                        value={tempSettings.statMembers}
                        onChange={(e) => setTempSettings({ ...tempSettings, statMembers: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Stat: Programs</label>
                      <input
                        type="text"
                        value={tempSettings.statPrograms}
                        onChange={(e) => setTempSettings({ ...tempSettings, statPrograms: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Stat: Cities</label>
                      <input
                        type="text"
                        value={tempSettings.statCities}
                        onChange={(e) => setTempSettings({ ...tempSettings, statCities: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* About CMS */}
              {cmsTab === 'about' && (
                <div className="space-y-4 max-w-2xl">
                  <h4 className="text-sm font-bold text-[#16232F] border-b pb-2">
                    About Section & Chairman's Message
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Paragraph 1</label>
                    <textarea
                      rows={3}
                      value={tempSettings.aboutP1}
                      onChange={(e) => setTempSettings({ ...tempSettings, aboutP1: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Paragraph 2</label>
                    <textarea
                      rows={3}
                      value={tempSettings.aboutP2}
                      onChange={(e) => setTempSettings({ ...tempSettings, aboutP2: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Paragraph 3</label>
                    <textarea
                      rows={3}
                      value={tempSettings.aboutP3}
                      onChange={(e) => setTempSettings({ ...tempSettings, aboutP3: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Chairman Name</label>
                      <input
                        type="text"
                        value={tempSettings.chairmanName}
                        onChange={(e) => setTempSettings({ ...tempSettings, chairmanName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Chairman Quote</label>
                      <textarea
                        rows={2}
                        value={tempSettings.chairmanQuote}
                        onChange={(e) => setTempSettings({ ...tempSettings, chairmanQuote: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Programs CMS */}
              {cmsTab === 'programs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-sm font-bold text-[#16232F]">
                      Initiatives & Programs ({tempPrograms.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => setTempPrograms([...tempPrograms, {
                        id: Date.now(),
                        title: 'New Welfare Initiative',
                        desc: 'Description of the new program initiative in Bannu.',
                        icon_name: 'award',
                        color: '#AD7A28',
                        sort_order: tempPrograms.length + 1
                      }])}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Program</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tempPrograms.map((p, idx) => (
                      <div key={p.id || idx} className="p-4 rounded-xl border bg-slate-50 space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => {
                              const updated = [...tempPrograms];
                              updated[idx].title = e.target.value;
                              setTempPrograms(updated);
                            }}
                            className="font-bold text-sm bg-white px-2 py-1 rounded border flex-1 mr-2"
                          />
                          <button
                            type="button"
                            onClick={() => setTempPrograms(tempPrograms.filter((_, i) => i !== idx))}
                            className="p-1 rounded text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={p.desc}
                          onChange={(e) => {
                            const updated = [...tempPrograms];
                            updated[idx].desc = e.target.value;
                            setTempPrograms(updated);
                          }}
                          className="w-full text-xs bg-white px-2 py-1 rounded border"
                        />
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={p.color || '#AD7A28'}
                            onChange={(e) => {
                              const updated = [...tempPrograms];
                              updated[idx].color = e.target.value;
                              setTempPrograms(updated);
                            }}
                            className="w-7 h-7 rounded cursor-pointer"
                          />
                          <span className="text-xs text-slate-500">Accent Color</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Leaders CMS */}
              {cmsTab === 'leaders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-sm font-bold text-[#16232F]">
                      Leadership Directory ({tempLeaders.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => setTempLeaders([...tempLeaders, {
                        id: Date.now(),
                        name: 'Leader Name',
                        role: 'Council Member',
                        email: 'leader@arainbannu.org',
                        featured: 0,
                        initials: 'AB'
                      }])}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Leader</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tempLeaders.map((lead, idx) => (
                      <div key={lead.id || idx} className="p-4 rounded-xl border bg-slate-50 space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={lead.name}
                            onChange={(e) => {
                              const updated = [...tempLeaders];
                              updated[idx].name = e.target.value;
                              setTempLeaders(updated);
                            }}
                            placeholder="Full Name"
                            className="font-bold text-sm bg-white px-2 py-1 rounded border flex-1 mr-2"
                          />
                          <button
                            type="button"
                            onClick={() => setTempLeaders(tempLeaders.filter((_, i) => i !== idx))}
                            className="p-1 rounded text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={lead.role}
                          onChange={(e) => {
                            const updated = [...tempLeaders];
                            updated[idx].role = e.target.value;
                            setTempLeaders(updated);
                          }}
                          placeholder="Designation"
                          className="w-full text-xs bg-white px-2 py-1 rounded border"
                        />

                        <input
                          type="email"
                          value={lead.email || ''}
                          onChange={(e) => {
                            const updated = [...tempLeaders];
                            updated[idx].email = e.target.value;
                            setTempLeaders(updated);
                          }}
                          placeholder="Contact Email"
                          className="w-full text-xs bg-white px-2 py-1 rounded border"
                        />

                        <div className="flex items-center justify-between pt-1">
                          <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(lead.featured)}
                              onChange={(e) => {
                                const updated = [...tempLeaders];
                                updated[idx].featured = e.target.checked ? 1 : 0;
                                setTempLeaders(updated);
                              }}
                              className="rounded text-[#AD7A28]"
                            />
                            <span>Featured Badge</span>
                          </label>

                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const b64 = await compressImage(file, 300, 0.8);
                                const updated = [...tempLeaders];
                                updated[idx].photo_data = b64;
                                setTempLeaders(updated);
                              }
                            }}
                            className="text-[11px] max-w-[140px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events CMS */}
              {cmsTab === 'events' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-sm font-bold text-[#16232F]">
                      Events Schedule ({tempEvents.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => setTempEvents([...tempEvents, {
                        id: Date.now(),
                        title: 'Annual Assembly & Gathering',
                        month: 'DEC',
                        day: '25',
                        time_str: '2:00 PM - 6:00 PM',
                        place: 'Community Center, Bannu',
                        tag: 'General'
                      }])}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Event</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tempEvents.map((ev, idx) => (
                      <div key={ev.id || idx} className="p-4 rounded-xl border bg-slate-50 space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={ev.title}
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].title = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="font-bold text-sm bg-white px-2 py-1 rounded border flex-1 mr-2"
                          />
                          <button
                            type="button"
                            onClick={() => setTempEvents(tempEvents.filter((_, i) => i !== idx))}
                            className="p-1 rounded text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={ev.month}
                            placeholder="Month (e.g. DEC)"
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].month = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="text-xs bg-white px-2 py-1 rounded border font-mono"
                          />
                          <input
                            type="text"
                            value={ev.day}
                            placeholder="Day (e.g. 25)"
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].day = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="text-xs bg-white px-2 py-1 rounded border font-mono"
                          />
                          <input
                            type="text"
                            value={ev.tag}
                            placeholder="Tag (e.g. Youth)"
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].tag = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="text-xs bg-white px-2 py-1 rounded border"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={ev.time_str}
                            placeholder="Time"
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].time_str = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="text-xs bg-white px-2 py-1 rounded border"
                          />
                          <input
                            type="text"
                            value={ev.place}
                            placeholder="Venue location"
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].place = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="text-xs bg-white px-2 py-1 rounded border"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages CMS */}
              {cmsTab === 'pages' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#16232F] border-b pb-2">
                    Dynamic Information Pages
                  </h4>

                  {tempPages.map((page, idx) => (
                    <div key={page.slug || idx} className="p-4 rounded-xl border bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#16232F]">{page.label}</span>
                        <input
                          type="text"
                          value={page.title}
                          onChange={(e) => {
                            const updated = [...tempPages];
                            updated[idx].title = e.target.value;
                            setTempPages(updated);
                          }}
                          className="text-xs bg-white px-2 py-1 rounded border max-w-sm"
                        />
                      </div>
                      <textarea
                        rows={4}
                        value={page.body}
                        onChange={(e) => {
                          const updated = [...tempPages];
                          updated[idx].body = e.target.value;
                          setTempPages(updated);
                        }}
                        className="w-full text-xs bg-white p-2 rounded border leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Gallery CMS */}
              {cmsTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-sm font-bold text-[#16232F]">
                      Community Gallery ({tempGallery.length})
                    </h4>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        id="new-gallery-photo-input"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const b64 = await compressImage(file, 800, 0.8);
                            setTempGallery([...tempGallery, {
                              id: Date.now(),
                              data_url: b64,
                              caption: 'ARAAIN BANNU Event Photo',
                              sort_order: tempGallery.length + 1
                            }]);
                          }
                        }}
                      />
                      <label
                        htmlFor="new-gallery-photo-input"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {tempGallery.map((item, idx) => (
                      <div key={item.id || idx} className="relative rounded-xl overflow-hidden border bg-slate-100 group">
                        <img src={item.data_url} alt="Gallery" className="w-full h-32 object-cover" />
                        <div className="p-2 bg-white">
                          <input
                            type="text"
                            value={item.caption || ''}
                            placeholder="Caption..."
                            onChange={(e) => {
                              const updated = [...tempGallery];
                              updated[idx].caption = e.target.value;
                              setTempGallery(updated);
                            }}
                            className="w-full text-[11px] p-1 border rounded"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setTempGallery(tempGallery.filter((_, i) => i !== idx))}
                          className="absolute top-2 right-2 p-1 rounded-full bg-red-600 text-white text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bank & Accounts CMS */}
              {cmsTab === 'bank' && (
                <div className="space-y-4 max-w-2xl">
                  <h4 className="text-sm font-bold text-[#16232F] border-b pb-2">
                    Official Donation Receiving Accounts
                  </h4>

                  <div className="p-4 rounded-xl bg-slate-50 border space-y-3">
                    <div className="font-bold text-xs text-[#AD7A28]">Meezan Bank Details</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Name</label>
                        <input
                          type="text"
                          value={tempSettings.bankName}
                          onChange={(e) => setTempSettings({ ...tempSettings, bankName: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Account Title</label>
                        <input
                          type="text"
                          value={tempSettings.bankTitle}
                          onChange={(e) => setTempSettings({ ...tempSettings, bankTitle: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Account #</label>
                        <input
                          type="text"
                          value={tempSettings.bankAccount}
                          onChange={(e) => setTempSettings({ ...tempSettings, bankAccount: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">IBAN</label>
                        <input
                          type="text"
                          value={tempSettings.bankIBAN}
                          onChange={(e) => setTempSettings({ ...tempSettings, bankIBAN: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border space-y-3">
                    <div className="font-bold text-xs text-emerald-800">Easypaisa & JazzCash</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Easypaisa Number</label>
                        <input
                          type="text"
                          value={tempSettings.epNumber}
                          onChange={(e) => setTempSettings({ ...tempSettings, epNumber: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Easypaisa Title</label>
                        <input
                          type="text"
                          value={tempSettings.epTitle}
                          onChange={(e) => setTempSettings({ ...tempSettings, epTitle: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">JazzCash Number</label>
                        <input
                          type="text"
                          value={tempSettings.jcNumber}
                          onChange={(e) => setTempSettings({ ...tempSettings, jcNumber: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">JazzCash Title</label>
                        <input
                          type="text"
                          value={tempSettings.jcTitle}
                          onChange={(e) => setTempSettings({ ...tempSettings, jcTitle: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact CMS */}
              {cmsTab === 'contact' && (
                <div className="space-y-4 max-w-2xl">
                  <h4 className="text-sm font-bold text-[#16232F] border-b pb-2">
                    Office Contact & Social Channels
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={tempSettings.contactAddress}
                      onChange={(e) => setTempSettings({ ...tempSettings, contactAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Office Hours</label>
                    <input
                      type="text"
                      value={tempSettings.contactHours}
                      onChange={(e) => setTempSettings({ ...tempSettings, contactHours: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                      <input
                        type="text"
                        value={tempSettings.contactPhone}
                        onChange={(e) => setTempSettings({ ...tempSettings, contactPhone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
                      <input
                        type="email"
                        value={tempSettings.contactEmail}
                        onChange={(e) => setTempSettings({ ...tempSettings, contactEmail: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Facebook URL</label>
                      <input
                        type="text"
                        value={tempSettings.socialFacebook || ''}
                        onChange={(e) => setTempSettings({ ...tempSettings, socialFacebook: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Group / Contact URL</label>
                      <input
                        type="text"
                        value={tempSettings.socialWhatsapp || ''}
                        onChange={(e) => setTempSettings({ ...tempSettings, socialWhatsapp: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </main>

      {/* Membership Card Studio Modal */}
      {selectedRegForCard && (
        <MembershipCardModal
          registration={selectedRegForCard}
          onClose={() => setSelectedRegForCard(null)}
        />
      )}

      {/* Full Member Dossier Viewer */}
      {viewingRegDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-[#16232F]">
                Application Dossier
              </h3>
              <button onClick={() => setViewingRegDetails(null)} className="p-1 rounded text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {viewingRegDetails.photoData ? (
                <img src={viewingRegDetails.photoData} alt="Applicant" className="w-16 h-20 rounded-lg object-cover border" />
              ) : (
                <div className="w-16 h-20 rounded-lg bg-slate-200 flex items-center justify-center font-bold text-slate-400">
                  Photo
                </div>
              )}
              <div>
                <h4 className="font-bold text-base text-[#16232F]">{viewingRegDetails.fullName}</h4>
                <p className="text-xs text-slate-500">Father: {viewingRegDetails.fatherName}</p>
                <p className="text-xs text-slate-500">CNIC: {viewingRegDetails.cnic || '—'}</p>
                <p className="text-xs text-[#AD7A28] font-semibold">{viewingRegDetails.membershipType}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl">
              <div><strong>WhatsApp:</strong> {viewingRegDetails.whatsapp}</div>
              <div><strong>Email:</strong> {viewingRegDetails.email || '—'}</div>
              <div><strong>Education:</strong> {viewingRegDetails.education || '—'}</div>
              <div><strong>Work:</strong> {viewingRegDetails.work || '—'}</div>
              <div><strong>Residential:</strong> {viewingRegDetails.residentialStatus || '—'}</div>
              <div><strong>City:</strong> {viewingRegDetails.city}, {viewingRegDetails.country}</div>
              <div className="col-span-2"><strong>Address:</strong> {viewingRegDetails.street || '—'}</div>
              <div className="col-span-2"><strong>Affiliated Org:</strong> {viewingRegDetails.affiliated || 'None'}</div>
              <div className="col-span-2"><strong>Reason for joining:</strong> {viewingRegDetails.reason || 'None specified'}</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  const r = viewingRegDetails;
                  setViewingRegDetails(null);
                  setSelectedRegForCard(r);
                }}
                className="px-4 py-2 rounded-xl bg-[#AD7A28] text-white text-xs font-semibold cursor-pointer"
              >
                Generate ID Card
              </button>
              <button
                onClick={() => setViewingRegDetails(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Donation Proof Slip Viewer */}
      {viewingDonationProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-[#16232F]">
                  Donation Slip — {viewingDonationProof.donorName}
                </h3>
                <span className="text-xs text-[#AD7A28] font-bold">
                  Amount: PKR {viewingDonationProof.amount}
                </span>
              </div>
              <button onClick={() => setViewingDonationProof(null)} className="p-1 rounded text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {viewingDonationProof.photoData && (
              <div className="max-h-[60vh] overflow-y-auto flex items-center justify-center bg-slate-100 rounded-xl p-2">
                <img
                  src={viewingDonationProof.photoData}
                  alt="Proof Slip"
                  className="max-h-[55vh] object-contain rounded-lg"
                />
              </div>
            )}

            <div className="text-xs text-slate-600">
              <div>Method: <strong>{viewingDonationProof.method}</strong></div>
              <div>Transaction ID: <strong>{viewingDonationProof.txId || 'N/A'}</strong></div>
              {viewingDonationProof.note && <div>Note: {viewingDonationProof.note}</div>}
            </div>

            <button
              onClick={() => setViewingDonationProof(null)}
              className="w-full py-2 rounded-xl bg-[#16232F] text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
