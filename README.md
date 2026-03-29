# PharmaGuard — Pharmacogenomic Risk Prediction System

PharmaGuard is an AI-powered web application that analyzes patient genetic data (VCF files) along with drug names to predict pharmacogenomic risks and provide clinically actionable recommendations with explainable AI.

demo link-- 

---

## 🚀 Features

- Upload and parse real VCF (Variant Call Format) files  
- Detect pharmacogenomic variants in 6 critical genes:
  - CYP2D6
  - CYP2C19
  - CYP2C9
  - SLCO1B1
  - TPMT
  - DPYD
- Predict drug risk categories:
  - Safe
  - Adjust Dosage
  - Toxic
  - Ineffective
  - Unknown
- Generate explainable AI insights using LLM  
- Provide CPIC-based clinical recommendations  
- Download structured JSON output  
- Clean UI with color-coded risk display
- ai chat assistent
- role based access 

---

## 🧠 Problem Statement

Adverse drug reactions kill over 100,000 people annually. Many of these are preventable using pharmacogenomic testing.

PharmaGuard solves this by:

1. Reading patient genetic data  
2. Detecting gene-drug interactions  
3. Predicting risk  
4. Giving dosage guidance  
5. Explaining the reason using AI
6. ai chat assistent  

---


## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/pharma-guard.git
cd pharma-guard
2️⃣ Backend Setup
cd backend
cp .env.example .env
npm install
npm run dev
Backend will run on:
http://localhost:3000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
Frontend will run on:
http://localhost:5000

🔌 API Documentation
POST /api/analyze
Request (multipart/form-data)
Field	Type	Description
vcf_file	file	VCF file (max 5MB)
drug	string	Drug name (single or comma-separated)
patient_id	string	Optional patient ID
📤 Response JSON Schema
{
  "patient_id": "PATIENT_001",
  "drug": "WARFARIN",
  "timestamp": "2026-02-19T10:30:00Z",
  "risk_assessment": {
    "risk_label": "Adjust Dosage",
    "confidence_score": 0.91,
    "severity": "moderate"
  },
  "pharmacogenomic_profile": {
    "primary_gene": "CYP2C9",
    "diplotype": "*1/*3",
    "phenotype": "IM",
    "detected_variants": [
      {
        "rsid": "rs1057910",
        "gene": "CYP2C9"
      }
    ]
  },
  "clinical_recommendation": {
    "action": "Reduce starting dose",
    "guideline_reference": "CPIC Guideline",
    "rationale": "Reduced metabolism"
  },
  "llm_generated_explanation": {
    "summary": "Genetic variant affects drug metabolism",
    "detailed": "Detailed biological explanation..."
  },
  "quality_metrics": {
    "vcf_parsing_success": true
  }
}
💊 Supported Drugs
CODEINE

WARFARIN

CLOPIDOGREL

SIMVASTATIN

AZATHIOPRINE

FLUOROURACIL

🧬 Core Engine Logic
Parse VCF file

Extract gene variants

Map variants → diplotype

Diplotype → phenotype

Phenotype → drug risk

Generate recommendation

Generate explanation using LLM

🎨 UI Features
Drag & Drop VCF upload

Multi-drug input

Risk color coding:

🟢 Safe

🟡 Adjust

🔴 Toxic / Ineffective

Expandable result sections

JSON download button

🚀 Deployment
Frontend: Vercel
Backend: Render 

Add your deployed links here:

Live App: https://pharmaguard-alpha.vercel.app/

GitHub Repo: https://github.com/ShivamKamal07/pharmaguard

Demo Video: https://linkedin.com/your-video-link

🧪 Sample Test Files
Located inside:

backend/sample_vcfs/
Use them for testing output correctness.

🔒 Security & Privacy
VCF files contain sensitive genetic data

Do NOT store patient data permanently

Use secure environment variables for API keys

Always anonymize patient IDs

👨‍💻 Tech Stack
Frontend
React

Vite

CSS

Backend
Node.js

Express.js

AI
LLM (OpenRouter / OpenAI)

Deployment
Vercel

Render

🏁 Submission Checklist
Before final submission ensure:

Live app is deployed and working

GitHub repo is public

README contains all links

LinkedIn video is public

JSON output matches required schema

VCF upload works correctly

📜 License
MIT License

❤️ Final Note
This project aims to save lives by preventing adverse drug reactions using AI + genomics.

"Precision Medicine is not the future — it is the present."

