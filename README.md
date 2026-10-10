# Sanjeevani – AI Health Assistant

Sanjeevani is an AI-powered health companion. Patients upload their medical reports, ask questions about them in natural language, and get personalised diet plans and predictive health alerts generated from their own report history.

🎥 **Demo video:** https://drive.google.com/file/d/1zi-Q0D3frejTRAAlMC9RdR0-t2xl0zPt/view?usp=sharing

## Features
- **Medical report vault** – upload PDF reports to Azure Blob Storage; text is extracted with Azure Document Intelligence
- **Chat with your reports** – retrieval-augmented generation (BioBERT embeddings + Pinecone + Gemini)
- **Diet & fitness plans** generated from the patient's report trends
- **Predictive health alerts** based on values across reports over time
- **Rolling summaries** of a patient's history, updated as new reports arrive
- Health ID, medication reminders and medicine scanner pages in the UI

## Architecture
```
React client (Vite, :8080)  ──►  Express API (:5000)  ──►  Flask AI service (:8000)
                                   │                          │
                                   ├─ MongoDB (patients)      ├─ BioBERT embeddings
                                   └─ Azure Blob + Document   ├─ Pinecone (vector search)
                                      Intelligence            └─ Google Gemini
```

| Folder | Description |
| --- | --- |
| `sanjeevani-client/` | React + TypeScript + Tailwind + shadcn/ui front-end |
| `server/` | Node/Express API, MongoDB models, Azure integration |
| `flask/` | Python AI service: embeddings, RAG, Gemini prompts |

## Getting started

**Prerequisites:** Node.js 18+, Python 3.10+, a MongoDB instance, an Azure Storage account + Document Intelligence resource, a Pinecone index (768 dimensions, cosine) and a Google Gemini API key.

### 1. Flask AI service
```bash
cd flask
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                              # fill in your keys
python main.py                                    # http://localhost:8000
```

### 2. Express API
```bash
cd server
npm install
cp .env.example .env                              # fill in your keys
npm run dev                                       # http://localhost:5000
```

### 3. Client
```bash
cd sanjeevani-client
npm install
cp .env.example .env
npm run dev                                       # http://localhost:8080
```

## Environment variables
Each service ships an `.env.example` listing every variable it needs. Never commit your real `.env` files.

## Known limitations
- No authentication yet: the demo uses a hardcoded patient ID, so don't deploy it with real patient data as-is.
- Several UI pages (Dashboard, Medication Reminders, Medicine Scanner) use sample data.

## Author
Built by **AKASH KUMAR THAKUR** · © 2026

## License
[MIT](LICENSE)
