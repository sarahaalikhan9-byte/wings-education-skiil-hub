import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Heart, 
  HandCoins, 
  Home, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  GraduationCap,
  CreditCard,
  Banknote,
  Smartphone,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FinancialHub = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'donation' | 'fee'>('donation');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Donation Form State
  const [donationForm, setDonationForm] = useState({
    donorType: 'Person',
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    amount: '',
    purpose: 'Infrastructure',
    paymentMethod: 'UPI'
  });

  // Fee Payment Form State
  const [feeForm, setFeeForm] = useState({
    studentId: '',
    studentName: '',
    parentId: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    studentClass: '',
    feeType: 'Tuition',
    amount: '',
    paymentMethod: 'UPI',
    academicYear: '2025-26',
    term: 'Q1'
  });

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // In this environment, we use the local server if available, or just a mock for now
      // Since it's a "Financial Hub" and the user provided specific endpoints:
      const API_URL = import.meta.env.VITE_BACKEND_URL || '';
      
      const queryParams = new URLSearchParams({
        donor_type: donationForm.donorType,
        donor_name: donationForm.donorName,
        donor_email: donationForm.donorEmail,
        donor_phone: donationForm.donorPhone,
        amount: donationForm.amount,
        purpose: donationForm.purpose,
        payment_method: donationForm.paymentMethod,
        transaction_id: `TXN${Date.now()}`
      });

      const response = await fetch(`${API_URL}/api/donations/create?${queryParams}`, {
        method: 'POST'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Donation failed');
      }

      setSuccess(`✅ Donation successful! Receipt: ${data.receipt_number}`);
      
      if (data.pdf_path) {
        window.open(`${API_URL}${data.pdf_path}`, '_blank');
      }

      setDonationForm({
        donorType: 'Person',
        donorName: '',
        donorEmail: '',
        donorPhone: '',
        amount: '',
        purpose: 'Infrastructure',
        paymentMethod: 'UPI'
      });

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      // For demo purposes, let's mock success if no backend
      if (!import.meta.env.VITE_BACKEND_URL) {
        setTimeout(() => {
          setSuccess('✅ DEMO MODE: Donation simulated successfully!');
          setLoading(false);
        }, 1500);
        return;
      }
    } finally {
      if (import.meta.env.VITE_BACKEND_URL) setLoading(false);
    }
  };

  const handleFeePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL || '';
      
      const queryParams = new URLSearchParams({
        student_id: feeForm.studentId,
        student_name: feeForm.studentName,
        parent_id: feeForm.parentId,
        parent_name: feeForm.parentName,
        parent_email: feeForm.parentEmail,
        parent_phone: feeForm.parentPhone,
        student_class: feeForm.studentClass,
        fee_type: feeForm.feeType,
        amount: feeForm.amount,
        payment_method: feeForm.paymentMethod,
        academic_year: feeForm.academicYear,
        term: feeForm.term,
        transaction_id: `FEE${Date.now()}`
      });

      const response = await fetch(`${API_URL}/api/fees/pay?${queryParams}`, {
        method: 'POST'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Fee payment failed');
      }

      setSuccess(`✅ Fee payment successful! Receipt: ${data.receipt_number}`);
      
      if (data.pdf_path) {
        window.open(`${API_URL}${data.pdf_path}`, '_blank');
      }

      setFeeForm({
        studentId: '',
        studentName: '',
        parentId: '',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        studentClass: '',
        feeType: 'Tuition',
        amount: '',
        paymentMethod: 'UPI',
        academicYear: '2025-26',
        term: 'Q1'
      });

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      // For demo purposes, let's mock success if no backend
      if (!import.meta.env.VITE_BACKEND_URL) {
        setTimeout(() => {
          setSuccess('✅ DEMO MODE: Fee payment simulated successfully!');
          setLoading(false);
        }, 1500);
        return;
      }
    } finally {
      if (import.meta.env.VITE_BACKEND_URL) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-black pt-32 pb-20 px-4 md:px-8">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              FINANCIAL <span className="text-gold">HUB</span>
            </h1>
            <p className="text-white/40 italic mt-4 font-bold uppercase tracking-widest text-sm">
              {t('Donations & Fee Payments with Automated Receipts')}
            </p>
          </motion.div>
          <button
            onClick={() => navigate('/')}
            className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/5"
          >
             <Home size={16} /> {t('Home')}
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={() => setActiveTab('donation')}
            className={`flex-1 py-6 rounded-[30px] font-black uppercase tracking-[5px] text-[10px] transition-all flex items-center justify-center gap-4 ${
              activeTab === 'donation'
                ? 'bg-royal text-white shadow-2xl shadow-royal/30'
                : 'glass text-white/40 border border-white/5 hover:border-white/20'
            }`}
          >
            <Heart size={18} /> {t('Make Donation')}
          </button>
          <button
            onClick={() => setActiveTab('fee')}
            className={`flex-1 py-6 rounded-[30px] font-black uppercase tracking-[5px] text-[10px] transition-all flex items-center justify-center gap-4 ${
              activeTab === 'fee'
                ? 'bg-gold text-black shadow-2xl shadow-gold/30'
                : 'glass text-white/40 border border-white/5 hover:border-white/20'
            }`}
          >
            <HandCoins size={18} /> {t('Pay Fee')}
          </button>
        </div>

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-6 rounded-3xl border border-green-500/30 bg-green-500/5 mb-8 flex items-center gap-4"
            >
              <CheckCircle className="text-green-400" />
              <p className="text-green-400 font-bold italic">{success}</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-6 rounded-3xl border border-red-500/30 bg-red-500/5 mb-8 flex items-center gap-4"
            >
              <AlertCircle className="text-red-400" />
              <p className="text-red-400 font-bold italic">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forms */}
        <div className="glass-strong p-10 rounded-[50px] border border-white/5 shadow-2xl">
          {activeTab === 'donation' ? (
            <form onSubmit={handleDonation} className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <Heart className="text-royal" size={32} />
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Donation Gateway</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Donor Type</label>
                  <select
                    value={donationForm.donorType}
                    onChange={(e) => setDonationForm({...donationForm, donorType: e.target.value})}
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-royal focus:outline-none transition-all appearance-none"
                    required
                  >
                    <option value="Person">Individual</option>
                    <option value="Trust">Trust</option>
                    <option value="Company">Company</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Identity / Organization</label>
                  <input
                    type="text"
                    value={donationForm.donorName}
                    onChange={(e) => setDonationForm({...donationForm, donorName: e.target.value})}
                    placeholder="Vector Name / Foundation"
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-royal focus:outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Email Vector</label>
                  <input
                    type="email"
                    value={donationForm.donorEmail}
                    onChange={(e) => setDonationForm({...donationForm, donorEmail: e.target.value})}
                    placeholder="auth@link.com"
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-royal focus:outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Neural Link (Phone)</label>
                  <input
                    type="tel"
                    value={donationForm.donorPhone}
                    onChange={(e) => setDonationForm({...donationForm, donorPhone: e.target.value})}
                    placeholder="+Global-Vector"
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-royal focus:outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Quantum (Amount ₹)</label>
                  <input
                    type="number"
                    value={donationForm.amount}
                    onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})}
                    placeholder="0.00"
                    min="1"
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-royal focus:outline-none transition-all font-mono"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Allocation Purpose</label>
                  <select
                    value={donationForm.purpose}
                    onChange={(e) => setDonationForm({...donationForm, purpose: e.target.value})}
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-royal focus:outline-none transition-all appearance-none"
                    required
                  >
                    <option value="Infrastructure">Infrastructure Development</option>
                    <option value="Scholarship Fund">Scholarship Fund</option>
                    <option value="Library">Library & Resources</option>
                    <option value="Technology">Technology Upgrade</option>
                    <option value="Sports">Sports Facilities</option>
                    <option value="General">General Fund</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-royal text-white py-6 rounded-[30px] font-black uppercase tracking-[10px] text-xs shadow-2xl shadow-royal/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Processing Uplink...
                  </>
                ) : (
                  <>
                    Initialize Donation <History size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleFeePayment} className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <HandCoins className="text-gold" size={32} />
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Academic Fee Portal</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Student Vector ID</label>
                  <input
                    type="text"
                    value={feeForm.studentId}
                    onChange={(e) => setFeeForm({...feeForm, studentId: e.target.value})}
                    placeholder="WINGS-ID"
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-gold focus:outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Student Full Identity</label>
                  <input
                    type="text"
                    value={feeForm.studentName}
                    onChange={(e) => setFeeForm({...feeForm, studentName: e.target.value})}
                    placeholder="Verified Name"
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-gold focus:outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Class Level</label>
                  <input
                    type="text"
                    value={feeForm.studentClass}
                    onChange={(e) => setFeeForm({...feeForm, studentClass: e.target.value})}
                    placeholder="Current Grade"
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-gold focus:outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Guardian / Parent ID</label>
                  <input
                    type="text"
                    value={feeForm.parentId}
                    onChange={(e) => setFeeForm({...feeForm, parentId: e.target.value})}
                    placeholder="Auth-Par-ID"
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-gold focus:outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Fee Configuration</label>
                  <select
                    value={feeForm.feeType}
                    onChange={(e) => setFeeForm({...feeForm, feeType: e.target.value})}
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-gold focus:outline-none transition-all appearance-none"
                    required
                  >
                    <option value="Tuition">Tuition Fee</option>
                    <option value="Exam">Exam Fee</option>
                    <option value="Library">Library Fee</option>
                    <option value="Transport">Transport Fee</option>
                    <option value="Sports">Sports Fee</option>
                    <option value="Lab">Lab Fee</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Quantum (Amount ₹)</label>
                  <input
                    type="number"
                    value={feeForm.amount}
                    onChange={(e) => setFeeForm({...feeForm, amount: e.target.value})}
                    placeholder="0.00"
                    min="1"
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-gold focus:outline-none transition-all font-mono"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Payment Protocol</label>
                  <select
                    value={feeForm.paymentMethod}
                    onChange={(e) => setFeeForm({...feeForm, paymentMethod: e.target.value})}
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-gold focus:outline-none transition-all appearance-none"
                    required
                  >
                    <option value="UPI">UPI Sync</option>
                    <option value="Card">Visa/MasterCard</option>
                    <option value="Net Banking">Direct Bank Transfer</option>
                    <option value="Cash">Physical Cash</option>
                  </select>
                </div>

                <div className="space-y-2 flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Academic Year</label>
                    <select
                      value={feeForm.academicYear}
                      onChange={(e) => setFeeForm({...feeForm, academicYear: e.target.value})}
                      className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-gold focus:outline-none transition-all appearance-none"
                    >
                      <option value="2025-26">2025-26</option>
                      <option value="2026-27">2026-27</option>
                    </select>
                  </div>
                  <div className="flex-1">
                     <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Term</label>
                     <select
                        value={feeForm.term}
                        onChange={(e) => setFeeForm({...feeForm, term: e.target.value})}
                        className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-gold focus:outline-none transition-all appearance-none"
                     >
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                        <option value="Q4">Q4</option>
                        <option value="Annual">Annual</option>
                     </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold text-black py-6 rounded-[30px] font-black uppercase tracking-[10px] text-xs shadow-2xl shadow-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Authorizing Transfer...
                  </>
                ) : (
                  <>
                    Execute Payment <CheckCircle size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Global Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
           {[
             { icon: CreditCard, text: "Secure SSL" },
             { icon: Banknote, text: "Tax Exempt" },
             { icon: Smartphone, text: "Instant Receipt" },
             { icon: GraduationCap, text: "Educational Fund" }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 text-white/20">
               <item.icon size={16} />
               <span className="text-[8px] font-black uppercase tracking-widest italic">{item.text}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialHub;
