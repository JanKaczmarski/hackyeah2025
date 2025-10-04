FROM golang:1.25.1-trixie

WORKDIR /app

COPY . .

EXPOSE 2137

RUN go build

CMD ["./datagen"]
