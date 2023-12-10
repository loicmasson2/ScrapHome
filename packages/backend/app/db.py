import databases
import ormar
import sqlalchemy

from .config import settings

database = databases.Database(settings.db_url)
metadata = sqlalchemy.MetaData()


class BaseMeta(ormar.ModelMeta):
    metadata = metadata
    database = database


class Home(ormar.Model):
    class Meta(BaseMeta):
        tablename = "homes"

    id: int = ormar.Integer(primary_key=True)
    item_number: int = ormar.Integer()
    summary: str = ormar.String(max_length=128)
    size: int = ormar.Integer()
    price: int = ormar.Integer()
    year: int = ormar.Integer()
    rooms: int = ormar.Integer()
    address: str = ormar.String(max_length=128)
    geolocation = ormar.JSON()
    images = ormar.JSON()
    link: str = ormar.String(max_length=256)



engine = sqlalchemy.create_engine(settings.db_url)
metadata.create_all(engine)