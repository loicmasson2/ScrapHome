import pandas as pd
import json
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import stats
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn import metrics
from sklearn.ensemble import RandomForestRegressor

# Load the dataset
data = pd.read_csv("csvfile.csv")
# shape of the data
# {
#     "size": "124",
#     "year": "2024",
#     "rooms": "5",
#     "postcode": "17",
#     "price": "669000"
# },

numeric_cols = ["size", "year", "price", "rooms"]

for col in numeric_cols:
    data[col] = data[col].astype(float)


# Visualize the distribution of house prices
plt.figure(figsize=(8, 6))
sns.histplot(data['price'], bins=30, kde=True)
plt.title('Price Distribution')
plt.xlabel('Price')
plt.ylabel('Frequency')
plt.show()

X_train, x_test, Y_train, y_test = train_test_split(
    data.drop("price", axis=1), data.price
)

model = RandomForestRegressor(n_estimators=50)

model.fit(X_train, Y_train)

# %%
pred = model.predict(x_test)

plt.figure(figsize=(20, 12))

plt.plot(range(0, y_test.shape[0]), y_test, marker="+")
plt.plot(range(0, pred.shape[0]), pred, marker="o")

plt.show()

model.score(x_test, y_test)

# %%

important_features_dict = {}
for x, i in enumerate(model.feature_importances_):
    important_features_dict[x] = i


important_features_list = sorted(important_features_dict,
                                 key=important_features_dict.get,
                                 reverse=True)

print('Most important features: {}', important_features_list[:15])

feature_importances = {}

i = 0

for feat, importance in zip(data.columns, important_features_list):
    print('feature: {f}, importance: {i}'.format(f=feat, i=importance))

y_pred = model.predict(x_test)
print(metrics.r2_score(y_test,y_pred))

# %%

print("DATA")
print(model.predict(data.drop("price", axis=1)))
# cool_pred = model.predict(x_test)

for i in zip(y_pred, y_test):
    print(i[0])
    if(i[0] > i[1]):
        print("HIT")



f = open("trimmed_data.json")
original_data = json.load(f)

expanded_data= []
predicted_data = model.predict(data.drop("price", axis=1))
for index, home in enumerate(original_data):
    expanded_data.append({
        "size": home["size"],
        "year": home["year"],
        "rooms": home["rooms"],
        "price": home["price"],
        "predicted_price": str(predicted_data[index])
    })

with open('expanded_data.json', 'w') as f:
    json.dump(expanded_data, f)