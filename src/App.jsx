import React, { useState, useEffect } from 'react';

// Domain details & samples mapping
const DOMAINS = [
  {
    id: 'hr',
    name: 'HR & Onboarding',
    emoji: '🤝',
    description: 'Employee lifecycle, onboarding, offboarding, and recruiting pipelines.',
    sample: 'Currently, when a new employee starts, HR manually sends a welcome email with 5 PDF forms to fill out. The employee prints, signs, scans, and emails them back. HR then manually inputs this information into three separate systems (payroll, active directory, and time tracking). Laptop provisioning takes about 10 days because IT is only notified on the employee\'s first day.',
    mockGenerator: (input) => ({
      processName: "Manual Talent Onboarding Integration",
      domain: "HR & Onboarding",
      summary: "A heavily manual, document-centric onboarding workflow prone to transcription errors, lack of visibility, and long equipment delays.",
      asIs: {
        steps: [
          { stepNumber: 1, stepName: "Onboarding Package Despatch", description: "HR coordinator manually drafts a welcome email and attaches 5 core payroll and contract PDFs.", responsible: "HR Specialist", timeEstimate: "30 Mins" },
          { stepNumber: 2, stepName: "Physical Signing & Scanning", description: "New hire prints documents out, physically signs them, finds a scanner, and emails scanned copies back.", responsible: "New Hire", timeEstimate: "2 Days" },
          { stepNumber: 3, stepName: "Manual Multi-Portal Data Entry", description: "HR manually transcribes candidate details into Payroll, Active Directory, and scheduling portals.", responsible: "HR Generalist", timeEstimate: "2 Hours" },
          { stepNumber: 4, stepName: "Late Provisioning Notification", description: "IT department is finally alerted on Day 1 to manually configure and ship out a company laptop.", responsible: "IT Helpdesk Specialist", timeEstimate: "10 Days" }
        ],
        totalSteps: 4,
        avgLeadTime: "12 Days",
        automationLevel: "5%",
        painPoints: [
          "Manual printing and scanning creates extreme friction for the candidate",
          "Double/triple data entry across disjointed payroll and AD platforms risks severe transcription errors",
          "New hire spends their entire first week without operational hardware, destroying initial productivity"
        ]
      },
      bottlenecks: [
        { id: 1, title: "Physical Signature Bottleneck", severity: "high", description: "Relying on physical signatures creates candidate delays depending on printer and scanner access.", impact: "Adds 2-4 days of passive waiting time.", rootCause: "Lack of a legally binding digital e-signature interface." },
        { id: 2, title: "IT Ticket Delay", severity: "high", description: "Hardware provisioning is requested sequentially on Day 1 instead of concurrently during pre-boarding.", impact: "Causes a 10-day hardware lag post-hire.", rootCause: "Disconnected onboarding pipeline triggers between HR and IT ticketing queues." }
      ],
      toBe: {
        steps: [
          { stepNumber: 1, stepName: "Digital E-Signature Dispatch", description: "HR triggers a unified digital contract envelope via DocuSign/HelloSign.", responsible: "Automated Workflow Manager", timeEstimate: "5 Mins", improvement: "Replaces physical printing and scanning with a single-click mobile-friendly e-sign process." },
          { stepNumber: 2, stepName: "HRIS-to-Active-Directory Sync", description: "E-signed packages auto-trigger API pushes to Payroll and Active Directory portals simultaneously.", responsible: "BambooHR API Integration", timeEstimate: "Instant", improvement: "Eliminates duplicate data entry entirely, reducing transcribing errors to absolute zero." },
          { stepNumber: 3, stepName: "Automated Hardware Order", description: "IT provisioning tickets are auto-created 7 days in advance, prompting instant hardware courier prep.", responsible: "Jira / ServiceNow Automation", timeEstimate: "2 Days", improvement: "Ensures laptop is delivered to candidate's home before Day 1." }
        ],
        expectedLeadTime: "2 Days",
        expectedAutomation: "85%",
        keyImprovements: [
          "E-sign reduces onboarding sign-up lag from days to minutes",
          "API sync eliminates data transcribing times entirely",
          "Advance hardware prep saves 10 unproductive candidate days"
        ]
      },
      implementationPlan: {
        phases: [
          { phaseNumber: 1, phaseName: "E-Signature Setup", duration: "Weeks 1-2", activities: ["Procure DocuSign/HelloSign licenses", "Convert onboarding documents into dynamic smart templates"], deliverables: ["Active e-signature API interface", "Standardized electronic onboarding templates"] },
          { phaseNumber: 2, phaseName: "HRIS & Ticketing Integration", duration: "Weeks 3-4", activities: ["Develop BambooHR API webhook integration to Active Directory", "Connect HRIS trigger to IT ServiceNow queues"], deliverables: ["Live data sync pipeline", "Automatic pre-boarding hardware tickets"] }
        ],
        totalDuration: "4 Weeks",
        estimatedROI: "340% (Based on 10 saved work-days per employee & HR hours reduced)",
        quickWins: [
          "Replace PDFs with digital e-signatures immediately",
          "Trigger IT laptop ticket immediately upon verbal offer acceptance"
        ]
      }
    })
  },
  {
    id: 'finance',
    name: 'Finance & Payments',
    emoji: '💳',
    description: 'Invoicing, billing, expense approvals, and accounts receivable.',
    sample: 'Vendors mail paper invoices to our office. The receptionist scans them and emails them to the finance assistant. The assistant manually enters them into Excel. To get approval, the assistant forwards the email to the department head. Once approved, the CFO has to log into the bank portal to manually authorize a wire transfer twice a month.',
    mockGenerator: (input) => ({
      processName: "Manual Accounts Payable Process",
      domain: "Finance & Payments",
      summary: "A legacy billing workflow hindered by physical receipt requirements, untracked Excel files, and high executive overhead during payment runs.",
      asIs: {
        steps: [
          { stepNumber: 1, stepName: "Invoice Reception & Scan", description: "Paper invoices are received via post, scanned by the receptionist, and emailed to the finance assistant.", responsible: "Receptionist", timeEstimate: "1 Day" },
          { stepNumber: 2, stepName: "Manual Excel Posting", description: "Finance assistant manually logs the invoice details into a shared Excel tracking sheet.", responsible: "Finance Assistant", timeEstimate: "30 Mins" },
          { stepNumber: 3, stepName: "Email Approval Request", description: "Assistant forwards invoice emails to department heads, chasing approvals manually weekly.", responsible: "Finance Assistant", timeEstimate: "14 Days" },
          { stepNumber: 4, stepName: "Manual CFO Payment Run", description: "CFO logs into the corporate banking portal twice a month and manually enters wire transfer details.", responsible: "CFO", timeEstimate: "2 Hours" }
        ],
        totalSteps: 4,
        avgLeadTime: "22 Days",
        automationLevel: "5%",
        painPoints: [
          "Physical paper receipt delays processing and increases loss rate",
          "Excel tracker lacks an audit trail, leading to double payments and duplicate entries",
          "The CFO acts as a manual data entry operator for payment processing"
        ]
      },
      bottlenecks: [
        { id: 1, title: "Ad-hoc Email Approvals", severity: "high", description: "Chasing department heads for approvals via email leads to lost emails, missed early payment discounts, and vendor friction.", impact: "Delays average approval times by 10+ days.", rootCause: "No system of record for routing and tracking operational approvals." },
        { id: 2, title: "Manual Banking Batch runs", severity: "medium", description: "CFO manually inputs bank routing details, which is highly error-prone.", impact: "Wastes high-level executive hours and risks financial loss via typing errors.", rootCause: "Absence of direct bank feed integration with accounting systems." }
      ],
      toBe: {
        steps: [
          { stepNumber: 1, stepName: "OCR Invoice Capture", description: "Vendors upload PDF invoices to an AP portal, or they are auto-scanned via OCR inboxes.", responsible: "Smart Invoice Processor", timeEstimate: "Instant", improvement: "Converts scans into digital ledger data instantly, eliminating spreadsheet entries." },
          { stepNumber: 2, stepName: "Automated Approval Routing", description: "OCR platform auto-routes invoice directly to the budget holder based on department parameters.", responsible: "AP Automation System", timeEstimate: "1 Day", improvement: "Removes manual tracking sheets. Provides single-click approvals via mobile or email." },
          { stepNumber: 3, stepName: "Batch ACH Direct Payment", description: "Accounting system prepares digital bank payment files, enabling safe, secure batch ACH transactions.", responsible: "CFO & Integrated Banking API", timeEstimate: "10 Mins", improvement: "CFO clicks a single 'Authorize Batch' button, eliminating manual routing entries." }
        ],
        expectedLeadTime: "3 Days",
        expectedAutomation: "90%",
        keyImprovements: [
          "OCR ingestion frees 80% of Finance Assistant manual entry workload",
          "Dynamic notifications cut approval cycle times by 90%",
          "Unified payment batches mitigate duplicate wire transfers and typing mistakes"
        ]
      },
      implementationPlan: {
        phases: [
          { phaseNumber: 1, phaseName: "OCR Software Launch", duration: "Weeks 1-2", activities: ["Integrate AP software (e.g., Tipalti or Bill.com) with the ERP", "Route billing inbox to OCR parser"], deliverables: ["Working AP capture portal", "Live OCR parser mappings"] },
          { phaseNumber: 2, phaseName: "Approval Workflows & Bank Feeds", duration: "Weeks 3-4", activities: ["Set up approval limits & department head triggers", "Configure bank feed authentication"], deliverables: ["Live hierarchical routing approvals", "Active batch payout capabilities"] }
        ],
        totalDuration: "4 Weeks",
        estimatedROI: "420% (Based on processing time savings & captured early payment incentives)",
        quickWins: [
          "Instruct vendors to email only digital PDFs instead of physical paper mail",
          "Establish a unified central finance email address"
        ]
      }
    })
  },
  {
    id: 'customer',
    name: 'Customer Service',
    emoji: '💬',
    description: 'Support queues, ticketing systems, triage, and SLAs.',
    sample: 'Support requests are received via general email (info@company.com). The support manager manually copies the email body and creates a ticket in our CRM. The team has no formal sorting rules, so agents pick tickets arbitrarily. If a ticket requires product changes, agents message developers on Slack. There is no status updates for customers.',
    mockGenerator: (input) => ({
      processName: "Manual Email Support Triage",
      domain: "Customer Service",
      summary: "An unstructured incoming customer support pipeline lacking direct channel integrations, triage guidelines, or SLA oversight.",
      asIs: {
        steps: [
          { stepNumber: 1, stepName: "Support Mail Auditing", description: "Support manager reviews incoming general mailbox emails.", responsible: "Support Manager", timeEstimate: "2 Hours" },
          { stepNumber: 2, stepName: "Manual Ticket Transcribing", description: "Manager manually copies and pastes email content into the legacy CRM platform.", responsible: "Support Manager", timeEstimate: "3 Hours" },
          { stepNumber: 3, stepName: "Arbitrary Ticket Assignment", description: "Support agents cherry-pick support tasks based on arbitrary difficulty choice.", responsible: "Customer Agents", timeEstimate: "1 Day" },
          { stepNumber: 4, stepName: "Slack Product Escalation", description: "Technical tickets are forwarded to developers via informal Slack chat rooms.", responsible: "Support Agents", timeEstimate: "3 Days" }
        ],
        totalSteps: 4,
        avgLeadTime: "34 Hours",
        automationLevel: "0%",
        painPoints: [
          "Support lead spends half their workday copying and pasting email text",
          "No priority rules mean complex tickets are neglected, causing high churn",
          "Escalated engineering bugs are lost in active Slack chatter history"
        ]
      },
      bottlenecks: [
        { id: 1, title: "Manual CRM Intake Copying", severity: "high", description: "Manually copying emails to CRM creates a severe bottleneck that delays ticket assignment.", impact: "Delays ticket processing by 4-6 hours.", rootCause: "No direct system integration between standard corporate mailboxes and CRM platforms." },
        { id: 2, title: "Informal Slack Dev Escalations", severity: "high", description: "Technical issues are messaged on Slack without standard ticket sync, priority tags, or tracking metrics.", impact: "Over 30% of engineering bugs are forgotten or delayed.", rootCause: "Lack of synchronization between support software and Jira/Dev boards." }
      ],
      toBe: {
        steps: [
          { stepNumber: 1, stepName: "Auto-Ingestion Triage", description: "Zendesk/Freshdesk dynamically captures incoming customer emails and translates them to tickets.", responsible: "CRM Helpdesk Core", timeEstimate: "Instant", improvement: "Saves support leads from manual data entry. Auto-assigns priority tags based on customer tier." },
          { stepNumber: 2, stepName: "Priority Queue Routing", description: "Smart routing engine auto-schedules tickets for available agents according to category and SLA policies.", responsible: "Helpdesk Rules Engine", timeEstimate: "5 Mins", improvement: "Ensures highest value issues are handled first, preventing cherry-picking." },
          { stepNumber: 3, stepName: "Jira Technical Bug Sync", description: "Technical escalations sync directly to dev teams Jira boards with tracked SLA updates.", responsible: "Jira Support Webhook", timeEstimate: "Instant", improvement: "Maintains transparency and closes customer feedback loop automatically." }
        ],
        expectedLeadTime: "4 Hours",
        expectedAutomation: "75%",
        keyImprovements: [
          "Automatic ticketing frees support manager for quality audits",
          "Dynamic SLA triggers improve resolution rates by 70%",
          "Jira integrations eliminate lost bugs and provide tracking history"
        ]
      },
      implementationPlan: {
        phases: [
          { phaseNumber: 1, phaseName: "Helpdesk Platform Launch", duration: "Weeks 1-2", activities: ["Deploy modern support software (Zendesk or Freshdesk)", "Map corporate mail forwards to ticketing inbox"], deliverables: ["Configured helpdesk instance", "Automated email ingestion pipeline"] },
          { phaseNumber: 2, phaseName: "Escalation Sync Setup", duration: "Weeks 3-4", activities: ["Establish dynamic CRM to Jira sync integration", "Create auto-status templates for user progress updates"], deliverables: ["Jira sync pipeline", "Automatic customer status update alerts"] }
        ],
        totalDuration: "4 Weeks",
        estimatedROI: "290% (Measured in customer retention value and agent handling time reduction)",
        quickWins: [
          "Set up automatic email replies to set customer expectations immediately",
          "Map email forwards directly to your current system"
        ]
      }
    })
  },
  {
    id: 'supply',
    name: 'Supply Chain',
    emoji: '📦',
    description: 'Inventory levels, warehouse updates, and shipping pipelines.',
    sample: 'Warehouse managers check stock levels on paper clipboards every Monday morning. They write down a list of low stock items and email a purchase request to the procurement officer. The officer types these items into a purchase order email and sends it to suppliers. Supplier confirmations are printed and kept in folders.',
    mockGenerator: (input) => ({
      processName: "Manual Clipboard Stock Auditing",
      domain: "Supply Chain",
      summary: "A legacy paper-based inventory tracking process suffering from batch processing delay, manual data re-entry, and physical storage risks.",
      asIs: {
        steps: [
          { stepNumber: 1, stepName: "Clipboard Weekly Count", description: "Warehouse lead manually reviews stock amounts using a physical clipboard check sheet every Monday morning.", responsible: "Warehouse Manager", timeEstimate: "4 Hours" },
          { stepNumber: 2, stepName: "Requisition Email Prep", description: "Manager types low stock quantities into an email request sent to procurement.", responsible: "Warehouse Manager", timeEstimate: "1 Hour" },
          { stepNumber: 3, stepName: "Supplier PO Re-typing", description: "Procurement officer re-types the requested stock into supplier email forms.", responsible: "Procurement Officer", timeEstimate: "2 Hours" },
          { stepNumber: 4, stepName: "Physical File Retention", description: "Supplier dispatch notes and purchase confirmations are printed and stored in filing cabinets.", responsible: "Procurement Assistant", timeEstimate: "1 Day" }
        ],
        totalSteps: 4,
        avgLeadTime: "8 Days",
        automationLevel: "0%",
        painPoints: [
          "Weekly counts leave warehouse vulnerable to unexpected stockouts mid-week",
          "Re-typing inventory numbers across multiple emails invites mistakes in quantities and SKUs",
          "Physical files are impossible to search easily and require office space"
        ]
      },
      bottlenecks: [
        { id: 1, title: "Batch Monday Inventory Counts", severity: "high", description: "Waiting for Mondays to review stock levels creates stock shortages and backorders.", impact: "Increases average order turnaround by 4-6 days.", rootCause: "No real-time stock-tracking system connected to order checkout portals." },
        { id: 2, title: "Supplier Confirmation Filing", severity: "medium", description: "Printing and filing paper confirmations requires physical storage and delays lookup times.", impact: "Slows dispute resolutions and makes supply auditing extremely tedious.", rootCause: "Absence of digital document management systems." }
      ],
      toBe: {
        steps: [
          { stepNumber: 1, stepName: "Barcode Scanning Inventory", description: "Stock items are scanned upon arrival and departure, updating the ERP platform in real time.", responsible: "Warehouse Staff", timeEstimate: "5 Mins", improvement: "Provides 100% visible, real-time inventory levels, eliminating manual counts." },
          { stepNumber: 2, stepName: "Safety Stock Auto-Triggers", description: "Inventory drops below thresholds, automatically drafting purchase orders.", responsible: "Katana ERP platform", timeEstimate: "Instant", improvement: "Prevents stockouts and eliminates manual PO drafting." },
          { stepNumber: 3, stepName: "Electronic Supplier Dispach", description: "System sends POs directly to suppliers electronically with digital confirmations.", responsible: "Integrated Procurement Engine", timeEstimate: "10 Mins", improvement: "Ensures digital record keeping, removing paper storage needs entirely." }
        ],
        expectedLeadTime: "1.5 Days",
        expectedAutomation: "80%",
        keyImprovements: [
          "Real-time scanning removes manual Monday inventory workloads",
          "Automatic PO drafts prevent human typing and order mistakes",
          "Digital archive makes PO history searchable in seconds"
        ]
      },
      implementationPlan: {
        phases: [
          { phaseNumber: 1, phaseName: "ERP & Barcoding Rollout", duration: "Weeks 1-3", activities: ["Install digital ERP software", "Equip warehouse with mobile barcode scanners"], deliverables: ["Live ERP stock ledger", "Working barcode integration"] },
          { phaseNumber: 2, phaseName: "Supplier EDI setup", duration: "Weeks 4-5", activities: ["Configure vendor auto-draft parameters", "Set up electronic confirmation feeds"], deliverables: ["Auto-replenishment loops", "Digital PO dispatch dashboard"] }
        ],
        totalDuration: "5 Weeks",
        estimatedROI: "380% (Calculated via lower warehouse stockouts and administrative cost drops)",
        quickWins: [
          "Convert clipboard spreadsheets into online cloud-synced sheets",
          "Establish pre-arranged supplier agreement limits for faster ordering"
        ]
      }
    })
  },
  {
    id: 'it',
    name: 'IT & Support',
    emoji: '💻',
    description: 'Hardware configuration, security patches, and network permissions.',
    sample: 'When a user requests permission to a folder, they message the IT admin on Teams. The admin verifies with the department head via a separate Teams message. If approved, the admin logs into Azure AD and updates permissions manually. There is no ticketing audit trail, and permissions are rarely audited or revoked.',
    mockGenerator: (input) => ({
      processName: "Ad-hoc Permission Management",
      domain: "IT & Support",
      summary: "An informal access governance pipeline relying on chat channels, leading to security compliance risks, manually configured systems, and zero audit records.",
      asIs: {
        steps: [
          { stepNumber: 1, stepName: "Teams Request Submission", description: "Employees ask for access permissions using personal Teams messages.", responsible: "Employee", timeEstimate: "10 Mins" },
          { stepNumber: 2, stepName: "Teams Manager Approval", description: "IT administrator messages managers manually to confirm request authorization.", responsible: "IT Administrator", timeEstimate: "1 Day" },
          { stepNumber: 3, stepName: "Manual Azure AD Update", description: "Admin manually logs in to Azure AD and updates directory groups.", responsible: "IT Administrator", timeEstimate: "30 Mins" },
          { stepNumber: 4, stepName: "Static Permissions Hold", description: "Permissions remain active indefinitely without access reviews.", responsible: "None", timeEstimate: "Permanent" }
        ],
        totalSteps: 4,
        avgLeadTime: "28 Hours",
        automationLevel: "0%",
        painPoints: [
          "Chat messages provide no official compliance records, risking security audits",
          "Manual updates risk human error and configuration drift",
          "Permanent access leads to 'privilege creep', increasing internal security threats"
        ]
      },
      bottlenecks: [
        { id: 1, title: "Untracked Chat Approvals", severity: "high", description: "Approving permissions via Teams lacks auditability and compliance logging.", impact: "Exposes systems to compliance fines and security breaches.", rootCause: "No ticketing system managing permissions." },
        { id: 2, title: "Lack of Access Expirations", severity: "medium", description: "Failing to schedule permission expirations leads to accumulation of access privileges.", impact: "Increases risk of cyber attacks from compromised accounts.", rootCause: "Permissions are updated manually without timed access policies." }
      ],
      toBe: {
        steps: [
          { stepNumber: 1, stepName: "Self-Service Access Request", description: "Employee requests resource access through an IT portal.", responsible: "Self-Service IT Portal", timeEstimate: "5 Mins", improvement: "Automates ticket logging, removing manual tracking." },
          { stepNumber: 2, stepName: "Auto-Approval Notification", description: "Portal sends a one-click authorization request to the department manager.", responsible: "Identity System Workflow", timeEstimate: "1 Hour", improvement: "Speeds up authorization loop with full audit trail." },
          { stepNumber: 3, stepName: "Timed Azure AD Provisioning", description: "Upon approval, system grants temporary timed access.", responsible: "Azure AD Identity Manager", timeEstimate: "Instant", improvement: "Revokes access automatically when time expires, ending privilege creep." }
        ],
        expectedLeadTime: "1 Hour",
        expectedAutomation: "95%",
        keyImprovements: [
          "Self-service portal ensures 100% compliant audit trails",
          "Automated routing speeds up access provisioning",
          "Timed access policies secure the company network"
        ]
      },
      implementationPlan: {
        phases: [
          { phaseNumber: 1, phaseName: "IAM Portal Configuration", duration: "Weeks 1-2", activities: ["Configure Azure AD Privileged Identity Management (PIM)", "Import access groups to IAM portal"], deliverables: ["Working IAM request portal", "Active AD connections"] },
          { phaseNumber: 2, phaseName: "Approval Workflows & Timed Policies", duration: "Weeks 3-4", activities: ["Build timed access expiration settings", "Enable automatic security reviews"], deliverables: ["Auto-expiring access groups", "Compliant IT audit logs"] }
        ],
        totalDuration: "4 Weeks",
        estimatedROI: "320% (Based on reduced IT admin workload and decreased security compliance risks)",
        quickWins: [
          "Create a dedicated IT request email group immediately",
          "Enforce formal email approval requests instead of chat messages"
        ]
      }
    })
  },
  {
    id: 'healthcare',
    name: 'Healthcare Operations',
    emoji: '🏥',
    description: 'Patient check-in, scheduling, and electronic records coordination.',
    sample: 'Patients arrive and fill out paper intake sheets. The receptionist manually types this information into the Electronic Health Records system. The patient then waits for the nurse to retrieve their physical folder. If test results are ready, the doctor prints them and puts them in the tray. Lab requests are faxed to external clinics.',
    mockGenerator: (input) => ({
      processName: "Paper Intake Patient Care Process",
      domain: "Healthcare Operations",
      summary: "A legacy paper-based check-in workflow prone to clinical entry mistakes, patient delays, and slow external diagnostics.",
      asIs: {
        steps: [
          { stepNumber: 1, stepName: "Paper Sheet Reception", description: "Patients arrive and manually write medical history on printed check-in sheets.", responsible: "Patient", timeEstimate: "15 Mins" },
          { stepNumber: 2, stepName: "Manual EHR Transcription", description: "Receptionist manually types paper data into legacy Electronic Health Records systems.", responsible: "Receptionist", timeEstimate: "15 Mins" },
          { stepNumber: 3, stepName: "Physical Folder Retrieval", description: "Nurse searches medical cabinets to retrieve physical folders.", responsible: "Nurse", timeEstimate: "10 Mins" },
          { stepNumber: 4, stepName: "Fax Machine Lab Ordering", description: "External diagnostic requests are dispatched via fax machines.", responsible: "Doctor", timeEstimate: "20 Mins" }
        ],
        totalSteps: 4,
        avgLeadTime: "60 Mins",
        automationLevel: "5%",
        painPoints: [
          "Manual transcribing leads to medical data entry errors",
          "Physical folders delay consult starts and risk being lost",
          "Fax transmissions are unreliable and insecure, violating modern guidelines"
        ]
      },
      bottlenecks: [
        { id: 1, title: "Manual Intake Transcription", severity: "high", description: "Transcribing hand-written histories delays consultations and increases medical error risks.", impact: "Delays average patient consult start by 15-20 mins.", rootCause: "Lack of pre-registration digital portal options." },
        { id: 2, title: "Fax Machine Communications", severity: "high", description: "Faxing lab orders is slow, unsecure, and risks lost lab results.", impact: "Delays diagnostic feedback by days.", rootCause: "No secure HL7 lab hub integrations." }
      ],
      toBe: {
        steps: [
          { stepNumber: 1, stepName: "Digital Pre-Check-in", description: "Patients check in at home via mobile, syncing directly to Electronic Health Records.", responsible: "Patient & Pre-Registration Portal", timeEstimate: "5 Mins", improvement: "Eliminates clinic lobby data transcription work." },
          { stepNumber: 2, stepName: "Secure HL7 Lab Hub Sync", description: "Doctor sends lab requests electronically via HL7 API systems.", responsible: "EHR API Hub", timeEstimate: "Instant", improvement: "Enables instant lab delivery and tracking, ending fax needs." },
          { stepNumber: 3, stepName: "Digital E-Prescriptions", description: "System dispatches prescriptions directly to target pharmacies.", responsible: "Integrated E-Prescribing", timeEstimate: "5 Mins", improvement: "Improves prescription speed and patient convenience." }
        ],
        expectedLeadTime: "10 Mins",
        expectedAutomation: "85%",
        keyImprovements: [
          "Pre-registration eliminates clinic waiting room bottlenecks",
          "HL7 API links secure and accelerate diagnostic reports",
          "E-prescribing delivers accurate orders to local pharmacies instantly"
        ]
      },
      implementationPlan: {
        phases: [
          { phaseNumber: 1, phaseName: "Check-in Portal Setup", duration: "Weeks 1-3", activities: ["Integrate HIPAA-compliant check-in portals", "Build EMR sync triggers"], deliverables: ["Working patient precheck portal", "Live EMR integration logs"] },
          { phaseNumber: 2, phaseName: "Lab & Pharmacy APIs", duration: "Weeks 4-5", activities: ["Connect EMR system to target lab HL7 feeds", "Activate e-prescribing tools"], deliverables: ["Integrated digital lab hub", "Active e-prescribing credentials"] }
        ],
        totalDuration: "5 Weeks",
        estimatedROI: "460% (Based on reduced staff typing hours and decreased patient wait times)",
        quickWins: [
          "Provide clinic waiting rooms with tablet check-in forms",
          "Set up email reminders containing check-in links before visits"
        ]
      }
    })
  }
];

export default function App() {
  const [inputText, setInputText] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('hr');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisOutput, setAnalysisOutput] = useState(null);
  const [activeTab, setActiveTab] = useState('asis');
  const [isUsingMock, setIsUsingMock] = useState(true);
  const [apiError, setApiError] = useState(null);

  // API Key State & Storage Integration
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('processiq_api_key') || '';
  });
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState('');
  const [isKeyVisible, setIsKeyVisible] = useState(false);

  // Character limit rules
  const maxChar = 1000;

  // Sync API Key status to localStorage & determine mock mode state
  useEffect(() => {
    if (apiKey.trim()) {
      localStorage.setItem('processiq_api_key', apiKey.trim());
      setIsUsingMock(false);
    } else {
      localStorage.removeItem('processiq_api_key');
      setIsUsingMock(true);
    }
  }, [apiKey]);

  // Sync temp key input when opening modal
  const openKeyModal = () => {
    setTempKeyInput(apiKey);
    setIsKeyModalOpen(true);
  };

  const handleSaveKey = (e) => {
    e.preventDefault();
    setApiKey(tempKeyInput.trim());
    setApiError(null);
    setIsKeyModalOpen(false);
  };

  const handleClearKey = () => {
    setTempKeyInput('');
    setApiKey('');
    setIsUsingMock(true);
    setApiError(null);
    setIsKeyModalOpen(false);
  };

  // Handles sample button click
  const handleTrySample = (e) => {
    e.preventDefault();
    setSelectedDomain('hr');
    setInputText("Our employee onboarding process is entirely manual. HR emails forms to new hires who print, sign, scan and email back. HR then manually enters data into three separate systems - payroll, active directory and time tracking. IT is only notified on the first day to set up the laptop. The whole process takes 2 weeks and new hires often start without system access or equipment ready.");
  };

  // Pre-fills textarea if domain is changed and input is empty or contains an old sample
  useEffect(() => {
    const domainObj = DOMAINS.find(d => d.id === selectedDomain);
    if (domainObj && (!inputText || DOMAINS.some(d => d.sample === inputText))) {
      setInputText(domainObj.sample);
    }
  }, [selectedDomain]);

  // Handle submit (Mock generation vs Anthropic API Call)
  const handleAnalyse = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setApiError(null);

    // Smooth scroll down to indicate loading has begun
    window.scrollTo({
      top: document.querySelector('.hero__cta').offsetTop + 100,
      behavior: 'smooth'
    });

    const activeDomainObj = DOMAINS.find(d => d.id === selectedDomain);

    if (isUsingMock || !apiKey.trim()) {
      // Mock Mode Execution
      setTimeout(() => {
        if (activeDomainObj) {
          const generatedMock = activeDomainObj.mockGenerator(inputText);
          setAnalysisOutput(generatedMock);
          setActiveTab('asis');
        }
        setIsLoading(false);
        
        // Auto scroll to results section once loaded
        setTimeout(() => {
          const resultsEl = document.getElementById('results-section');
          if (resultsEl) {
            resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }, 1500);
    } else {
      // Real Anthropic API Call
      const domainLabel = activeDomainObj ? activeDomainObj.name : selectedDomain;
      const prompt = `You are a senior Business Analyst and process improvement consultant. Analyse the following business process and return ONLY a JSON object with no markdown, no explanation.

Process Description: ${inputText}
Domain: ${domainLabel}

Return this exact JSON structure:
{
  "processName": "string",
  "domain": "string",
  "summary": "string",
  "asIs": {
    "steps": [{ "stepNumber": 1, "stepName": "string", "description": "string", "responsible": "string", "timeEstimate": "string" }],
    "totalSteps": 4,
    "avgLeadTime": "string",
    "automationLevel": "string",
    "painPoints": ["string"]
  },
  "bottlenecks": [{ 
    "id": 1, "title": "string", "severity": "string", 
    "description": "string", "impact": "string", "rootCause": "string" 
  }],
  "toBe": {
    "steps": [{ "stepNumber": 1, "stepName": "string", "description": "string", "responsible": "string", "timeEstimate": "string", "improvement": "string" }],
    "expectedLeadTime": "string",
    "expectedAutomation": "string",
    "keyImprovements": ["string"]
  },
  "implementationPlan": {
    "phases": [{ 
      "phaseNumber": 1, "phaseName": "string", "duration": "string", 
      "activities": ["string"], 
      "deliverables": ["string"] 
    }],
    "totalDuration": "string",
    "estimatedROI": "string",
    "quickWins": ["string"]
  }
}`;

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'dangerouslyAllowBrowser': 'true'
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{ role: 'user', content: prompt }]
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `HTTP ${response.status} Error`);
        }

        const data = await response.json();
        const contentText = data?.content?.[0]?.text || '';
        
        // Clean markdown backticks if any
        let cleanJsonStr = contentText.trim();
        if (cleanJsonStr.startsWith('```')) {
          cleanJsonStr = cleanJsonStr.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
        }

        const parsedData = JSON.parse(cleanJsonStr);
        setAnalysisOutput(parsedData);
        setActiveTab('asis');
        setIsLoading(false);

        // Auto scroll to results section
        setTimeout(() => {
          const resultsEl = document.getElementById('results-section');
          if (resultsEl) {
            resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);

      } catch (err) {
        console.error('Anthropic API Call Failed:', err);
        setApiError(err.message || 'An unexpected connection or authorization error occurred.');
        setIsLoading(false);
      }
    }
  };

  // Enriched Export report generator
  const handleExport = () => {
    if (!analysisOutput) return;

    const domainName = analysisOutput.domain || 'Business';
    const processName = analysisOutput.processName || 'Process';
    const sanitizedProcessName = processName.replace(/[^a-zA-Z0-9]/g, '_');
    const dateStr = new Date().toISOString().slice(0, 10);
    const fileName = `ProcessAnalysis_${sanitizedProcessName}_${dateStr}.txt`;

    const reportContent = `=====================================================
PROCESSIQ REPORT: ${processName}
Domain: ${domainName}
Date Generated: ${new Date().toLocaleDateString()}
=====================================================

OVERVIEW:
${analysisOutput.summary || ''}

-----------------------------------------------------
1. CURRENT AS-IS ANALYSIS
Summary Metrics:
  - Total Flow Steps: ${analysisOutput.asIs?.totalSteps || (analysisOutput.asIs?.steps || []).length}
  - Lead Time: ${analysisOutput.asIs?.avgLeadTime || 'N/A'}
  - Current Automation Level: ${analysisOutput.asIs?.automationLevel || 'N/A'}

Key Steps:
${(analysisOutput.asIs?.steps || []).map(s => `  [Step ${s.stepNumber}] ${s.stepName || ''} (${s.timeEstimate || 'N/A'})
  Responsible: ${s.responsible || 'N/A'}
  Description: ${s.description || ''}`).join('\n\n')}

Pain Points Identified:
${(analysisOutput.asIs?.painPoints || []).map(p => `  - ${p}`).join('\n')}

-----------------------------------------------------
2. DETECTED BOTTLENECKS
${(analysisOutput.bottlenecks || []).map(b => `* [${(b.severity || 'high').toUpperCase()}] ${b.title || ''}
  Description: ${b.description || ''}
  Impact Assessment: ${b.impact || ''}
  Root Cause: ${b.rootCause || ''}`).join('\n\n')}

-----------------------------------------------------
3. RECOMMENDED FUTURE STATE (TO-BE)
Projected Metrics:
  - Expected Lead Time: ${analysisOutput.toBe?.expectedLeadTime || 'N/A'}
  - Expected Automation: ${analysisOutput.toBe?.expectedAutomation || 'N/A'}

Improvements Flow Steps:
${(analysisOutput.toBe?.steps || []).map(s => `  [Step ${s.stepNumber}] ${s.stepName || ''} (${s.timeEstimate || 'N/A'})
  Responsible: ${s.responsible || 'N/A'}
  Improvement: ${s.improvement || ''}
  Description: ${s.description || ''}`).join('\n\n')}

Key Improvements Summary:
${(analysisOutput.toBe?.keyImprovements || []).map(ki => `  - ${ki}`).join('\n')}

-----------------------------------------------------
4. STRATEGIC IMPLEMENTATION PLAN
Overall Timeline: ${analysisOutput.implementationPlan?.totalDuration || 'N/A'}
Estimated ROI: ${analysisOutput.implementationPlan?.estimatedROI || 'N/A'}

Quick Win Initiatives:
${(analysisOutput.implementationPlan?.quickWins || []).map(qw => `  - ${qw}`).join('\n')}

Phased Integration Roadmap:
${(analysisOutput.implementationPlan?.phases || []).map(p => `  [Phase ${p.phaseNumber}] ${p.phaseName || ''} (${p.duration || 'N/A'})
  Activities: ${(p.activities || []).join(', ')}
  Deliverables: ${(p.deliverables || []).join(', ')}`).join('\n\n')}

=====================================================
Generated by ProcessIQ — Business Process Intelligence Platform
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar__inner">
          <a href="#" className="navbar__logo">
            <div className="navbar__logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="navbar__logo-text">Process<span>IQ</span></span>
          </a>
          <span className="navbar__tagline" style={{ marginRight: '16px' }}>AS-IS to TO-BE. Instantly.</span>

          {/* Configure API Key Button */}
          <button
            type="button"
            className={`btn-key ${apiKey.trim() ? 'btn-key--has-key' : ''}`}
            onClick={openKeyModal}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {apiKey.trim() ? 'Key Configured' : 'Configure API Key'}
          </button>
        </div>
      </header>

      {/* ERROR CONTEXT BANNER */}
      {apiError && (
        <div className="error-container">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <div className="error-title">Anthropic API Request Failed</div>
            <div className="error-message">
              {apiError} (CORS locks or credentials blockages are automatically bypassed by configuring a valid API key or utilizing local **Mock Mode** by clearing the key configuration).
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <main className="hero">
        <div className="hero__inner">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Business Process Intelligence
            {isUsingMock && (
              <span className="mock-notice" style={{ marginLeft: '12px' }}>
                Mock Mode Active
              </span>
            )}
          </div>
          <h1 className="hero__heading">
            Analyse Any Business <em>Process</em> In Seconds
          </h1>
          <p className="hero__subheading">
            Describe your current process and get a full AS-IS breakdown, bottleneck analysis, and TO-BE improvement plan instantly
          </p>

          <form onSubmit={handleAnalyse}>
            <div className="hero__input-area">
              {/* LEFT: Textarea */}
              <div className="input-panel">
                <label className="input-panel__label" htmlFor="process-desc">
                  <span className="input-panel__label-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </span>
                  Describe your current process
                </label>
                <textarea
                  id="process-desc"
                  className="input-panel__textarea"
                  placeholder="Paste or write your current process description here..."
                  maxLength={maxChar}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isLoading}
                />
                <div className="input-panel__footer">
                  <span className={`input-panel__char-count ${inputText.length > maxChar - 100 ? 'warning' : ''}`}>
                    {inputText.length} / {maxChar} characters
                  </span>
                </div>
              </div>

              {/* RIGHT: Process Domain Selector */}
              <div className="domain-panel">
                <span className="domain-panel__label">Select Process Domain</span>
                <div className="domain-panel__grid">
                  {DOMAINS.map((domain) => (
                    <button
                      key={domain.id}
                      type="button"
                      className={`domain-card ${selectedDomain === domain.id ? 'active' : ''}`}
                      onClick={() => setSelectedDomain(domain.id)}
                      disabled={isLoading}
                    >
                      <span className="domain-card__emoji">{domain.emoji}</span>
                      <span className="domain-card__name">{domain.name}</span>
                      <div className="domain-card__check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button & Sample Link */}
            <div className="hero__cta">
              <button
                type="submit"
                className="btn-analyse"
                disabled={isLoading || !inputText.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Running Intelligence Models...
                  </>
                ) : (
                  <>
                    Analyse Process
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
              
              <button
                type="button"
                className="btn-sample"
                onClick={handleTrySample}
                disabled={isLoading}
              >
                Try a Sample Process
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* RESULTS SECTION */}
      {analysisOutput && (
        <section id="results-section" className="results-section">
          <div className="results__inner">
            <div className="results__header">
              <div className="results__title-group">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  <span className="hero__badge" style={{ margin: 0, padding: '6px 12px', fontSize: '0.72rem', fontWeight: 600 }}>
                    {analysisOutput.domain || 'Business Process'}
                  </span>
                  <span className="hero__badge" style={{ margin: 0, padding: '6px 12px', fontSize: '0.72rem', fontWeight: 600, background: 'var(--color-bg-warm)', color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>
                    Powered by Claude AI
                  </span>
                </div>
                <h2 className="results__title">{analysisOutput.processName || 'Process Analysis Report'}</h2>
              </div>
              <button className="btn-export" onClick={handleExport}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Report
              </button>
            </div>


            {/* Tab Switches */}
            <div className="results__tabs">
              <button
                className={`tab-btn ${activeTab === 'asis' ? 'active' : ''}`}
                onClick={() => setActiveTab('asis')}
              >
                <div className="tab-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </div>
                AS-IS Analysis
              </button>
              <button
                className={`tab-btn ${activeTab === 'bottlenecks' ? 'active' : ''}`}
                onClick={() => setActiveTab('bottlenecks')}
              >
                <div className="tab-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                Bottlenecks
              </button>
              <button
                className={`tab-btn ${activeTab === 'tobe' ? 'active' : ''}`}
                onClick={() => setActiveTab('tobe')}
              >
                <div className="tab-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                TO-BE Process
              </button>
              <button
                className={`tab-btn ${activeTab === 'implementation' ? 'active' : ''}`}
                onClick={() => setActiveTab('implementation')}
              >
                <div className="tab-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                Implementation Plan
              </button>
            </div>

            {/* TAB CONTENT PANELS */}
            <div className="tab-content">
              {/* AS-IS TAB */}
              {activeTab === 'asis' && (
                <div>
                  <div className="results-meta-grid">
                    {/* Left: Summary Panel */}
                    <div className="content-card">
                      <div className="content-card__section-label">Current State Diagnosis</div>
                      <h3 className="content-card__title">AS-IS Process Summary</h3>
                      <p className="content-card__body">{analysisOutput.summary || analysisOutput.asis?.summary}</p>
                    </div>

                    {/* Right: Pain Points List */}
                    {analysisOutput.asIs?.painPoints && (
                      <div className="meta-bullets-panel">
                        <div className="meta-bullets-title" style={{ color: '#b91c1c' }}>Detected Pain Points</div>
                        <ul className="bullet-list pain-points">
                          {analysisOutput.asIs.painPoints.map((pain, idx) => (
                            <li key={idx}>{pain}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Flow Steps list */}
                  <div className="content-card">
                    <div className="content-card__section-label">Operations Mapping</div>
                    <h3 className="content-card__title">Step-by-Step AS-IS Operational Flow</h3>
                    
                    <div style={{ marginTop: '20px' }}>
                      {(analysisOutput.asIs?.steps || []).map((step, idx) => (
                        <div className="process-step-card" key={idx}>
                          <div className="process-step-num">{step.stepNumber || idx + 1}</div>
                          <div className="process-step-main">
                            <div className="process-step-name">{step.stepName || 'Operation Step'}</div>
                            <div className="process-step-desc">{step.description}</div>
                          </div>
                          <div className="process-step-meta">
                            <span className="meta-chip">{step.responsible || 'N/A'}</span>
                            <span className="meta-chip meta-chip--accent">{step.timeEstimate || 'N/A'}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Performance metrics row */}
                    {analysisOutput.asIs && (
                      <div style={{ marginTop: '32px' }}>
                        <div className="content-card__title" style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Current Performance Diagnostics:</div>
                        <div className="metrics-row">
                          <div className="metric-card">
                            <span className="metric-card__value red">{analysisOutput.asIs.avgLeadTime || 'N/A'}</span>
                            <span className="metric-card__label">Avg. Lead Time (SLA)</span>
                          </div>
                          <div className="metric-card">
                            <span className="metric-card__value amber">{analysisOutput.asIs.totalSteps || (analysisOutput.asIs.steps || []).length} Steps</span>
                            <span className="metric-card__label">Flow Steps Quantity</span>
                          </div>
                          <div className="metric-card">
                            <span className="metric-card__value red">{analysisOutput.asIs.automationLevel || '0%'}</span>
                            <span className="metric-card__label">Process Automation Level</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* BOTTLENECKS TAB */}
              {activeTab === 'bottlenecks' && (
                <div>
                  {(analysisOutput.bottlenecks || []).map((bot, idx) => (
                    <div className="content-card" key={idx} style={{ marginBottom: '16px' }}>
                      <span className={`bottleneck-badge ${bot.severity || 'high'}`}>
                        {(bot.severity || 'high').toUpperCase()} IMPACT
                      </span>
                      <h3 className="content-card__title">{bot.title || 'Process Bottleneck'}</h3>
                      <p className="content-card__body" style={{ marginBottom: '16px' }}>
                        <strong>Description:</strong> {bot.description}
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--color-border-light)', paddingTop: '16px' }}>
                        <div>
                          <span className="form-label" style={{ fontSize: '0.72rem', color: '#b91c1c' }}>Impact Statement</span>
                          <p className="content-card__body" style={{ fontSize: '0.85rem', marginTop: '4px' }}>{bot.impact}</p>
                        </div>
                        <div>
                          <span className="form-label" style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>Root Cause</span>
                          <p className="content-card__body" style={{ fontSize: '0.85rem', marginTop: '4px' }}>{bot.rootCause}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TO-BE TAB */}
              {activeTab === 'tobe' && (
                <div>
                  <div className="results-meta-grid">
                    {/* Left: Summary Panel */}
                    <div className="content-card">
                      <div className="content-card__section-label">Future State Optimization</div>
                      <h3 className="content-card__title">Streamlined TO-BE Summary</h3>
                      <p className="content-card__body">
                        The recommended TO-BE process eliminates sequential blockages, introduces automated data sync, and creates transparent feedback integrations.
                      </p>
                    </div>

                    {/* Right: Key Improvements */}
                    {analysisOutput.toBe?.keyImprovements && (
                      <div className="meta-bullets-panel">
                        <div className="meta-bullets-title" style={{ color: 'var(--color-accent)' }}>Key Benefits</div>
                        <ul className="bullet-list">
                          {analysisOutput.toBe.keyImprovements.map((imp, idx) => (
                            <li key={idx}>{imp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Flow Steps list */}
                  <div className="content-card">
                    <div className="content-card__section-label">Future State Design</div>
                    <h3 className="content-card__title">Optimized Future Operational Flow</h3>
                    
                    <div style={{ marginTop: '20px' }}>
                      {(analysisOutput.toBe?.steps || []).map((step, idx) => (
                        <div className="process-step-card" key={idx} style={{ borderLeft: '3px solid var(--color-accent)' }}>
                          <div className="process-step-num" style={{ background: 'var(--color-accent-light)', borderColor: 'rgba(22, 163, 74, 0.3)', color: 'var(--color-accent-dark)' }}>
                            {step.stepNumber || idx + 1}
                          </div>
                          <div className="process-step-main">
                            <div className="process-step-name" style={{ color: 'var(--color-accent-dark)' }}>{step.stepName || 'Optimized Step'}</div>
                            <div className="process-step-desc">{step.description}</div>
                            {step.improvement && (
                              <div className="process-step-improvement">
                                <strong>Gain:</strong> {step.improvement}
                              </div>
                            )}
                          </div>
                          <div className="process-step-meta">
                            <span className="meta-chip">{step.responsible || 'N/A'}</span>
                            <span className="meta-chip meta-chip--accent">{step.timeEstimate || 'N/A'}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Performance metrics row */}
                    {analysisOutput.toBe && (
                      <div style={{ marginTop: '32px' }}>
                        <div className="content-card__title" style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Projected Target Gains:</div>
                        <div className="metrics-row">
                          <div className="metric-card">
                            <span className="metric-card__value green">{analysisOutput.toBe.expectedLeadTime || 'N/A'}</span>
                            <span className="metric-card__label">Projected Lead Time</span>
                          </div>
                          <div className="metric-card">
                            <span className="metric-card__value green">{(analysisOutput.toBe.steps || []).length} Steps</span>
                            <span className="metric-card__label">Optimized Flow Steps</span>
                          </div>
                          <div className="metric-card">
                            <span className="metric-card__value green">{analysisOutput.toBe.expectedAutomation || '80%'}</span>
                            <span className="metric-card__label">Target Automation Level</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* IMPLEMENTATION PLAN TAB */}
              {activeTab === 'implementation' && (
                <div>
                  {/* General Summary Metadata */}
                  <div className="metrics-row">
                    <div className="metric-card">
                      <span className="metric-card__value" style={{ color: 'var(--color-text-primary)' }}>
                        {analysisOutput.implementationPlan?.totalDuration || '4 Weeks'}
                      </span>
                      <span className="metric-card__label">Deployment Timeline</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-card__value green">
                        {analysisOutput.implementationPlan?.estimatedROI || '350%'}
                      </span>
                      <span className="metric-card__label">Estimated ROI Value</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-card__value amber">
                        {(analysisOutput.implementationPlan?.quickWins || []).length} Items
                      </span>
                      <span className="metric-card__label">Identified Quick Wins</span>
                    </div>
                  </div>

                  <div className="results-meta-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
                    {/* Timeline representation of Phases */}
                    <div className="content-card">
                      <div className="content-card__section-label">Staged Roadmap</div>
                      <h3 className="content-card__title" style={{ marginBottom: '24px' }}>Phased Deployment Timeline</h3>
                      
                      <div className="timeline">
                        {(analysisOutput.implementationPlan?.phases || []).map((phase, idx) => (
                          <div className="timeline-item" key={idx}>
                            <div className="timeline-dot"></div>
                            <div className="timeline-card">
                              <div className="timeline-header">
                                <div className="timeline-title">
                                  Phase {phase.phaseNumber || idx + 1}: {phase.phaseName}
                                </div>
                                <span className="timeline-duration">{phase.duration}</span>
                              </div>
                              
                              <div className="timeline-sub">
                                <span className="timeline-sub-title">Core Activities</span>
                                <div className="timeline-sub-list">
                                  {(phase.activities || []).map((act, aIdx) => (
                                    <span className="timeline-badge" key={aIdx}>{act}</span>
                                  ))}
                                </div>
                              </div>

                              <div className="timeline-sub" style={{ marginTop: '10px' }}>
                                <span className="timeline-sub-title">Expected Deliverables</span>
                                <div className="timeline-sub-list">
                                  {(phase.deliverables || []).map((del, dIdx) => (
                                    <span className="timeline-badge timeline-badge--deliverable" key={dIdx}>{del}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Wins panel */}
                    {analysisOutput.implementationPlan?.quickWins && (
                      <div className="meta-bullets-panel" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
                        <div className="meta-bullets-title" style={{ color: '#d97706' }}>Immediate Quick Wins</div>
                        <ul className="bullet-list" style={{ gap: '12px' }}>
                          {analysisOutput.implementationPlan.quickWins.map((win, idx) => (
                            <li key={idx} style={{ color: '#92400e', fontSize: '0.85rem' }}>{win}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* API KEY CONFIGURATION MODAL */}
      {isKeyModalOpen && (
        <div className="modal-overlay" onClick={() => setIsKeyModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Configure Anthropic Key</h3>
              <button className="modal-close" onClick={() => setIsKeyModalOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSaveKey}>
              <div className="modal-body">
                <p className="modal-desc">
                  Provide your <strong>Anthropic Claude API Key</strong> to activate direct live analyses.
                  If left blank, the system automatically falls back to <strong>Mock Mode</strong> to render rich, domain-customized local mock data.
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="api-key-input">Anthropic API Key</label>
                  <div className="form-input-wrapper">
                    <input
                      id="api-key-input"
                      type={isKeyVisible ? 'text' : 'password'}
                      className="form-input"
                      placeholder="sk-ant-..."
                      value={tempKeyInput}
                      onChange={(e) => setTempKeyInput(e.target.value)}
                    />
                    <button
                      type="button"
                      className="form-input-toggle"
                      onClick={() => setIsKeyVisible(!isKeyVisible)}
                    >
                      {isKeyVisible ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <span className="form-help">
                    Your key is stored only locally inside your browser's private secure localStorage workspace.
                  </span>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleClearKey}>
                  Clear Key
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__inner">
          <a href="#" className="footer__logo">
            <div className="footer__logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="footer__logo-text">Process<span>IQ</span></span>
          </a>
          
          <div className="footer__credits">
            <span className="footer__author">Built by Kivaane Anton Uthayakumar</span>
            <span className="footer__project">Business Process Analysis Portfolio Project</span>
          </div>
        </div>
      </footer>
    </>
  );
}
