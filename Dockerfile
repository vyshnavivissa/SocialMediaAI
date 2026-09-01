# ==========================================
# STAGE 1: Build React Frontend
# ==========================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy frontend dependency files and install
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source files and generate production build
COPY frontend/ ./
RUN npm run build

# ==========================================
# STAGE 2: Python Backend & Unified Production Server
# ==========================================
FROM python:3.11-slim AS runner

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000

# Install required system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend

# Install Python backend dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ ./

# Copy built React frontend static assets into frontend_dist directory
COPY --from=frontend-builder /app/frontend/dist ./frontend_dist

# Expose production port
EXPOSE 8000

# Run database migrations, collect static assets, and launch Gunicorn web server
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3"]
