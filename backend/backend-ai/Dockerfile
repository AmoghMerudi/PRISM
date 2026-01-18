FROM python:${PYTHON_VERSION:-3.11}-slim

ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    POETRY_VIRTUALENVS_CREATE=false

WORKDIR /app

# Install system deps required for some wheels
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl ca-certificates git && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY backend-ai/requirements.txt /app/requirements.txt
RUN python -m pip install --upgrade pip setuptools wheel
RUN python -m pip install -r /app/requirements.txt

# Copy source
COPY backend-ai/src /app/src

# Don't COPY .env (use Render environment variables / secrets instead)

EXPOSE $PORT

# Start using python -m uvicorn so we don't rely on gunicorn CLI being present.
# Use sh -c so ${PORT} expands at runtime (Render injects PORT).
CMD ["sh", "-c", "python -m uvicorn src.main:app --host 0.0.0.0 --port ${PORT:-8000} --workers 4"]