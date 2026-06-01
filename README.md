Create a professional README.md file for this project 
with the following exact content:

# ProcessIQ — AI-Powered Business Process Analyser

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-cyan)
![Claude AI](https://img.shields.io/badge/Claude-Anthropic-orange)

## Overview

ProcessIQ is an AI-powered business process analysis 
tool built as part of a Business Analysis portfolio.
It takes a plain text description of any business 
process and instantly generates a full AS-IS breakdown, 
bottleneck analysis, TO-BE improvement plan, and a 
phased implementation roadmap.

This tool demonstrates core BA competencies including 
process mapping, gap analysis, bottleneck identification, 
and improvement planning across multiple business domains.

## Features

- AI-powered process analysis using Claude (Anthropic API)
- Four structured output sections:
  - AS-IS Analysis with step mapping and pain points
  - Bottleneck identification with severity ratings
  - TO-BE Process with improvement recommendations
  - Implementation Plan with phases, ROI and quick wins
- Six business domain selectors:
  - HR & Onboarding
  - Finance & Payments
  - Customer Service
  - Supply Chain
  - IT & Support
  - Healthcare Operations
- Download full analysis as .txt report
- Sample process for quick testing
- Mock offline mode for all 6 domains
- Fully responsive on mobile and desktop

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| AI Engine | Anthropic Claude API |
| Fonts | Cabinet Grotesk + Inter |
| Export | Formatted .txt download |
| Hosting | Vercel (optional) |

## BA Skills Demonstrated

- Process Mapping — documenting AS-IS workflows 
  step by step with owners and time estimates
- Gap Analysis — identifying bottlenecks and their 
  root causes and business impact
- Process Improvement — designing TO-BE workflows 
  with measurable improvements
- Implementation Planning — phased roadmaps with 
  deliverables, timelines and ROI estimates
- Domain Knowledge — covering HR, Finance, Supply 
  Chain, IT, Customer Service and Healthcare

## Getting Started

### Prerequisites
- Node.js 18+
- Anthropic API key (optional — mock mode works without it)

### Installation

Clone the repository:
git clone https://github.com/Kivaane/processiq.git

Navigate to project folder:
cd processiq

Install dependencies:
npm install

Start development server:
npm run dev

Open in browser:
http://localhost:5175

### API Key Setup

1. Click "Configure API Key" in the top right navbar
2. Paste your Anthropic API key
3. Click Save
4. The app switches from Mock Mode to live AI generation

Get your API key at: https://console.anthropic.com

## How To Use

1. Describe your current business process in the textarea
2. Select the relevant domain card
3. Click "Analyse Process"
4. Browse through the 4 output tabs
5. Download the full report as .txt

## Project Structure

src/
  App.jsx        — Main application component
  App.css        — Global styles
  index.css      — Base styles
  main.jsx       — React entry point

## Author

Built by Kivaane Anton Uthayakumar
Computer Science Undergraduate — Informatics Institute 
of Technology (Affiliated with University of Westminster)
Business Analysis Portfolio Project 2026

LinkedIn: https://www.linkedin.com/in/kivaane-anton-uthayakumar/
GitHub: https://github.com/Kivaane
Portfolio: https://github.com/Kivaane/Kivaane.github.io

## License

MIT License — free to use and modify
