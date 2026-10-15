export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  service: string;
  source: 'Meta Ads' | 'Google Ads' | 'Website Chat' | 'Instagram DM';
  stage: 'AI Dialing' | 'New' | 'Qualified' | 'Appointment Booked' | 'Needs Review';
  estimatedValue: number;
  intentScore: number;
  assignedAgent: string;
  createdAt: string;
  timeAgo: string;
  aiSummary: string;
  transcript?: { sender: 'AI' | 'Lead'; text: string; time: string }[];
  hasHumanTakeover: boolean;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  initials: string;
  membershipTier: 'Glow Club Diamond' | 'Platinum Aesthetic' | 'Member' | 'Standard';
  ltv: number;
  visitCount: number;
  firstVisit: string;
  lastVisit: string;
  remainingPackages: string;
  businessCredit: number;
  hipaaSigned: boolean;
  smsOptIn: boolean;
  dndStatus: boolean;
  nextBestAction: string;
  clinicalNotes: string;
  tags: string[];
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  treatment: string;
  practitioner: string;
  room: string;
  date: string;
  timeSlot: string;
  depositStatus: 'Paid ($50)' | 'Pending ($50)' | 'Waived';
  confirmationStatus: 'Confirmed (SMS)' | 'Confirmed (AI Call)' | 'Awaiting Confirmation';
  noShowRisk: { level: 'Low' | 'Moderate' | 'High'; percentage: number };
  isCheckedIn: boolean;
  waitlistMatchAvailable?: { name: string; service: string; phone: string };
}

export interface Transaction {
  id: string;
  clientName: string;
  treatment: string;
  amount: number;
  type: 'Payment' | 'Deposit' | 'Package' | 'Refund';
  status: 'Settled' | 'Pending' | 'Refunded';
  method: 'Stripe' | 'Apple Pay' | 'Credit Card' | 'In-Clinic';
  date: string;
  receiptId: string;
}

export interface ApprovalTask {
  id: string;
  title: string;
  type: 'R3_REFUND' | 'R4_CLINICAL_ESCALATION' | 'DISCOUNT_EXCEPTION';
  riskTier: 'R1' | 'R2' | 'R3' | 'R4';
  requestedBy: string;
  description: string;
  amount?: number;
  clientName: string;
  createdAt: string;
  status: 'Pending' | 'Approved' | 'Declined';
}

export const BusinessInfo = {
  name: 'Acme Global',
  tagline: 'Enterprise Operations & 24/7 Support',
  location: 'San Francisco • California HQ',
  orchestrationFrequency: 'Responsive (5 min)',
  nextCycleIn: '2m 18s',
  aiStatus: 'Active & Sensing',
  activeConnectors: ['Salesforce CRM', 'Voice AI Orchestrator', 'Stripe Connect', 'Google Workspace'],
};

export const ClinicInfo = BusinessInfo;

export const MockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Sarah Chen',
    phone: '(310) 555-0194',
    email: 'sarah.chen@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    service: 'Botox & Jawline Slimming',
    source: 'Meta Ads',
    stage: 'AI Dialing',
    estimatedValue: 650,
    intentScore: 98,
    assignedAgent: 'Growth Agent v2.2',
    createdAt: '2026-09-09T13:15:00Z',
    timeAgo: 'Just now',
    aiSummary: 'Client submitted lead form 2m ago asking about brow lift and masseter slimming. Growth Agent initiated outbound call within 30s. Customer answered.',
    hasHumanTakeover: false,
    transcript: [
      { sender: 'AI', text: 'Hi Sarah! This is Maya from Slim N Glow Medspa following up on your Botox inquiry.', time: '0:03' },
      { sender: 'Lead', text: 'Oh wow, that was fast! Yes, I was looking for forehead lines and jawline.', time: '0:07' },
      { sender: 'AI', text: 'Dr. Rostova specializes in natural contouring. Do you prefer Thursday or Friday afternoon for a 30-minute consult?', time: '0:14' },
      { sender: 'Lead', text: 'Friday around 3 PM would be perfect.', time: '0:19' },
    ],
  },
  {
    id: 'lead-2',
    name: 'Marcus Vance',
    phone: '(310) 555-0832',
    email: 'm.vance@beverlydesign.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    service: 'Morpheus8 RF Face & Neck',
    source: 'Google Ads',
    stage: 'Qualified',
    estimatedValue: 1850,
    intentScore: 94,
    assignedAgent: 'Growth Agent v2.2',
    createdAt: '2026-09-09T12:30:00Z',
    timeAgo: '42m ago',
    aiSummary: 'Qualified for 3-session Morpheus8 package. Verified budget >$1,500 and no contraindicated accutane use in past 6 months. Slot reserved for tomorrow 10:45 AM.',
    hasHumanTakeover: false,
    transcript: [
      { sender: 'AI', text: 'Hi Marcus, confirm you received the pre-procedure guideline link?', time: '12:31' },
      { sender: 'Lead', text: 'Yes, reviewed and ready for tomorrow!', time: '12:33' },
    ],
  },
  {
    id: 'lead-3',
    name: 'Chloe Rodriguez',
    phone: '(424) 555-4921',
    email: 'chloe.rod@studioart.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    service: 'Hydrafacial Platinum + Lip Perk',
    source: 'Instagram DM',
    stage: 'New',
    estimatedValue: 420,
    intentScore: 89,
    assignedAgent: 'Front Desk Agent',
    createdAt: '2026-09-09T12:55:00Z',
    timeAgo: '18m ago',
    aiSummary: 'Inquired about bridal prep glow packages. AI sent instant pricing breakdown & booked link. Awaiting slot selection.',
    hasHumanTakeover: false,
  },
  {
    id: 'lead-4',
    name: 'Jessica Patel',
    phone: '(213) 555-7382',
    email: 'jessica.patel@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    service: 'Semaglutide Weight Loss Program',
    source: 'Website Chat',
    stage: 'Appointment Booked',
    estimatedValue: 2400,
    intentScore: 96,
    assignedAgent: 'Growth Agent v2.2',
    createdAt: '2026-09-09T11:20:00Z',
    timeAgo: '1h 50m ago',
    aiSummary: 'Completed digital pre-intake questionnaire. Initial 3-month medical weight loss protocol scheduled with Dr. Elena Rostova.',
    hasHumanTakeover: false,
  },
  {
    id: 'lead-5',
    name: 'David Kim',
    phone: '(323) 555-9011',
    email: 'david.kim@kimcapital.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    service: 'Laser Hair Removal - Full Torso',
    source: 'Meta Ads',
    stage: 'Needs Review',
    estimatedValue: 1200,
    intentScore: 78,
    assignedAgent: 'Front Desk Agent',
    createdAt: '2026-09-09T10:45:00Z',
    timeAgo: '2h 25m ago',
    aiSummary: 'Client asked about treating skin with recent active sun tanning. AI correctly held booking and flagged for practitioner review per clinical safety policy.',
    hasHumanTakeover: true,
  },
  {
    id: 'lead-6',
    name: 'Emily Watson',
    phone: '(310) 555-3399',
    email: 'emily.w@beverlyhillsstyle.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    service: 'Dermal Fillers (Cheeks & Lips)',
    source: 'Google Ads',
    stage: 'Qualified',
    estimatedValue: 1400,
    intentScore: 92,
    assignedAgent: 'Growth Agent v2.2',
    createdAt: '2026-09-09T09:15:00Z',
    timeAgo: '4h ago',
    aiSummary: 'Referred by Amanda Scott. Inquired about Juvederm Voluma. Sent deposit link ($50) via Stripe.',
    hasHumanTakeover: false,
  },
];

export const MockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Amanda Scott',
    phone: '(310) 555-0194',
    email: 'amanda.scott@luxurypr.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    initials: 'AS',
    membershipTier: 'Glow Club Diamond',
    ltv: 5850,
    visitCount: 14,
    firstVisit: 'Jan 2024',
    lastVisit: 'Aug 12, 2026',
    remainingPackages: '2 Morpheus8 Face Sessions',
    businessCredit: 150,
    hipaaSigned: true,
    smsOptIn: true,
    dndStatus: false,
    nextBestAction: '6-month Botox refresh due. Send personalized reminder with preferred Friday afternoon slot.',
    clinicalNotes: 'Prefers numbing cream 25 mins prior. Allergan Botox 32 units total (glabella 20u, forehead 12u). Tolerates RF microneedling exceptionally well.',
    tags: ['VIP Diamond', 'Botox Regular', 'Morpheus8 Series'],
  },
  {
    id: 'client-2',
    name: 'Jonathan Reed',
    phone: '(424) 555-9201',
    email: 'j.reed@pacificventure.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    initials: 'JR',
    membershipTier: 'Platinum Aesthetic',
    ltv: 4200,
    visitCount: 8,
    firstVisit: 'Mar 2025',
    lastVisit: 'Jul 28, 2026',
    remainingPackages: '1 IPL Photofacial Session',
    businessCredit: 200,
    hipaaSigned: true,
    smsOptIn: true,
    dndStatus: false,
    nextBestAction: 'Offer Post-Summer Skin Rejuvenation package with 15% VIP discount.',
    clinicalNotes: 'Skin type II. Sun damage reduction protocol. Always books with Dr. Elena Rostova.',
    tags: ['VIP Platinum', 'IPL Photofacial'],
  },
  {
    id: 'client-3',
    name: 'Elena Gomez',
    phone: '(323) 555-6677',
    email: 'elena.gomez@designlab.net',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
    initials: 'EG',
    membershipTier: 'Member',
    ltv: 2950,
    visitCount: 6,
    firstVisit: 'Sep 2025',
    lastVisit: 'Aug 04, 2026',
    remainingPackages: '1 Hydrafacial Deluxe',
    businessCredit: 75,
    hipaaSigned: true,
    smsOptIn: true,
    dndStatus: false,
    nextBestAction: 'Invite to exclusive Slim N Glow VIP Evening demo event.',
    clinicalNotes: 'Sensitive skin. Prefers Britenol booster during Hydrafacial.',
    tags: ['Hydrafacial Club', 'Skincare Purchaser'],
  },
  {
    id: 'client-4',
    name: 'Michael Chang',
    phone: '(310) 555-7812',
    email: 'mchang@archgroup.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    initials: 'MC',
    membershipTier: 'Glow Club Diamond',
    ltv: 6700,
    visitCount: 16,
    firstVisit: 'Nov 2023',
    lastVisit: 'Aug 19, 2026',
    remainingPackages: '3 CoolSculpting Elite cycles',
    businessCredit: 300,
    hipaaSigned: true,
    smsOptIn: true,
    dndStatus: false,
    nextBestAction: 'Send 2-year anniversary appreciation treatment reward ($100 credit).',
    clinicalNotes: 'Flank and abdomen body contouring series. Exceptional results at 12-week checkup.',
    tags: ['Body Contouring', 'VIP Diamond'],
  },
  {
    id: 'client-5',
    name: 'Sophia Taylor',
    phone: '(424) 555-2211',
    email: 'sophia.taylor@glamourmedia.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    initials: 'ST',
    membershipTier: 'Standard',
    ltv: 1450,
    visitCount: 3,
    firstVisit: 'Feb 2026',
    lastVisit: 'May 14, 2026',
    remainingPackages: 'None',
    businessCredit: 0,
    hipaaSigned: true,
    smsOptIn: true,
    dndStatus: false,
    nextBestAction: 'Reactivation Journey: 110 days since last visit. Send "We Miss You" $50 gift voucher.',
    clinicalNotes: 'Lip augmentation with Restylane Kysse 1.0ml. Very happy with symmetry.',
    tags: ['Lip Filler', 'Reactivation Candidate'],
  },
];

export const MockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    clientName: 'Sarah Chen (Apex Tech)',
    clientPhone: '(310) 555-0194',
    treatment: 'Enterprise Data Pipeline Architecture Review',
    practitioner: 'Sarah Jenkins (Ops)',
    room: 'Zoom Room Alpha',
    date: 'Today, Sep 9',
    timeSlot: '09:30 AM - 10:15 AM',
    depositStatus: 'Paid ($50)',
    confirmationStatus: 'Confirmed (SMS)',
    noShowRisk: { level: 'Low', percentage: 3 },
    isCheckedIn: true,
  },
  {
    id: 'apt-2',
    clientName: 'Marcus Vance (Vance Logistics)',
    clientPhone: '(310) 555-0832',
    treatment: 'AI Voice Orchestration & Retell Sprint',
    practitioner: 'Alex Rivera (Tech)',
    room: 'Executive Suite 2',
    date: 'Today, Sep 9',
    timeSlot: '10:45 AM - 11:45 AM',
    depositStatus: 'Paid ($50)',
    confirmationStatus: 'Confirmed (AI Call)',
    noShowRisk: { level: 'Low', percentage: 5 },
    isCheckedIn: false,
  },
  {
    id: 'apt-3',
    clientName: 'Chloe Rodriguez (Nova Agency)',
    clientPhone: '(424) 555-4921',
    treatment: '24/7 Support Operations Kickoff',
    practitioner: 'Marcus Cole (Account)',
    room: 'Zoom Room Beta',
    date: 'Today, Sep 9',
    timeSlot: '12:00 PM - 01:00 PM',
    depositStatus: 'Pending ($50)',
    confirmationStatus: 'Awaiting Confirmation',
    noShowRisk: { level: 'Moderate', percentage: 24 },
    isCheckedIn: false,
  },
  {
    id: 'apt-4',
    clientName: 'Amanda Scott (Scott Media)',
    clientPhone: '(310) 555-0194',
    treatment: 'Quarterly SLA & Data Operations Review',
    practitioner: 'Sarah Jenkins (Ops)',
    room: 'Executive Suite 1',
    date: 'Today, Sep 9',
    timeSlot: '01:30 PM - 02:15 PM',
    depositStatus: 'Paid ($50)',
    confirmationStatus: 'Confirmed (SMS)',
    noShowRisk: { level: 'Low', percentage: 2 },
    isCheckedIn: false,
  },
  {
    id: 'apt-5',
    clientName: 'Michael Chang (Arch Group)',
    clientPhone: '(310) 555-7812',
    treatment: 'Custom Salesforce & Stripe Connector Integration',
    practitioner: 'Alex Rivera (Tech)',
    room: 'Engineering Lab A',
    date: 'Today, Sep 9',
    timeSlot: '02:45 PM - 03:45 PM',
    depositStatus: 'Waived',
    confirmationStatus: 'Confirmed (AI Call)',
    noShowRisk: { level: 'Low', percentage: 4 },
    isCheckedIn: false,
  },
  {
    id: 'apt-6',
    clientName: 'Open Slot (Rescheduled 15m ago)',
    clientPhone: '--',
    treatment: 'Enterprise Growth Retainer Strategy',
    practitioner: 'Sarah Jenkins (Ops)',
    room: 'Zoom Room Alpha',
    date: 'Today, Sep 9',
    timeSlot: '04:00 PM - 05:00 PM',
    depositStatus: 'Waived',
    confirmationStatus: 'Awaiting Confirmation',
    noShowRisk: { level: 'High', percentage: 65 },
    isCheckedIn: false,
    waitlistMatchAvailable: {
      name: 'Lisa Miller (Miller Retail)',
      service: 'Growth Retainer Consultation',
      phone: '(310) 555-8822',
    },
  },
  {
    id: 'apt-7',
    clientName: 'David Kim (Kim Holdings)',
    clientPhone: '(323) 555-9011',
    treatment: 'Autonomous Inbound Sensing Demo',
    practitioner: 'Marcus Cole (Account)',
    room: 'Zoom Room Gamma',
    date: 'Today, Sep 9',
    timeSlot: '05:15 PM - 06:00 PM',
    depositStatus: 'Pending ($50)',
    confirmationStatus: 'Awaiting Confirmation',
    noShowRisk: { level: 'Moderate', percentage: 38 },
    isCheckedIn: false,
  },
];

export const MockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    clientName: 'Amanda Scott',
    treatment: 'Botox 32u + SkinCeuticals CE Ferulic',
    amount: 850,
    type: 'Payment',
    status: 'Settled',
    method: 'Stripe',
    date: 'Today, 1:45 PM',
    receiptId: 'rcpt_98231',
  },
  {
    id: 'tx-2',
    clientName: 'Marcus Vance',
    treatment: 'Morpheus8 Package Deposit',
    amount: 250,
    type: 'Deposit',
    status: 'Settled',
    method: 'Apple Pay',
    date: 'Today, 11:50 AM',
    receiptId: 'rcpt_98230',
  },
  {
    id: 'tx-3',
    clientName: 'Sarah Chen',
    treatment: 'Botox Consultation Hold',
    amount: 50,
    type: 'Deposit',
    status: 'Settled',
    method: 'Stripe',
    date: 'Today, 10:15 AM',
    receiptId: 'rcpt_98229',
  },
  {
    id: 'tx-4',
    clientName: 'Jonathan Reed',
    treatment: 'Platinum Membership Monthly Renewal',
    amount: 350,
    type: 'Package',
    status: 'Settled',
    method: 'Credit Card',
    date: 'Yesterday, 4:12 PM',
    receiptId: 'rcpt_98228',
  },
  {
    id: 'tx-5',
    clientName: 'Chloe Rodriguez',
    treatment: 'Hydrafacial Deposit Link',
    amount: 50,
    type: 'Deposit',
    status: 'Pending',
    method: 'Stripe',
    date: 'Today, 12:05 PM',
    receiptId: 'rcpt_pending_1',
  },
  {
    id: 'tx-6',
    clientName: 'David Kim',
    treatment: 'Consultation Deposit',
    amount: 50,
    type: 'Deposit',
    status: 'Pending',
    method: 'Stripe',
    date: 'Today, 11:30 AM',
    receiptId: 'rcpt_pending_2',
  },
];

export const MockApprovals: ApprovalTask[] = [
  {
    id: 'appr-1',
    title: 'Deposit Refund Request',
    type: 'R3_REFUND',
    riskTier: 'R3',
    clientName: 'Rachel Green',
    requestedBy: 'Front Desk Agent',
    description: 'Client relocated to Seattle and requested return of $150 package deposit per Section 10 R3 approval policy.',
    amount: 150,
    createdAt: '25m ago',
    status: 'Pending',
  },
  {
    id: 'appr-2',
    title: 'Clinical Contraindication Flag',
    type: 'R4_CLINICAL_ESCALATION',
    riskTier: 'R4',
    clientName: 'David Kim',
    requestedBy: 'Lead Qualifier Agent',
    description: 'Inquired for full-body laser with self-reported beach tanning 48 hours ago. Autonomous booking paused; requires medical provider clearance.',
    createdAt: '1h ago',
    status: 'Pending',
  },
  {
    id: 'appr-3',
    title: 'VIP 20% Package Discount Request',
    type: 'DISCOUNT_EXCEPTION',
    riskTier: 'R3',
    clientName: 'Amanda Scott',
    requestedBy: 'Revenue Agent',
    description: 'Diamond Member requested 20% bundle discount on second Morpheus8 series. Exceeds autonomous 10% ceiling.',
    amount: 370,
    createdAt: '2h ago',
    status: 'Pending',
  },
];

export const TokenWalletData = {
  availableTokens: 46200,
  reservedTokens: 3800,
  includedAllowance: 50000,
  burnRatePerDay: 1850,
  runwayDays: 19,
  planTier: 'Growth Plan ($1,000/mo)',
  orchestrationFrequency: 'Responsive (5 min)',
  projectedExhaustion: 'Oct 02, 2026',
  agentBreakdown: [
    { name: 'Front Desk AI Voice & Reception', tokens: 18400, percentage: 42, icon: 'call-outline', color: '#3B82F6' },
    { name: 'Growth Agent (Lead Concierge)', tokens: 14200, percentage: 32, icon: 'flash-outline', color: '#22D3EE' },
    { name: 'Appointment & SMS Agent', tokens: 9800, percentage: 22, icon: 'chatbubbles-outline', color: '#4ADE80' },
    { name: '5-min Orchestration Sensing', tokens: 3800, percentage: 9, icon: 'sync-outline', color: '#8B5CF6' },
  ],
};

export interface PatientReview {
  id: string;
  patientName: string;
  rating: number;
  treatment: string;
  date: string;
  platform: 'Google Reviews' | 'Meta / Instagram' | 'Direct Feedback';
  comment: string;
  practitioner: string;
  verified: boolean;
}

export const MockReviews: PatientReview[] = [
  {
    id: 'rev-1',
    patientName: 'Sarah Chen',
    rating: 5,
    treatment: 'Botox & Jawline Slimming',
    date: 'Yesterday',
    platform: 'Google Reviews',
    comment: 'The fastest response ever! The AI assistant booked my consultation in under 45 seconds. Dr. Elena Rostova did an incredible job with my Botox—super natural and no bruising.',
    practitioner: 'Dr. Elena Rostova',
    verified: true,
  },
  {
    id: 'rev-2',
    patientName: 'Amanda Scott',
    rating: 5,
    treatment: 'Morpheus8 RF & Skincare',
    date: '3 days ago',
    platform: 'Google Reviews',
    comment: '14 visits at Slim N Glow and counting. The VIP Glow Club Diamond membership is worth every dollar. Automated reminder texts and pre-care instructions make everything effortless.',
    practitioner: 'Nurse Jessica Miller',
    verified: true,
  },
  {
    id: 'rev-3',
    patientName: 'Marcus Vance',
    rating: 5,
    treatment: 'Morpheus8 RF Neck & Face',
    date: '1 week ago',
    platform: 'Meta / Instagram',
    comment: 'Loved the deposit link via Stripe and the seamless check-in. The results on my jawline contouring are already showing after session 2.',
    practitioner: 'Nurse Jessica Miller',
    verified: true,
  },
  {
    id: 'rev-4',
    patientName: 'Elena Gomez',
    rating: 5,
    treatment: 'Hydrafacial Platinum + Lip Perk',
    date: '2 weeks ago',
    platform: 'Direct Feedback',
    comment: 'Esthetician Mia is an angel. My skin was glowing for days before my event. The booking process on mobile was super smooth.',
    practitioner: 'Esthetician Mia Vance',
    verified: true,
  },
  {
    id: 'rev-5',
    patientName: 'Michael Chang',
    rating: 5,
    treatment: 'CoolSculpting Elite Series',
    date: '3 weeks ago',
    platform: 'Google Reviews',
    comment: 'Top tier aesthetic clinic in Beverly Hills. 12-week results exceeded expectations. Very professional staff and transparent pricing.',
    practitioner: 'Nurse Jessica Miller',
    verified: true,
  },
];
