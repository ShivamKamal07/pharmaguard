import React from "react";
import { Link } from "react-router-dom";

const Icon = ({ name }) => {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "dna":
      return (
        <svg {...common}><path d="M6 3c0 6 12 6 12 12" /><path d="M18 21c0-6-12-6-12-12" /><path d="M8 6h8M6 12h12M8 18h8" /></svg>
      );
    case "chat":
      return (
        <svg {...common}><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l1.6-4.1A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" /></svg>
      );
    case "file":
      return (
        <svg {...common}><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5" /><path d="M9 13h6M9 17h6" /></svg>
      );
    case "shield":
      return (
        <svg {...common}><path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
      );
    default:
      return null;
  }
};

const Landing = () => {
  return (
    <div className="pg-landing">

      {/* NAV */}
      <div className="pg-landing-nav">
        <div className="pg-landing-nav-brand">
          <span className="pg-sidebar-brand-mark">PG</span>
          <div>
            <div className="pg-sidebar-brand-name" style={{ color: "var(--text)" }}>PharmaGuard</div>
            <div className="pg-subtitle" style={{ fontSize: "0.7rem" }}>Risk Intelligence</div>
          </div>
        </div>

        <div className="pg-landing-nav-actions">
          <Link to="/login" className="pg-btn pg-btn-ghost pg-btn-sm">Sign in</Link>
          <Link to="/register" className="pg-btn pg-btn-primary pg-btn-sm">Get started</Link>
        </div>
      </div>

      {/* HERO */}
      <div className="pg-hero">
        <div className="pg-hero-inner">
          <div className="pg-fade-in">
            <span className="pg-hero-eyebrow">
              <span className="pg-signal-dot risk-success" />
              Pharmacogenomic Risk Intelligence
            </span>

            <h1 className="pg-hero-title">
              Know how a drug will behave in <em>this patient's</em> genome
              — before you prescribe it.
            </h1>

            <p className="pg-hero-sub">
              PharmaGuard analyzes VCF genomic data against a target drug and
              returns a clear risk verdict, severity, and confidence score —
              with an AI assistant to walk through the reasoning.
            </p>

            <div className="pg-hero-actions">
              <Link to="/register" className="pg-btn pg-btn-primary">Get started free</Link>
              <Link to="/login" className="pg-btn pg-btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}>
                Sign in
              </Link>
            </div>

            <div className="pg-hero-stats">
              <div>
                <div className="pg-hero-stat-value">VCF</div>
                <div className="pg-hero-stat-label">Genomic file support</div>
              </div>
              <div>
                <div className="pg-hero-stat-value">3</div>
                <div className="pg-hero-stat-label">Risk tiers tracked</div>
              </div>
              <div>
                <div className="pg-hero-stat-value">AI</div>
                <div className="pg-hero-stat-label">Report assistant</div>
              </div>
            </div>
          </div>

          <div className="pg-hero-panel pg-fade-in">
            <div className="pg-hero-panel-row">
              <span>Drug</span>
              <span className="pg-mono">WARFARIN</span>
            </div>
            <div className="pg-hero-panel-row">
              <span>Risk label</span>
              <span className="pg-badge risk-warning">
                <span className="pg-signal-dot risk-warning" />
                Adjust Dosage
              </span>
            </div>
            <div className="pg-hero-panel-row">
              <span>Severity</span>
              <span className="pg-mono">Moderate</span>
            </div>
            <div className="pg-hero-panel-row">
              <span>Confidence</span>
              <span className="pg-mono">92.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="pg-section">
        <div className="pg-section-head">
          <span className="pg-eyebrow">What it does</span>
          <h2>One workspace for drug-gene risk review</h2>
        </div>

        <div className="pg-feature-grid">
          <div className="pg-feature-card">
            <div className="pg-feature-icon"><Icon name="dna" /></div>
            <h5 style={{ marginBottom: 8 }}>VCF Analysis</h5>
            <p className="pg-subtitle">
              Upload a variant call file and target drug to generate a risk
              verdict in seconds.
            </p>
          </div>

          <div className="pg-feature-card">
            <div className="pg-feature-icon"><Icon name="shield" /></div>
            <h5 style={{ marginBottom: 8 }}>Risk Scoring</h5>
            <p className="pg-subtitle">
              Every result comes with a severity level and a confidence
              score so you know how much to trust it.
            </p>
          </div>

          <div className="pg-feature-card">
            <div className="pg-feature-icon"><Icon name="chat" /></div>
            <h5 style={{ marginBottom: 8 }}>AI Assistant</h5>
            <p className="pg-subtitle">
              Ask follow-up questions about any report and get plain-language
              explanations instantly.
            </p>
          </div>

          <div className="pg-feature-card">
            <div className="pg-feature-icon"><Icon name="file" /></div>
            <h5 style={{ marginBottom: 8 }}>Reports &amp; Export</h5>
            <p className="pg-subtitle">
              Browse full analysis history and export any report as a
              clinical PDF in one click.
            </p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="pg-section" style={{ paddingTop: 0 }}>
        <div className="pg-section-head">
          <span className="pg-eyebrow">Workflow</span>
          <h2>From upload to verdict in three steps</h2>
        </div>

        <div className="pg-steps">
          <div className="pg-card pg-card-pad">
            <div className="pg-step-num">STEP 01</div>
            <h5 style={{ marginBottom: 8 }}>Upload &amp; select drug</h5>
            <p className="pg-subtitle">Attach a patient's VCF file and specify the drug being considered.</p>
          </div>
          <div className="pg-card pg-card-pad">
            <div className="pg-step-num">STEP 02</div>
            <h5 style={{ marginBottom: 8 }}>Review the risk signal</h5>
            <p className="pg-subtitle">Get a risk label, severity, and confidence score, visualized clearly.</p>
          </div>
          <div className="pg-card pg-card-pad">
            <div className="pg-step-num">STEP 03</div>
            <h5 style={{ marginBottom: 8 }}>Ask, export, decide</h5>
            <p className="pg-subtitle">Chat with the AI assistant about the result, then export or archive it.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="pg-section" style={{ paddingTop: 0 }}>
        <div className="pg-cta-band">
          <div>
            <h3 style={{ color: "#fff", marginBottom: 8 }}>Ready to try PharmaGuard?</h3>
            <p style={{ color: "var(--text-inverse-muted)" }}>Create a free account as a patient or doctor to get started.</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link to="/register" className="pg-btn pg-btn-primary">Get started free</Link>
            <Link to="/login" className="pg-btn pg-btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="pg-landing-footer">
        <span>© {new Date().getFullYear()} PharmaGuard. Clinical Risk Intelligence System.</span>
        <span className="pg-mono">Built for research &amp; clinical support use.</span>
      </div>
    </div>
  );
};

export default Landing;
