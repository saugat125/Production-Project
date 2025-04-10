import pickle
import numpy as np
import pandas as pd

# Load the trained Random Forest model
with open("../ML Model/RFsymptomsmodel.pkl", "rb") as f:
    model = pickle.load(f)

# Load the list of unique symptoms
with open("../ML Model/unique_symptoms_list.csv", "r") as f:
    all_symptoms = pd.read_csv(f, header=None).squeeze().tolist()

def predict_disease(symptoms):
    if len(symptoms) < 5:
        return {"error": "Please provide at least 5 symptoms."}
    
    # Check if all input symptoms are in the list of all symptoms
    invalid_symptoms = [symptom for symptom in symptoms if symptom not in all_symptoms]
    if invalid_symptoms:
        return {"error": f"The following symptoms are not recognized: {', '.join(invalid_symptoms)}"}
    
    # Prepare input data
    input_data = {symptom: (1 if symptom in symptoms else 0) for symptom in all_symptoms}
    input_df = pd.DataFrame([input_data])

    # Get prediction probabilities
    probabilities = model.predict_proba(input_df)[0]
    classes = model.classes_

    # Combine classes with probabilities and sort them
    sorted_diseases = sorted(zip(classes, probabilities), key=lambda x: x[1], reverse=True)

    # Get top 3 diseases
    top_3_diseases = sorted_diseases[:3]

    # Prepare output
    output = {
        "predictions": [
            {"disease": disease, "probability": float(prob)}
            for disease, prob in top_3_diseases
        ]
    }
    return output
