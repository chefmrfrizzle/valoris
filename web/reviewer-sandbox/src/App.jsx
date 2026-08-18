import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  CaretDown,
  Check,
  CheckCircle,
  Clock,
  Code,
  Copy,
  Database,
  DownloadSimple,
  FileText,
  Flask,
  IdentificationCard,
  Info,
  Lightbulb,
  ListChecks,
  LockKey,
  MagnifyingGlass,
  ShieldWarning,
  Target,
  Warning,
  X,
} from "@phosphor-icons/react";
import { createReviewPacket, formatReviewPacket, REVIEW_FIXTURE_VERSION } from "./reviewPacket.js";

const INITIAL_FEEDBACK = {
  recommendation: "Revise the packet",
  clear: "",
  concerns: "",
  blocked: "Cryptographic suite selection remains BLOCKED_UNVERIFIED.",
  conflictDisclosed: false,
};

const ROLES = [
  {
    id: "reviewer",
    label: "Reviewer",
    shortLabel: "Reviewer",
    icon: MagnifyingGlass,
    goal: "Assess whether the synthetic evidence is sufficient for this training exercise.",
    focus: "Compare supporting and challenging evidence before recording a bounded recommendation.",
    outcome: "Provide structured feedback without making a scientific-acceptance decision.",
    packet: ["ADR-0011", "ADR-0012", "ADR-0013", "ADR-0014"],
  },
  {
    id: "cryptography",
    label: "Cryptography",
    shortLabel: "Cryptography",
    icon: LockKey,
    goal: "Inspect the proposed evidence boundaries without selecting a cryptographic suite.",
    focus: "Look for downgrade paths, identifier confusion, and unsupported trust claims.",
    outcome: "Keep every suite choice BLOCKED_UNVERIFIED and record what review is still needed.",
    packet: ["ADR-0012"],
  },
  {
    id: "identity",
    label: "Identity & IT",
    shortLabel: "Identity & IT",
    icon: IdentificationCard,
    goal: "Inspect synthetic identity, delegation, revocation, and privacy boundaries.",
    focus: "Look for escalation, stale status, ambiguous authority, and excess data exposure.",
    outcome: "Record institutional integration risks without accepting identity policy.",
    packet: ["ADR-0013"],
  },
  {
    id: "materials",
    label: "Materials Science",
    shortLabel: "Materials Science",
    icon: Atom,
    goal: "Inspect a narrow synthetic symmetry-classification walkthrough.",
    focus: "Challenge conventions, tolerances, ambiguity, and the limits of the proposed exercise.",
    outcome: "Record methodology feedback without claiming scientific acceptance or independence.",
    packet: ["ADR-0010", "ADR-0014"],
  },
];

const STEPS = [
  { title: "Understand question", subtitle: "Plain-language summary", minutes: "2 min" },
  { title: "Inspect approach", subtitle: "Plans and methods", minutes: "2 min" },
  { title: "Inspect evidence", subtitle: "Walk through results", minutes: "3 min" },
  { title: "Consider limitations", subtitle: "Risks and constraints", minutes: "1 min" },
  { title: "Record feedback", subtitle: "Your structured input", minutes: "2 min" },
];

const ADRS = {
  "ADR-0010": {
    title: "Proposed narrow benchmark",
    status: "PROPOSED / SYNTHETIC TRAINING SUMMARY",
    question: "Is the fixture narrow, deterministic, and scientifically bounded enough for a later domain review?",
    boundary: "Does not accept the benchmark or make a scientific claim.",
  },
  "ADR-0011": {
    title: "Canonical JSON and version compatibility",
    status: "DRAFT / DEMO SUMMARY",
    question: "Are constraints explicit enough to prevent parser and cross-language ambiguity?",
    boundary: "No executable schema or canonicalizer is present in this sandbox.",
  },
  "ADR-0012": {
    title: "Identifiers and signature-suite agility",
    status: "BLOCKED_UNVERIFIED",
    question: "Are downgrade boundaries and algorithm identifiers reviewable without selecting a suite?",
    boundary: "All cryptographic choices remain BLOCKED_UNVERIFIED.",
  },
  "ADR-0013": {
    title: "Event identity, delegation, and revocation",
    status: "DRAFT / DEMO SUMMARY",
    question: "Are authority, revocation time, offline status, and privacy risks explicit?",
    boundary: "No identity or access policy is accepted by this training view.",
  },
  "ADR-0014": {
    title: "Reproduction independence profiles",
    status: "DRAFT / DEMO SUMMARY",
    question: "Does the language avoid overstating account, operator, environment, or institutional independence?",
    boundary: "No independence policy or assurance claim is accepted.",
  },
};

const SUPPORTING_EVIDENCE = [
  {
    title: "Simulated XRD-like peaks align with the illustrative indexing pattern.",
    source: "xrd_sim_01.csv",
    type: "Dataset",
    icon: Database,
  },
  {
    title: "Mock structure output returns the proposed discrete classification.",
    source: "structure_result_01.json",
    type: "Output",
    icon: FileText,
  },
];

const CHALLENGING_EVIDENCE = [
  {
    title: "An alternative stacking sequence also fits the simulated noise envelope.",
    source: "xrd_alt_model.csv",
    type: "Dataset",
    icon: Warning,
  },
  {
    title: "Thermal stability is not established inside the illustrative run window.",
    source: "stability_run_01.log",
    type: "Log",
    icon: Warning,
  },
];

const LIMITATIONS = [
  "All data, methods, and results are synthetic fixtures for reviewer training.",
  "No experimental measurements or physical samples are represented.",
  "Simulation settings are simplified and have not been scientifically validated.",
  "The walkthrough cannot establish researcher, operator, or institutional independence.",
  "Cryptographic suites, identifiers, signatures, and key lifecycle remain BLOCKED_UNVERIFIED.",
  "Nothing in this sandbox authorizes production use or a scientific-acceptance decision.",
];

function FixtureLabel({ kind = "DEMO" }) {
  return <span className="fixture-label">{kind}</span>;
}

function StatusChip({ children, tone = "neutral" }) {
  return <span className={`status-chip status-chip--${tone}`}>{children}</span>;
}

function SectionIntro({ step }) {
  const copy = [
    "Orient yourself to the synthetic question, the decision boundary, and what this walkthrough cannot establish.",
    "Inspect the declared synthetic inputs, simplified method, expected output, and deliberate challenge path.",
    "Compare supporting and challenging evidence in plain language. Every item is DEMO or SYNTHETIC.",
    "Review constraints and stop conditions before deciding whether the packet is ready for a real expert review.",
    "Record a bounded training recommendation. Your response stays in this browser unless you download it.",
  ];
  return <p className="section-intro">{copy[step]}</p>;
}

function QuestionStep() {
  return (
    <div className="step-body question-grid">
      <section className="question-card">
        <div className="card-kicker">QUESTION TO REVIEW <FixtureLabel kind="SYNTHETIC" /></div>
        <h3>Can a narrow symmetry-classification fixture produce an inspectable technical result?</h3>
        <p>
          This training exercise asks whether a declared runner can return an expected discrete classification and preserve a deliberately challenging alternative.
        </p>
      </section>
      <section className="boundary-card">
        <div className="mini-icon mini-icon--amber"><ShieldWarning size={18} weight="duotone" /></div>
        <div>
          <h3>Decision boundary <FixtureLabel /></h3>
          <p>Review the clarity and sufficiency of the packet. Do not approve science, security, cryptography, or independence policy.</p>
        </div>
      </section>
      <section className="review-map">
        <h3>What you will inspect <FixtureLabel /></h3>
        <div className="review-map__items">
          <div><span>01</span><strong>Question</strong><small>2 minutes · DEMO</small></div>
          <div><span>02</span><strong>Approach</strong><small>2 minutes · DEMO</small></div>
          <div><span>03</span><strong>Evidence</strong><small>3 minutes · SYNTHETIC</small></div>
          <div><span>04</span><strong>Limits</strong><small>1 minute · DEMO</small></div>
          <div><span>05</span><strong>Feedback</strong><small>2 minutes · DEMO</small></div>
        </div>
      </section>
    </div>
  );
}

function ApproachStep() {
  const cards = [
    { icon: Database, label: "Input", value: "four-site wurtzite-like fixture", detail: "fixture_wz_01.json" },
    { icon: Code, label: "Method", value: "pinned classification walkthrough", detail: "illustrative adapter plan" },
    { icon: ListChecks, label: "Expected output", value: "discrete symmetry fields", detail: "comparison-only result" },
    { icon: Flask, label: "Challenge", value: "alternative convention path", detail: "preserved counterevidence" },
  ];
  return (
    <div className="step-body">
      <div className="approach-flow" aria-label="Synthetic approach overview">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div className="approach-wrap" key={card.label}>
              <section className="approach-card">
                <div className="mini-icon"><Icon size={18} weight="duotone" /></div>
                <span className="approach-card__label">{card.label} <FixtureLabel /></span>
                <strong>{card.value}</strong>
                <small>{card.detail} · SYNTHETIC</small>
              </section>
              {index < cards.length - 1 && <ArrowRight className="flow-arrow" size={18} aria-hidden="true" />}
            </div>
          );
        })}
      </div>
      <section className="declared-settings">
        <div className="subhead-row">
          <h3>Declared settings <FixtureLabel kind="SYNTHETIC" /></h3>
          <StatusChip>TRAINING ONLY</StatusChip>
        </div>
        <dl>
          <div><dt>Fixture</dt><dd>wurtzite_training_v1 <FixtureLabel /></dd></div>
          <div><dt>Tolerance</dt><dd>1e-5 (illustrative) <FixtureLabel kind="SYNTHETIC" /></dd></div>
          <div><dt>Expected fields</dt><dd>number, symbol, Hall value, operation count <FixtureLabel /></dd></div>
          <div><dt>Runtime target</dt><dd>under 60 seconds (estimate) <FixtureLabel /></dd></div>
        </dl>
      </section>
      <div className="inline-warning">
        <Warning size={18} weight="duotone" />
        <p><strong>Method status: DEMO.</strong> This is a visual review walkthrough, not executable benchmark logic.</p>
      </div>
    </div>
  );
}

function EvidenceList({ title, items, challenging = false }) {
  return (
    <section className={`evidence-panel ${challenging ? "evidence-panel--challenge" : ""}`}>
      <div className="evidence-panel__header">
        <h3>{title} <FixtureLabel kind="SYNTHETIC" /></h3>
        <span>{items.length} items · DEMO</span>
      </div>
      <div className="evidence-table">
        <div className="evidence-table__labels" aria-hidden="true">
          <span>{challenging ? "What it suggests" : "What it shows"} (DEMO)</span>
          <span>Source (DEMO)</span>
          <span>Type (DEMO)</span>
        </div>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button className="evidence-row" type="button" key={item.source} onClick={(event) => event.currentTarget.classList.toggle("is-open")}>
              <span className={`evidence-icon ${challenging ? "evidence-icon--challenge" : ""}`}><Icon size={18} weight="duotone" /></span>
              <span className="evidence-row__title">{item.title}<small>Click to inspect training note · DEMO</small></span>
              <span className="evidence-row__source">{item.source}<small>SYNTHETIC</small></span>
              <span className="evidence-row__type">{item.type}<small>DEMO</small></span>
              <ArrowRight className="evidence-row__arrow" size={16} aria-hidden="true" />
              <span className="evidence-row__detail">Illustrative fixture metadata only. No raw research data, executable artifact, or verification claim is included. DEMO / SYNTHETIC.</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function EvidenceStep() {
  return (
    <div className="step-body">
      <section className="plain-summary">
        <h3>Plain-language summary <FixtureLabel /></h3>
        <p>
          The synthetic packet proposes that a hypothetical material fixture yields an illustrative wurtzite-like classification. Supporting and challenging fixtures are shown together so a reviewer can test the argument instead of seeing only favorable evidence.
        </p>
        <p className="summary-boundary">No physical material, scientific validity, cryptographic assurance, or independence is implied or claimed. DEMO / SYNTHETIC.</p>
      </section>
      <div className="evidence-grid">
        <EvidenceList title="Supporting evidence" items={SUPPORTING_EVIDENCE} />
        <EvidenceList title="Challenging evidence" items={CHALLENGING_EVIDENCE} challenging />
      </div>
      <section className="compact-limitations">
        <h3>Limitations <FixtureLabel kind="SYNTHETIC" /></h3>
        <ul>
          {LIMITATIONS.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </div>
  );
}

function LimitationsStep() {
  return (
    <div className="step-body">
      <div className="limitations-grid">
        {LIMITATIONS.map((item, index) => (
          <section className="limitation-card" key={item}>
            <span className="limitation-card__number">0{index + 1}</span>
            <Warning size={19} weight="duotone" />
            <p>{item}</p>
            <FixtureLabel kind={index % 2 === 0 ? "SYNTHETIC" : "DEMO"} />
          </section>
        ))}
      </div>
      <section className="stop-conditions">
        <div className="mini-icon mini-icon--amber"><ShieldWarning size={18} weight="duotone" /></div>
        <div>
          <h3>Stop conditions <FixtureLabel /></h3>
          <p>Stop and mark “Insufficient evidence” if the packet appears to select a cryptographic suite, imply scientific acceptance, hide counterevidence, or claim independent-person assurance.</p>
        </div>
      </section>
    </div>
  );
}

function FeedbackStep({ feedback, setFeedback, submitted, setSubmitted, role, onReset }) {
  const [copyStatus, setCopyStatus] = useState("");
  const reviewPacket = useMemo(() => createReviewPacket(role, feedback), [feedback, role]);

  function updateField(field, value) {
    setFeedback((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    setCopyStatus("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setCopyStatus("");
  }

  function downloadFeedback() {
    const blob = new Blob([JSON.stringify(reviewPacket, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "valoris-demo-review-handoff.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(href), 0);
    setCopyStatus("DEMO JSON handoff download started.");
  }

  async function copyFeedback() {
    try {
      await navigator.clipboard.writeText(formatReviewPacket(reviewPacket));
      setCopyStatus("DEMO review handoff copied.");
    } catch {
      setCopyStatus("Copy unavailable. Download the DEMO JSON instead.");
    }
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Training recommendation <FixtureLabel /></legend>
        <div className="choice-grid">
          {["Ready for qualified review", "Revise the packet", "Insufficient evidence"].map((choice) => (
            <label className={feedback.recommendation === choice ? "choice-card is-selected" : "choice-card"} key={choice}>
              <input type="radio" name="recommendation" value={choice} checked={feedback.recommendation === choice} onChange={(event) => updateField("recommendation", event.target.value)} />
              <span className="radio-dot"><Check size={12} weight="bold" /></span>
              <span><strong>{choice}</strong><small>DEMO decision only</small></span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="feedback-fields">
        <label>
          <span>What is clear? <FixtureLabel /></span>
          <textarea value={feedback.clear} onChange={(event) => updateField("clear", event.target.value)} placeholder="Record the strongest part of the synthetic packet…" />
        </label>
        <label>
          <span>What needs work? <FixtureLabel /></span>
          <textarea value={feedback.concerns} onChange={(event) => updateField("concerns", event.target.value)} placeholder="Record ambiguity, missing evidence, or counterevidence…" />
        </label>
        <label className="wide-field">
          <span>Blocked decisions or questions <FixtureLabel kind="SYNTHETIC" /></span>
          <textarea value={feedback.blocked} onChange={(event) => updateField("blocked", event.target.value)} placeholder="Name the owner or expertise required before proceeding…" />
        </label>
      </div>
      <label className="conflict-check">
        <input type="checkbox" required checked={feedback.conflictDisclosed} onChange={(event) => updateField("conflictDisclosed", event.target.checked)} />
        <span>I reviewed the conflict and relationship reminder for this DEMO exercise.</span>
      </label>
      <div className="session-note"><Info size={18} weight="duotone" /><span>Session-only by design: nothing is stored, uploaded, or sent. DEMO / SYNTHETIC.</span></div>
      <div className="feedback-actions">
        <button className="primary-button" type="submit"><CheckCircle size={19} weight="duotone" /> Generate review summary</button>
      </div>
      {submitted && (
        <section className="review-summary" aria-labelledby="review-summary-title">
          <div className="success-message" role="status">
            <CheckCircle size={22} weight="fill" />
            <div><strong id="review-summary-title">DEMO review handoff generated.</strong><span>Nothing was sent or uploaded. Copy or download it only if you choose to share it.</span></div>
          </div>
          <div className="review-summary__meta">
            <div><span>Perspective <FixtureLabel /></span><strong>{role.label} · DEMO</strong></div>
            <div><span>Fixture <FixtureLabel kind="SYNTHETIC" /></span><strong>{REVIEW_FIXTURE_VERSION} · DEMO</strong></div>
            <div><span>Recommendation <FixtureLabel /></span><strong>{feedback.recommendation} · DEMO</strong></div>
            <div><span>Conflict reminder <FixtureLabel /></span><strong>Reviewed · DEMO</strong></div>
          </div>
          <dl className="review-summary__details">
            <div><dt>What is clear <FixtureLabel /></dt><dd>{feedback.clear.trim() || "Not provided"} · DEMO</dd></div>
            <div><dt>What needs work <FixtureLabel /></dt><dd>{feedback.concerns.trim() || "Not provided"} · DEMO</dd></div>
            <div><dt>Blocked decisions <FixtureLabel kind="SYNTHETIC" /></dt><dd>{feedback.blocked.trim() || "Not provided"} · DEMO</dd></div>
          </dl>
          <div className="summary-boundary-note"><ShieldWarning size={18} weight="duotone" /><span>Cryptography remains BLOCKED_UNVERIFIED. This handoff does not approve science, security, production readiness, or independence.</span></div>
          <div className="summary-actions">
            <button className="secondary-button" type="button" onClick={onReset}><ArrowLeft size={18} /> Reset DEMO session</button>
            <button className="secondary-button" type="button" onClick={copyFeedback}><Copy size={18} /> Copy DEMO handoff</button>
            <button className="primary-button" type="button" onClick={downloadFeedback}><DownloadSimple size={18} /> Download DEMO JSON</button>
          </div>
          <span className="copy-status" role="status" aria-live="polite">{copyStatus}</span>
        </section>
      )}
    </form>
  );
}

function ADRDialog({ role, onClose }) {
  const [copied, setCopied] = useState(false);

  async function copyPacket() {
    const packetText = role.packet.map((id) => `${id} — ${ADRS[id].title} — ${ADRS[id].status}`).join("\n");
    try {
      await navigator.clipboard.writeText(`DEMO / SYNTHETIC REVIEW PACKET\n${packetText}\nNo policy approval is requested.`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="adr-dialog" role="dialog" aria-modal="true" aria-labelledby="adr-dialog-title">
        <div className="dialog-header">
          <div>
            <span className="card-kicker">ROLE PACKET <FixtureLabel /></span>
            <h2 id="adr-dialog-title">{role.label} ADR review packet</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close ADR review packet" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="dialog-boundary">
          <ShieldWarning size={19} weight="duotone" />
          <p><strong>Training summary only.</strong> Inspect questions and boundaries; do not accept policy or treat these summaries as canonical repository ADRs. DEMO / SYNTHETIC.</p>
        </div>
        <div className="adr-list">
          {role.packet.map((id) => {
            const adr = ADRS[id];
            return (
              <article className="adr-card" key={id}>
                <div className="adr-card__top">
                  <span>{id} · DEMO</span>
                  <StatusChip tone={adr.status === "BLOCKED_UNVERIFIED" ? "blocked" : "neutral"}>{adr.status}</StatusChip>
                </div>
                <h3>{adr.title}</h3>
                <dl>
                  <div><dt>Review question</dt><dd>{adr.question} <FixtureLabel /></dd></div>
                  <div><dt>Non-approval boundary</dt><dd>{adr.boundary} <FixtureLabel kind="SYNTHETIC" /></dd></div>
                </dl>
              </article>
            );
          })}
        </div>
        <div className="dialog-actions">
          <button className="secondary-button" type="button" onClick={copyPacket}><Copy size={18} /> {copied ? "Copied DEMO packet" : "Copy DEMO packet"}</button>
          <button className="primary-button" type="button" onClick={onClose}>Return to walkthrough <ArrowRight size={18} /></button>
        </div>
      </section>
    </div>
  );
}

export function App() {
  const [roleId, setRoleId] = useState("reviewer");
  const [step, setStep] = useState(2);
  const [showAdrPacket, setShowAdrPacket] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK);
  const stepButtonRefs = useRef([]);
  const role = useMemo(() => ROLES.find((item) => item.id === roleId), [roleId]);
  const RoleIcon = role.icon;

  useEffect(() => {
    if (window.matchMedia("(min-width: 601px) and (max-width: 860px)").matches) {
      stepButtonRefs.current[step]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [step]);

  function goToStep(nextStep) {
    setStep(Math.max(0, Math.min(STEPS.length - 1, nextStep)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetDemo() {
    setRoleId("reviewer");
    setStep(0);
    setSubmitted(false);
    setFeedback(INITIAL_FEEDBACK);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="sandbox-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <strong>Valoris Reviewer Sandbox</strong>
          <span aria-hidden="true" />
          <span>SYNTHETIC FIXTURE</span>
        </div>
        <div className="global-warning"><Warning size={19} weight="duotone" /> DEMO / SYNTHETIC — NO SCIENTIFIC OR INDEPENDENCE CLAIMS</div>
        <label className="perspective-control">
          <span>Perspective:</span>
          <select
            aria-label="Select reviewer perspective"
            value={roleId}
            onChange={(event) => setRoleId(event.target.value)}
          >
            {ROLES.map((item) => <option value={item.id} key={item.id}>{item.shortLabel}</option>)}
          </select>
          <CaretDown size={15} aria-hidden="true" />
        </label>
      </header>

      <main className="page-shell">
        <section className="role-row" aria-labelledby="role-label">
          <span id="role-label">I’m reviewing as:</span>
          <div className="role-selector" role="radiogroup" aria-labelledby="role-label">
            {ROLES.map((item, index) => (
              <button
                id={index === 0 ? "role-selector" : undefined}
                className={roleId === item.id ? "role-button is-active" : "role-button"}
                type="button"
                role="radio"
                aria-checked={roleId === item.id}
                onClick={() => setRoleId(item.id)}
                key={item.id}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        <nav className="walkthrough-steps" aria-label="Ten-minute review walkthrough">
          {STEPS.map((item, index) => (
            <div className={`step-wrap ${index === step ? "is-current" : ""}`} key={item.title}>
              <button ref={(node) => { stepButtonRefs.current[index] = node; }} className={`step-button ${index === step ? "is-current" : ""} ${index < step ? "is-complete" : ""}`} type="button" onClick={() => goToStep(index)} aria-current={index === step ? "step" : undefined}>
                <span className="step-number">{index + 1}</span>
                <span className="step-copy"><strong>{item.title}</strong><small>{item.subtitle}</small><em>{item.minutes} · DEMO</em></span>
              </button>
              {index < STEPS.length - 1 && <span className="step-connector" aria-hidden="true" />}
            </div>
          ))}
        </nav>

        <div className="workspace-grid">
          <section className="review-panel" aria-labelledby="step-title">
            <div className="review-heading">
              <span className="step-eyebrow">STEP {step + 1} OF 5 · DEMO</span>
              <h1 id="step-title">{STEPS[step].title}</h1>
              <SectionIntro step={step} />
            </div>
            <div className="claim-heading">
              <div>
                <span className="card-kicker">CLAIM UNDER REVIEW <FixtureLabel kind="SYNTHETIC" /></span>
                <h2>Synthetic wurtzite symmetry check</h2>
                <div className="status-row">
                  <StatusChip tone="blocked">Cryptography: BLOCKED_UNVERIFIED</StatusChip>
                  <StatusChip>Proposed benchmark — not scientifically accepted</StatusChip>
                </div>
              </div>
              <button className="packet-button" type="button" onClick={() => setShowAdrPacket(true)}>
                <FileText size={22} weight="duotone" />
                <span><strong>ADR packet (DEMO)</strong><small>{role.packet.join(" · ")} · training summaries</small></span>
                <ArrowRight size={17} />
              </button>
            </div>

            {step === 0 && <QuestionStep />}
            {step === 1 && <ApproachStep />}
            {step === 2 && <EvidenceStep />}
            {step === 3 && <LimitationsStep />}
            {step === 4 && <FeedbackStep feedback={feedback} setFeedback={setFeedback} submitted={submitted} setSubmitted={setSubmitted} role={role} onReset={resetDemo} />}
          </section>

          <aside className="task-panel" aria-label="Synthetic review task">
            <div className="task-panel__main">
              <div className="task-title-row">
                <h2>Your review task <FixtureLabel /></h2>
                <span className="time-pill"><Clock size={15} /> 10 minutes · DEMO</span>
              </div>
              <p>You are reviewing a proposed benchmark claim in a synthetic training fixture.</p>
              <div className="task-list">
                <div><span className="task-icon"><Target size={21} weight="duotone" /></span><p><strong>Goal <FixtureLabel /></strong>{role.goal}</p></div>
                <div><span className="task-icon"><RoleIcon size={21} weight="duotone" /></span><p><strong>Focus <FixtureLabel kind="SYNTHETIC" /></strong>{role.focus}</p></div>
                <div><span className="task-icon"><Lightbulb size={21} weight="duotone" /></span><p><strong>Outcome <FixtureLabel /></strong>{role.outcome}</p></div>
              </div>
              <div className="navigation-actions">
                {step > 0 && <button className="back-button" type="button" onClick={() => goToStep(step - 1)} aria-label="Go to previous review step"><ArrowLeft size={18} /></button>}
                {step < STEPS.length - 1 ? (
                  <button className="continue-button" type="button" onClick={() => goToStep(step + 1)}>Continue review <ArrowRight size={21} /></button>
                ) : (
                  <button className="continue-button" type="button" onClick={() => document.querySelector(".feedback-form")?.scrollIntoView({ behavior: "smooth" })}>Review feedback <ArrowRight size={21} /></button>
                )}
              </div>
              <span className="next-step">{step < 4 ? `Next: ${STEPS[step + 1].title} · ${STEPS[step + 1].minutes} · DEMO` : "Final step · DEMO"}</span>
            </div>

            <div className="progress-panel">
              <h3>Your feedback progress <FixtureLabel /></h3>
              <ol>
                {STEPS.map((item, index) => (
                  <li className={index === step ? "is-current" : index < step ? "is-complete" : ""} key={item.title}>
                    <button type="button" onClick={() => goToStep(index)}>
                      <span>{index < step ? <Check size={13} weight="bold" /> : index + 1}</span>
                      <strong>{item.title}</strong>
                      <small>{index < step ? "Completed · DEMO" : index === step ? "In progress · DEMO" : "Pending · DEMO"}</small>
                    </button>
                  </li>
                ))}
              </ol>
              <div className="demo-notice"><Info size={20} weight="duotone" /><p>Everything on this page is DEMO or SYNTHETIC. No scientific, cryptographic, security, or independence claims are made.</p></div>
            </div>
          </aside>
        </div>

        <footer>
          <span>This sandbox is a static demonstration. All content is DEMO or SYNTHETIC and is provided for reviewer training and interface evaluation only.</span>
          <span>No backend · No authentication · No uploads · No production components</span>
        </footer>
      </main>

      {showAdrPacket && <ADRDialog role={role} onClose={() => setShowAdrPacket(false)} />}
    </div>
  );
}
