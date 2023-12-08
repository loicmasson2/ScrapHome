import requests
import json
from bs4 import BeautifulSoup

home_class = "Lloosjx"
home_link_class = "e1re311t2"
pagination_button_class = "em5t2eg0"
def get_ads(soup):
    ads = soup.find_all("div", class_=home_class)
    results = []
    for home in ads:
        home_link = home.find("a", class_=home_link_class)
        home_summary = home.find("h5")
        home_price = home.find_all("h6")[0].next_sibling
        home_size = home.find_all("h6")[1].next_sibling
        home_year = home.find_all("h6")[2].next_sibling
        results.append({
            "home_link": home_link['href'],
            "home_summary": home_summary.text,
            "home_price": home_price.text,
            "home_size": home_size.text,
            "home_year": home_year.text
        })
    return results


page = requests.get("https://www.etuovi.com/myytavat-asunnot/helsinki?haku=M2054709531&sivu=1")
soup = BeautifulSoup(page.content, "html.parser")
page_size = 50

pagination = soup.find(id="pagination").find_all("button", class_=pagination_button_class)
max_page = 1
for button in pagination:
    if button.text.isdigit():
        max_page = max(max_page, int(button.text))

final_results = []
for i in range(1, max_page + 1):
    new_page = page
    new_soup = soup
    is_first_page = i == 1
    # I have already the first page since I need to build the pagination
    if not is_first_page:
        new_page = requests.get("https://www.etuovi.com/myytavat-asunnot/helsinki?haku=M2054709531&sivu=1")
        new_soup = BeautifulSoup(page.content, "html.parser")
    new_ads = get_ads(new_soup)
    # only works for python > 3.5
    final_results = [*final_results, *new_ads]

with open('mydata.json', 'w') as f:
    json.dump(final_results, f)
