import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 'definitions', title: 'Definitions' },
    { id: 'registration', title: 'Account Registration' },
    { id: 'rental', title: 'Rental Process' },
    { id: 'pricing', title: 'Pricing & Payments' },
    { id: 'pickup', title: 'Pickup & Delivery' },
    { id: 'returns', title: 'Returns & Late Fees' },
    { id: 'cancellations', title: 'Cancellations' },
    { id: 'liability', title: 'Liability' },
    { id: 'privacy', title: 'Privacy & Data' },
    { id: 'disputes', title: 'Disputes' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-900 text-[#0d131c] dark:text-slate-100 font-display antialiased">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation - Desktop */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0 lg:-ml-8">
            <div className="sticky top-24 glass-panel dark:bg-slate-800 p-6 rounded-2xl border border-white/40 dark:border-slate-700 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Quick Navigation</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-primary text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <div className="glass-panel dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-white/40 dark:border-slate-700 shadow-xl relative overflow-hidden">
              
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
              
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-5xl font-black text-slate-900 dark:text-slate-100 mb-3 leading-tight">
                  Terms and Conditions
                </h1>
                <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm font-medium">
                    Effective: February 1, 2026
                  </span>
                  <span className="text-sm">Last Updated: February 1, 2026</span>
                </div>
              </div>

              {/* Introduction */}
              <div className="mb-12 p-6 bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl border border-primary/20 dark:border-primary/30">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Welcome to <strong className="text-primary">RentalEco</strong>. By accessing or using our platform, 
                  you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div className="space-y-10">
                
                {/* 1. Definitions */}
                <section id="definitions" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Definitions</h2>
                  </div>
                  <div className="ml-13 space-y-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-primary">
                      <strong className="text-slate-900 dark:text-slate-100">Platform:</strong> The RentalEco website, mobile applications, and all related backend systems and services.
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-primary">
                      <strong className="text-slate-900 dark:text-slate-100">Customer/Renter:</strong> Any individual or entity who registers on the platform to rent equipment, furniture, electronics, or other assets.
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-primary">
                      <strong className="text-slate-900 dark:text-slate-100">Vendor:</strong> A business or individual who lists products for rent on the platform.
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-primary">
                      <strong className="text-slate-900 dark:text-slate-100">Product:</strong> Electronics, furniture, vehicles, tools, or any other items listed for rental on the platform.
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-primary">
                      <strong className="text-slate-900 dark:text-slate-100">Rental Period:</strong> The agreed-upon duration for which a product is rented (Hourly, Daily, Weekly, or Custom periods).
                    </div>
                  </div>
                </section>

                {/* 2. Account Registration */}
                <section id="registration" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Account Registration</h2>
                  </div>
                  <div className="ml-13 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>To use RentalEco, you must create an account and provide the following:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>You must be at least <strong className="text-slate-900 dark:text-slate-100">18 years old</strong> to register and use this platform.</li>
                      <li>You agree to provide <strong className="text-slate-900 dark:text-slate-100">accurate, current, and complete information</strong> during registration.</li>
                      <li>Vendors must provide a valid <strong className="text-slate-900 dark:text-slate-100">GSTIN</strong> (Goods and Services Tax Identification Number).</li>
                      <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</li>
                      <li>You must immediately notify us of any unauthorized use of your account.</li>
                    </ul>
                    <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        <strong>⚠️ Warning:</strong> Any fraudulent information or misuse of accounts may result in immediate suspension or termination.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. Rental Process & Orders */}
                <section id="rental" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Rental Process & Orders</h2>
                  </div>
                  <div className="ml-13 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl border border-blue-200 dark:border-blue-700">
                        <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">📋 Quotations</h3>
                        <p className="text-sm text-blue-800 dark:text-blue-200">Quotations are non-binding estimates. Final pricing is confirmed upon order placement.</p>
                      </div>
                      <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl border border-green-200 dark:border-green-700">
                        <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">✅ Order Confirmation</h3>
                        <p className="text-sm text-green-800 dark:text-green-200">Once confirmed, an order creates a binding reservation between you and the vendor.</p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                      <li>All orders are subject to <strong className="text-slate-900 dark:text-slate-100">product availability</strong>.</li>
                      <li>First-time renters may be required to provide <strong className="text-slate-900 dark:text-slate-100">ID verification</strong> (Aadhaar, PAN, or Driver's License).</li>
                      <li>Rental periods start from the agreed pickup time and end at the return time.</li>
                      <li>Extensions must be requested and approved by the vendor at least 24 hours before the end of the rental period.</li>
                    </ul>
                  </div>
                </section>

                {/* 4. Pricing, Payments, and Taxes */}
                <section id="pricing" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Pricing, Payments, and Taxes</h2>
                  </div>
                  <div className="ml-13 space-y-4">
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200 dark:border-purple-700">
                      <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-3">💰 Payment Structure</h3>
                      <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Rental charges are calculated based on the selected duration (hourly, daily, or weekly rates).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>All charges are subject to <strong>GST at 18%</strong> as per Indian tax regulations.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>A <strong>refundable security deposit</strong> may be required upfront, which will be returned upon successful return of the product in good condition.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>We accept payments via <strong>credit card, debit card, net banking, UPI, and digital wallets</strong>.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>All transactions are processed through secure payment gateways.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 rounded-lg">
                      <p className="text-red-800 dark:text-red-300 text-sm">
                        <strong>❌ Refund Policy:</strong> Security deposits may be partially or fully forfeited in case of damage, loss, or late returns.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 5. Pickup and Delivery */}
                <section id="pickup" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Pickup and Delivery</h2>
                  </div>
                  <div className="ml-13 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>Product handover and pickup procedures:</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="p-5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-700">
                        <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                          <span>📦</span> Product Pickup
                        </h3>
                        <ul className="text-sm text-indigo-800 dark:text-indigo-200 space-y-1 mt-2">
                          <li>• Inspect the product thoroughly before accepting</li>
                          <li>• Report any pre-existing damage immediately</li>
                          <li>• Sign the handover document</li>
                          <li>• Once accepted, you assume full liability</li>
                        </ul>
                      </div>
                      <div className="p-5 bg-teal-50 dark:bg-teal-900/30 rounded-xl border border-teal-200 dark:border-teal-700">
                        <h3 className="font-bold text-teal-900 dark:text-teal-300 mb-2 flex items-center gap-2">
                          <span>🚚</span> Delivery Options
                        </h3>
                        <ul className="text-sm text-teal-800 dark:text-teal-200 space-y-1 mt-2">
                          <li>• Self-pickup from vendor location</li>
                          <li>• Home delivery (charges may apply)</li>
                          <li>• Delivery time slots must be coordinated</li>
                          <li>• Someone must be present to receive</li>
                        </ul>
                      </div>
                    </div>
                    <p className="mt-4">
                      <strong className="text-slate-900 dark:text-slate-100">Important:</strong> It is the renter's responsibility to inspect the product at pickup. 
                      Once the product is handed over and accepted, the renter assumes full liability for any damage or loss during the rental period.
                    </p>
                  </div>
                </section>

                {/* 6. Returns and Late Fees */}
                <section id="returns" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      6
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Returns and Late Fees</h2>
                  </div>
                  <div className="ml-13 space-y-4">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      Products must be returned by the specified end date and time. Failure to do so will result in penalties.
                    </p>
                    <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-300 dark:border-red-700">
                      <h3 className="font-bold text-red-900 dark:text-red-300 mb-3 text-lg">⏰ Late Fee Policy</h3>
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-red-200 dark:border-red-700">
                        <p className="text-red-800 dark:text-red-300 font-semibold text-lg mb-2">
                          Late returns incur a fee of <span className="text-2xl">₹500 per day</span>
                        </p>
                        <p className="text-red-700 dark:text-red-400 text-sm">
                          Plus standard rental charges for each additional day
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3 text-slate-600 dark:text-slate-300">
                      <p><strong className="text-slate-900 dark:text-slate-100">Return Condition Requirements:</strong></p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Products must be returned in the same condition as received (normal wear and tear excepted).</li>
                        <li>All accessories, manuals, and packaging must be returned.</li>
                        <li>Products must be cleaned and in working condition.</li>
                        <li>Any damage will be assessed, and repair costs will be deducted from the security deposit.</li>
                        <li>If damage costs exceed the deposit, you will be invoiced for the difference.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 7. Cancellations */}
                <section id="cancellations" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      7
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Cancellations and Refunds</h2>
                  </div>
                  <div className="ml-13 space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-300 dark:border-green-700 text-center">
                        <div className="text-3xl mb-2">✅</div>
                        <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">24+ Hours Before</h3>
                        <p className="text-sm text-green-800 dark:text-green-200">Full refund</p>
                        <p className="text-xs text-green-700 dark:text-green-400 mt-1">(100% refund)</p>
                      </div>
                      <div className="p-5 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-2 border-yellow-300 dark:border-yellow-700 text-center">
                        <div className="text-3xl mb-2">⚠️</div>
                        <h3 className="font-bold text-yellow-900 dark:text-yellow-300 mb-2">12-24 Hours Before</h3>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">50% cancellation fee</p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">(50% refund)</p>
                      </div>
                      <div className="p-5 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-300 dark:border-red-700 text-center">
                        <div className="text-3xl mb-2">❌</div>
                        <h3 className="font-bold text-red-900 dark:text-red-300 mb-2">Less than 12 Hours</h3>
                        <p className="text-sm text-red-800 dark:text-red-200">No refund</p>
                        <p className="text-xs text-red-700 dark:text-red-400 mt-1">(0% refund)</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-lg">
                      <p className="text-blue-800 dark:text-blue-300 text-sm">
                        <strong>📝 Note:</strong> Refunds are processed within 5-7 business days to the original payment method. 
                        Vendor-initiated cancellations due to unavailability will result in a full refund.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 8. Limitation of Liability */}
                <section id="liability" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      8
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Limitation of Liability</h2>
                  </div>
                  <div className="ml-13 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-300 dark:border-amber-700">
                      <p className="mb-3">
                        <strong className="text-slate-900 dark:text-slate-100">RentalEco Pvt. Ltd.</strong> operates as <strong className="text-slate-900 dark:text-slate-100">marketplace facilitator</strong> 
                        and acts as an intermediary between vendors and customers.
                      </p>
                      <p className="font-semibold text-amber-900 dark:text-amber-300">We are NOT liable for:</p>
                      <ul className="list-disc list-inside space-y-2 mt-3 text-slate-700 dark:text-slate-300">
                        <li>Personal injury or property damage resulting from the use of rented equipment</li>
                        <li>Data loss or theft from electronic devices</li>
                        <li>Malfunctioning or defective products (vendor responsibility)</li>
                        <li>Disputes between renters and vendors</li>
                        <li>Indirect, incidental, or consequential damages</li>
                        <li>Loss of profits, revenue, or business opportunities</li>
                      </ul>
                    </div>
                    <p className="text-sm italic">
                      Our total liability for any claims arising from the use of the platform shall not exceed the total amount 
                      paid by you for the specific rental transaction in question.
                    </p>
                  </div>
                </section>

                {/* 9. Privacy and Data Protection */}
                <section id="privacy" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      9
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Privacy and Data Protection</h2>
                  </div>
                  <div className="ml-13 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                      We take your privacy seriously. Please refer to our <a href="/privacy-policy" className="text-primary hover:underline font-semibold">Privacy Policy</a> for detailed information.
                    </p>
                    <div className="p-5 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3">🔒 Data We Collect:</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Personal information (name, email, phone, address)</li>
                        <li>• Payment information (processed securely through payment gateways)</li>
                        <li>• Identification documents (for verification purposes)</li>
                        <li>• Usage data and analytics</li>
                        <li>• Communication history with vendors and support</li>
                      </ul>
                    </div>
                    <p className="text-sm">
                      Your data is stored securely and will not be shared with third parties except as required for service delivery or legal compliance.
                    </p>
                  </div>
                </section>

                {/* 10. Dispute Resolution */}
                <section id="disputes" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      10
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dispute Resolution and Governing Law</h2>
                  </div>
                  <div className="ml-13 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                      These Terms and Conditions are governed by the laws of <strong className="text-slate-900 dark:text-slate-100">India</strong>. 
                      Any disputes arising from these terms or your use of the platform shall be resolved as follows:
                    </p>
                    <div className="space-y-3 mt-4">
                      <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Negotiation</h4>
                          <p className="text-sm">Parties will attempt to resolve disputes through good-faith negotiation.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Mediation</h4>
                          <p className="text-sm">If negotiation fails, disputes may be submitted to mediation.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Arbitration/Legal Action</h4>
                          <p className="text-sm">Unresolved disputes shall be subject to the exclusive jurisdiction of courts in Gurugram, Haryana, India.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Additional Terms */}
                <section className="scroll-mt-24">
                  <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl border border-slate-200 dark:border-slate-600">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4 text-lg">📜 Additional Terms</h3>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li>• <strong>Amendments:</strong> We reserve the right to modify these terms at any time. Continued use constitutes acceptance.</li>
                      <li>• <strong>Severability:</strong> If any provision is found invalid, the remaining provisions continue in effect.</li>
                      <li>• <strong>Entire Agreement:</strong> These terms constitute the entire agreement between you and RentalEco.</li>
                      <li>• <strong>No Waiver:</strong> Failure to enforce any provision does not waive our right to do so later.</li>
                    </ul>
                  </div>
                </section>

              </div>

              {/* Contact Section */}
              <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 via-purple-50 to-accent/10 dark:from-primary/20 dark:via-purple-900/20 dark:to-accent/20 rounded-2xl border-2 border-primary/30 dark:border-primary/40 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <span>📧</span> Need Help?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                  For questions regarding these Terms and Conditions, or if you need assistance with your rental, 
                  please don't hesitate to contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">📧 Email Support</h4>
                    <a href="mailto:billing@rentaleco.com" className="text-primary hover:underline font-medium">
                      billing@rentaleco.com
                    </a>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">📞 Phone Support</h4>
                    <a href="tel:+911234567890" className="text-primary hover:underline font-medium">
                      +91 123-456-7890
                    </a>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 md:col-span-2">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">📍 Office Address</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      123 Innovation Drive, Tech Park<br />
                      Gurugram, Haryana 122001<br />
                      India
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-primary/30 dark:border-primary/40">
                  <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                    <strong className="text-primary">Business Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>

              {/* Agreement Notice */}
              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-300 dark:border-blue-700">
                <p className="text-center text-blue-900 dark:text-blue-300 font-semibold">
                  By using RentalEco, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsPage;