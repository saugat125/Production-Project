# 🩺 Symptom-Based Disease Prediction and EHR System

A full-stack healthcare application that uses machine learning to predict possible diseases based on symptoms, recommends specialized doctors, and manages patient medical records securely using an integrated Electronic Health Record (EHR) system.

---

## 📌 Overview

This project aims to provide users with an intelligent and accessible platform for early disease detection and healthcare management. By entering a list of symptoms, users receive AI-powered predictions of possible illnesses, along with doctor recommendations. It also allows users to maintain a digital health profile and track previous consultations and predictions securely.

---

## 🚀 Key Features

- **Symptom-Based Disease Prediction**  
  Uses a trained Random Forest machine learning model to predict the top 3 most likely diseases based on symptoms entered by the user.

- **Doctor Recommendation System**  
  Recommends doctors based on the predicted disease’s medical specialization.

- **Electronic Health Record (EHR) Module**  
  Maintains a secure history of past disease predictions, symptoms, recommended doctors, and timestamps.

- **User Authentication**  
  Secure login, registration, and JWT-based authentication for protected routes.

- **User Profile Management**  
  Users can view and update their personal information such as name, age, gender, and blood group.

- **API Integration with Frontend**  
  The backend exposes RESTful APIs consumed by a React-based frontend.

---

## 🧠 Technologies Used

- **Backend**: Django, Django REST Framework  
- **Frontend**: React.js, Tailwind CSS
- **Database**: PostgreSQL  
- **Machine Learning**: Random Forest (scikit-learn), pandas, NumPy  
- **Authentication**: JWT 
