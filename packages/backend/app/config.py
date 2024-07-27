
import os

from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    db_url: str = Field(..., env='POSTGRES_URL')

settings = Settings()