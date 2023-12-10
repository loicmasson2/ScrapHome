from fastapi import FastAPI
import json
from app.db import database, Home

app = FastAPI(title="ScrapHome")

f = open("./app/moredata.json")
data = json.load(f)


@app.get("/homes")
async def read_root():
    return await Home.objects.all()

@app.get("/homes/{home_id}")
async def get_home(home_id: int):
    return await Home.objects.all(item_number=home_id)


@app.on_event("startup")
async def startup():
    if not database.is_connected:
        await database.connect()

@app.on_event("shutdown")
async def shutdown():
    if database.is_connected:
        await database.disconnect()
