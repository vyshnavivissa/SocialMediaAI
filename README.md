# SocialAI – AI Social Media Publisher

An end-to-end AI-powered social media content generation, publishing, and scheduling platform built using modern Generative AI, backend development, asynchronous task processing, and social media integration technologies.

The project demonstrates the complete workflow of an intelligent social media management system—from image upload and AI content generation to platform-specific content creation, live preview, publishing, post scheduling, history tracking, and OAuth-based social media integration.

---

## Overview

SocialAI helps content creators, digital marketers, businesses, and social media managers generate and manage content across multiple social media platforms from a single application.

Users can upload an image, provide a content idea, select social media platforms, and generate optimized captions and hashtags using a Large Language Model.

The application generates platform-specific posts for Twitter/X, Instagram, LinkedIn, and Facebook. Users can edit the generated content, preview posts before publishing, publish immediately, or schedule posts for a future date and time.

The platform uses LangChain with the Groq API for AI content generation, Django REST Framework for backend APIs, React for the frontend, Celery for asynchronous task execution, and Redis as the message broker.

---

## Features

- AI-Powered Social Media Content Generation
- Image Upload and Preview
- User Prompt-Based Content Generation
- AI-Generated Master Captions
- AI-Generated Hashtags
- Platform-Specific Content Generation
- Twitter/X Post Generation
- Instagram Caption Generation
- LinkedIn Post Generation
- Facebook Post Generation
- Multi-Platform Selection
- Editable Generated Content
- Live Post Preview
- Publish Now Functionality
- Mock Social Media Publishing
- Publishing Status Tracking
- Schedule Posts for a Future Date and Time
- Asynchronous Scheduled Publishing
- Redis Message Queue
- Celery Background Workers
- Scheduled Post History
- Pending Post Status
- Published Post Status
- Failed Post Status
- Generated Post Persistence
- Published Post Persistence
- REST APIs using Django REST Framework
- OAuth Provider Architecture
- OAuth Factory Pattern
- OAuth Service Layer
- Social Media Account Connection Architecture
- Social Media Account Disconnection Architecture
- Responsive React Dashboard
- Buffer-Inspired Social Media Management Interface
- Toast Notifications
- Django Admin Dashboard
- Docker-Based Redis Service

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- Tailwind CSS
- React Icons
- React Hot Toast

### Backend

- Python
- Django
- Django REST Framework
- Django CORS Headers

### Generative AI

- LangChain
- LangChain Groq
- Groq API
- Llama Models
- Prompt Engineering
- LangChain Runnable Pipelines

### Database

- SQLite

### Image Processing

- Pillow
- Django ImageField

### Background Task Processing

- Celery
- Redis

### Social Media Platforms

- Twitter/X
- Instagram
- LinkedIn
- Facebook

### OAuth Architecture

- OAuth 2.0
- Provider Design Pattern
- Factory Design Pattern
- Service Layer Architecture

### Development and Deployment

- Docker
- Git
- GitHub
- Python Virtual Environment
- npm
- Vite

---

## Project Structure

```text
SocialMediaAI/
│
├── backend/
│   │
│   ├── config/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── celery.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── core/
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── tasks.py
│   │   ├── schedule_views.py
│   │   ├── schedule_urls.py
│   │   ├── oauth_views.py
│   │   ├── oauth_urls.py
│   │   ├── exception_handler.py
│   │   ├── publish_views.py
│   │   ├── publish_serializers.py
│   │   └── throttles.py
│   │
│   ├── oauth/
│   │   ├── base_provider.py
│   │   ├── oauth_factory.py
│   │   ├── oauth_service.py
│   │   │
│   │   └── providers/
│   │       ├── linkedin_provider.py
│   │       ├── twitter_provider.py
│   │       ├── instagram_provider.py
│   │       └── facebook_provider.py
│   │
│   ├── prompts/
│   │   ├── caption_prompt.py
│   │   ├── hashtag_prompt.py
│   │   ├── twitter_prompt.py
│   │   ├── instagram_prompt.py
│   │   ├── linkedin_prompt.py
│   │   └── facebook_prompt.py
│   │
│   ├── runnables/
│   │   ├── caption.py
│   │   ├── hashtags.py
│   │   └── platform.py
│   │
│   ├── services/
│   │   ├── llm.py
│   │   ├── image_service.py
│   │   ├── caption_service.py
│   │   ├── hashtag_service.py
│   │   ├── platform_service.py
│   │   ├── publish_service.py
│   │   ├── social_media_service.py
│   │   └── schedule_service.py
│   │
│   ├── tools/
│   │   ├── twitter_tool.py
│   │   ├── instagram_tool.py
│   │   ├── linkedin_tool.py
│   │   └── facebook_tool.py
│   │
│   ├── mock_api/
│   │
│   ├── tests/
│   │   ├── test_llm.py
│   │   └── test_prompt.py
│   │
│   ├── uploads/
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── CreatePostCard.jsx
│   │   │   ├── ImageUploader.jsx
│   │   │   ├── PromptInput.jsx
│   │   │   ├── PlatformSelector.jsx
│   │   │   ├── GenerateButton.jsx
│   │   │   ├── PreviewCard.jsx
│   │   │   ├── PublishButton.jsx
│   │   │   ├── StatusCard.jsx
│   │   │   └── SchedulePost.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── History.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
│
└── README.md
```

---

## End-to-End Application Workflow

```text
User Uploads Image
        ↓
User Provides Content Idea
        ↓
User Selects Social Media Platforms
        ↓
Image Validation
        ↓
Prompt Processing
        ↓
LangChain Runnable Pipeline
        ↓
Groq-Hosted Large Language Model
        ↓
Master Caption Generation
        ↓
Hashtag Generation
        ↓
Platform-Specific Content Generation
        ↓
Twitter/X Content
Instagram Content
LinkedIn Content
Facebook Content
        ↓
Store Generated Content
        ↓
Live Post Preview
        ↓
Edit Generated Content
        ↓
Choose Publishing Method
        │
        ├──────────────┐
        ↓              ↓
Publish Now       Schedule for Later
        ↓              ↓
Publishing API    Django Schedule API
        ↓              ↓
Publishing Status Redis Message Broker
                       ↓
                 Celery Worker
                       ↓
             Execute at Scheduled Time
                       ↓
                Publishing Service
                       ↓
                 Update Status
```

---

## AI Content Generation Pipeline

```text
Image
  +
User Prompt
      ↓
Prompt Validation
      ↓
Caption Prompt Template
      ↓
LangChain Runnable
      ↓
Groq LLM
      ↓
Master Caption
      ↓
Hashtag Prompt
      ↓
AI-Generated Hashtags
      ↓
Platform Prompt Templates
      ↓
Twitter/X Post
Instagram Post
LinkedIn Post
Facebook Post
      ↓
Structured API Response
```

---

## Scheduling Pipeline

```text
Generated Social Media Post
              ↓
Select Platforms
              ↓
Select Future Date and Time
              ↓
POST /schedule/
              ↓
Django REST API
              ↓
Create ScheduledPost
              ↓
Status: Pending
              ↓
Send Task to Redis
              ↓
Celery Worker
              ↓
Wait Until Scheduled Time
              ↓
Execute Publishing Task
              ↓
Create PublishedPost Records
              ↓
Update Scheduled Post Status
              ↓
Published or Failed
```

---

## OAuth Architecture

```text
React Application
        ↓
OAuth Login API
        ↓
OAuth View
        ↓
OAuth Service
        ↓
OAuth Factory
        ↓
Platform Provider
        │
        ├── LinkedIn Provider
        ├── Twitter/X Provider
        ├── Instagram Provider
        └── Facebook Provider
        ↓
Official Platform OAuth API
        ↓
Authorization Code
        ↓
Access Token
        ↓
Social Account Storage
        ↓
Real Social Media Publishing
```

> The OAuth architecture is implemented. Real platform authentication and publishing require developer application credentials, platform permissions, and API approval. Mock publishing is currently used where live credentials are unavailable.

---

## Database Models

### GeneratedPost

Stores:

- Uploaded image
- User prompt
- Master caption
- AI-generated hashtags
- Platform-specific posts
- Creation timestamp
- Update timestamp

### PublishedPost

Stores:

- Generated post reference
- Social media platform
- Published content
- Publishing status
- Publishing timestamp

### ScheduledPost

Stores:

- Generated post reference
- Selected platforms
- Scheduled date and time
- Current scheduling status
- Creation timestamp

Supported statuses:

```text
Pending
Published
Failed
```

### SocialAccount

Stores:

- Social media platform
- Platform user identifier
- Access token
- Refresh token
- Token expiration information
- Connection status

---

## REST API Endpoints

### AI Content Generation

```http
POST /api/generate/
```

Generates:

- Master caption
- Hashtags
- Platform-specific social media posts

### Publish Content

```http
POST /api/publish/
```

Publishes generated content using the configured publishing service.

### Create Scheduled Post

```http
POST /schedule/
```

Example request:

```json
{
    "generated_post": 1,
    "scheduled_time": "2026-07-09T12:30:00+05:30",
    "platforms": [
        "linkedin",
        "twitter"
    ]
}
```

Example response:

```json
{
    "id": 1,
    "scheduled_time": "2026-07-09T12:30:00+05:30",
    "platforms": [
        "linkedin",
        "twitter"
    ],
    "status": "pending",
    "generated_post": 1
}
```

### Scheduled Post History

```http
GET /schedule/history/
```

Returns all pending, published, and failed scheduled posts.

### OAuth Login

```http
GET /oauth/{platform}/login/
```

Example:

```http
GET /oauth/linkedin/login/
```

### OAuth Callback

```http
GET /oauth/{platform}/callback/
```

### Disconnect Social Account

```http
DELETE /oauth/{platform}/disconnect/
```

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>

cd SocialMediaAI
```

---

### 2. Create a Python Virtual Environment

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

---

### 3. Install Backend Dependencies

```bash
cd backend

pip install -r requirements.txt
```

---

### 4. Configure Environment Variables

Create:

```text
backend/.env
```

Add:

```env
GROQ_API_KEY=your_groq_api_key

LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
LINKEDIN_REDIRECT_URI=http://127.0.0.1:8000/oauth/linkedin/callback/

TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
TWITTER_REDIRECT_URI=http://127.0.0.1:8000/oauth/twitter/callback/

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_REDIRECT_URI=http://127.0.0.1:8000/oauth/facebook/callback/

INSTAGRAM_CLIENT_ID=
INSTAGRAM_CLIENT_SECRET=
INSTAGRAM_REDIRECT_URI=http://127.0.0.1:8000/oauth/instagram/callback/
```

Never commit the `.env` file to GitHub.

---

### 5. Apply Database Migrations

```bash
python manage.py makemigrations

python manage.py migrate
```

---

### 6. Start Redis with Docker

Start Docker Desktop.

Run:

```bash
docker run -d \
--name socialai-redis \
-p 6379:6379 \
redis
```

Verify:

```bash
docker exec -it socialai-redis redis-cli ping
```

Expected:

```text
PONG
```

---

### 7. Start the Celery Worker

On Windows:

```bash
celery -A config worker --loglevel=info --pool=solo
```

Expected:

```text
Connected to redis://localhost:6379/0

core.tasks.publish_scheduled_post

celery ready
```

---

### 8. Start the Django Backend

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000
```

---

### 9. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend

npm install
```

---

### 10. Start React

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Running the Complete Application

Keep the following services running:

```text
Docker Desktop
      ↓
Redis Container

Terminal 1
      ↓
Celery Worker

Terminal 2
      ↓
Django REST API

Terminal 3
      ↓
React Application
```

---

## AI Content Generation

The application uses LangChain Runnable pipelines and Groq-hosted LLMs.

The generation workflow creates:

- A reusable master caption
- Relevant social media hashtags
- Short-form Twitter/X content
- Engaging Instagram captions
- Professional LinkedIn posts
- Audience-focused Facebook posts

Each platform uses a dedicated prompt template to generate content appropriate for its audience and content style.

---

## Prompt Engineering

Dedicated prompts are used for:

- Master caption generation
- Hashtag generation
- Twitter/X post generation
- Instagram caption generation
- LinkedIn professional post generation
- Facebook community post generation

This modular architecture makes prompts easier to test, improve, and maintain.

---

## Publishing Status

The application tracks publishing results for every selected platform.

Supported publishing statuses:

```text
Success
Failed
```

Scheduled posts support:

```text
Pending
Published
Failed
```

---

## Scheduled Post History

The History dashboard displays:

- Scheduled post ID
- Scheduled date and time
- Selected platforms
- Generated post reference
- Current publishing status

Status indicators:

```text
Pending   

Published 

Failed    
```

---

## Business Impact

This project demonstrates modern AI application engineering practices, including:

- Automated Social Media Content Creation
- Multi-Platform Content Optimization
- Reduced Manual Content Writing
- AI-Assisted Marketing Workflows
- Centralized Social Media Management
- Content Preview and Editing
- Automated Post Scheduling
- Background Task Processing
- Scalable Service-Oriented Backend Architecture
- Modular Prompt Engineering
- REST API Development
- Asynchronous Task Execution
- OAuth-Ready Social Media Integration
- Improved Productivity for Content Creators
- Faster Content Production for Businesses

---

## Current Implementation Status

```text
AI Content Generation                 Completed

Image Upload                          Completed

Master Caption Generation             Completed

Hashtag Generation                    Completed

Twitter/X Content Generation          Completed

Instagram Content Generation          Completed

LinkedIn Content Generation           Completed

Facebook Content Generation           Completed

Multi-Platform Selection              Completed

Editable Live Preview                 Completed

Mock Publishing                       Completed

Publishing Status                     Completed

Scheduled Publishing                  Completed

Redis Integration                     Completed

Celery Integration                    Completed

Schedule History                      Completed

OAuth Architecture                    Completed

Real OAuth Authentication             Planned

Real Platform Publishing              Planned
```

---

## Future Enhancements

- Real LinkedIn OAuth Integration
- Real Twitter/X OAuth Integration
- Real Facebook OAuth Integration
- Real Instagram OAuth Integration
- Official Social Media Publishing APIs
- Connect and Disconnect Social Accounts
- Access Token Refresh
- Secure OAuth Token Encryption
- User Authentication
- Multi-User Support
- PostgreSQL Database
- Celery Beat
- Scheduled Post Cancellation
- Scheduled Post Editing
- Calendar-Based Content Planner
- Drag-and-Drop Content Calendar
- AI Image Generation
- AI Image Captioning
- Automatic Best Posting Time Recommendation
- Social Media Analytics
- Engagement Tracking
- Likes and Comment Analytics
- Content Performance Dashboard
- AI Content Recommendations
- Trending Hashtag Discovery
- Multiple Social Media Accounts
- Content Approval Workflow
- Team Collaboration
- Role-Based Access Control
- Email Notifications
- GitHub Actions CI/CD
- Docker Compose
- AWS Deployment
- Kubernetes Deployment
- Prometheus Monitoring
- Grafana Dashboards
- MLflow Prompt and Model Tracking
- LLM Response Evaluation
- Automated Prompt Testing

---

## Use Cases

- Content Creators
- Social Media Managers
- Digital Marketing Teams
- Startups
- Small Businesses
- Marketing Agencies
- Personal Brands
- Influencers
- Freelancers
- Enterprise Marketing Teams

---

## Conclusion

SocialAI demonstrates an end-to-end Generative AI application that combines AI-powered content generation, platform-specific prompt engineering, live content preview, social media publishing architecture, asynchronous task execution, and automated scheduling.

The project follows a modular architecture using React, Django REST Framework, LangChain, Groq, Celery, Redis, and Docker.

It provides a scalable foundation for building a production-ready AI-powered social media management and publishing platform.
---
