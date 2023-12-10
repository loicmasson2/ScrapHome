FROM ubuntu:latest
LABEL authors="bled6"

ENTRYPOINT ["top", "-b"]