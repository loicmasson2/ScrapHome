# Crawler

## Getting started

```
// if you have poetry
// https://python-poetry.org/docs/basic-usage/
poetry install

make run

// wait for it to finish

make run2
// naming is hard
```

## The process 

In `extract.py` I have a URL that has filters already registered.
When running `extract.py` it will go through the listing 50 ads at the time and record the initial information.
It will then proceed to the next page and get the next 50 if there is any.
```
links -> url to a specific home
summary 
price 
year
```

When running `extract_more.py` it will go through all the links gathered before, and enhance that data.
```
// on top of the above it will get
address
postcode
rooms
size
geolocation
images <- trickiest to get as it is hidden in the js code
```
It will query only one house per second to be a decent scraper.
