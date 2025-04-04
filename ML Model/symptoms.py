import pandas as pd
import numpy as np

def add_symptom_noise(df, symptom_cols, noise_level=0.1):
    """
    Adds realistic noise to symptom data by randomly flipping a percentage of symptoms.
    """
    noisy_df = df.copy()
    symptoms = noisy_df[symptom_cols]
    
    # Create random flip mask
    flip_mask = np.random.random(symptoms.shape) < noise_level
    
    # Flip symptoms randomly (1→0 or 0→1)
    noisy_symptoms = symptoms.where(~flip_mask, 1 - symptoms)
    noisy_df[symptom_cols] = noisy_symptoms
    
    return noisy_df

# Read the original data
df = pd.read_csv("dataset.csv")

# Get all unique symptoms, stripping whitespace
all_symptoms = set()
for col in df.columns[1:]:
    unique_symptoms = df[col].dropna().astype(str).str.strip().unique()
    all_symptoms.update(unique_symptoms)
all_symptoms = sorted(all_symptoms)

# Create a new dataframe with the same index as original and symptoms as columns
restructured_df = pd.DataFrame(0, index=df.index, columns=all_symptoms)

# Populate the symptom columns, stripping whitespace
for idx, row in df.iterrows():
    symptoms = row[1:].dropna().astype(str).str.strip().values
    restructured_df.loc[idx, symptoms] = 1

# Combine with the original Disease column
final_df = pd.concat([df['Disease'], restructured_df], axis=1)

# Strip column names again for safety
final_df.columns = final_df.columns.str.strip()

# Save to CSV (human-readable)
try:
    final_df.to_csv('disease_symptoms_binary.csv', index=False)
except Exception as e:
    print("Error while saving CSV:", e)

# Save just the unique symptom list (cleaned)
pd.Series(all_symptoms).str.strip().to_csv('unique_symptoms_list.csv', index=False)

print("Files saved successfully:")
print("- disease_symptoms_binary.csv")
print("- unique_symptoms_list.csv")
