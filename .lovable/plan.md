

# HLPR — CRO Audit Landing Page

## Overview
A single-page, mobile-first landing page for HLPR's e-commerce CRO audit service with three pricing tiers, built with React + Tailwind CSS.

## Brand System
- Primary blue: `#038FF0`, Dark navy: `#1B2A4A`, Light gray sections: `#F7FAFC`, White backgrounds
- Bold lowercase "hlpr" logo text
- Clean icons (Lucide React), no stock photos

## Page Sections (top to bottom)

### 1. Hero Section
- Bold headline + subheadline about revenue leaks
- URL input field + "Get My Free CRO Score" blue CTA (submits to placeholder webhook)
- "Takes 30 seconds. No credit card required." microcopy
- Trust badges row below

### 2. Problem Section (navy background)
- "97% of Visitors Leave" headline
- Three stat cards: conversion rate, cart abandonment, revenue left on table
- Supporting revenue math subtext

### 3. How It Works
- Three numbered steps: Enter URL → Get Score → Fix & Grow
- Clean icons for each step

### 4. Pricing Section
- Three cards side-by-side (stacked on mobile):
  - **Free CRO Score** — instant, basic findings
  - **Mini Audit $29** — highlighted "Most Popular", 48hr delivery
  - **Full Audit $99** — complete analysis, 5 business days
- CTA buttons link to placeholder Stripe checkout URLs

### 5. Credibility Section
- Four horizontal stat cards ($916K Google Ads, $341K Meta Ads, 68% email open rates, $170K email revenue)

### 6. FAQ Section
- Accordion with 4 questions covering scope, differentiation, implementation services, free score value

### 7. Footer
- hlpr logo, tagline, contact info (email, phone, website)

## Technical
- SEO meta tags in `index.html`
- Fully responsive — mobile-optimized for Meta ad traffic
- SVG icons only via Lucide React, no heavy images
- Placeholder webhook URL for form submission
- Placeholder Stripe links on paid tier CTAs

