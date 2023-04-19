import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
import re

# Load your dataset (assuming it's in a CSV format with NOTAM text and importance rating)
data = pd.read_csv('NOTAM_Criticality_Score.csv')

# Define your feature extraction functions
def extract_timeframe(notam):
    # Define a regular expression pattern for the NOTAM date and time format
    datetime_pattern = r'\d{6}'

    # Check for a permanent timeframe
    is_permanent = re.search(r'PERM|permanent', notam, re.IGNORECASE)

    # If the NOTAM is permanent, return the start time and None for the end time
    if is_permanent:
        start_time = re.search('B\)' + datetime_pattern, notam)
        if start_time:
            start_time = start_time.group(0)[2:]
            return start_time, None

    # If the NOTAM is not permanent, search for the start and end times as before
    start_time = re.search('B\)\s' + datetime_pattern, notam)
    end_time = re.search('C\)\s' + datetime_pattern, notam)

    if start_time and end_time:
        start_time = start_time.group(0)[2:]
        end_time = end_time.group(0)[2:]
        return start_time, end_time

    if start_time:
        start_time = start_time.group(0)[2:]
        return start_time, None
    if end_time:
        end_time = end_time.group(0)[2:]
        return None, end_time

    return None, None

def extract_restriction_type(notam):
    # Define a list of restriction types and their corresponding keywords or phrases
    restriction_types = {
    'airspace_closure': ['CLSD', 'closed'],
    'equipment_outage': ['OUT OF SERVICE', 'U/S', 'unusable'],
    'temporary_flight_restriction': ['TFR', 'TEMPORARY FLIGHT RESTRICTIONS'],
    'construction': ['CONST', 'construction'],
    'hazardous_conditions': ['HAZD', 'hazard'],
    'runway_closure': ['RWY CLSD', 'runway closed'],
    'airspace_activity': ['airshow', 'parachute', 'skydiving', 'balloon'],
    'military_operations': ['MOA', 'restricted area', 'military exercise'],
    'weather_related': ['thunderstorm', 'turbulence', 'icing', 'fog', 'volcanic ash'],
    'navigational_aid': ['VOR', 'ILS', 'NDB', 'DME', 'RNAV', 'GPS'],
    'airport_services': ['refuelling', 'customs', 'immigration', 'security', 'firefighting'],
    'obstacles': ['obst', 'tower', 'crane', 'wind turbine', 'antenna'],
    'instrument_approach_procedure': ['IAP', 'RNAV (GPS) RWY', 'LOC RWY', 'VOR RWY'],
    'taxiway_closure': ['TWY CLSD', 'taxiway closed'],
    'bird_activity': ['bird', 'wildlife', 'birdstrike'],
    'airspace_classification': ['class A', 'class B', 'class C', 'class D', 'class E', 'class F', 'class G'],
    'operational_hours': ['OPR HR', 'operational hours', 'open', 'available'],
    'fuel_availability': ['fuel', 'avgas', 'jet A1', 'refuelling'],
    'security_measures': ['security', 'ADIZ', 'air defense identification zone'],
    'no_drone_zones': ['no drone zone', 'UAS', 'unmanned aircraft system', 'drone restrictions'],
    'noise_restrictions': ['noise abatement', 'noise restrictions'],
    'inspection_activities': ['inspection', 'maintenance inspection'],
    'search_and_rescue': ['SAR', 'search and rescue'],
    'emergency_response': ['emergency', 'emergency response'],
    'unmanned_aircraft_systems': ['UAS', 'UAV', 'RPAS', 'unmanned aerial vehicle', 'remotely piloted aircraft'],
    'lighting_systems': ['PAPI', 'VASI', 'runway lights', 'taxiway lights', 'approach lights'],
    'airspace_management': ['ATC', 'air traffic control', 'FIR', 'flight information region'],
    'ground_operations': ['ground handling', 'ramp operations'],
    'special_events': ['sporting event', 'concert', 'festival', 'VIP movement', 'celebration'],
    'airspace_restrictions': ['prohibited area', 'danger area', 'warning area'],
    'helicopter_operations': ['heliport', 'helicopter landing', 'helicopter operation'],
    'flight_checks': ['flight check', 'navaid check', 'calibration'],
    'glider_operations': ['glider', 'sailplane', 'gliding'],
    'uncontrolled_airport': ['uncontrolled', 'uncontrolled airport'],
    'aerodrome_closure': ['AD CLSD', 'aerodrome closed'],
    'visual_flight_rules': ['VFR', 'visual flight rules'],
    'instrument_flight_rules': ['IFR', 'instrument flight rules']
    }



    # Iterate through the restriction types and check if any of the keywords are present in the NOTAM text
    for restriction_type, keywords in restriction_types.items():
        for keyword in keywords:
            if re.search(re.escape(keyword), notam, re.IGNORECASE):
                return restriction_type

    # If no restriction type is found, return 'unknown'
    return 'unknown'

# Add more feature extraction functions as needed

# Apply feature extraction functions to the dataset
data['timeframe'] = data['NOTAM'].apply(extract_timeframe)
data['restriction_type'] = data['NOTAM'].apply(extract_restriction_type)
# Extract more features as needed
preprocessed_timeframes = []
for timeframe in data['timeframe']:
    start_time, end_time = timeframe
    start_time = start_time if start_time else 'NA'
    end_time = end_time if end_time else 'NA'
    preprocessed_timeframe = f'{start_time}-{end_time}'
    preprocessed_timeframes.append(preprocessed_timeframe)
# Encode categorical features using one-hot or label encoding
encoder = OneHotEncoder() # or LabelEncoder()
encoded_features = encoder.fit_transform(data[['restriction_type']], preprocessed_timeframes) # Add more features as needed

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(encoded_features, data['Criticality Score'], test_size=0.2, random_state=42)

# Create and train the Random Forest Regressor model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict criticality importance ratings on the test set
y_pred = model.predict(X_test)

# Evaluate the model using mean squared error
mse = mean_squared_error(y_test, y_pred)
print('Mean Squared Error:', mse)

# You can further fine-tune the model, adjust hyperparameters, or try different models to improve performance