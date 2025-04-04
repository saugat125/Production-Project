import json
import pickle
import numpy as np
import pandas as pd
import sys

# Load the saved model
with open("RFsymptomsmodel.pkl", "rb") as f:
    model = pickle.load(f)

# Load the unique symptom list
with open("unique_symptoms_list.csv", "r") as f:
    all_symptoms = pd.read_csv(f, header=None).squeeze().tolist()

try:
    symptom_dict = json.loads(sys.argv[1])
    input_symptoms = symptom_dict.get("symptoms", [])
    
    # Check if the user has provided at least 5 symptoms
    if len(input_symptoms) < 5:
        print("Error: Please provide at least 5 symptoms.")
        sys.exit(1)

except json.JSONDecodeError:
    print("Error: Invalid JSON input.")
    sys.exit(1)

# Prepare input data
input_data = {symptom: (1 if symptom in input_symptoms else 0) for symptom in all_symptoms}
input_df = pd.DataFrame([input_data])

# Get prediction probabilities
probabilities = model.predict_proba(input_df)[0]
classes = model.classes_

# Combine classes with their probabilities and sort by probability
disease_probs = list(zip(classes, probabilities))
sorted_diseases = sorted(disease_probs, key=lambda x: x[1], reverse=True)

# Get top 3 diseases
top_3_diseases = sorted_diseases[:3]

# Prepare output
output = {
    # "input_symptoms": input_symptoms,
    "predictions": [
        {"disease": disease, "probability": float(prob)}  # Convert numpy float to Python float
        for disease, prob in top_3_diseases
    ]
}
print(json.dumps(output))