from ast import keyword
import os
import json
from typing import final
import yake
import spacy
import pandas as pd
import firebase_admin
from dotenv import load_dotenv
from collections import Counter
from firebase_admin import firestore
from flask import Flask, request, jsonify
from google.cloud.firestore import GeoPoint
from spacytextblob.spacytextblob import SpacyTextBlob


load_dotenv()

service_account_path = os.environ.get("FIREBASE_SERVICE_ACCOUNT")
print(service_account_path)

if not firebase_admin._apps:
    cred_object = firebase_admin.credentials.Certificate(
        service_account_path)
    default_app = firebase_admin.initialize_app(cred_object)

app = Flask(__name__)
db = firestore.client()


rv_folder_path = './Reviews/'
files = os.listdir(rv_folder_path)

nlp = spacy.load('en_core_web_sm') # Loads the nlp model
nlp.add_pipe('spacytextblob')

def make_df(file):
    path = os.path.join(rv_folder_path,file)
    df = pd.read_csv(path)

    if(df['reviews'].isna().sum() > 0):
        df = df.dropna()
    
    return df

# parse the polarity into integer value
def get_sentiment(text):
    doc = nlp(text)
    if(doc._.blob.polarity > 0):
        return 1
    elif(doc._.blob.polarity < 0):
        return -1
    else:
        return 0

# clean up the texts, lemmatize, remove punctuations, currency symbols, digits, spaces, and stop words
def clean_text(text):
    text = text.lower()
    doc = nlp(text)
    
    text = ' '.join(token.lemma_ for token in doc if(not token.is_currency and not token.is_digit and not token.is_space and not token.is_stop))
    return text

# get average value for the sentiment
def get_overall(df,file):
    sentiment = list(df['sentiment'])
    overall_sentiment = sum(sentiment)
    positive_num = sentiment.count(1)
    neutral_num = sentiment.count(0)
    avg = f'{positive_num}/{len(sentiment) - neutral_num}'

    return overall_sentiment, avg

# main function to get sentiment
def sentiment_analysis(df,file):

    df['reviews'] = df['reviews'].apply(lambda x:clean_text(x))
    df['sentiment'] = df['reviews'].apply(lambda x:get_sentiment(x))

    if('Unnamed: 0' in df):
        df = df.drop(['Unnamed: 0'], axis=1)

    overall_sentiment, ratio = get_overall(df,file) # get overall sentiment for the location and the ratio
    print(f'Sentiment for {file} is {overall_sentiment}, {ratio}')
    return overall_sentiment

def get_top_keywords(keywords):
    top = []
    indicator = 0
    while(indicator < 3 and indicator < len(keywords)):
        top.append(keywords[indicator][0])
        indicator += 1
    return top
    

def get_keywords(review):
    kw = []
    top_3_kw = []

    doc = review
    doc = clean_text(doc)
    # print(doc)
    kw_extractor = yake.KeywordExtractor(n=2)
    keywords = kw_extractor.extract_keywords(doc)
    
    for keyword in keywords:
        if(keyword[1] <= 0.05):
            kw.append(keyword)
        kw.sort(key = lambda x: x[1])

    top_3_kw = get_top_keywords(kw)
    return top_3_kw


def keyword_extraction(df,file):
    all_keywords = []
    location_top_keywords = []
    for review in df['reviews']:
        top_keywords = get_keywords(review) # top 3 keywords for each review
        top_keywords.sort(key = lambda x: x[1])
        all_keywords = all_keywords + top_keywords

    keywords_dict = dict(zip(Counter(all_keywords).keys(), Counter(all_keywords).values()))
    keywords_dict = dict(sorted(keywords_dict.items(), key=lambda item: item[1], reverse=True))

    location_top_keywords = list(keywords_dict.keys())[:3] # top 3 keywords for location
    print(f'{file} top 3 overall keywords are : {location_top_keywords}')
    return location_top_keywords

file = files[16]
df = make_df(file)

data = {
    "activities":["futsal","frisbee"],
    "keywords":[],
    "locationCoordinate": GeoPoint(3.0948,101.6311),
    "locationName": "Republic of Futsal",
    "sentimentPolarity": 0,
    "thumbnailUrl": "https://republicoffutsal.com.my/wp-content/uploads/2019/09/5ceed770-92d5-4dfd-90ba-ee89484e6818.jpg"
}

polarity = sentiment_analysis(df,file)
keywords = keyword_extraction(df,file)

data['sentimentPolarity'] = polarity
data['keywords'] = keywords

db.collection('locations').add(data)

