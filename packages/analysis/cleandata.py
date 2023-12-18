
import json


f = open("moredata.json")
data = json.load(f)

trimmed_data= []

for home in data:
    trimmed_data.append({
        "size": home["size"],
        "year": home["year"],
        "rooms": home["rooms"],
        "price": home["price"]
    })

with open('test.json', 'w') as f:
    json.dump(trimmed_data, f)