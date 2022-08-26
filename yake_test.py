import yake
import pandas as pd
import spacy
import os

rv_folder_path = './Reviews/'
files = os.listdir(rv_folder_path)
nlp = spacy.load('en_core_web_sm')

def clean_text(text):
    text = text.lower()
    doc = nlp(text)
    #not token.is_punct and 
    text = ' '.join(token.lemma_ for token in doc if(not token.is_currency and not token.is_digit and not token.is_space and not token.is_stop))
    return text

def get_keywords_extraction(review):
  doc = review
  doc = clean_text(doc)
  print(doc)
  kw_extractor = yake.KeywordExtractor(n=2)
  
  keywords = kw_extractor.extract_keywords(doc)
  finalized_kw = []
  for kw in keywords:
    if(kw[1] <= 0.05):
      finalized_kw.append(kw)
  print(finalized_kw)


path = os.path.join(rv_folder_path,"BCH.csv")
print(path)
df = pd.read_csv(path)

if(df['reviews'].isna().sum() > 0):
  df = df.dropna()

df['reviews'].apply(lambda x:get_keywords_extraction(x))

# kw_extractor = yake.KeywordExtractor()
# keywords = kw_extractor.extract_keywords(doc)
# for kw in keywords:
#   print(kw)