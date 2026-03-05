"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { homestays } from "@/data/homestays";
import { X, ChevronLeft, ChevronRight, MapPin, Camera, Eye } from "lucide-react";

const homestayImages: Record<string, string[]> = {
  whitehouse: [
    "/whitehouse/12.webp", "/whitehouse/4.webp", "/whitehouse/11.webp",
    "/whitehouse/8.webp",  "/whitehouse/2.webp", "/whitehouse/h3.webp",
    "/whitehouse/h2.webp", "/whitehouse/6.webp",
  ],
  gardenvilla:   Array.from({ length: 9 },  (_, i) => `/Cottage/${i + 1}.webp`),
  cottagehouse:  Array.from({ length: 11 }, (_, i) => `/Cottage/${i + 1}.webp`),
  topvilla:      Array.from({ length: 8 },  (_, i) => `/hilltop/${i + 1}.webp`),
  sunrisehome:   Array.from({ length: 9 },  (_, i) => `/sunrise/${i + 1}.webp`),
  chaletlabonne: [
    '/chalet/new/1.JPG', '/chalet/new/2.webp', '/chalet/new/3.JPG',
    '/chalet/new/4.JPG', '/chalet/new/5.JPG', '/chalet/new/bedroom.webp',
    '/chalet/new/hall2.JPG', '/chalet/new/kitchen2.JPG', '/chalet/new/kitchen3.JPG',
    '/chalet/new/scene2.JPG', '/chalet/new/scene3.JPG'
  ],
  viewpoint:     Array.from({ length: 10 }, (_, i) => `/view/${i + 1}.webp`),
};

const routeKey = (r: string) => r.toLowerCase().replace(/\s+/g, "");
const getImages = (stay: typeof homestays[0]) =>
  homestayImages[routeKey(stay.route)] || [stay.image];

type ModalState = { stay: typeof homestays[0]; activeIdx: number } | null;

const CSS = `

:root {
  --serif: var(--font-navbar);
  --sans: var(--font-navbar);
  --gold: #849826;
  --gold2: #849826;
  --cream: #ffffff;
  --warm: #f7f7f7;
  --parchment: #e6e6e6;
  --bark: #161616;
  --fog: #575757;
  --sand: #cfcfcf;
  --leaf: #849826;
  --sky: #f2f2f2;
}

/* ── Base ── */
.ms-root {
  background: var(--cream);
  color: var(--bark);
  font-family: var(--sans);
  overflow-x: hidden;
  min-height: 100vh;
}

/* ── Reveal ── */
.ms-fade {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
}
.ms-fade.ms-vis { opacity: 1; transform: none; }

/* ═══ HERO ═══ */
.ms-hero {
  position: relative;
  height: 52vw; min-height: 260px; max-height: 540px;
  overflow: hidden;
  display: flex; align-items: flex-end;
}
.ms-hero-bg {
  position: absolute; inset: 0;
  will-change: transform;
}
.ms-hero-bg img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.10); }
.ms-hero-ov {
  position: absolute; inset: 0;
  background: linear-gradient(
    160deg,
    rgba(255,255,255,0.06) 0%,
    rgba(0,0,0,0.20) 40%,
    rgba(0,0,0,0.62) 100%
  );
}
.ms-hero-grain {
  position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px;
  mix-blend-mode: multiply;
  opacity: 0.5;
}
.ms-hero-body {
  position: relative; z-index: 2;
  padding: clamp(1.5rem,5vw,3.5rem) clamp(1.25rem,5vw,4rem);
  width: 100%;
}
.ms-hero-tag {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--sans); font-size: 9px; letter-spacing: 0.38em;
  text-transform: uppercase; font-weight: 500; color: var(--cream);
  line-height: 1.2;
  margin-bottom: 0.65rem;
}
.ms-hero-line { display: block; width: 28px; height: 1px; background: var(--gold); }
.ms-hero-h1 {
  font-family: var(--serif); font-size: clamp(32px,7vw,78px);
  font-weight: 600; line-height: 1.0; color: var(--cream);
  letter-spacing: 0.02em; text-transform: uppercase; margin-bottom: 0.5rem;
}
.ms-hero-bc {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--sans); font-size: 10px; letter-spacing: 0.12em; color: rgba(255,255,255,0.78);
}
.ms-bc-gold { color: var(--gold); }

/* ═══ INTRO ═══ */
.ms-intro {
  background: var(--warm);
  padding: clamp(2.5rem,6vh,5rem) clamp(1.25rem,5vw,4rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  position: relative;
}
@media (min-width: 680px) {
  .ms-intro { grid-template-columns: 1fr 1fr; align-items: center; }
}
.ms-eyebrow {
  font-family: var(--sans); font-size: 9px; font-weight: 500;
  letter-spacing: 0.38em; text-transform: uppercase; color: var(--gold);
  display: flex; align-items: center; gap: 8px; margin-bottom: 0.85rem;
}
.ms-eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: var(--gold); }
.ms-intro-h2 {
  font-family: var(--serif); font-size: clamp(24px,4vw,46px);
  font-weight: 700; line-height: 1.15; color: var(--bark);
  text-transform: uppercase; letter-spacing: 0.02em;
}
.ms-intro-h2 em { font-style: italic; color: var(--leaf); }
.ms-intro-p {
  font-family: var(--sans); font-size: clamp(13px,1.3vw,14.5px);
  font-weight: 300; color: var(--fog); line-height: 1.8;
  margin-top: 0.85rem; max-width: 400px;
}
.ms-stats {
  display: flex; flex-direction: column; gap: 1.25rem;
  padding-left: 0;
}
@media (min-width: 680px) {
  .ms-stats { padding-left: clamp(2rem,4vw,3rem); border-left: 1px solid var(--sand); }
}
.ms-stat { display: flex; align-items: baseline; gap: 0.85rem; }
.ms-stat-n {
  font-family: var(--serif); font-size: clamp(36px,5vw,54px);
  font-weight: 700; color: var(--gold2); line-height: 1;
}
.ms-stat-l {
  font-family: var(--sans); font-size: 9px; font-weight: 600;
  letter-spacing: 0.28em; text-transform: uppercase; color: var(--bark);
}
.ms-stat-d {
  font-family: var(--sans); font-size: 11px; font-weight: 300;
  color: var(--fog); margin-top: 2px;
}

/* ═══ FILTER — BOLD ═══ */
.ms-filter {
  background: var(--cream); border-bottom: 1px solid var(--parchment);
  position: sticky; top: 0; z-index: 30;
}
.ms-fi {
  max-width: 1400px; margin: 0 auto;
  padding: 0 clamp(1rem,4vw,2.5rem);
  display: flex; align-items: center;
  overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch;
}
.ms-fi::-webkit-scrollbar { display: none; }
.ms-fi-label {
  font-family: var(--sans); font-size: 9px; letter-spacing: 0.38em;
  text-transform: uppercase; color: var(--sand);
  padding-right: 1rem; border-right: 1px solid var(--parchment);
  margin-right: 0.25rem; flex-shrink: 0; white-space: nowrap;
  display: none;
}
@media (min-width: 480px) { .ms-fi-label { display: block; } }
.ms-ftag {
  font-family: var(--sans); font-size: 10px; font-weight: 800;
  letter-spacing: 0.24em; text-transform: uppercase;
  color: var(--fog); background: none; border: none; cursor: pointer;
  padding: 1rem 1.1rem; flex-shrink: 0; position: relative;
  white-space: nowrap; transition: color 0.22s;
  -webkit-tap-highlight-color: transparent;
}
.ms-ftag::after {
  content: ''; position: absolute; bottom: 0; left: 50%; right: 50%;
  height: 2px; background: var(--gold2);
  transition: left 0.3s cubic-bezier(0.22,1,0.36,1), right 0.3s cubic-bezier(0.22,1,0.36,1);
}
.ms-ftag:hover { color: var(--bark); }
.ms-ftag.ms-fon { color: var(--leaf); font-weight: 900; }
.ms-ftag.ms-fon::after { left: 1.1rem; right: 1.1rem; }

/* ═══ CARD GRID — 3 columns, every 7th full-width ═══ */
.ms-cardlist {
  max-width: 1200px; margin: 0 auto;
  padding: clamp(1.5rem,4vh,3rem) clamp(0.85rem,3vw,2rem) clamp(3rem,8vh,6rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(14px,2vw,20px);
}
@media (min-width: 600px) {
  .ms-cardlist { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .ms-cardlist { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 600px) {
  .ms-card-full { grid-column: 1 / -1; }
  .ms-card-full .ms-cimg { aspect-ratio: 21/9; }
  .ms-card-full .ms-ctitle h3 { font-size: clamp(20px,3vw,32px); }
}

/* ═══ STACKED CARD (same on all screen sizes) ═══ */
.ms-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background: var(--warm);
  box-shadow: 0 2px 14px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.1);
  transition: transform 0.5s cubic-bezier(0.22,1,0.36,1),
              box-shadow 0.5s cubic-bezier(0.22,1,0.36,1),
              border-color 0.35s;
  -webkit-tap-highlight-color: transparent;
  height: 420px;
}
@media (hover: hover) {
  .ms-card:hover {
    transform: translateY(-4px) scale(1.005);
    box-shadow: 0 20px 50px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.07);
    border-color: rgba(132,152,38,0.45);
  }
}

/* ── Image pane ── */
.ms-cimg {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/9;
  height: 320px;
}

.ms-cslide {
  position: absolute; inset: 0;
  will-change: transform, opacity;
  animation-duration: 340ms;
  animation-timing-function: cubic-bezier(0.22,1,0.36,1);
  animation-fill-mode: both;
}
.ms-cslide.ms-cslide-next { animation-name: msCardSlideInNext; }
.ms-cslide.ms-cslide-prev { animation-name: msCardSlideInPrev; }
@keyframes msCardSlideInNext {
  from { opacity: 0.3; transform: translateX(20px) scale(1.02); }
  to   { opacity: 1;   transform: translateX(0) scale(1); }
}
@keyframes msCardSlideInPrev {
  from { opacity: 0.3; transform: translateX(-20px) scale(1.02); }
  to   { opacity: 1;   transform: translateX(0) scale(1); }
}
.ms-cimg img { transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
@media (hover: hover) { .ms-card:hover .ms-cimg img { transform: scale(1.06); } }

.ms-cgrad {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.12) 45%, transparent 100%);
}

/* photo pill */
.ms-pill {
  position: absolute; top: 10px; left: 10px; z-index: 3;
  display: flex; align-items: center; gap: 4px;
  background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
  padding: 4px 9px; border-radius: 20px;
  font-family: var(--sans); font-size: 9px; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--leaf); font-weight: 600;
  border: 1px solid rgba(132,152,38,0.35);
}

/* subtitle tag */
.ms-tag {
  position: absolute; top: 10px; right: 10px; z-index: 3;
  font-family: var(--sans); font-size: 8px; letter-spacing: 0.18em; font-weight: 500;
  text-transform: uppercase; color: var(--bark);
  background: rgba(255,255,255,0.92); backdrop-filter: blur(6px);
  padding: 3px 8px; border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.12);
}

/* eye hover */
.ms-eye {
  position: absolute; inset: 0; z-index: 2;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.32s;
}
.ms-eye-ring {
  width: 48px; height: 48px; border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.70);
  display: flex; align-items: center; justify-content: center;
  color: var(--cream); backdrop-filter: blur(4px);
  background: rgba(0,0,0,0.30);
  transform: scale(0.78);
  transition: transform 0.38s cubic-bezier(0.22,1,0.36,1), background 0.3s;
}
@media (hover: hover) {
  .ms-card:hover .ms-eye { opacity: 1; }
  .ms-card:hover .ms-eye-ring { transform: scale(1); background: rgba(132,152,38,0.70); }
}

/* title overlay on image — always visible */
.ms-ctitle {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
  padding: 1.25rem 1rem 2.8rem;
}
.ms-ctitle h3 {
  font-family: var(--sans); font-size: clamp(15px,2vw,22px);
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em;
  color: var(--cream); line-height: 1.15;
}
.ms-ctitle h3 em { font-style: italic; color: var(--leaf); }
.ms-gbar {
  height: 1.5px; width: 22px; background: var(--gold2); margin-top: 5px; border-radius: 2px;
  transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
}
@media (hover: hover) { .ms-card:hover .ms-gbar { width: 48px; } }

/* ══ MOBILE SWIPE HINT ══ */
.ms-swipe-hint {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(0,0,0,0.58);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: 999px;
  padding: 5px 13px 5px 10px;
  color: rgba(255,255,255,0.96);
  font-family: var(--sans);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: none;
  animation: msSwipeHintBounce 2.2s ease-in-out infinite;
}
/* only show on touch devices — hide on desktop pointer devices */
@media (hover: hover) { .ms-swipe-hint { display: none; } }

.ms-swipe-chev {
  display: flex; align-items: center;
}
.ms-swipe-chev svg {
  animation: msChevPulse 1.3s ease-in-out infinite;
}
.ms-swipe-chev svg:nth-child(2) { animation-delay: 0.18s; opacity: 0.6; margin-left: -5px; }
@keyframes msChevPulse {
  0%, 100% { opacity: 0.4; transform: translateX(0); }
  50%       { opacity: 1;   transform: translateX(2px); }
}
@keyframes msSwipeHintBounce {
  0%, 100% { transform: translateX(-50%) translateY(0px); }
  50%       { transform: translateX(-50%) translateY(-3px); }
}

/* ── dot indicators (mobile) ── */
.ms-dots {
  position: absolute;
  bottom: 44px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  gap: 5px;
  align-items: center;
  pointer-events: none;
}
@media (hover: hover) { .ms-dots { display: none; } }
.ms-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: rgba(255,255,255,0.38);
  transition: background 0.25s, transform 0.25s, width 0.25s;
  flex-shrink: 0;
}
.ms-dot.ms-dot-on {
  background: var(--gold);
  transform: scale(1.4);
  width: 14px;
  border-radius: 3px;
}

/* desktop next arrow */
.ms-cnext {
  position: absolute; top: 50%; right: 10px;
  transform: translateY(-50%);
  z-index: 4;
  width: 34px; height: 34px; border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.75);
  background: rgba(15,15,15,0.38); color: #fff;
  display: none; align-items: center; justify-content: center;
  backdrop-filter: blur(6px); cursor: pointer;
  transition: transform 0.28s ease, background 0.22s ease, border-color 0.22s ease;
  animation: msArrowNudge 1.7s ease-in-out infinite;
  -webkit-tap-highlight-color: transparent;
}
@keyframes msArrowNudge {
  0%, 100% { transform: translateY(-50%) translateX(0); }
  50%       { transform: translateY(-50%) translateX(3px); }
}
@media (min-width: 1024px) { .ms-cnext { display: flex; } }
.ms-cnext:hover {
  background: rgba(132,152,38,0.9); border-color: rgba(132,152,38,0.95);
  transform: translateY(-50%) scale(1.05);
}

/* ── Info pane — always visible ── */
.ms-cinfo {
  display: flex; flex-direction: column; justify-content: center;
  padding: 0.9rem 1.2rem 1rem;
  background: var(--warm);
  gap: 0.45rem;
  min-width: 0;
  border-top: 1px solid var(--parchment);
}

.ms-cinfo-title {
  font-family: var(--sans); font-size: clamp(14px,1.8vw,18px);
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em;
  color: var(--bark); line-height: 1.2;
  display: none; /* title is on the image overlay; keep hidden in footer */
}
.ms-cinfo-title em { font-style: italic; color: var(--leaf); }

.ms-cinfo-gbar {
  height: 1.5px; width: 22px; background: var(--gold2); border-radius: 2px;
  transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
  display: none;
}
@media (hover: hover) { .ms-card:hover .ms-cinfo-gbar { width: 48px; } }

.ms-cinfo-sub {
  font-family: var(--sans); font-size: 8.5px; font-weight: 600;
  letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold);
}

.ms-cinfo-loc {
  display: flex; align-items: center; gap: 4px;
  font-family: var(--sans); font-size: 9.5px; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--fog);
}
.ms-cinfo-photos {
  display: flex; align-items: center; gap: 4px;
  font-family: var(--sans); font-size: 9px; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--fog); font-weight: 500;
}
.ms-cinfo-cta {
  margin-top: 0.25rem;
  font-family: var(--sans); font-size: 9px; font-weight: 700;
  letter-spacing: 0.24em; text-transform: uppercase; color: var(--gold);
  display: inline-flex; align-items: center; gap: 4px;
  transition: color 0.22s, gap 0.22s;
}
@media (hover: hover) { .ms-card:hover .ms-cinfo-cta { color: var(--leaf); gap: 8px; } }

/* ═══ DIVIDER BAND ═══ */
.ms-divband {
  background: var(--parchment);
  padding: clamp(2rem,5vh,4rem) clamp(1.25rem,5vw,4rem);
  display: flex; align-items: center; gap: 2rem; overflow: hidden;
  position: relative;
}
.ms-divband::before {
  content: ''; position: absolute; inset: 0;
  background: repeating-linear-gradient(
    90deg, transparent 0px, transparent 40px,
    rgba(132,152,38,0.09) 40px, rgba(132,152,38,0.09) 41px
  );
}
.ms-divquote {
  position: relative; z-index: 1; flex: 1;
  font-family: var(--serif); font-style: italic;
  font-size: clamp(16px,2.5vw,26px); color: var(--bark); line-height: 1.55;
}
.ms-divquote em { color: var(--leaf); }
.ms-divattr {
  position: relative; z-index: 1; flex-shrink: 0;
  display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
}
.ms-divline { width: 40px; height: 1px; background: var(--gold2); }
.ms-divname {
  font-family: var(--sans); font-size: 9px; font-weight: 500;
  letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold2);
}

/* ═══ MODAL ═══ */
.ms-mwrap {
  position: fixed; inset: 0; z-index: 500;
  display: flex; align-items: center; justify-content: center;
  padding: 0;
  background: rgba(0,0,0,0); backdrop-filter: blur(0px);
  transition: background 0.38s, backdrop-filter 0.38s;
}
@media (min-width: 480px) { .ms-mwrap { padding: 2vh 2vw; } }
.ms-mwrap.ms-mopen {
  background: rgba(0,0,0,0.72); backdrop-filter: blur(14px) saturate(1.2);
}
.ms-mpanel {
  position: relative; width: 100%; max-width: 1100px;
  background: var(--cream); overflow: hidden;
  display: flex; flex-direction: column;
  box-shadow: 0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(132,152,38,0.28);
  transform: translateY(60px) scale(0.91); opacity: 0;
  transition: transform 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.42s;
  border-radius: 0; height: 100vh; max-height: 100vh;
}
@media (min-width: 480px) {
  .ms-mpanel { border-radius: 16px; height: auto; max-height: 92vh; }
}
.ms-mwrap.ms-mopen .ms-mpanel { transform: translateY(0) scale(1); opacity: 1; }
.ms-mtop {
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, var(--gold) 25%, var(--gold2) 75%, transparent 100%);
  flex-shrink: 0;
}
.ms-mhead {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.85rem 1rem; border-bottom: 1px solid var(--parchment); flex-shrink: 0;
}
@media (min-width: 480px) { .ms-mhead { padding: 1rem 1.5rem; } }
.ms-mname {
  font-family: var(--sans); font-size: clamp(15px,2.2vw,21px);
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; color: var(--bark);
}
.ms-msub {
  font-family: var(--sans); font-size: 9px; letter-spacing: 0.28em;
  text-transform: uppercase; color: var(--gold); margin-top: 2px;
}
.ms-mx {
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  border: 1px solid var(--parchment); background: none; cursor: pointer; color: var(--bark);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.25s, color 0.25s, transform 0.35s, border-color 0.25s;
  -webkit-tap-highlight-color: transparent;
}
.ms-mx:hover, .ms-mx:active { background: var(--gold); color: var(--cream); border-color: var(--gold); transform: rotate(90deg); }
.ms-mbody {
  display: grid; grid-template-columns: 1fr;
  flex: 1; min-height: 0; overflow: hidden;
}
@media (min-width: 680px) { .ms-mbody { grid-template-columns: 1fr 260px; } }
.ms-mstage {
  position: relative; background: var(--warm);
  display: flex; align-items: center; justify-content: center;
  min-height: 0; overflow: hidden;
  height: 56vw; min-height: 220px; max-height: 420px;
}
@media (min-width: 480px) { .ms-mstage { height: auto; max-height: none; } }
.ms-mimg {
  position: absolute; inset: 0;
  transition: opacity 0.18s ease, transform 0.36s cubic-bezier(0.22,1,0.36,1);
}
.ms-mimg.ms-moff { opacity: 0; transform: scale(1.04); }
.ms-mimg.ms-mon  { opacity: 1; transform: scale(1); }
.ms-mnav {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 5;
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255,255,255,0.92); border: 1px solid var(--parchment);
  backdrop-filter: blur(8px); cursor: pointer;
  display: flex; align-items: center; justify-content: center; color: var(--bark);
  transition: background 0.25s, color 0.25s, border-color 0.25s, box-shadow 0.25s;
  -webkit-tap-highlight-color: transparent;
}
.ms-mnav:hover, .ms-mnav:active { background: var(--gold); color: var(--cream); border-color: var(--gold); box-shadow: 0 4px 16px rgba(132,152,38,0.35); }
.ms-mprev { left: 0.6rem; }
.ms-mnext { right: 0.6rem; }
@media (min-width: 480px) { .ms-mprev { left: 1rem; } .ms-mnext { right: 1rem; } }
.ms-mcnt {
  position: absolute; bottom: 0.75rem; left: 50%; transform: translateX(-50%); z-index: 5;
  font-family: var(--sans); font-size: 10px; font-weight: 500; letter-spacing: 0.22em;
  background: rgba(255,255,255,0.95); color: var(--bark);
  padding: 4px 12px; border-radius: 20px; border: 1px solid var(--parchment);
  white-space: nowrap;
}
.ms-mside {
  border-top: 1px solid var(--parchment);
  display: flex; flex-direction: column; overflow: hidden; background: var(--warm);
  max-height: 180px;
}
@media (min-width: 480px) { .ms-mside { max-height: 280px; } }
@media (min-width: 680px) {
  .ms-mside { border-top: none; border-left: 1px solid var(--parchment); max-height: none; }
}
.ms-sinfo {
  padding: 0.85rem 1rem; border-bottom: 1px solid var(--parchment); flex-shrink: 0; display: none;
}
@media (min-width: 680px) { .ms-sinfo { display: block; padding: 1.25rem 1.1rem 0.9rem; } }
.ms-slbl { font-family: var(--sans); font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.4rem; }
.ms-stitle { font-family: var(--sans); font-size: 17px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; color: var(--bark); }
.ms-sloc { display: flex; align-items: center; gap: 3px; margin-top: 0.45rem; font-family: var(--sans); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--fog); }
.ms-sdesc { font-family: var(--sans); font-size: 12px; font-weight: 300; color: var(--fog); line-height: 1.65; margin-top: 0.5rem; }
.ms-sthlbl {
  font-family: var(--sans); font-size: 9px; letter-spacing: 0.32em; color: var(--gold);
  text-transform: uppercase; padding: 0.65rem 1rem 0.35rem; flex-shrink: 0;
}
@media (min-width: 680px) { .ms-sthlbl { padding: 0.75rem 1.1rem 0.35rem; } }
.ms-sthumbs {
  flex: 1; overflow-y: auto; padding: 0 0.85rem 0.85rem;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; align-content: start;
  scrollbar-width: thin; scrollbar-color: rgba(132,152,38,0.35) transparent;
}
@media (min-width: 680px) { .ms-sthumbs { grid-template-columns: repeat(2, 1fr); } }
.ms-sthumb {
  position: relative; aspect-ratio: 4/3; overflow: hidden; cursor: pointer;
  border-radius: 5px; border: 2px solid transparent;
  transition: border-color 0.22s, transform 0.22s;
  -webkit-tap-highlight-color: transparent;
}
.ms-sthumb:hover, .ms-sthumb:active { transform: scale(1.04); border-color: rgba(132,152,38,0.5); }
.ms-sthumb.ms-thon { border-color: var(--gold2); }
`;

export default function GalleryPage() {
  const [modal, setModal]         = useState<ModalState>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgOn, setImgOn]         = useState(false);
  const [scrollY, setScrollY]     = useState(0);
  const [visible, setVisible]     = useState<Set<string>>(new Set());
  const [activeFilter, setFilter] = useState("all");
  const [cardImageIdx, setCardImageIdx] = useState<Record<string, number>>({});
  const [cardAnimDir, setCardAnimDir] = useState<Record<string, 1 | -1>>({});
  const [isMobileCards, setIsMobileCards] = useState(false);
  const cardTouchStartRef = useRef<Record<string, number>>({});
  const suppressCardOpenRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const id = "ms-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id; el.textContent = CSS;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useEffect(() => {
    const syncViewport = () => setIsMobileCards(window.innerWidth < 1024);
    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    const s = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        const id = e.target.getAttribute("data-animate");
        if (id && e.isIntersecting) setVisible((p) => new Set([...p, id]));
      }),
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [activeFilter]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = prev; };
  }, [modal]);

  const openModal = (stay: typeof homestays[0]) => {
    setModal({ stay, activeIdx: 0 });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setModalOpen(true);
      setTimeout(() => setImgOn(true), 80);
    }));
  };

  const closeModal = () => {
    setModalOpen(false); setImgOn(false);
    setTimeout(() => { setModal(null); }, 420);
  };

  const goTo = useCallback((dir: 1 | -1) => {
    if (!modal) return;
    const len = getImages(modal.stay).length;
    setImgOn(false);
    setTimeout(() => {
      setModal((m) => m ? { ...m, activeIdx: (m.activeIdx + dir + len) % len } : m);
      setImgOn(true);
    }, 110);
  }, [modal]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (!modal) return;
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft")  goTo(-1);
      if (e.key === "Escape")     closeModal();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [modal, goTo]);

  const touchStartX = useCallback((e: React.TouchEvent) => {
    const startX = e.touches[0].clientX;
    const onEnd = (ev: TouchEvent) => {
      const dx = ev.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) goTo(dx < 0 ? 1 : -1);
    };
    window.addEventListener("touchend", onEnd, { once: true });
  }, [goTo]);

  const shiftCardImage = useCallback((stayId: string, imgCount: number, dir: 1 | -1) => {
    if (imgCount < 2) return;
    setCardAnimDir((prev) => ({ ...prev, [stayId]: dir }));
    setCardImageIdx((prev) => {
      const current = prev[stayId] ?? 0;
      return { ...prev, [stayId]: (current + dir + imgCount) % imgCount };
    });
  }, []);

  const onCardTouchStart = useCallback((stayId: string, e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobileCards) return;
    cardTouchStartRef.current[stayId] = e.touches[0].clientX;
    suppressCardOpenRef.current[stayId] = false;
  }, [isMobileCards]);

  const onCardTouchEnd = useCallback((stayId: string, imgCount: number, e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobileCards || imgCount < 2) return;
    const startX = cardTouchStartRef.current[stayId];
    if (typeof startX !== "number") return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < 36) return;
    suppressCardOpenRef.current[stayId] = true;
    shiftCardImage(stayId, imgCount, dx < 0 ? 1 : -1);
    window.setTimeout(() => {
      suppressCardOpenRef.current[stayId] = false;
    }, 230);
  }, [isMobileCards, shiftCardImage]);

  const filtered = activeFilter === "all"
    ? homestays
    : homestays.filter((h) => h.id === activeFilter);

  return (
    <div className="ms-root">

      {/* ══ HERO ══ */}
      <section className="ms-hero">
        <div className="ms-hero-bg" style={{ transform: `translateY(${scrollY * 0.38}px)` }}>
          <Image src="/about-hero.webp" alt="Gallery" fill className="object-cover scale-110" sizes="100vw" priority />
          <div className="ms-hero-ov" />
          <div className="ms-hero-grain" />
        </div>
        <div className="ms-hero-body">
          <div className="ms-hero-tag">
            <span className="ms-hero-line" />
            <span>Visual Collection</span>
          </div>
          <h1 className="ms-hero-h1">OUR GALLERY</h1>
          <div className="ms-hero-bc">
            <span className="ms-bc-dim">HOME</span>
            <span className="ms-bc-gold"> › </span>
            <span className="ms-bc-gold">GALLERY</span>
          </div>
        </div>
      </section>

      {/* ══ INTRO ══ */}
      <div
        className="ms-intro"
        data-animate="intro"
        style={{ opacity: visible.has("intro") ? 1 : 0, transition: "opacity 0.9s" }}
      >
        <div className="ms-intro-left">
          <div className="ms-eyebrow">Explore Our Estates</div>
          <h2 className="ms-intro-h2">
            A Journey Through<br /><em>Udupi&apos;s Finest Homes</em>
          </h2>
          <p className="ms-intro-p">
            Click any property to explore its full visual story — every photograph
            handpicked to capture the essence of each unique retreat.
          </p>
        </div>
        <div className="ms-stats">
          {[
            { n: homestays.length, label: "Properties", d: "Handpicked retreats" },
            { n: homestays.reduce((a, h) => a + getImages(h).length, 0), label: "Photographs", d: "Curated images" },
            { n: "7+", label: "Years", d: "Of hospitality" },
          ].map(({ n, label, d }) => (
            <div className="ms-stat" key={label}>
              <div className="ms-stat-n">{n}</div>
              <div className="ms-stat-info">
                <div className="ms-stat-l">{label}</div>
                <div className="ms-stat-d">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FILTER ══ */}
      <div className="ms-filter">
        <div className="ms-fi">
          <span className="ms-fi-label">Filter</span>
          {[{ id: "all", title: "All Properties" }, ...homestays.map((h) => ({ id: h.id, title: h.title }))].map(({ id, title }) => (
            <button
              key={id}
              onClick={() => { setFilter(id); setVisible(new Set()); }}
              className={`ms-ftag${activeFilter === id ? " ms-fon" : ""}`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* ══ HORIZONTAL CARD LIST ══ */}
      <div className="ms-cardlist" key={activeFilter}>
        {filtered.map((stay, idx) => {
          const imgs = getImages(stay);
          const cardIdx = cardImageIdx[stay.id] ?? 0;
          const activeCardIdx = ((cardIdx % imgs.length) + imgs.length) % imgs.length;
          const cardDir = cardAnimDir[stay.id] ?? 1;
          const words = stay.title.split(" ");
          const last  = words[words.length - 1];
          const rest  = words.slice(0, -1).join(" ");
          const dotCount = Math.min(imgs.length, 7);

          return (
            <div
              key={stay.id}
              className={`ms-card${(idx + 1) % 7 === 0 ? " ms-card-full" : ""}`}
              onClick={() => {
                if (suppressCardOpenRef.current[stay.id]) return;
                openModal(stay);
              }}
            >
              {/* ── Image pane ── */}
              <div
                className="ms-cimg"
                onTouchStart={(e) => onCardTouchStart(stay.id, e)}
                onTouchEnd={(e) => onCardTouchEnd(stay.id, imgs.length, e)}
              >
                <div
                  key={`${stay.id}-${activeCardIdx}`}
                  className={`ms-cslide${cardDir === 1 ? " ms-cslide-next" : " ms-cslide-prev"}`}
                >
                  <Image src={imgs[activeCardIdx]} alt={stay.title} fill className="object-cover" priority={idx < 4} />
                </div>
                <div className="ms-cgrad" />
                <div className="ms-pill"><Camera size={9} />{imgs.length} photos</div>
                <div className="ms-tag">{stay.subtitle}</div>
                <div className="ms-eye"><div className="ms-eye-ring"><Eye size={16} /></div></div>

                {/* mobile title overlay */}
                <div className="ms-ctitle">
                  <h3>{rest && <>{rest} </>}<em>{last}</em></h3>
                  <div className="ms-gbar" />
                </div>

                {/* mobile dot indicators */}
                {imgs.length > 1 && (
                  <div className="ms-dots">
                    {Array.from({ length: dotCount }).map((_, i) => {
                      const isActive = imgs.length <= 7
                        ? i === activeCardIdx
                        : i === Math.min(Math.floor(activeCardIdx / imgs.length * dotCount), dotCount - 1);
                      return <div key={i} className={`ms-dot${isActive ? " ms-dot-on" : ""}`} />;
                    })}
                  </div>
                )}

                {/* mobile swipe hint — shown only on touch */}
                {imgs.length > 1 && (
                  <div className="ms-swipe-hint">
                    <div className="ms-swipe-chev">
                      <ChevronLeft size={10} />
                      <ChevronLeft size={10} />
                    </div>
                    Swipe for more
                    <div className="ms-swipe-chev">
                      <ChevronRight size={10} />
                      <ChevronRight size={10} />
                    </div>
                  </div>
                )}

                {/* desktop next arrow */}
                <button
                  className="ms-cnext"
                  onClick={(e) => {
                    e.stopPropagation();
                    shiftCardImage(stay.id, imgs.length, 1);
                  }}
                  aria-label={`Next photo for ${stay.title}`}
                >
                  <ChevronRight size={15} />
                </button>
              </div>

              {/* ── Info pane ── */}
              <div className="ms-cinfo">
                <div className="ms-cinfo-sub">{stay.subtitle}</div>
                <div className="ms-cinfo-title">
                  {rest && <>{rest} </>}<em>{last}</em>
                </div>
                <div className="ms-cinfo-gbar" />
                <div className="ms-cinfo-loc"><MapPin size={10} />{stay.location.split(",")[0]}</div>
                <div className="ms-cinfo-photos"><Camera size={10} />{imgs.length} photographs</div>
                <div className="ms-cinfo-cta">View Gallery <ChevronRight size={11} /></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══ DIVIDER BAND ══ */}
      <div className="ms-divband">
        <div
          className={`ms-fade${visible.has("divband") ? " ms-vis" : ""}`}
          data-animate="divband"
          style={{ display: "flex", alignItems: "center", gap: "2rem", width: "100%" }}
        >
          <p className="ms-divquote">
            &ldquo;Every image is an invitation — to arrive, to breathe,<br />
            and to <em>belong</em>.&rdquo;
          </p>
          <div className="ms-divattr">
            <div className="ms-divline" />
            <div className="ms-divname">Udupi Homestays</div>
          </div>
        </div>
      </div>

      {/* ══ MODAL ══ */}
      {modal && (() => {
        const imgs = getImages(modal.stay);
        return (
          <div
            className={`ms-mwrap${modalOpen ? " ms-mopen" : ""}`}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <div className="ms-mpanel">
              <div className="ms-mtop" />
              <div className="ms-mhead">
                <div>
                  <div className="ms-mname">{modal.stay.title}</div>
                  <div className="ms-msub">{modal.stay.subtitle} · {modal.stay.location.split(",")[0]}</div>
                </div>
                <button className="ms-mx" onClick={closeModal}><X size={14} /></button>
              </div>
              <div className="ms-mbody">
                <div className="ms-mstage" onTouchStart={touchStartX}>
                  <div key={modal.activeIdx} className={`ms-mimg${imgOn ? " ms-mon" : " ms-moff"}`}>
                    <Image src={imgs[modal.activeIdx]} alt="" fill className="object-contain" priority />
                  </div>
                  <button className="ms-mnav ms-mprev" onClick={() => goTo(-1)}><ChevronLeft size={16} /></button>
                  <button className="ms-mnav ms-mnext" onClick={() => goTo(1)}><ChevronRight size={16} /></button>
                  <div className="ms-mcnt">
                    {String(modal.activeIdx + 1).padStart(2, "0")} / {String(imgs.length).padStart(2, "0")}
                  </div>
                </div>
                <div className="ms-mside">
                  <div className="ms-sinfo">
                    <div className="ms-slbl">Currently Viewing</div>
                    <div className="ms-stitle">{modal.stay.title}</div>
                    <div className="ms-sloc"><MapPin size={9} />{modal.stay.location}</div>
                    {modal.stay.description && (
                      <p className="ms-sdesc">{modal.stay.description.split(".")[0]}.</p>
                    )}
                  </div>
                  <div className="ms-sthlbl">All Photos</div>
                  <div className="ms-sthumbs">
                    {imgs.map((img, i) => (
                      <div
                        key={i}
                        className={`ms-sthumb${i === modal.activeIdx ? " ms-thon" : ""}`}
                        onClick={() => {
                          setImgOn(false);
                          setTimeout(() => { setModal((m) => m ? { ...m, activeIdx: i } : m); setImgOn(true); }, 110);
                        }}
                      >
                        <Image src={img} alt="" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}