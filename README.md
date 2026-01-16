# 🌱 AgroGuide – Smart Farming Solutions

AgroGuide is an AI-powered web application that provides crop recommendations based on soil parameters and real-time weather data. It helps farmers and agriculture enthusiasts make data-driven decisions for better crop yield and sustainability.

---

## 🚀 Features

- 🌾 AI-based crop recommendation using a trained Machine Learning model  
- 🌦️ Real-time weather data fetched from OpenWeather API  
- 📊 Confidence score with visual progress bar  
- 🧠 Explainable AI showing top factors influencing the recommendation  
- 📍 Location-based input with proper invalid city handling  
- 🎨 Modern, responsive UI built with React and Tailwind CSS  
- 🔐 Secure API key handling using environment variables  

---

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

### Backend
- FastAPI (Python)
- Scikit-learn (Random Forest Classifier)
- Pandas & NumPy
- OpenWeather API

### Deployment
- Frontend: Render
- Backend: Render

---

## 📂 Project Structure

agro-guide/  
│  
├── src/ # Frontend source code  
├── public/ # Static assets  
├── index.html  
├── package.json  
├── vite.config.ts  
├── .env # Frontend environment variables  
│  
├── backend/  
│ ├── main.py  
│ ├── crop_model.pkl  
│ ├── crop_data.csv  
│ ├── requirements.txt  
│ └── .env # Backend environment variables  
│  
└── README.md  

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
WEATHER_API_KEY=your_openweather_api_key

### Frontend (`.env` in root)
VITE_API_BASE_URL=https://your-backend-url.onrender.com

> ⚠️ `.env` files must NOT be committed. Ensure they are listed in `.gitignore`.

---

## ▶️ Running Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs at:
http://127.0.0.1:8000
### Frontend (root directory)
```bash
npm install
npm run dev
```
Frontend runs at:
http://localhost:5173

### 🌐 Live Demo

Frontend:
https://agro-guide-frontend.onrender.com/
Backend API:
https://agro-guide-backend-0v5t.onrender.com/

## 🧠 Future Enhancements

- 🤖 AI-powered plant care chatbot  
- 📈 Crop yield prediction  
- 🧪 Fertilizer recommendation system  
- 🌍 Multi-language support  
