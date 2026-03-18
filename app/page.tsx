"use client";

import { useEffect, useRef } from "react";

const cssString = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --navy: #0f1f3d; --navy-mid: #1a3260;
      --blue-accent: #1e4fc2; --blue-light: #3a6ff7;
      --cream: #faf8f4; --slate: #4a5568; --slate-light: #718096;
      --border: #e2e6f0; --gold: #c9972c; --gold-light: #f5c842;
      --success: #0b7a4e;
    }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--navy); overflow-x: hidden; }

    /* NAV */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(250,248,244,0.93); backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      padding: 0 48px; height: 64px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--navy); letter-spacing: -0.3px; text-decoration: none; }
    .nav-logo span { color: var(--blue-accent); }
    .nav-right { display: flex; align-items: center; gap: 32px; }
    .nav-link { font-size: 14px; font-weight: 500; color: var(--slate); text-decoration: none; transition: color 0.2s; }
    .nav-link:hover { color: var(--navy); }
    .nav-cta { background: var(--navy); color: #fff; padding: 9px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; text-decoration: none; border: none; cursor: pointer; transition: background 0.2s, transform 0.15s; }
    .nav-cta:hover { background: var(--navy-mid); transform: translateY(-1px); }

    /* HERO */
    .hero { min-height: 100vh; padding: 140px 48px 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1280px; margin: 0 auto; }
    .hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; color: var(--blue-accent); letter-spacing: 0.12em; text-transform: uppercase; background: rgba(30,79,194,0.07); border: 1px solid rgba(30,79,194,0.2); border-radius: 4px; padding: 6px 12px; margin-bottom: 28px; }
    .eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--blue-accent); animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
    .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(42px, 4.5vw, 64px); font-weight: 700; line-height: 1.1; letter-spacing: -1.5px; color: var(--navy); margin-bottom: 24px; }
    .hero h1 em { font-style: italic; color: var(--blue-accent); }
    .hero-sub { font-size: 18px; line-height: 1.7; color: var(--slate); max-width: 520px; margin-bottom: 16px; }
    .hero-sub strong { color: var(--navy); font-weight: 600; }
    .hero-proof { font-size: 13px; color: var(--slate-light); margin-bottom: 40px; display: flex; align-items: center; gap: 8px; }
    .hero-proof::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--slate-light); }
    .waitlist-form { display: flex; gap: 10px; flex-wrap: wrap; }
    .waitlist-input { flex: 1; min-width: 220px; padding: 14px 18px; border: 1.5px solid var(--border); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--navy); background: #fff; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
    .waitlist-input:focus { border-color: var(--blue-accent); box-shadow: 0 0 0 3px rgba(30,79,194,0.1); }
    .waitlist-input::placeholder { color: #aab; }
    .waitlist-btn { padding: 14px 28px; background: var(--blue-accent); color: #fff; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; }
    .waitlist-btn:hover { background: var(--blue-light); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,79,194,0.3); }
    .founding-badge { margin-top: 20px; display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--success); font-weight: 500; }

    /* HERO VISUAL */
    .hero-visual { position: relative; }
    .newsletter-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: 0 24px 80px rgba(15,31,61,0.12), 0 4px 16px rgba(15,31,61,0.06); transform: rotate(1.5deg); transition: transform 0.3s; }
    .newsletter-card:hover { transform: rotate(0deg); }
    .card-header { background: var(--navy); padding: 20px 28px; display: flex; align-items: center; justify-content: space-between; }
    .card-header-left { display: flex; align-items: center; gap: 12px; }
    .card-logo-dot { width: 32px; height: 32px; border-radius: 8px; background: var(--blue-light); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 14px; color: #fff; }
    .card-header-text { color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 500; }
    .card-header-sub { color: rgba(255,255,255,0.45); font-size: 11px; margin-top: 1px; }
    .card-tag { background: rgba(201,151,44,0.2); border: 1px solid rgba(201,151,44,0.4); color: var(--gold-light); font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; padding: 4px 9px; border-radius: 4px; text-transform: uppercase; }
    .card-body { padding: 24px 28px; }
    .card-date { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; color: var(--slate-light); text-transform: uppercase; margin-bottom: 12px; }
    .card-headline { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--navy); line-height: 1.35; margin-bottom: 12px; }
    .card-snippet { font-size: 13px; line-height: 1.6; color: var(--slate); margin-bottom: 20px; }
    .card-divider { height: 1px; background: var(--border); margin-bottom: 20px; }
    .card-sections { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .card-section-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--slate-light); margin-bottom: 6px; }
    .card-section-item { font-size: 12px; color: var(--navy); font-weight: 500; line-height: 1.5; }
    .card-section-item + .card-section-item { margin-top: 4px; }
    .card-footer { padding: 16px 28px; background: #f7f9ff; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
    .card-footer-sources { display: flex; gap: 6px; align-items: center; font-size: 11px; color: var(--slate-light); }
    .source-chip { background: #fff; border: 1px solid var(--border); border-radius: 4px; padding: 3px 8px; font-family: 'DM Mono', monospace; font-size: 10px; color: var(--slate); }
    .card-audio-btn { display: flex; align-items: center; gap: 6px; background: var(--navy); color: #fff; border: none; border-radius: 6px; padding: 7px 14px; font-size: 12px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; }
    .float-badge { position: absolute; top: -20px; left: -30px; background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 12px 16px; box-shadow: 0 8px 30px rgba(15,31,61,0.1); display: flex; align-items: center; gap: 10px; animation: float 4s ease-in-out infinite; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    .float-badge-icon { width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg,#0b7a4e,#11a86a); display: flex; align-items: center; justify-content: center; }
    .float-badge-text { font-size: 12px; font-weight: 600; color: var(--navy); }
    .float-badge-sub { font-size: 11px; color: var(--slate-light); }
    .float-badge-2 { position: absolute; bottom: -16px; right: -20px; background: var(--navy); border-radius: 12px; padding: 12px 16px; box-shadow: 0 8px 30px rgba(15,31,61,0.2); display: flex; align-items: center; gap: 10px; animation: float 4s ease-in-out infinite 2s; }
    .float-badge-2 .float-badge-text { color: #fff; }
    .float-badge-2 .float-badge-sub { color: rgba(255,255,255,0.5); }
    .float-badge-2-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; }

    /* LOGOS */
    .logos-bar { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 28px 48px; background: #fff; }
    .logos-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
    .logos-label { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--slate-light); white-space: nowrap; }
    .logos-list { display: flex; align-items: center; gap: 40px; flex-wrap: wrap; }
    .logo-item { font-weight: 600; font-size: 15px; color: #b0bac8; letter-spacing: -0.3px; transition: color 0.2s; }
    .logo-item:hover { color: var(--slate); }

    /* SECTIONS */
    .section { max-width: 1280px; margin: 0 auto; padding: 100px 48px; }
    .section-eyebrow { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue-accent); margin-bottom: 16px; }
    .section-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 3vw, 48px); font-weight: 700; line-height: 1.15; letter-spacing: -1px; color: var(--navy); margin-bottom: 20px; }
    .section-title em { font-style: italic; color: var(--blue-accent); }
    .section-sub { font-size: 17px; line-height: 1.7; color: var(--slate); max-width: 600px; }

    /* PROBLEM */
    .problem-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; margin-top: 60px; background: var(--border); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
    .problem-card { background: #fff; padding: 36px 32px; position: relative; overflow: hidden; }
    .problem-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,var(--blue-accent),var(--blue-light)); opacity: 0; transition: opacity 0.3s; }
    .problem-card:hover::before { opacity: 1; }
    .problem-num { font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 700; color: var(--border); line-height: 1; margin-bottom: 16px; transition: color 0.3s; }
    .problem-card:hover .problem-num { color: rgba(30,79,194,0.08); }
    .problem-title { font-size: 16px; font-weight: 600; color: var(--navy); margin-bottom: 10px; line-height: 1.4; }
    .problem-desc { font-size: 14px; line-height: 1.7; color: var(--slate); }

    /* HOW IT WORKS */
    .how-bg { background: var(--navy); position: relative; overflow: hidden; }
    .how-bg::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%,rgba(30,79,194,0.3) 0%,transparent 60%); }
    .how-bg .section-eyebrow { color: rgba(255,255,255,0.5); }
    .how-bg .section-title { color: #fff; }
    .how-bg .section-sub { color: rgba(255,255,255,0.6); }
    .pipeline { margin-top: 64px; display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; align-items: center; }
    .pipeline-stage { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 28px 24px; }
    .pipeline-stage-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 12px; }
    .pipeline-stage-title { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 16px; }
    .pipeline-items { display: flex; flex-direction: column; gap: 8px; }
    .pipeline-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.65); }
    .pipeline-item-icon { width: 28px; height: 28px; border-radius: 6px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .pipeline-arrow { display: flex; align-items: center; justify-content: center; padding: 0 16px; }
    .pipeline-middle { background: linear-gradient(135deg,var(--blue-accent),var(--blue-light)); border: none; padding: 36px 28px; }
    .pipeline-middle .pipeline-stage-label { color: rgba(255,255,255,0.7); }
    .pipeline-middle .pipeline-stage-title { color: #fff; font-size: 17px; }
    .pipeline-middle .pipeline-item { color: rgba(255,255,255,0.85); }
    .pipeline-middle .pipeline-item-icon { background: rgba(255,255,255,0.15); }

    /* FEATURES */
    .features-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 32px; margin-top: 64px; }
    .feature-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 40px; transition: box-shadow 0.3s, transform 0.2s; position: relative; overflow: hidden; }
    .feature-card:hover { box-shadow: 0 16px 48px rgba(15,31,61,0.1); transform: translateY(-2px); }
    .feature-card.featured { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; background: linear-gradient(135deg,#f0f4ff 0%,#fff 100%); }
    .feature-icon { width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg,var(--blue-accent),var(--blue-light)); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
    .feature-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--navy); margin-bottom: 12px; line-height: 1.3; }
    .feature-desc { font-size: 15px; line-height: 1.7; color: var(--slate); }
    .feature-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
    .feature-tag { background: rgba(30,79,194,0.07); border: 1px solid rgba(30,79,194,0.15); color: var(--blue-accent); font-size: 12px; font-weight: 500; padding: 5px 12px; border-radius: 20px; }
    .mini-newsletter { background: var(--navy); border-radius: 12px; padding: 24px; color: #fff; }
    .mini-nl-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .mini-nl-logo { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 700; }
    .mini-nl-badge { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; background: var(--gold); color: #fff; padding: 3px 8px; border-radius: 3px; text-transform: uppercase; }
    .mini-nl-row { display: flex; gap: 12px; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .mini-nl-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .mini-nl-num { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: rgba(255,255,255,0.15); line-height: 1; flex-shrink: 0; }
    .mini-nl-content { flex: 1; }
    .mini-nl-tag { font-family: 'DM Mono', monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--blue-light); margin-bottom: 4px; }
    .mini-nl-title { font-size: 13px; font-weight: 500; color: #fff; line-height: 1.4; }

    /* INTEGRATIONS */
    .integrations-section { background: #fff; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .integrations-inner { max-width: 1280px; margin: 0 auto; padding: 80px 48px; }
    .integrations-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-top: 56px; align-items: start; }
    .integrations-col-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--slate-light); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
    .research-list { display: flex; flex-direction: column; gap: 10px; }
    .research-item { display: flex; align-items: flex-start; gap: 14px; padding: 16px 18px; border: 1px solid var(--border); border-radius: 10px; background: var(--cream); transition: border-color 0.2s, box-shadow 0.2s; }
    .research-item:hover { border-color: rgba(30,79,194,0.3); box-shadow: 0 4px 16px rgba(30,79,194,0.07); }
    .research-item-icon { width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg,var(--blue-accent),var(--blue-light)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .research-item-text { flex: 1; }
    .research-item-name { font-size: 14px; font-weight: 600; color: var(--navy); margin-bottom: 2px; }
    .research-item-desc { font-size: 12px; color: var(--slate-light); line-height: 1.5; }
    .research-badge { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(30,79,194,0.08); border: 1px solid rgba(30,79,194,0.18); color: var(--blue-accent); padding: 2px 7px; border-radius: 3px; white-space: nowrap; align-self: flex-start; margin-top: 2px; }
    .integrations-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }
    .integration-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border: 1px solid var(--border); border-radius: 10px; background: var(--cream); transition: border-color 0.2s, box-shadow 0.2s; }
    .integration-item:hover { border-color: rgba(30,79,194,0.3); box-shadow: 0 4px 16px rgba(30,79,194,0.07); }
    .integration-icon { width: 32px; height: 32px; border-radius: 7px; background: #fff; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .integration-name { font-size: 13px; font-weight: 500; color: var(--navy); }
    .integration-type { font-size: 11px; color: var(--slate-light); }
    .integration-more { display: flex; align-items: center; justify-content: center; padding: 14px 16px; border: 1px dashed var(--border); border-radius: 10px; font-size: 13px; font-weight: 500; color: var(--slate-light); grid-column: span 2; }

    /* SECURITY */
    .security-section { background: var(--cream); border-top: 1px solid var(--border); }
    .security-inner { max-width: 1280px; margin: 0 auto; padding: 100px 48px; }
    .security-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; margin-top: 56px; background: var(--border); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
    .security-card { background: #fff; padding: 36px 28px; transition: background 0.2s; }
    .security-card:hover { background: #f7f9ff; }
    .security-card-icon { width: 48px; height: 48px; border-radius: 12px; margin-bottom: 20px; background: var(--navy); display: flex; align-items: center; justify-content: center; }
    .security-card-title { font-size: 15px; font-weight: 600; color: var(--navy); margin-bottom: 10px; line-height: 1.4; }
    .security-card-desc { font-size: 13px; line-height: 1.7; color: var(--slate); }
    .security-footer { margin-top: 24px; padding: 24px 32px; background: #fff; border: 1px solid var(--border); border-radius: 12px; display: flex; align-items: flex-start; gap: 16px; }
    .security-footer-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(11,122,78,0.1); border: 1px solid rgba(11,122,78,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
    .security-footer-text { font-size: 15px; color: var(--slate); line-height: 1.6; }
    .security-footer-text strong { color: var(--navy); }

    /* QUOTE */
    .quote-section { background: #fff; border-top: 1px solid var(--border); }
    .quote-inner { max-width: 900px; margin: 0 auto; padding: 80px 48px; text-align: center; }
    .quote-mark { font-family: 'Playfair Display', serif; font-size: 80px; color: var(--border); line-height: 0.5; margin-bottom: 32px; display: block; }
    .quote-text { font-family: 'Playfair Display', serif; font-size: clamp(20px,2.5vw,30px); font-style: italic; line-height: 1.5; color: var(--navy); margin-bottom: 32px; }
    .quote-author { font-size: 14px; color: var(--slate); font-weight: 500; }
    .quote-author span { color: var(--slate-light); font-weight: 400; }

    /* WAITLIST */
    .waitlist-section { background: var(--navy); }
    .waitlist-inner { max-width: 1280px; margin: 0 auto; padding: 100px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .waitlist-left .section-title { color: #fff; }
    .waitlist-left .section-sub { color: rgba(255,255,255,0.6); }
    .waitlist-left .section-eyebrow { color: var(--gold-light); }
    .perks { margin-top: 36px; display: flex; flex-direction: column; gap: 16px; }
    .perk { display: flex; align-items: flex-start; gap: 14px; }
    .perk-check { width: 24px; height: 24px; border-radius: 50%; background: rgba(11,122,78,0.25); border: 1px solid rgba(11,122,78,0.5); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
    .perk-text { font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.5; }
    .perk-text strong { color: #fff; }
    .waitlist-card { background: #fff; border-radius: 20px; padding: 44px 40px; box-shadow: 0 32px 80px rgba(0,0,0,0.3); }
    .waitlist-card-tag { display: inline-flex; align-items: center; gap: 6px; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; background: rgba(201,151,44,0.12); border: 1px solid rgba(201,151,44,0.35); color: var(--gold); padding: 5px 12px; border-radius: 4px; margin-bottom: 20px; }
    .waitlist-card h3 { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
    .waitlist-card p { font-size: 15px; color: var(--slate); line-height: 1.6; margin-bottom: 28px; }
    .spots-bar { background: var(--border); border-radius: 4px; height: 6px; margin-bottom: 8px; overflow: hidden; }
    .spots-fill { height: 100%; background: linear-gradient(90deg,var(--blue-accent),var(--blue-light)); border-radius: 4px; width: 67%; }
    .spots-label { font-size: 12px; color: var(--slate-light); margin-bottom: 24px; }
    .spots-label strong { color: var(--navy); }
    .card-input { width: 100%; padding: 14px 18px; border: 1.5px solid var(--border); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--navy); outline: none; margin-bottom: 10px; transition: border-color 0.2s, box-shadow 0.2s; }
    .card-input:focus { border-color: var(--blue-accent); box-shadow: 0 0 0 3px rgba(30,79,194,0.1); }
    .card-input::placeholder { color: #aab; }
    .card-btn { width: 100%; padding: 15px; background: var(--blue-accent); color: #fff; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 4px; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; }
    .card-btn:hover { background: var(--blue-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(30,79,194,0.3); }
    .card-fine { margin-top: 14px; font-size: 12px; color: var(--slate-light); text-align: center; line-height: 1.5; }

    /* FOOTER */
    footer { background: #fff; border-top: 1px solid var(--border); padding: 40px 48px; }
    .footer-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
    .footer-logo { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--navy); }
    .footer-logo span { color: var(--blue-accent); }
    .footer-links { display: flex; gap: 28px; }
    .footer-link { font-size: 13px; color: var(--slate-light); text-decoration: none; transition: color 0.2s; }
    .footer-link:hover { color: var(--navy); }
    .footer-copy { font-size: 13px; color: var(--slate-light); }

    .success-msg { display: none; background: rgba(11,122,78,0.08); border: 1px solid rgba(11,122,78,0.3); border-radius: 8px; padding: 14px 18px; color: var(--success); font-size: 14px; font-weight: 500; margin-top: 12px; }
    .success-msg.visible { display: block; }
    .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }

    /* OLD WAY VS NEW WAY */
    .oldnew-section { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .oldnew-inner { max-width: 1280px; margin: 0 auto; padding: 100px 48px; }
    .oldnew-grid { display: grid; grid-template-columns: 1fr 1fr; margin-top: 56px; border-radius: 16px; overflow: hidden; border: 1px solid var(--border); }
    .oldnew-col-old { background: #f5f5f5; border-top: 3px solid #c53030; }
    .oldnew-col-new { background: var(--navy); border-top: 3px solid var(--blue-accent); }
    .oldnew-header { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; padding: 24px 32px 16px; }
    .oldnew-col-old .oldnew-header { color: var(--slate); }
    .oldnew-col-new .oldnew-header { color: rgba(255,255,255,0.5); }
    .oldnew-row { display: flex; align-items: flex-start; gap: 14px; padding: 18px 32px; border-top: 1px solid; font-size: 15px; line-height: 1.5; }
    .oldnew-col-old .oldnew-row { border-color: #e5e5e5; color: var(--slate); }
    .oldnew-col-new .oldnew-row { border-color: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85); }
    .oldnew-icon { width: 20px; height: 20px; flex-shrink: 0; margin-top: 2px; }

    /* PRICING */
    .pricing-founding-line { text-align: center; font-size: 15px; color: var(--slate); margin-bottom: 48px; }
    .pricing-founding-line strong { color: var(--navy); font-weight: 600; }
    .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 80px; }
    .pricing-card { background: #fff; border: 1.5px solid var(--border); border-radius: 16px; padding: 44px 40px; position: relative; transition: box-shadow 0.3s, transform 0.2s; }
    .pricing-card:hover { box-shadow: 0 16px 48px rgba(15,31,61,0.1); transform: translateY(-2px); }
    .pricing-card.popular { border-color: var(--blue-accent); box-shadow: 0 16px 48px rgba(30,79,194,0.12); }
    .pricing-popular-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--blue-accent); color: #fff; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; padding: 6px 18px; border-radius: 20px; white-space: nowrap; }
    .pricing-tier { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue-accent); margin-bottom: 12px; }
    .pricing-price { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700; color: var(--navy); line-height: 1; margin-bottom: 4px; }
    .pricing-price span { font-size: 18px; font-weight: 400; color: var(--slate-light); }
    .pricing-original { font-family: 'DM Sans', sans-serif; font-size: 20px; font-weight: 500; color: var(--slate-light); text-decoration: line-through; margin-right: 10px; }
    .pricing-features { list-style: none; padding: 0; margin: 28px 0 36px; display: flex; flex-direction: column; gap: 14px; }
    .pricing-features li { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: var(--slate); line-height: 1.5; }
    .pricing-features li svg { flex-shrink: 0; margin-top: 3px; }
    .pricing-btn { width: 100%; padding: 15px; background: var(--navy); color: #fff; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; }
    .pricing-btn:hover { background: var(--navy-mid); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(15,31,61,0.2); }
    .pricing-card.popular .pricing-btn { background: var(--blue-accent); }
    .pricing-card.popular .pricing-btn:hover { background: var(--blue-light); box-shadow: 0 8px 24px rgba(30,79,194,0.3); }
    .card-select { width: 100%; padding: 14px 18px; border: 1.5px solid var(--border); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--navy); outline: none; margin-bottom: 10px; transition: border-color 0.2s, box-shadow 0.2s; background: #fff; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23718096' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 18px center; padding-right: 44px; }
    .card-select:focus { border-color: var(--blue-accent); box-shadow: 0 0 0 3px rgba(30,79,194,0.1); }
    .card-select option { color: var(--navy); }

    /* MOCK UI */
    .mockui-section { background: #fff; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .mockui-inner { max-width: 1280px; margin: 0 auto; padding: 100px 48px; }
    .mockui-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 56px; }
    .mockui-screen { background: #fff; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: 0 16px 48px rgba(15,31,61,0.08); }
    .mockui-titlebar { background: var(--navy); padding: 16px 24px; display: flex; align-items: center; gap: 8px; }
    .mockui-dot { width: 10px; height: 10px; border-radius: 50%; }
    .mockui-dot-r { background: #ff5f57; }
    .mockui-dot-y { background: #ffbd2e; }
    .mockui-dot-g { background: #28c840; }
    .mockui-titlebar-text { font-family: 'DM Mono', monospace; font-size: 11px; color: rgba(255,255,255,0.5); margin-left: 8px; letter-spacing: 0.05em; }
    .mockui-header { padding: 24px 28px 0; }
    .mockui-header-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
    .mockui-header-sub { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--slate-light); }
    .mockui-body { padding: 20px 28px 28px; }
    .mockui-upload { border: 2px dashed var(--border); border-radius: 12px; padding: 28px; text-align: center; margin-bottom: 16px; transition: border-color 0.2s; }
    .mockui-upload:hover { border-color: var(--blue-accent); }
    .mockui-upload-icon { margin-bottom: 10px; }
    .mockui-upload-text { font-size: 14px; color: var(--slate); margin-bottom: 10px; }
    .mockui-upload-text strong { color: var(--navy); }
    .mockui-filetypes { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
    .mockui-filetype { display: flex; align-items: center; gap: 4px; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.05em; text-transform: uppercase; color: var(--slate-light); background: var(--cream); border: 1px solid var(--border); padding: 4px 10px; border-radius: 4px; }
    .mockui-textarea { width: 100%; min-height: 60px; padding: 14px 16px; border: 1.5px solid var(--border); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--navy); resize: none; outline: none; margin-bottom: 14px; background: var(--cream); }
    .mockui-textarea::placeholder { color: #aab; }
    .mockui-generate-btn { width: 100%; padding: 12px; background: var(--blue-accent); color: #fff; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: default; }
    .mockui-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--slate-light); margin-bottom: 10px; }
    .mockui-preview { margin-top: 20px; }
    .mockui-preview-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--slate-light); margin-bottom: 12px; }
    .mockui-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .mockui-layout-left { display: flex; flex-direction: column; gap: 16px; }

    .mockui-integrations-row { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
    .mockui-integration-chip { display: flex; align-items: center; gap: 8px; background: var(--cream); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; font-size: 13px; font-weight: 500; color: var(--navy); }
    .mockui-connected-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--success); }
    .mockui-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .mockui-table th { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--slate-light); text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--border); font-weight: 500; }
    .mockui-table td { font-size: 13px; color: var(--navy); padding: 12px 12px; border-bottom: 1px solid var(--border); }
    .mockui-badge { display: inline-block; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; border-radius: 4px; font-weight: 500; }
    .mockui-badge-sent { background: rgba(11,122,78,0.1); color: var(--success); border: 1px solid rgba(11,122,78,0.2); }
    .mockui-badge-review { background: rgba(201,151,44,0.12); color: var(--gold); border: 1px solid rgba(201,151,44,0.3); }
    .mockui-badge-scheduled { background: rgba(30,79,194,0.08); color: var(--blue-accent); border: 1px solid rgba(30,79,194,0.18); }
    .mockui-queue { background: var(--cream); border: 1px solid var(--border); border-radius: 10px; padding: 18px 20px; }
    .mockui-queue-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--slate-light); margin-bottom: 12px; }
    .mockui-queue-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .mockui-queue-info { flex: 1; }
    .mockui-queue-name { font-size: 14px; font-weight: 600; color: var(--navy); margin-bottom: 2px; }
    .mockui-queue-sub { font-size: 12px; color: var(--slate-light); }
    .mockui-queue-actions { display: flex; gap: 8px; }
    .mockui-btn-approve { padding: 8px 16px; background: var(--success); color: #fff; border: none; border-radius: 6px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: default; }
    .mockui-btn-edit { padding: 8px 16px; background: #fff; color: var(--navy); border: 1.5px solid var(--border); border-radius: 6px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: default; }

    /* MINI NEWSLETTER PREVIEW (mock ui) */
    .mockui-mini-card { background: #fff; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(15,31,61,0.06); }
    .mockui-mini-card-header { background: var(--navy); padding: 12px 16px; display: flex; align-items: center; gap: 8px; }
    .mockui-mini-card-logo { width: 22px; height: 22px; border-radius: 5px; background: var(--blue-light); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 9px; font-weight: 700; color: #fff; }
    .mockui-mini-card-title { font-size: 11px; color: rgba(255,255,255,0.85); font-weight: 500; }
    .mockui-mini-card-body { padding: 14px 16px; }
    .mockui-mini-card-date { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; color: var(--slate-light); text-transform: uppercase; margin-bottom: 6px; }
    .mockui-mini-card-headline { font-family: 'Playfair Display', serif; font-size: 13px; font-weight: 700; color: var(--navy); line-height: 1.3; margin-bottom: 6px; }
    .mockui-mini-card-snippet { font-size: 11px; color: var(--slate); line-height: 1.5; }

    @media (max-width: 960px) {
      nav { padding: 0 24px; }
      .hero { grid-template-columns: 1fr; padding: 120px 24px 60px; gap: 48px; }
      .hero-visual { display: none; }
      .problem-grid, .security-grid { grid-template-columns: 1fr; }
      .pipeline { grid-template-columns: 1fr; }
      .pipeline-arrow { display: none; }
      .features-grid { grid-template-columns: 1fr; }
      .feature-card.featured { grid-column: span 1; grid-template-columns: 1fr; }
      .integrations-layout { grid-template-columns: 1fr; gap: 48px; }
      .waitlist-inner { grid-template-columns: 1fr; }
      .oldnew-grid { grid-template-columns: 1fr; }
      .oldnew-inner { padding: 60px 24px; }
      .pricing-grid { grid-template-columns: 1fr; }
      .mockui-grid { grid-template-columns: 1fr; }
      .mockui-inner { padding: 60px 24px; }
      .mockui-layout { grid-template-columns: 1fr; }
      .section, .security-inner, .integrations-inner { padding: 60px 24px; }
      .logos-bar { padding: 24px; }
      .security-grid { grid-template-columns: repeat(2,1fr); }
    }
`;

export default function Page() {
  useEffect(() => {
    // Intersection observer for fade-up animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Hero signup
    const heroBtn = document.getElementById('hero-btn');
    if (heroBtn) {
      heroBtn.addEventListener('click', function() {
        const email = (document.getElementById('hero-email') as HTMLInputElement)?.value;
        if (!email || !email.includes('@')) { (document.getElementById('hero-email') as HTMLElement)?.focus(); return; }
        document.getElementById('hero-success')?.classList.add('visible');
        (document.getElementById('hero-email') as HTMLInputElement).value = '';
      });
    }

    // Waitlist signup
    const waitlistBtn = document.getElementById('waitlist-btn');
    if (waitlistBtn) {
      waitlistBtn.addEventListener('click', function() {
        const name = (document.getElementById('waitlist-name') as HTMLInputElement)?.value;
        const email = (document.getElementById('waitlist-email') as HTMLInputElement)?.value;
        if (!name || !email || !email.includes('@')) return;
        document.getElementById('waitlist-success')?.classList.add('visible');
        (document.getElementById('waitlist-name') as HTMLInputElement).value = '';
        (document.getElementById('waitlist-email') as HTMLInputElement).value = '';
        (document.getElementById('waitlist-company') as HTMLInputElement).value = '';
        const spotsFill = document.querySelector('.spots-fill') as HTMLElement;
        if (spotsFill) spotsFill.style.width = '70%';
        const spotsLabel = document.querySelector('.spots-label');
        if (spotsLabel) spotsLabel.innerHTML = '<strong>68 / 100</strong> founding spots taken';
      });
    }

    // Pricing buttons scroll to waitlist and pre-fill tier
    document.querySelectorAll('.pricing-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tier = btn.getAttribute('data-tier') || '';
        const tierInput = document.getElementById('waitlist-tier') as HTMLInputElement;
        if (tierInput) tierInput.value = tier;
        document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Hero entrance animation
    const heroLeft = document.querySelector('.hero-left') as HTMLElement;
    if (heroLeft) {
      heroLeft.style.opacity = '0'; heroLeft.style.transform = 'translateY(20px)';
      setTimeout(() => { heroLeft.style.transition = 'opacity 0.8s ease, transform 0.8s ease'; heroLeft.style.opacity = '1'; heroLeft.style.transform = 'translateY(0)'; }, 100);
    }
    const heroVisual = document.querySelector('.hero-visual') as HTMLElement;
    if (heroVisual) {
      heroVisual.style.opacity = '0'; heroVisual.style.transform = 'translateY(20px)';
      setTimeout(() => { heroVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease'; heroVisual.style.opacity = '1'; heroVisual.style.transform = 'translateY(0)'; }, 300);
    }

    // Cleanup
    return () => { observer.disconnect(); };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssString }} />

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">Partner<span>Brief</span></a>
        <div className="nav-right">
          <a href="#how" className="nav-link">How it works</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#integrations" className="nav-link">Integrations</a>
          <a href="#security" className="nav-link">Security</a>
          <a href="#pricing" className="nav-cta">See pricing</a>
        </div>
      </nav>

      {/* HERO */}
      <section>
        <div className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow"><span className="eyebrow-dot"></span>67 of 100 founding spots remaining</div>
            <h1>Your partners stay<br /><em>informed, engaged,</em><br />and selling.</h1>
            <p className="hero-sub">Partner Brief turns your notes, calls, and data into personalized partner newsletters and audio briefings. Delivered automatically. Read every time.</p>
            <p className="hero-proof">Designed for B2B teams with channel, reseller, and agency partners</p>
            <div className="waitlist-form">
              <input className="waitlist-input" id="hero-email" type="email" placeholder="your@company.com" />
              <button className="waitlist-btn" id="hero-btn">Claim your founding rate</button>
            </div>
            <div className="success-msg" id="hero-success">Your spot is reserved. We will be in touch with early access details.</div>
            <div className="founding-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#0b7a4e" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Founding members get free beta access and lifetime pricing lock
            </div>
          </div>
          <div className="hero-visual">
            <div className="float-badge">
              <div className="float-badge-icon"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9l3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div><div className="float-badge-text">Newsletter sent</div><div className="float-badge-sub">APAC Partner Digest · just now</div></div>
            </div>
            <div className="newsletter-card">
              <div className="card-header">
                <div className="card-header-left">
                  <div className="card-logo-dot">PB</div>
                  <div><div className="card-header-text">Acme Corp Partner Brief</div><div className="card-header-sub">West Coast Region · Weekly Digest</div></div>
                </div>
                <div className="card-tag">Auto-generated</div>
              </div>
              <div className="card-body">
                <div className="card-date">Week of March 8, 2026</div>
                <div className="card-headline">Q1 momentum accelerates: your region leads new logo growth</div>
                <div className="card-snippet">Three deals closed in your pipeline this week. Deal velocity is up 22% vs. last quarter. Here is what is moving, what is changing, and what to lead with in your next prospect conversation.</div>
                <div className="card-divider"></div>
                <div className="card-sections">
                  <div>
                    <div className="card-section-label">Product updates</div>
                    <div className="card-section-item">v4.2 release, new API</div>
                    <div className="card-section-item">Updated sell sheets</div>
                    <div className="card-section-item">New use case: fintech</div>
                  </div>
                  <div>
                    <div className="card-section-label">Market intel</div>
                    <div className="card-section-item">Gartner: category up 34%</div>
                    <div className="card-section-item">Win story: Fortune 500</div>
                    <div className="card-section-item">Competitor gap spotted</div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="card-footer-sources"><span>Sources:</span><span className="source-chip">Slack</span><span className="source-chip">Gong</span><span className="source-chip">HubSpot</span></div>
                <button className="card-audio-btn">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><path d="M1 1.5L9 6L1 10.5V1.5Z"/></svg>
                  Listen
                </button>
              </div>
            </div>
            <div className="float-badge-2">
              <div className="float-badge-2-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="rgba(255,255,255,0.0)" strokeWidth="1.2"/><path d="M6 6l4 2-4 2V6z" fill="rgba(255,255,255,0.7)"/></svg></div>
              <div><div className="float-badge-text">Audio brief ready</div><div className="float-badge-sub">3 min · 12 partners notified</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <div className="logos-bar">
        <div className="logos-inner">
          <div className="logos-label">Built to connect with</div>
          <div className="logos-list">
            <div className="logo-item">Slack</div><div className="logo-item">HubSpot</div><div className="logo-item">Salesforce</div>
            <div className="logo-item">Gong</div><div className="logo-item">Notion</div><div className="logo-item">Google Drive</div><div className="logo-item">Chorus</div>
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <section>
        <div className="section">
          <div className="section-eyebrow">The problem</div>
          <h2 className="section-title">PRMs promised the world.<br /><em>Partners ignored them.</em></h2>
          <p className="section-sub">Partner engagement tools are expensive, clunky, and built for the vendor. The result? Partners go dark, generic emails land in spam, and your best relationships drift to competitors.</p>
          <div className="problem-grid">
            <div className="problem-card fade-up"><div className="problem-num">01</div><div className="problem-title">Partners ignore generic comms</div><div className="problem-desc">Blast emails with no context, no relevance, no urgency. Partners have learned to tune them out entirely. Your updates never land.</div></div>
            <div className="problem-card fade-up" style={{transitionDelay:'.1s'}}><div className="problem-num">02</div><div className="problem-title">PRMs are expensive graveyards</div><div className="problem-desc">Six-figure platforms that only your internal team logs into. Partners don&#39;t want another portal. They want answers in their inbox, fast.</div></div>
            <div className="problem-card fade-up" style={{transitionDelay:'.2s'}}><div className="problem-num">03</div><div className="problem-title">Manual updates don&#39;t scale</div><div className="problem-desc">Partner managers juggling dozens of relationships, manually writing updates each week. It is unsustainable, and it shows in engagement rates.</div></div>
            <div className="problem-card fade-up" style={{transitionDelay:'.3s'}}><div className="problem-num">04</div><div className="problem-title">Partners don&#39;t know what to sell</div><div className="problem-desc">Product launches, updated decks, win stories, competitive intel. It lives in five tools your partners will never access. Deals die because of it.</div></div>
            <div className="problem-card fade-up" style={{transitionDelay:'.4s'}}><div className="problem-num">05</div><div className="problem-title">You are not top of mind</div><div className="problem-desc">Half the value of a partner relationship is staying relevant. When you go quiet, partners fill the gap with vendors who communicate better than you do.</div></div>
            <div className="problem-card fade-up" style={{transitionDelay:'.5s'}}><div className="problem-num">06</div><div className="problem-title">No context from internal systems</div><div className="problem-desc">Your best partner intelligence lives in Slack threads, call recordings, and CRM notes. None of it ever makes it into a partner-facing communication.</div></div>
          </div>
        </div>
      </section>

      {/* OLD WAY VS NEW WAY */}
      <section className="oldnew-section">
        <div className="oldnew-inner">
          <div className="section-eyebrow">The difference</div>
          <h2 className="section-title">Stop doing it the <em>old way.</em></h2>
          <div className="oldnew-grid">
            <div className="oldnew-col-old">
              <div className="oldnew-header">Old way</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#c53030" strokeWidth="1.3"/><path d="M7 7l6 6M13 7l-6 6" stroke="#c53030" strokeWidth="1.5" strokeLinecap="round"/></svg>Generic blast emails nobody opens</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#c53030" strokeWidth="1.3"/><path d="M7 7l6 6M13 7l-6 6" stroke="#c53030" strokeWidth="1.5" strokeLinecap="round"/></svg>Chase partners for updates</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#c53030" strokeWidth="1.3"/><path d="M7 7l6 6M13 7l-6 6" stroke="#c53030" strokeWidth="1.5" strokeLinecap="round"/></svg>Six-figure PRM nobody logs into</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#c53030" strokeWidth="1.3"/><path d="M7 7l6 6M13 7l-6 6" stroke="#c53030" strokeWidth="1.5" strokeLinecap="round"/></svg>Hours writing updates manually</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#c53030" strokeWidth="1.3"/><path d="M7 7l6 6M13 7l-6 6" stroke="#c53030" strokeWidth="1.5" strokeLinecap="round"/></svg>Partners go dark between QBRs</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#c53030" strokeWidth="1.3"/><path d="M7 7l6 6M13 7l-6 6" stroke="#c53030" strokeWidth="1.5" strokeLinecap="round"/></svg>Broken enablement and scattered assets</div>
            </div>
            <div className="oldnew-col-new">
              <div className="oldnew-header">New way</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#0b7a4e" strokeWidth="1.3"/><path d="M6.5 10l2.5 2.5 4.5-5" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Personalized briefings by partner, region, and tier</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#0b7a4e" strokeWidth="1.3"/><path d="M6.5 10l2.5 2.5 4.5-5" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Partners come to you already informed</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#0b7a4e" strokeWidth="1.3"/><path d="M6.5 10l2.5 2.5 4.5-5" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Delivered to their inbox automatically</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#0b7a4e" strokeWidth="1.3"/><path d="M6.5 10l2.5 2.5 4.5-5" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Generated in minutes, reviewed in seconds</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#0b7a4e" strokeWidth="1.3"/><path d="M6.5 10l2.5 2.5 4.5-5" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Top of mind every single week</div>
              <div className="oldnew-row"><svg className="oldnew-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#0b7a4e" strokeWidth="1.3"/><path d="M6.5 10l2.5 2.5 4.5-5" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Relevant content surfaced at exactly the right time</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-bg" id="how">
        <div className="section">
          <div className="section-eyebrow">How it works</div>
          <h2 className="section-title">Connect once.<br />Brief partners forever.</h2>
          <p className="section-sub">Up and running in minutes. No IT required.</p>
          <div className="pipeline">
            <div className="pipeline-stage">
              <div className="pipeline-stage-label">01 · Share</div>
              <div className="pipeline-stage-title">Share what you know</div>
              <div className="pipeline-items">
                <div className="pipeline-item"><div className="pipeline-item-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1"/><path d="M5 5l3.5 1.5L5 8V5z" fill="rgba(255,255,255,0.6)"/></svg></div>Upload a transcript</div>
                <div className="pipeline-item"><div className="pipeline-item-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="11" height="11" rx="2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1"/><path d="M3.5 6.5h6M3.5 4h6M3.5 9h4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" strokeLinecap="round"/></svg></div>Paste your notes</div>
                <div className="pipeline-item"><div className="pipeline-item-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M7.5 1H3a1 1 0 00-1 1v9a1 1 0 001 1h7a1 1 0 001-1V5.5L7.5 1z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1"/><path d="M7.5 1v4.5H12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1"/></svg></div>Share a doc</div>
                <div className="pipeline-item"><div className="pipeline-item-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 2v2.5M6.5 8.5V11M2 6.5h2.5M8.5 6.5H11" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" strokeLinecap="round"/><circle cx="6.5" cy="6.5" r="2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1"/></svg></div>Connect a source</div>
              </div>
              <div style={{marginTop:'12px',fontSize:'13px',color:'rgba(255,255,255,0.45)',lineHeight:'1.5'}}>Whatever you have works.</div>
            </div>
            <div className="pipeline-arrow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M14 7l5 5-5 5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
            <div className="pipeline-stage pipeline-middle">
              <div className="pipeline-stage-label">02 · Generate</div>
              <div className="pipeline-stage-title">We do the rest</div>
              <div className="pipeline-items">
                <div className="pipeline-item"><div className="pipeline-item-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1l1.2 3.2H11l-2.5 1.9 1 3.1-3.5-2.4L3.5 9.2l1-3.1L2 4.2h3.3L6.5 1z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.1" strokeLinejoin="round"/></svg></div>Personalized newsletter</div>
                <div className="pipeline-item"><div className="pipeline-item-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.1"/><path d="M5 5l3.5 1.5L5 8V5z" fill="rgba(255,255,255,0.9)"/></svg></div>Audio briefing</div>
                <div className="pipeline-item"><div className="pipeline-item-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="11" height="11" rx="2" stroke="rgba(255,255,255,0.9)" strokeWidth="1.1"/><path d="M3.5 6.5h6M3.5 4h6M3.5 9h4" stroke="rgba(255,255,255,0.9)" strokeWidth="1.1" strokeLinecap="round"/></svg></div>Formatted and ready to send</div>
              </div>
              <div style={{marginTop:'12px',fontSize:'13px',color:'rgba(255,255,255,0.7)',lineHeight:'1.5'}}>Partner Brief turns it into a personalized newsletter and audio briefing, formatted and ready to send.</div>
            </div>
            <div className="pipeline-arrow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M14 7l5 5-5 5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
            <div className="pipeline-stage">
              <div className="pipeline-stage-label">03 · Send</div>
              <div className="pipeline-stage-title">Review and send</div>
              <div className="pipeline-items">
                <div className="pipeline-item"><div className="pipeline-item-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3.5 3.5 5.5-6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></div>Approve in one click</div>
                <div className="pipeline-item"><div className="pipeline-item-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5a1 1 0 011-1h7a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1v-6z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1"/><path d="M2 5l4.5 3L11 5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" strokeLinecap="round"/></svg></div>Delivered to their inbox</div>
                <div className="pipeline-item"><div className="pipeline-item-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="11" height="11" rx="2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1"/><path d="M3.5 6.5h6M3.5 4h6M3.5 9h4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" strokeLinecap="round"/></svg></div>Your format, every time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOCK UI */}
      <section className="mockui-section">
        <div className="mockui-inner">
          <div className="section-eyebrow">The platform</div>
          <h2 className="section-title">See it in <em>action.</em></h2>
          <div className="mockui-grid">
            {/* Screen 1: Starter flow */}
            <div className="mockui-screen fade-up">
              <div className="mockui-titlebar">
                <div className="mockui-dot mockui-dot-r"></div>
                <div className="mockui-dot mockui-dot-y"></div>
                <div className="mockui-dot mockui-dot-g"></div>
                <div className="mockui-titlebar-text">partnerbrief.com</div>
              </div>
              <div className="mockui-header">
                <div className="mockui-header-title">Create a briefing in minutes</div>
                <div className="mockui-header-sub">Starter workflow</div>
              </div>
              <div className="mockui-body">
                <div className="mockui-layout">
                  <div className="mockui-layout-left">
                    <div className="mockui-upload">
                      <div className="mockui-upload-icon">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="24" height="24" rx="4" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3"/><path d="M16 11v10M12 15l4-4 4 4" stroke="var(--slate-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div className="mockui-upload-text"><strong>Drop files here</strong> or click to browse</div>
                      <div className="mockui-filetypes">
                        <span className="mockui-filetype"><svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M6 0.5H1.5A1 1 0 000.5 1.5v9a1 1 0 001 1h7a1 1 0 001-1V4L6 0.5z" stroke="var(--slate-light)" strokeWidth="0.8"/></svg>CSV</span>
                        <span className="mockui-filetype"><svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M6 0.5H1.5A1 1 0 000.5 1.5v9a1 1 0 001 1h7a1 1 0 001-1V4L6 0.5z" stroke="var(--slate-light)" strokeWidth="0.8"/></svg>PDF</span>
                        <span className="mockui-filetype"><svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M6 0.5H1.5A1 1 0 000.5 1.5v9a1 1 0 001 1h7a1 1 0 001-1V4L6 0.5z" stroke="var(--slate-light)" strokeWidth="0.8"/></svg>DOCX</span>
                        <span className="mockui-filetype"><svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M6 0.5H1.5A1 1 0 000.5 1.5v9a1 1 0 001 1h7a1 1 0 001-1V4L6 0.5z" stroke="var(--slate-light)" strokeWidth="0.8"/></svg>Transcript</span>
                      </div>
                    </div>
                    <div>
                      <div className="mockui-label">Add any context or focus areas</div>
                      <textarea className="mockui-textarea" placeholder="e.g. Focus on EMEA pipeline wins and the new product launch..." readOnly></textarea>
                    </div>
                    <button className="mockui-generate-btn">Generate Briefing</button>
                  </div>
                  <div>
                    <div className="mockui-preview-label">Preview</div>
                    <div className="mockui-mini-card">
                      <div className="mockui-mini-card-header">
                        <div className="mockui-mini-card-logo">PB</div>
                        <div className="mockui-mini-card-title">Acme Corp Partner Brief</div>
                      </div>
                      <div className="mockui-mini-card-body">
                        <div className="mockui-mini-card-date">Week of March 18, 2026</div>
                        <div className="mockui-mini-card-headline">Q1 pipeline accelerates: 3 deals closed in your region</div>
                        <div className="mockui-mini-card-snippet">Deal velocity is up 22% vs. last quarter. New product launch assets ready for your next pitch...</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen 2: Connected flow */}
            <div className="mockui-screen fade-up" style={{transitionDelay:'.15s'}}>
              <div className="mockui-titlebar">
                <div className="mockui-dot mockui-dot-r"></div>
                <div className="mockui-dot mockui-dot-y"></div>
                <div className="mockui-dot mockui-dot-g"></div>
                <div className="mockui-titlebar-text">partnerbrief.com</div>
              </div>
              <div className="mockui-header">
                <div className="mockui-header-title">Fully automated for connected teams</div>
                <div className="mockui-header-sub">Connected workflow</div>
              </div>
              <div className="mockui-body">
                <div className="mockui-label">Integration status</div>
                <div className="mockui-integrations-row">
                  <div className="mockui-integration-chip"><div className="mockui-connected-dot"></div>Slack</div>
                  <div className="mockui-integration-chip"><div className="mockui-connected-dot"></div>HubSpot</div>
                  <div className="mockui-integration-chip"><div className="mockui-connected-dot"></div>Gong</div>
                  <div className="mockui-integration-chip"><div className="mockui-connected-dot"></div>Google Drive</div>
                </div>
                <table className="mockui-table">
                  <thead>
                    <tr><th>Partner</th><th>Region</th><th>Last sent</th><th>Open rate</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    <tr><td style={{fontWeight:600}}>Acme Corp</td><td>West Coast</td><td>Mar 15</td><td>78%</td><td><span className="mockui-badge mockui-badge-sent">Sent</span></td></tr>
                    <tr><td style={{fontWeight:600}}>NovaTech</td><td>EMEA</td><td>Mar 14</td><td>64%</td><td><span className="mockui-badge mockui-badge-review">In Review</span></td></tr>
                    <tr><td style={{fontWeight:600}}>Pinnacle</td><td>APAC</td><td>Mar 13</td><td>71%</td><td><span className="mockui-badge mockui-badge-scheduled">Scheduled</span></td></tr>
                  </tbody>
                </table>
                <div className="mockui-queue">
                  <div className="mockui-queue-label">Pending human review</div>
                  <div className="mockui-queue-item">
                    <div className="mockui-queue-info">
                      <div className="mockui-queue-name">NovaTech EMEA Digest</div>
                      <div className="mockui-queue-sub">Generated 12 min ago · 4 sections · 1,240 words</div>
                    </div>
                    <div className="mockui-queue-actions">
                      <button className="mockui-btn-approve">Approve</button>
                      <button className="mockui-btn-edit">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section>
        <div className="section">
          <div className="section-eyebrow">What you get</div>
          <h2 className="section-title">Everything your partners<br /><em>actually need to sell.</em></h2>
          <div className="features-grid">
            <div className="feature-card featured fade-up">
              <div>
                <div className="feature-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="3" width="18" height="16" rx="2" stroke="#fff" strokeWidth="1.5"/><path d="M6 8h10M6 12h7M6 16h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                <div className="feature-title">Hyper-personalized newsletters, automatically</div>
                <div className="feature-desc">Every partner gets a briefing that feels written just for them, because it is. Partner Brief pulls context from your internal systems and tailors each edition by partner tier, region, industry, and pipeline stage.</div>
                <div className="feature-tags"><span className="feature-tag">By partner</span><span className="feature-tag">By region</span><span className="feature-tag">By industry</span><span className="feature-tag">By team</span></div>
              </div>
              <div className="mini-newsletter">
                <div className="mini-nl-header"><div className="mini-nl-logo">Partner Brief</div><div className="mini-nl-badge">EMEA Edition</div></div>
                <div className="mini-nl-row"><div className="mini-nl-num">01</div><div className="mini-nl-content"><div className="mini-nl-tag">Product update</div><div className="mini-nl-title">New compliance feature, critical for your UK pipeline</div></div></div>
                <div className="mini-nl-row"><div className="mini-nl-num">02</div><div className="mini-nl-content"><div className="mini-nl-tag">Market intel</div><div className="mini-nl-title">DORA regulation opens new door for your fintech prospects</div></div></div>
                <div className="mini-nl-row"><div className="mini-nl-num">03</div><div className="mini-nl-content"><div className="mini-nl-tag">Win story</div><div className="mini-nl-title">How a partner in your region closed a {"\u00A3"}400K deal in 6 weeks</div></div></div>
              </div>
            </div>
            <div className="feature-card fade-up">
              <div className="feature-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="1.5"/><path d="M8.5 8l5 3-5 3V8z" fill="#fff"/></svg></div>
              <div className="feature-title">Audio briefings partners actually listen to</div>
              <div className="feature-desc">Not everyone reads. Partner Brief generates a polished 3 to 5 minute audio companion to every newsletter, perfect for partners on the road, between calls, or short on time.</div>
              <div className="feature-tags"><span className="feature-tag">Auto-generated</span><span className="feature-tag">3 to 5 min</span><span className="feature-tag">Mobile-first</span></div>
            </div>
            <div className="feature-card fade-up" style={{transitionDelay:'.1s'}}>
              <div className="feature-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="1.5"/><path d="M11 3c0 0-4 3.6-4 8s4 8 4 8M11 3c0 0 4 3.6 4 8s-4 8-4 8M3 11h16" stroke="#fff" strokeWidth="1.5"/></svg></div>
              <div className="feature-title">External research, woven in automatically</div>
              <div className="feature-desc">Partner Brief layers in market trends, analyst reports, and competitive signals that make your partners look smart in front of prospects, without you lifting a finger.</div>
              <div className="feature-tags"><span className="feature-tag">Market trends</span><span className="feature-tag">Analyst research</span><span className="feature-tag">Competitive intel</span></div>
            </div>
            <div className="feature-card fade-up">
              <div className="feature-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3v4M11 15v4M3 11h4M15 11h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="11" cy="11" r="3" stroke="#fff" strokeWidth="1.5"/></svg></div>
              <div className="feature-title">Zero manual effort after setup</div>
              <div className="feature-desc">Connect your tools once. Set your cadence. Partner Brief handles drafting, personalizing, scheduling, and sending. Your team gets a review step, not a writing assignment.</div>
              <div className="feature-tags"><span className="feature-tag">Fully automated</span><span className="feature-tag">Human review</span><span className="feature-tag">Custom cadence</span></div>
            </div>
            <div className="feature-card fade-up" style={{transitionDelay:'.1s'}}>
              <div className="feature-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="18" height="18" rx="3" stroke="#fff" strokeWidth="1.5"/><path d="M4 16l4-4 3 3 7-8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div className="feature-title">Engagement signals that close deals</div>
              <div className="feature-desc">Know which partners are reading, listening, and clicking. Surface the ones ready to act. Partner Brief turns passive communication into an active pipeline signal.</div>
              <div className="feature-tags"><span className="feature-tag">Open rates</span><span className="feature-tag">Click tracking</span><span className="feature-tag">Engagement scores</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="integrations-section" id="integrations">
        <div className="integrations-inner">
          <div className="section-eyebrow">Sources and integrations</div>
          <h2 className="section-title">First-party data meets<br /><em>real-world market intelligence.</em></h2>
          <p className="section-sub">Partner Brief pulls from inside your organization and outside it, weaving together internal context and live market signals into one coherent briefing, automatically.</p>
          <div className="integrations-layout">
            <div>
              <div className="integrations-col-label">External research and market signals</div>
              <div className="research-list">
                <div className="research-item fade-up">
                  <div className="research-item-icon"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 13l4-4 2.5 2.5 6-7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <div className="research-item-text"><div className="research-item-name">Analyst Reports</div><div className="research-item-desc">Gartner, Forrester, IDC. Surfaced and summarized by category relevance for each partner&#39;s market</div></div>
                  <div className="research-badge">Auto</div>
                </div>
                <div className="research-item fade-up" style={{transitionDelay:'.05s'}}>
                  <div className="research-item-icon"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#fff" strokeWidth="1.4"/><path d="M9 2c0 0-4 3-4 7s4 7 4 7M9 2c0 0 4 3 4 7s-4 7-4 7M2 9h14" stroke="#fff" strokeWidth="1.4"/></svg></div>
                  <div className="research-item-text"><div className="research-item-name">Industry News</div><div className="research-item-desc">Timely developments filtered by vertical, deal type, and partner territory. No noise, only what is relevant</div></div>
                  <div className="research-badge">Live</div>
                </div>
                <div className="research-item fade-up" style={{transitionDelay:'.1s'}}>
                  <div className="research-item-icon"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.8 4.5h4.7l-3.8 2.8 1.5 4.7L9 11.5l-4.2 2.5 1.5-4.7L2.5 6.5h4.7L9 2z" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round"/></svg></div>
                  <div className="research-item-text"><div className="research-item-name">Competitive Intelligence</div><div className="research-item-desc">Competitor moves, pricing changes, and positioning shifts, so your partners always have the edge in a pitch</div></div>
                  <div className="research-badge">Weekly</div>
                </div>
                <div className="research-item fade-up" style={{transitionDelay:'.15s'}}>
                  <div className="research-item-icon"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="11" rx="1.5" stroke="#fff" strokeWidth="1.4"/><path d="M6 4V3M12 4V3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/><path d="M2 8h14" stroke="#fff" strokeWidth="1.4"/></svg></div>
                  <div className="research-item-text"><div className="research-item-name">Regulatory Updates</div><div className="research-item-desc">Region-specific regulatory changes that open sales conversations or affect partner go-to-market motions</div></div>
                  <div className="research-badge">Regional</div>
                </div>
                <div className="research-item fade-up" style={{transitionDelay:'.2s'}}>
                  <div className="research-item-icon"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 13.5l3.5-5 3 2.5 3.5-5 3 5H3z" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round"/></svg></div>
                  <div className="research-item-text"><div className="research-item-name">Market Sizing and Trends</div><div className="research-item-desc">Category growth data and TAM signals your partners can use directly in prospect conversations and business cases</div></div>
                  <div className="research-badge">Quarterly</div>
                </div>
              </div>
            </div>
            <div>
              <div className="integrations-col-label">Internal tools and systems</div>
              <div className="integrations-grid">
                <div className="integration-item"><div className="integration-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="#718096" strokeWidth="1.1"/><path d="M3.5 7h7M3.5 4.5h7M3.5 9.5h4.5" stroke="#718096" strokeWidth="1.1" strokeLinecap="round"/></svg></div><div><div className="integration-name">Slack</div><div className="integration-type">Messaging</div></div></div>
                <div className="integration-item"><div className="integration-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="#718096" strokeWidth="1.1"/><path d="M2 12.5c0-2.2 2.2-4 5-4s5 1.8 5 4" stroke="#718096" strokeWidth="1.1" strokeLinecap="round"/></svg></div><div><div className="integration-name">HubSpot</div><div className="integration-type">CRM</div></div></div>
                <div className="integration-item"><div className="integration-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5a1 1 0 011-1h8a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1v-7z" stroke="#718096" strokeWidth="1.1"/><path d="M2 5.5l5 3 5-3" stroke="#718096" strokeWidth="1.1" strokeLinecap="round"/></svg></div><div><div className="integration-name">Salesforce</div><div className="integration-type">CRM</div></div></div>
                <div className="integration-item"><div className="integration-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#718096" strokeWidth="1.1"/><path d="M5 5.5l4 1.5-4 1.5V5.5z" fill="#718096"/></svg></div><div><div className="integration-name">Gong</div><div className="integration-type">Call recordings</div></div></div>
                <div className="integration-item"><div className="integration-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#718096" strokeWidth="1.1"/><path d="M5 5.5l4 1.5-4 1.5V5.5z" fill="#718096"/></svg></div><div><div className="integration-name">Chorus</div><div className="integration-type">Call recordings</div></div></div>
                <div className="integration-item"><div className="integration-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8 1H4a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1V5L8 1z" stroke="#718096" strokeWidth="1.1"/><path d="M8 1v4h4" stroke="#718096" strokeWidth="1.1"/></svg></div><div><div className="integration-name">Google Drive</div><div className="integration-type">Assets</div></div></div>
                <div className="integration-item"><div className="integration-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="#718096" strokeWidth="1.1"/><path d="M4.5 6h5M4.5 8.5h3.5" stroke="#718096" strokeWidth="1.1" strokeLinecap="round"/></svg></div><div><div className="integration-name">Notion</div><div className="integration-type">Knowledge base</div></div></div>
                <div className="integration-item"><div className="integration-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="10" rx="1.5" stroke="#718096" strokeWidth="1.1"/><path d="M5 3V2M9 3V2" stroke="#718096" strokeWidth="1.1" strokeLinecap="round"/><path d="M1.5 6.5h11" stroke="#718096" strokeWidth="1.1"/></svg></div><div><div className="integration-name">Asana</div><div className="integration-type">Projects</div></div></div>
                <div className="integration-item"><div className="integration-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="#718096" strokeWidth="1.1"/><path d="M4 7h6M7 4v6" stroke="#718096" strokeWidth="1.1" strokeLinecap="round"/></svg></div><div><div className="integration-name">MS Teams</div><div className="integration-type">Messaging</div></div></div>
                <div className="integration-item"><div className="integration-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11l3-4 2.5 2 3-4.5 2.5 4H2z" stroke="#718096" strokeWidth="1.1" strokeLinejoin="round"/></svg></div><div><div className="integration-name">Clari</div><div className="integration-type">Revenue intel</div></div></div>
                <div className="integration-item"><div className="integration-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8 1H4a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1V5L8 1z" stroke="#718096" strokeWidth="1.1"/><path d="M8 1v4h4" stroke="#718096" strokeWidth="1.1"/><path d="M4.5 8.5h5M4.5 10.5h3" stroke="#718096" strokeWidth="1.1" strokeLinecap="round"/></svg></div><div><div className="integration-name">SharePoint</div><div className="integration-type">Assets</div></div></div>
                <div className="integration-more">+ more integrations coming</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote-section">
        <div className="quote-inner">
          <span className="quote-mark">{"\u201C"}</span>
          <p className="quote-text">We were spending 8 hours a week writing partner updates that maybe 15% of them opened. Partner Brief automated all of it. Our partners actually tell us they look forward to it.</p>
          <div className="quote-author">Early design partner · VP Partnerships, Series B SaaS <span>· San Francisco</span></div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="security-section" id="security">
        <div className="security-inner">
          <div className="section-eyebrow">Security and trust</div>
          <h2 className="section-title">Built for enterprise data.<br /><em>No compromises.</em></h2>
          <p className="section-sub">Your internal data is your most valuable asset. Partner Brief is built from the ground up with strict data governance. Your information is never used to train AI models, never shared, and always yours to delete.</p>
          <div className="security-grid">
            <div className="security-card fade-up">
              <div className="security-card-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2L4 5.5v5c0 4.42 2.96 8.56 7 9.5 4.04-.94 7-5.08 7-9.5v-5L11 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 11l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="security-card-title">End-to-end encrypted</div>
              <div className="security-card-desc">All data in transit and at rest is encrypted using AES-256. Your Slack messages, CRM records, and call data are protected at every step of the pipeline.</div>
            </div>
            <div className="security-card fade-up" style={{transitionDelay:'.1s'}}>
              <div className="security-card-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="1.5"/><path d="M7 11h8M11 7v8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 8l6 6M14 8l-6 6" stroke="#fff" strokeWidth="0" strokeLinecap="round"/><path d="M11 7l-1.5 4H6l3 2.2-1.2 3.8L11 14.5l3.2 2.5-1.2-3.8 3-2.2H12.5L11 7z" stroke="#fff" strokeWidth="0"/><path d="M8 14c0-1.66 1.34-3 3-3s3 1.34 3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 8v3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div className="security-card-title">Your data never trains AI</div>
              <div className="security-card-desc">We use AI to generate your briefings, but your proprietary data is never fed back into model training. What is yours stays yours, full stop.</div>
            </div>
            <div className="security-card fade-up" style={{transitionDelay:'.2s'}}>
              <div className="security-card-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="9" width="16" height="11" rx="2" stroke="#fff" strokeWidth="1.5"/><path d="M7 9V7a4 4 0 018 0v2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="11" cy="15" r="1.5" fill="#fff"/></svg>
              </div>
              <div className="security-card-title">Used only for your output</div>
              <div className="security-card-desc">Your internal context is processed solely to generate your briefings. It is never sold, shared with other customers, or used for any purpose beyond creating your content.</div>
            </div>
            <div className="security-card fade-up" style={{transitionDelay:'.3s'}}>
              <div className="security-card-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><polyline points="3,6 3,3 21,3 21,6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="3" x2="12" y2="21" stroke="#fff" strokeWidth="0"/><path d="M11 3v18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 8l-4 4 4 4M15 8l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="security-card-title">Right to delete, always</div>
              <div className="security-card-desc">Request deletion of your data at any time: source connections, generated content, and all associated records. Actioned within 30 days, no questions asked.</div>
            </div>
          </div>
          <div className="security-footer fade-up">
            <div className="security-footer-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10.5l4 4 8-8" stroke="#0b7a4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="security-footer-text">
              <strong>Human review before every send.</strong> Every Partner Brief goes through a human approval step before it reaches a single partner inbox. You stay in control of what goes out. What gets sent is always your call.
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="section">
          <div className="section-eyebrow">Pricing</div>
          <h2 className="section-title">Simple pricing.<br /><em>Lock it in early.</em></h2>
          <p className="section-sub" style={{marginBottom:'48px'}}>First 100 founding members only. 67 spots remaining.</p>
          <div className="pricing-grid">
            <div className="pricing-card fade-up">
              <div className="pricing-tier">Starter</div>
              <div className="pricing-price"><span className="pricing-original">$149/mo</span>$49<span>/month</span></div>
              <ul className="pricing-features">
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Upload CSV, docs, or call transcripts</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>AI generates personalized newsletters</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Send to all partners in one click</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Up to 3 integrations</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Up to 50 partners</li>
              </ul>
              <button className="pricing-btn" data-tier="Starter">Join waitlist</button>
            </div>
            <div className="pricing-card popular fade-up" style={{transitionDelay:'.1s'}}>
              <div className="pricing-popular-badge">Most Popular</div>
              <div className="pricing-tier">Connected</div>
              <div className="pricing-price"><span className="pricing-original">$599/mo</span>$199<span>/month</span></div>
              <ul className="pricing-features">
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Write, dictate, or connect any source</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Full integrations with Slack, HubSpot, Gong, Google Drive, and more</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Fully automated, no uploads needed</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Unlimited partners</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Personalized by region, tier, and industry</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Human review before every send</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Engagement analytics</li>
              </ul>
              <button className="pricing-btn" data-tier="Connected">Join waitlist</button>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section className="waitlist-section" id="waitlist">
        <div className="waitlist-inner">
          <div className="waitlist-left">
            <div className="section-eyebrow">Founding members</div>
            <h2 className="section-title">Be first. Get it<br /><em>free. Lock it in.</em></h2>
            <p className="section-sub">We are onboarding our first 100 customers as design partners. Free beta access, real influence over the product, and a lifetime discount locked in forever.</p>
            <div className="perks">
              <div className="perk"><div className="perk-check"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div className="perk-text"><strong>Free beta access</strong>: get in before we go live and shape the product</div></div>
              <div className="perk"><div className="perk-check"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div className="perk-text"><strong>Lifetime early-adopter pricing</strong>: deeply discounted, locked in forever</div></div>
              <div className="perk"><div className="perk-check"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div className="perk-text"><strong>Direct access to the founding team</strong>: your use case, built in</div></div>
              <div className="perk"><div className="perk-check"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#0b7a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div className="perk-text"><strong>Priority onboarding</strong>: white-glove integration setup</div></div>
            </div>
          </div>
          <div className="waitlist-card">
            <div className="waitlist-card-tag">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="5.5" width="8" height="5.5" rx="1" stroke="#c9972c" strokeWidth="1.2"/><path d="M4 5.5V4a2 2 0 014 0v1.5" stroke="#c9972c" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Founding member offer
            </div>
            <h3>Claim your founding rate before it is gone.</h3>
            <p>67 of 100 founding spots claimed. Once they are gone, this offer closes.</p>
            <div className="spots-bar"><div className="spots-fill"></div></div>
            <div className="spots-label"><strong>67 / 100</strong> founding spots taken</div>
            <input type="hidden" id="waitlist-tier" value="" />
            <input className="card-input" id="waitlist-name" type="text" placeholder="Your name" />
            <input className="card-input" id="waitlist-email" type="email" placeholder="Work email" />
            <input className="card-input" id="waitlist-company" type="text" placeholder="Company and partner program size" />
            <select className="card-select" id="waitlist-partners" defaultValue="">
              <option value="" disabled>How many partners do you work with?</option>
              <option value="1-10">1–10</option>
              <option value="11-50">11–50</option>
              <option value="51-200">51–200</option>
              <option value="200+">200+</option>
            </select>
            <p style={{fontSize:'13px',color:'var(--success)',fontWeight:500,marginBottom:'10px',marginTop:'4px'}}>Your founding price is locked in the moment you sign up.</p>
            <button className="card-btn" id="waitlist-btn">Claim my founding spot</button>
            <div className="success-msg" id="waitlist-success">You are in. We will be in touch within 48 hours.</div>
            <p className="card-fine">No credit card required. We will reach out personally within 48 hours.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">Partner<span>Brief</span></div>
          <div className="footer-links">
            <a href="#how" className="footer-link">How it works</a>
            <a href="#integrations" className="footer-link">Integrations</a>
            <a href="#security" className="footer-link">Security</a>
            <a href="mailto:hello@partnerbrief.com" className="footer-link">Contact</a>
          </div>
          <div className="footer-copy">2026 Partner Brief. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
