from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore
# from dotenv import load_dotenv
import os
import json

# Use for local testing
# load_dotenv()

# service_account_path = os.environ.get("FIREBASE_SERVICE_ACCOUNT")
# service_account_obj = os.environ.get("GOOGLE_CREDS")
# print(service_account_obj)


def create_keyfile_dict():
    variables_keys = {
        "type": os.getenv("TYPE"),
        "project_id": os.getenv("PROJECT_ID"),
        "private_key_id": os.getenv("PRIVATE_KEY_ID"),
        "private_key": os.getenv("PRIVATE_KEY"),
        "client_email": os.getenv("CLIENT_EMAIL"),
        "client_id": os.getenv("CLIENT_ID"),
        "auth_uri": os.getenv("AUTH_URI"),
        "token_uri": os.getenv("TOKEN_URI"),
        "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER_X509_CERT_URL"),
        "client_x509_cert_url": os.getenv("CLIENT_X509_CERT_URL")
    }
    return variables_keys


if not firebase_admin._apps:
    cred_object = firebase_admin.credentials.Certificate(
        create_keyfile_dict())
    default_app = firebase_admin.initialize_app(cred_object)

app = Flask(__name__)
db = firestore.client()

# Change this to the proper URL of the frontend when ready for deployment
# This is currently our deployed frontend URL.
CORS(app, origins=["https://fitnity.web.app"])


@app.route("/")
def index():
    return jsonify({"message": "Hello World"})


@app.route("/search")
def search():
    request_params = dict(request.args)
    search_type = request_params["searchType"]

    if search_type == "locations":
        activity = request_params["activity"]
        docs = db.collection("locations").where(
            "activities", "array_contains", activity).get()

    elif search_type == "activities":
        if "activity" in request_params:
            docs = db.collection("activities").where(
                "type", "==", request_params["activity"]).get()

        elif "locationName" in request_params:
            docs = db.collection("activities").where(
                "locationName", "==", request_params["locationName"]).get()

    results = []

    for doc in docs:
        temp = doc.to_dict()

        if "locationCoordinate" in temp:
            latitude, longitude = temp["locationCoordinate"].latitude, temp["locationCoordinate"].longitude
            temp["locationCoordinate"] = {
                "latitude": latitude, "longitude": longitude}

        results.append(temp)

    return jsonify(results)


@app.route('/create-activity', methods=['GET', 'POST'])
def create_activity():
    if request.method == "GET":
        docs = db.collection("locations").get()

        location_results = []

        for doc in docs:
            temp = doc.to_dict()
            location_results.append({
                "locationName": temp["locationName"],
                "activities": temp["activities"]
            })

        docs = db.collection("activities").where(
            "userName", "==", "fiquee").get()

        user_activities_results = []

        for doc in docs:
            temp = doc.to_dict()
            user_activities_results.append(temp)

        return jsonify({"locations": location_results, "userActivities": user_activities_results})

    elif request.method == "POST":
        new_activity_data = request.json
        new_activity_data["time"] = new_activity_data["time"].replace(":", "")
        db.collection("activities").add(new_activity_data)

        return jsonify({"status": "successful"})


@app.route('/sports-of-fame')
def sports_of_fame():
    results = []

    collections = db.collection("user").document(
        "M8LIsX8j5rpqznEDAZ55").collections()

    for collection in collections:
        for doc in collection.stream():
            results.append(doc.to_dict())

    return jsonify({"userProgress": results})


if __name__ == '__main__':
    app.run()

    # app.run(debug=True)
