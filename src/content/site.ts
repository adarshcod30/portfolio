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
  years: "2023 – 2027",
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
    org: "Deloitte India, Digital Excellence Centre",
    title: "Full Stack Engineer, Agentic AI (Intern)",
    location: "Gurugram, India",
    dates: "Jun 2026 – Aug 2026",
    bullets: [
      "Took LangGraph agents from local scripts to network-reachable production services holding long-term memory in Postgres and surviving restarts.",
      "Owned the migration plan for a production agent driving a live enterprise SAP workflow with human-in-the-loop approval, resolving thirteen conflicts without breaking existing frontend contracts.",
      "Defined the parity checklist the migration was signed off against, and validated both the old and the new execution path against it before either was replaced.",
      "Ran a build-versus-adopt evaluation of four agent evaluation frameworks, DeepEval, Ragas, Langfuse and Arize Phoenix, and recommended the option the team adopted.",
      "Root-caused a silent startup failure where an async Postgres driver deadlocked against Windows network I/O scheduling, unblocking the whole team.",
    ],
  },
];

// Every result here is verified. Anything still unconfirmed is kept out on purpose.
export const COMPETITIONS = [
  {
    name: "HackerRank Orchestrate",
    kind: "24-hour agentic AI challenges",
    when: "Jun – Sep 2026",
    result: "#12, then #290 with a bronze medal, from #427",
    detail:
      "Three rounds, and the climb is the point: #427 and top 25% in June, #290 with a bronze medal and top 15% in August, #12 in September. Every submission is public.",
    links: [
      { label: "Buy or Wait, #12", url: "https://github.com/adarshcod30/buy-or-wait-financial-agent" },
      { label: "Message Notification Router, #290", url: "https://github.com/adarshcod30/Message-Notification-Router" },
      { label: "Multi-Modal Evidence Review", url: "https://github.com/adarshcod30/Multi-Modal-Evidence-Review" },
      { label: "HackerRank profile", url: "https://www.hackerrank.com/profile/23ucs509" },
    ],
    highlight: true,
  },
  {
    name: "KSP Datathon 2026",
    kind: "Karnataka State Police",
    when: "2026",
    result: "Reached Level 2",
    detail:
      "Fifty days of work on Kadi, built end to end and deployed on Zoho Catalyst for the Karnataka State Crime Records Bureau. Not a finalist, and still the project I rate above everything else I have built.",
    links: [{ label: "Kadi", url: "https://github.com/adarshcod30/Kadi" }],
    highlight: true,
  },
  {
    name: "AWS AI for Bharat Hackathon",
    kind: "Amazon Web Services",
    when: "2026",
    result: "Reached the final rounds",
    detail:
      "Took VaidyaMitra through to the closing stages: a privacy-first clinical assistant where every identifier is masked before it reaches the model, running on Amazon Bedrock in ten Indian languages.",
    links: [{ label: "VaidyaMitra", url: "https://github.com/VaidyaMitra/VaidyaMitra" }],
    highlight: false,
  },
  {
    name: "Hacksplosion 2026",
    kind: "Deloitte India",
    when: "2026",
    result: "Cleared Levels 1, 2 and 3",
    detail: "An AI-driven resume-to-job matching pipeline, built during the same period as the Deloitte internship.",
    links: [],
    highlight: false,
  },
  {
    name: "SWITCH Energy-X (India)",
    kind: "Hidden Energy Systems Challenge, 24 hours",
    when: "Sep 2026",
    result: "11th of 93 on the private leaderboard",
    detail:
      "Recovering a hidden physical law from 500,000 unlabeled sensor rows that were 26% missing. A small competition, but an unusually clean problem.",
    links: [],
    highlight: false,
  },
  {
    name: "micro1 Frontier Engineering Challenge",
    kind: "First micro1 hackathon",
    when: "2026",
    result: "Participant",
    detail:
      "Built a research-artifact verifier that checks whether a paper's repository contains what its README promises, measured across 742 repositories: 0% to 100% detection of fabricated file claims.",
    links: [{ label: "artifact-repro-triage", url: "https://github.com/adarshcod30/artifact-repro-triage" }],
    highlight: false,
  },
  {
    name: "Smart India Hackathon 2026",
    kind: "National",
    when: "Ongoing",
    result: "In progress",
    detail: "Currently running. This entry updates when it concludes.",
    links: [],
    highlight: false,
  },
];

export const MUN = [
  { event: "LNMIIT MUN 2024", role: "Delegate", award: "Special Mention" },
  { event: "BITS MUN 2024", role: "Delegate", award: "Honourable Mention" },
  { event: "Thapar MUN 2024", role: "Delegate", award: "Honourable Mention" },
  { event: "LNMIIT MUN 2025", role: "Core Organising Committee", award: "" },
  { event: "LNMIIT MUN 2026", role: "Secretariat and Organiser", award: "10th edition, January 2026" },
];

export const LEADERSHIP = [
  {
    org: "Debate Society, LNMIIT Jaipur",
    dates: "Sep 2023 – May 2026",
    role: "Member, then Senior Member, then Coordinator",
    detail:
      "Led a 150+ member society through debates, discussions and inter-college competitions, and progressed from Member to Coordinator over three years. The society runs the Model United Nations, so the MUN secretariat work sits under this.",
    roles: [
      { title: "Coordinator", dates: "Apr 2025 – May 2026" },
      { title: "Senior Member", dates: "Aug 2024 – Apr 2025" },
      { title: "Member", dates: "Sep 2023 – Aug 2024" },
    ],
  },
  {
    org: "Imagination, The Photography Club, LNMIIT",
    dates: "Oct 2023 – Sep 2025",
    role: "Photographer",
    detail: "Two years shooting campus events and club work, which is also where the photographs in the gallery come from.",
    roles: [],
  },
  {
    org: "Alumni Association, LNMIIT",
    dates: "Feb 2024 – Apr 2025",
    role: "Member",
    detail: "Helped keep the link between current students and graduates active.",
    roles: [],
  },
];

export const INTERESTS = [
  { title: "Tech", detail: "Reading, building and breaking things. 32 public repositories, most deployed and free to use, with the failures published beside the results." },
  { title: "Photography", detail: "Two years with Imagination, the campus photography club. Mostly events and people." },
  { title: "Debating", detail: "Three years in the Debate Society, from delegate to Coordinator, and five Model United Nations conferences on both sides of the table." },
  { title: "Geopolitics", detail: "The reading behind the debating, and the reason most of what I build points at a public problem." },
  { title: "Kaggle", detail: "Competing on real datasets. Currently in Kaggriculture." },
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
  { href: "/gallery", label: "Gallery" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];
