import pandas as pd
import pickle
from joblib import Parallel, delayed
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score

# Load the CSV file into a Pandas DataFrame
df = pd.read_csv('All_Rand.csv')

# Shuffle the DataFrame rows randomly
df = df.sample(frac=1, random_state=42)

# Replace NaN values with empty strings
df['NOTAM Text'] = df['NOTAM Text'].fillna('')

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(df['NOTAM Text'], df['Category'], test_size=0.2, random_state=42)

# Convert the text data into numerical features using a Bag-of-Words model
vectorizer = CountVectorizer()
X_train_vectorized = vectorizer.fit_transform(X_train)
X_test_vectorized = vectorizer.transform(X_test)

# Train a Multinomial Naive Bayes classifier on the vectorized data
model = MultinomialNB()
model.fit(X_train_vectorized, y_train)

# Evaluate the performance of the model on the test data
y_pred = model.predict(X_test_vectorized)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")

# Save the trained model and vectorizer to disk using pickle
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)
    
with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)


new_text = ["M0002/23 NOTAMN \n"
"Q) ZLA/QMXHW/IV/M/A/000/999/3251N11423W005 \n"
"A) KLGF \n"
"B) 2301091413 \n"
"C) 2303011300 \n"
"E) TWY A WORK IN PROGRESS CONST WEST EDGE LGTD AND BARRICADED TWY A WORK IN PROGRESS ON SEVERAL HUNDRED FEET AT NORTH END OF TWY A. TWY WIDTH RESTRICTED TO 25'7 IN CONSTRUCTION ZONE DUE TO EXCAVATION ON EAST AND WEST EDGE.\n"]
new_text_vectorized = vectorizer.transform(new_text)
new_label = model.predict(new_text_vectorized)
print(f"Predicted label: {new_label}")