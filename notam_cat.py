import sys
import json
import pandas as pd
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Load the trained model and vectorizer
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

# Read the array of NOTAM strings from standard input
input_str = sys.stdin.read()

notams = json.loads(input_str)

# Convert the NOTAM strings into numerical features
notams_vectorized = vectorizer.transform(notams)

# Predict the categories for the NOTAM strings
categories = model.predict(notams_vectorized)

# Define criticality scores for categories
criticality_scores = {
    'GC': 9,
    'APC': 10,
    'F': 8,
    'WL': 1,
    'W': 4,
    'C': 6,
    'TFR': 9,
    'NAV': 7,
    'PRO': 7,
    'UAV': 5
}

# Assign criticality scores based on predicted categories
scores = [criticality_scores.get(category) for category in categories]

# Combine categories and criticality scores into a list of tuples
output_data = list(zip(categories, scores))

# Output the combined data as a JSON array
output_str = json.dumps(output_data)
sys.stdout.write(output_str)