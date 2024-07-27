import requests
import json
from bs4 import BeautifulSoup
import re
import time

f = open("mydata.json")
data = json.load(f)

url_root = "https://www.etuovi.com"

for home in data:
    print(home["summary"])
    test_url = url_root + home["link"]
    print(test_url)

    page = requests.get(test_url)
    soup = BeautifulSoup(page.content, "html.parser")

    # Extract the location that is hidden in the window object of the browser
    scripts = soup.find_all("script")
    start = "geoCode"
    end = "country"
    s = scripts[1].text
    latitude_longitude = s[s.find(start) + (len(start) + 2) : s.find(end) - 2]
    home["geolocation"] = json.loads(latitude_longitude)
    print("GEOLOCATION DONE")

    #  Extract more information
    more_info_class = "OOMp5ET"
    rows = soup.find_all("div", class_=more_info_class)
    important_fields = ["sijainti", "huoneita", "asuintilojen pinta-ala", "kohdenumero"]
    for row in rows:
        header = row.find("em")
        if header.text.lower() in important_fields:
            if header.text.lower() == "sijainti":
                home["address"] = header.find_next().text
                # TODO something is wrong here - sometimes it gets 6 or 7B from address
                home["postcode"] = re.findall("[0-9]\w+", header.find_next().text)[0]
            if header.text.lower() == "huoneita":
                home["rooms"] = re.findall("[0-9]+", header.find_next().text)[0]
            if header.text.lower() == "asuintilojen pinta-ala":
                home["size"] = re.findall("[0-9]\w+", header.find_next().text)[0]
            if header.text.lower() == "kohdenumero":
                home["id"] = re.findall("[0-9]\w+", header.find_next().text)[0]

    print("MORE INFO DONE")

    # Can only extract images stored in windows object
    # as the list of images is loaded on the fly
    image_url = (
        test_url[: test_url.find("?")] + "/kuvat" + test_url[test_url.find("?") :]
    )
    print("IMAGE URLS")
    print(image_url)
    new_page = requests.get(image_url)
    new_soup = BeautifulSoup(new_page.content, "html.parser")
    images2 = soup.find_all("img")
    print(images2)
    scripts = soup.find_all("script")
    start = '"images":'
    end = '"periodicCharges":'
    s = scripts[1].text
    start_index = s.find(start)
    # cut what is before since it will contain my end of object
    # easier that way to just pick the 1st occurrence
    substring = s[start_index:]
    print("substring")
    print(substring)
    end_of_object = substring.find('}}},"')
    full_images_string = "{" + substring[: end_of_object + 3] + "}"
    home["images"] = json.loads(full_images_string)
    print("IMAGES INFO DONE")
    print(
        "===================================================================================="
    )

    time.sleep(1)

with open("moredata.json", "w") as f:
    json.dump(data, f)
