FROM python:3.11-slim

# Set work directory
WORKDIR /app
VOLUME ["/app/data"]

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run with uvicorn
CMD ["python3", "-m", "run"]
