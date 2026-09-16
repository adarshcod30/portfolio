// Hand-maintained content. Project facts live in projects.generated.ts, which is
// built from the same profile.json the resumes use, so the two cannot disagree.

export const IDENTITY = {
  name: "Adarsh Dwivedi",
  role: "AI & Product Engineer",
  tagline: "I build AI systems for problems that already have victims, and I build them so a sceptical reader can check every claim.",
  location: "Jaipur, India",
  timezone: "Asia/Kolkata",
  school: "The LNM Institute of Information Technology, Jaipur",
  degree: "B.Tech, Computer Science and Engineering",
  years: "2023 to 2027",
  cgpa: "7.11 / 10",
  available: "Open to 2027 new-grad roles",
};

export const STATS = [
  { value: "32", label: "shipped products" },
  { value: "10+", label: "hackathons & datathons" },
  { value: "3", label: "packages on PyPI" },
  { value: "#12", label: "best Orchestrate rank" },
];

export const EXPERIENCE = [
  {
    org: "Deloitte India",
    team: "Digital Excellence Centre, Enabling Areas",
    title: "Full Stack Engineer, Agentic AI (Intern)",
    location: "Gurugram, on-site",
    dates: "Jun 2026 to Aug 2026",
    length: "3 months",
    route: "Earned through Hacksplosion 2026, Deloitte India's national hackathon",
    project: "SAP Agentic, a production agent system",
    photo: { src: "/photos/deloitte-office.jpg", alt: "A Deloitte meeting room in Gurugram, long tables facing a wall screen.", caption: "Deloitte, Gurugram" },
    bullets: [
      "Took LangGraph agents from local scripts to network-reachable production services holding long-term memory in Postgres and surviving restarts.",
      "Owned the migration plan for a production agent driving a live enterprise SAP workflow with human-in-the-loop approval, resolving thirteen conflicts without breaking existing frontend contracts.",
      "Defined the parity checklist the migration was signed off against, and validated both the old and the new execution path against it before either was replaced.",
      "Ran a build-versus-adopt evaluation of four agent evaluation frameworks, DeepEval, Ragas, Langfuse and Arize Phoenix, and recommended the option the team adopted.",
      "Root-caused a silent startup failure where an async Postgres driver deadlocked against Windows network I/O scheduling, unblocking the whole team.",
      "Built FastAPI and Pydantic backend services with schema-validated request and response contracts, powering LLM tool-calling pipelines on the SAP-integrated platform.",
    ],
    stack: ["LangGraph", "LangChain", "FastAPI", "Pydantic", "PostgreSQL", "Python", "SAP workflows", "Human-in-the-loop", "DeepEval", "Langfuse"],
    takeaway: "I came in knowing how to build agents. I left knowing how to make them survivable.",
  },
];

export const EDUCATION = [
  {
    level: "Undergraduate",
    school: "The LNM Institute of Information Technology",
    place: "Jaipur, Rajasthan",
    course: "B.Tech, Computer Science and Engineering",
    dates: "Aug 2023 to Jun 2027",
    score: "7.11",
    scoreLabel: "CGPA out of 10",
    detail:
      "Final year. The sixth-semester B.Tech project became AGENTIQ, an agentic platform for autonomous API testing, security validation and deployment assistance. Outside the classroom, most of my time went to the Debate Society.",
    tags: ["Debate Society", "Model United Nations", "Photography", "Cinematography", "Badminton", "Alumni Relations"],
  },
  {
    level: "Class XII",
    school: "Don Bosco High School",
    place: "",
    course: "Intermediate, Science with Mathematics",
    dates: "Apr 2021 to Mar 2023",
    score: "86.4%",
    scoreLabel: "aggregate",
    detail: "Physics, Chemistry and Mathematics.",
    tags: [],
  },
  {
    level: "Class X",
    school: "H.P. Children's Academy",
    place: "Gorakhpur, Uttar Pradesh",
    course: "ICSE, Council for the Indian School Certificate Examinations",
    dates: "Examination year 2021",
    score: "95.6%",
    scoreLabel: "Grade 1 in four of six subjects",
    detail: "The top grade in Mathematics, Computer Applications, Hindi, and History, Civics and Geography, with grade 2 in English and Science.",
    tags: [],
  },
];

// Every result here is checked against the email that announced it. Where the
// outcome was a rejection, it says so.
export type Tier = "top" | "advanced" | "entered";

export const TIERS: { id: Tier; title: string; blurb: string }[] = [
  { id: "top", title: "Ranked, placed, hired", blurb: "" },
  { id: "advanced", title: "Cleared a round", blurb: "Shortlisted past the first cut, and stopped at the next one." },
  { id: "entered", title: "Built and submitted", blurb: "A working entry went in. Most did not advance, and the ones that did not are listed as such." },
];

export const COMPETITIONS: {
  name: string;
  kind: string;
  when: string;
  result: string;
  detail: string;
  project?: string;
  links: { label: string; url: string }[];
  highlight: boolean;
  tier: Tier;
}[] = [
  {
    name: "HackerRank Orchestrate",
    kind: "24-hour agentic AI challenges",
    when: "Jun to Sep 2026",
    result: "#12 and a silver medal, up from #427",
    detail:
      "Three rounds, and the climb is the point: #427 and top 25% in June, then #290 with a bronze medal and top 15% in August, then #12 of 3,062 with a silver medal and top 1% in September. Every submission is public.",
    links: [
      { label: "Buy or Wait, #12", url: "https://github.com/adarshcod30/buy-or-wait-financial-agent" },
      { label: "Message Notification Router, #290", url: "https://github.com/adarshcod30/Message-Notification-Router" },
      { label: "Multi-Modal Evidence Review", url: "https://github.com/adarshcod30/Multi-Modal-Evidence-Review" },
      { label: "HackerRank profile", url: "https://www.hackerrank.com/profile/23ucs509" },
    ],
    highlight: true,
    tier: "top",
  },
  {
    name: "Hacksplosion 2026",
    kind: "Deloitte India",
    when: "2026",
    result: "Cleared Levels 1 to 3, won the internship",
    detail:
      "Deloitte's national hackathon, entered as a team of three. Clearing all three levels converted into the summer internship at Deloitte's Digital Excellence Centre in Gurugram.",
    links: [],
    highlight: true,
    tier: "top",
  },
  {
    name: "KSP Datathon 2026",
    kind: "Karnataka State Police",
    when: "Aug to Sep 2026",
    result: "Finalist, reached Level 2",
    project: "Kadi",
    detail:
      "Fifty days of work on Kadi, built end to end and deployed on Zoho Catalyst for the Karnataka State Crime Records Bureau. Shortlisted for the refined prototype phase. It is the project I rate above everything else I have built.",
    links: [{ label: "Kadi", url: "https://github.com/adarshcod30/Kadi" }],
    highlight: true,
    tier: "top",
  },
  {
    name: "AWS AI for Bharat Hackathon",
    kind: "Amazon Web Services, run by Hack2skill",
    when: "Jan to Mar 2026",
    result: "Finalist",
    project: "VaidyaMitra",
    detail:
      "Led team VaidyaMitra from idea to prototype: a privacy-first clinical assistant where every identifier is masked before it reaches the model, running on Amazon Bedrock in ten Indian languages.",
    links: [{ label: "VaidyaMitra", url: "https://github.com/VaidyaMitra/VaidyaMitra" }],
    highlight: true,
    tier: "top",
  },
  {
    name: "SWITCH Energy-X (India)",
    kind: "Hidden Energy Systems Challenge, 24 hours",
    when: "Sep 2026",
    result: "11th of 93",
    detail:
      "Recovering a hidden physical law from 500,000 unlabeled sensor rows that were 26% missing. Ranked on the private leaderboard. A small competition, but an unusually clean problem.",
    links: [],
    highlight: false,
    tier: "top",
  },
  {
    name: "HackerEarth AI for Bharat",
    kind: "HackerEarth",
    when: "Apr to May 2026",
    result: "Shortlisted for the prototype phase",
    detail: "Cleared the idea round into prototype development. Not selected for the round after that.",
    links: [],
    highlight: false,
    tier: "advanced",
  },
  {
    name: "ET AI Hackathon 2.0",
    kind: "The Economic Times",
    when: "Feb 2026",
    result: "Shortlisted for Phase 2",
    detail: "Cleared the first screening into the build phase.",
    links: [],
    highlight: false,
    tier: "advanced",
  },
  {
    name: "CII Post-Harvest Hackathon",
    kind: "Confederation of Indian Industry",
    when: "2026",
    result: "Cleared Round 1",
    detail: "A post-harvest loss problem statement, cleared into the second round.",
    links: [],
    highlight: false,
    tier: "advanced",
  },
  {
    name: "Google Solution Challenge 2026",
    kind: "Build with AI: Code for Communities",
    when: "2026",
    result: "Prototype submitted, certificate of completion",
    project: "Vayu",
    detail:
      "Vayu, from a citizen's photo to a verified enforcement order: a federated air-quality platform on Google's AI stack, entered on the clean air and climate resilience track.",
    links: [{ label: "Vayu", url: "https://github.com/adarshcod30/Vayu" }],
    highlight: false,
    tier: "entered",
  },
  {
    name: "Redrob AI Hackathon",
    kind: "Data & AI Challenge",
    when: "Jun to Jul 2026",
    result: "Submitted, results pending",
    project: "Talent Intelligence Engine",
    detail:
      "As team EnSoc, a team of two: rank 100,000 candidates for senior AI engineering roles on a local CPU. It ranks the full pool in under 18 seconds with zero network calls, removes every honeypot profile before scoring, and writes a factual justification and trust score per candidate. A second entry, SkillProof, went into the ideathon track.",
    links: [{ label: "Talent Intelligence Engine", url: "https://github.com/adarshcod30/Talent-Intelligence-Candidate-Discovery-Platform" }],
    highlight: false,
    tier: "entered",
  },
  {
    name: "IDBI Innovate 2026",
    kind: "IDBI Bank",
    when: "Jul 2026",
    result: "Prototype submitted",
    project: "CreditSetu",
    detail:
      "CreditSetu, explainable credit scoring for thin-file borrowers, submitted with a live deployment, a proof-of-concept deck and the full repository, for a ₹15 lakh prize pool.",
    links: [
      { label: "CreditSetu", url: "https://github.com/adarshcod30/CreditSetu" },
      { label: "Live", url: "https://credit-setu-iota.vercel.app/" },
    ],
    highlight: false,
    tier: "entered",
  },
  {
    name: "Smart India Hackathon 2026",
    kind: "Ministry of Education, national",
    when: "2026",
    result: "Idea submitted",
    project: "AyurPramaan",
    detail: "AyurPramaan, against problem statement SIH26045.",
    links: [],
    highlight: false,
    tier: "entered",
  },
  {
    name: "micro1 Frontier Engineering Challenge",
    kind: "micro1's first hackathon",
    when: "2026",
    result: "Submitted, certificate",
    detail:
      "Built a research-artifact verifier that checks whether a paper's repository contains what its README promises, measured across 742 repositories: 0% to 100% detection of fabricated file claims.",
    links: [{ label: "artifact-repro-triage", url: "https://github.com/adarshcod30/artifact-repro-triage" }],
    highlight: false,
    tier: "entered",
  },
  {
    name: "Bharatiya Antariksh Hackathon 2026",
    kind: "ISRO",
    when: "2026",
    result: "Submitted, participation certificate",
    detail: "An idea submission against ISRO's problem statement 13.",
    links: [],
    highlight: false,
    tier: "entered",
  },
  {
    name: "NVIDIA India Agentic AI Open Hackathon",
    kind: "NVIDIA",
    when: "2026",
    result: "Applied, not selected",
    project: "SwasthyaSetu",
    detail: "SwasthyaSetu, a five-agent rural healthcare access system on NVIDIA NeMo, pitched on the agentic workflows track as a team of two.",
    links: [],
    highlight: false,
    tier: "entered",
  },
  {
    name: "NABARD Hackathon @ GFF 2026",
    kind: "Global Fintech Fest",
    when: "2026",
    result: "Submitted, not selected",
    project: "Pravaah",
    detail: "Pravaah, a rural finance entry for NABARD's track.",
    links: [],
    highlight: false,
    tier: "entered",
  },
  {
    name: "SEBI Securities Market TechSprint @ GFF 2026",
    kind: "Global Fintech Fest",
    when: "2026",
    result: "Submitted, not selected",
    detail: "",
    links: [],
    highlight: false,
    tier: "entered",
  },
  {
    name: "SBI Hackathon @ GFF 2026",
    kind: "Global Fintech Fest",
    when: "2026",
    result: "Submitted, not selected",
    detail: "",
    links: [],
    highlight: false,
    tier: "entered",
  },
  {
    name: "Flipkart Gridlock Hackathon 2.0",
    kind: "Flipkart",
    when: "2026",
    result: "Submitted",
    detail: "Entered and submitted. No result has been announced to me.",
    links: [],
    highlight: false,
    tier: "entered",
  },
  {
    name: "Razorpay AI Buildathon",
    kind: "Razorpay",
    when: "2026",
    result: "Submitted, did not advance",
    detail: "",
    links: [],
    highlight: false,
    tier: "entered",
  },
  {
    name: "Sui Overflow 2026",
    kind: "Sui Foundation, global",
    when: "2026",
    result: "Submitted",
    detail: "A global Web3 hackathon, the one furthest from my usual work. No shortlist announcement has reached me.",
    links: [],
    highlight: false,
    tier: "entered",
  },
  {
    name: "HackVega 2.0",
    kind: "National, 47,000+ registered engineers",
    when: "2026",
    result: "Participation certificate",
    detail: "",
    links: [],
    highlight: false,
    tier: "entered",
  },
  {
    name: "FinArva AI Hackathon 2025",
    kind: "GroMo, powered by AWS",
    when: "May 2025",
    result: "Phase 1 submitted, did not advance",
    detail: "Entered as team Algo Nirvana.",
    links: [],
    highlight: false,
    tier: "entered",
  },
];

/** The Debate Society, role by role. Dates come from the society's own announcement mails. */
export const DEBSOC = {
  org: "The Debate Society, LNMIIT",
  dates: "Sep 2023 to May 2026",
  summary:
    "The society runs debates, discussions and the LNMIIT Model United Nations. I joined in my first month at college, sat on the organising committee of one MUN, and then led the society as one of its three Coordinators for the year it ran the largest MUN LNMIIT has hosted.",
  roles: [
    {
      title: "Coordinator",
      dates: "Sep 2025 to May 2026",
      detail: "One of three Coordinators leading the society. Ran the Intra MUN, sent a delegation to AIYS MUN, and organised LNMIIT MUN'26, before handing over to the next Coordinators in May 2026.",
    },
    {
      title: "Senior Member",
      dates: "Aug 2024 to Aug 2025",
      detail: "Core organising committee for LNMIIT MUN'25, and the named contact on its outreach to other colleges.",
    },
    {
      title: "Member",
      dates: "Sep 2023 to Aug 2024",
      detail: "Debating, and my first conferences as a delegate: a Special Mention at LNMIIT MUN'24 and Honourable Mentions at BITS MUN'24 and Thapar MUN'24.",
    },
  ],
};

/** The term as Coordinator, in the order it happened. */
export const TERM = [
  { when: "Sep 2025", what: "Named one of three Coordinators of the Debate Society." },
  { when: "Nov 2025", what: "Put LNMIIT MUN'26 live for registrations on Unstop." },
  { when: "Dec 2025", what: "Met the faculty mentor, then asked faculty for institutional support for MUN'26." },
  { when: "10 Jan 2026", what: "Coordinated the Intra MUN, and sat as Deputy Moderator of its AIPPM." },
  { when: "10 to 11 Jan 2026", what: "Society delegation at AIYS MUN: one Special Mention and two Honourable Mentions." },
  { when: "24 to 25 Jan 2026", what: "LNMIIT MUN'26, about 170 delegates, and LNMIIT won Best Delegation." },
  { when: "Feb 2026", what: "Filed the event reports to HSS, L-CSI, L-CWPH and Plinth." },
  { when: "May 2026", what: "Handed the society to the next Coordinators." },
];

export const MUN_ORGANISED = [
  {
    id: "mun26",
    name: "LNMIIT MUN'26",
    edition: "10th edition",
    dates: "24 to 25 January 2026",
    role: "Coordinator, organising society",
    context: "Under Plinth 2026, co-organised with the Department of HSS, the LNMIIT Centre for Wellness and Positive Health and the LNMIIT Centre for Sustainability and Innovation.",
    figures: [
      { value: "~170", label: "delegates" },
      { value: "10+", label: "institutions" },
      { value: "5", label: "committees" },
      { value: "₹1L+", label: "prize money" },
    ],
    committees: ["UNGA", "UNHRC", "UNESCO", "AIPPM", "International Press"],
    outcome: "LNMIIT won Best Delegation, shared with Youth X Bharat, with 32 of its own delegates in the rooms.",
    detail:
      "The largest MUN LNMIIT has hosted. Delegates came from NIMS University, Youth X Bharat, Sophia Girls' College Ajmer, Manipal University Jaipur, GLA University, Banasthali Vidyapith, BITS and others. The work behind it was the unglamorous part: registrations, committee allotment, budget requisitions, hospitality, and the reports each partner body needed afterwards.",
  },
  {
    id: "mun25",
    name: "LNMIIT MUN'25",
    edition: "9th edition",
    dates: "25 to 26 January 2025",
    role: "Core Organising Committee",
    context: "Hosted at LNMIIT Jaipur. Delegates registered at ₹1,500 each, competing for ₹10,000 for Best Delegation and ₹6,000 for Best Delegate.",
    figures: [
      { value: "3", label: "committees" },
      { value: "₹60K", label: "prize pool" },
      { value: "₹10K", label: "best delegation" },
      { value: "2", label: "days" },
    ],
    committees: ["UNSC", "UNGA", "AIPPM"],
    agendas: [
      { committee: "UNSC", agenda: "The UN Convention on the Law of the Sea, with emphasis on the South China Sea dispute." },
      { committee: "UNGA", agenda: "Ethnic rights and sovereignty in protracted territorial conflicts, with emphasis on Palestine and Nagorno-Karabakh after 2023." },
      { committee: "AIPPM", agenda: "Reviewing the delimitation criteria under the Delimitation Act, 2002." },
    ],
    outcome: "",
    detail:
      "My first time on the organising side. The part I owned was outreach: the invitation that went to other colleges carried my name as the contact, so delegate questions came to me.",
  },
];

export const MUN = [
  { event: "LNMIIT MUN'26", role: "Coordinator, organising society", award: "Best Delegation to LNMIIT", year: "2026" },
  { event: "AIYS MUN 2026", role: "Society delegation, as Coordinator", award: "1 Special, 2 Honourable Mentions", year: "2026" },
  { event: "LNMIIT Intra MUN 2026", role: "Coordinator, Deputy Moderator AIPPM", award: "Organizer", year: "2026" },
  { event: "LNMIIT MUN'25", role: "Core Organising Committee", award: "Organizer", year: "2025" },
  { event: "Thapar MUN'24", role: "Delegate", award: "Honourable Mention", year: "2024" },
  { event: "BITS MUN'24", role: "Delegate", award: "Honourable Mention", year: "2024" },
  { event: "LNMIIT MUN'24", role: "Delegate", award: "Special Mention", year: "2024" },
];

export const LEADERSHIP = [
  {
    org: "Imagination, The Photography Club, LNMIIT",
    dates: "Oct 2023 to Sep 2025",
    role: "Photographer",
    detail: "Two years shooting campus events and club work, mostly events and people.",
  },
  {
    org: "Alumni Association, LNMIIT",
    dates: "Feb 2024 to Apr 2025",
    role: "Member",
    detail: "Helped keep the link between current students and graduates active.",
  },
];

export const INTERESTS = [
  { title: "Building things", figure: "32", unit: "public repositories", detail: "Reading, building and breaking things. Most are deployed and free to use, with the failures published beside the results, and three are packages on PyPI." },
  { title: "Debating", figure: "3", unit: "years in the Debate Society", detail: "From first-year member to Coordinator, and seven Model United Nations conferences on both sides of the table." },
  { title: "Geopolitics", figure: "5", unit: "committees run in one weekend", detail: "The reading behind the debating: the South China Sea, delimitation, territorial sovereignty. It is also why most of what I build points at a public problem." },
  { title: "Photography", figure: "2", unit: "years with Imagination", detail: "The campus photography club. Mostly events and people, and some cinematography on the side." },
  { title: "Kaggle", figure: "", unit: "", detail: "Competing on real data is the quickest honest feedback there is. Currently working through Kaggriculture." },
  { title: "Badminton", figure: "", unit: "", detail: "The one thing on this page that has nothing to do with a screen." },
];

// TODO(adarsh): handles marked "" are the ones I could not verify. Fill these in and rebuild.
export const CONTACT = [
  { id: "email-personal", label: "Personal email", value: "", href: "", primary: true },
  { id: "email-college", label: "College email", value: "23ucs509@lnmiit.ac.in", href: "mailto:23ucs509@lnmiit.ac.in", primary: true },
  { id: "phone", label: "Phone", value: "+91 93055 97756", href: "tel:+919305597756", primary: true },
  { id: "whatsapp", label: "WhatsApp", value: "+91 93055 97756", href: "https://wa.me/919305597756", primary: true },
  { id: "linkedin", label: "LinkedIn", value: "adarshdwivedi30", href: "https://www.linkedin.com/in/adarshdwivedi30/", primary: true },
  { id: "github", label: "GitHub", value: "adarshcod30", href: "https://github.com/adarshcod30", primary: true },
  { id: "instagram", label: "Instagram", value: "", href: "", primary: false },
  { id: "x", label: "X", value: "", href: "", primary: false },
  { id: "discord", label: "Discord", value: "", href: "", primary: false },
  { id: "reddit", label: "Reddit", value: "", href: "", primary: false },
  { id: "hackerrank", label: "HackerRank", value: "23ucs509", href: "https://www.hackerrank.com/profile/23ucs509", primary: false },
  { id: "hackerearth", label: "HackerEarth", value: "23ucs509", href: "https://www.hackerearth.com/@23ucs509/", primary: false },
  { id: "kaggle", label: "Kaggle", value: "adarshcod", href: "https://www.kaggle.com/adarshcod", primary: false },
  { id: "pypi", label: "PyPI", value: "adarshcod30", href: "https://pypi.org/user/adarshcod30/", primary: false },
  { id: "huggingface", label: "Hugging Face", value: "adarshcod30", href: "https://huggingface.co/adarshcod30", primary: false },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/competitions", label: "Competitions" },
  { href: "/leadership", label: "Leadership" },
  { href: "/contact", label: "Contact" },
];

/** Headings spell the count out, so it is read from the data, not retyped. */
export const COUNT_WORD = [
  "Zero", "One", "Two", "Three", "Four", "Five",
  "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
  "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty",
  "Twenty-one", "Twenty-two", "Twenty-three", "Twenty-four", "Twenty-five",
] as const;
