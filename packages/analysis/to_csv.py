import pandas as pd

with open('trimmed_data.json', encoding='utf-8') as inputfile:
    df = pd.read_json(inputfile)

df.to_csv('csvfile.csv', encoding='utf-8', index=False)