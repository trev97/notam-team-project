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

# Output the categories as a JSON array
output_str = json.dumps(list(categories))
sys.stdout.write(output_str)