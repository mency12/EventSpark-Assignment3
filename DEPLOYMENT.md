# Deployment Guide - EventSpark Calculator

This guide explains how to set up CI/CD for the EventSpark Calculator project with GitHub Actions, deploying to Render (Backend) and Vercel (Frontend).

## Branch Strategy

- **`dev` branch**: Development environment
- **`main` branch**: Production environment

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Render Account**: For backend deployment
3. **Vercel Account**: For frontend deployment
4. **GitHub Secrets**: Configure the required secrets

## Setup Instructions

### 1. GitHub Repository Setup

1. Create a new repository on GitHub
2. Push your code to the repository
3. Create two branches: `dev` and `main`

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/eventspark-calculator.git
git push -u origin main
git checkout -b dev
git push -u origin dev
```

### 2. Render Setup (Backend)

#### Create Render Services

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Create two web services for your backend:
   - **Development Service**: `eventspark-calculator-backend-dev`
   - **Production Service**: `eventspark-calculator-backend-prod`

#### Development Service Configuration:

- **Name**: `eventspark-calculator-backend-dev`
- **Environment**: `Java`
- **Build Command**: `mvn clean package -DskipTests`
- **Start Command**: `java -jar target/calculator-backend-0.0.1-SNAPSHOT.jar`
- **Branch**: `dev`

#### Production Service Configuration:

- **Name**: `eventspark-calculator-backend-prod`
- **Environment**: `Java`
- **Build Command**: `mvn clean package -DskipTests`
- **Start Command**: `java -jar target/calculator-backend-0.0.1-SNAPSHOT.jar`
- **Branch**: `main`

### 3. Vercel Setup (Frontend)

#### Create Vercel Projects

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create two projects for your frontend:
   - **Development Project**: `eventspark-calculator-frontend-dev`
   - **Production Project**: `eventspark-calculator-frontend-prod`

#### Development Project Configuration:

- **Framework Preset**: `Create React App`
- **Root Directory**: `Frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Branch**: `dev`

#### Production Project Configuration:

- **Framework Preset**: `Create React App`
- **Root Directory**: `Frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Branch**: `main`

### 4. GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add the following secrets:

#### Required Secrets:

```
RENDER_API_KEY=your_render_api_key
RENDER_SERVICE_ID_DEV=your_dev_service_id
RENDER_SERVICE_ID_PROD=your_prod_service_id
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID_DEV=your_dev_project_id
VERCEL_PROJECT_ID_PROD=your_prod_project_id
```

#### How to get these values:

**Render API Key:**

1. Go to Render Dashboard → Account Settings → API Keys
2. Create a new API key

**Render Service IDs:**

1. Go to your Render service
2. Copy the Service ID from the URL or service settings

**Vercel Token:**

1. Go to Vercel Dashboard → Settings → Tokens
2. Create a new token

**Vercel Org ID:**

1. Go to Vercel Dashboard → Settings
2. Copy the Team ID

**Vercel Project IDs:**

1. Go to your Vercel project
2. Copy the Project ID from the project settings

### 5. Environment Variables

#### Frontend Environment Variables

Create environment files in the Frontend directory:

**For Development (.env.development):**

```
REACT_APP_API_URL=https://your-dev-backend.onrender.com
REACT_APP_ENV=development
```

**For Production (.env.production):**

```
REACT_APP_API_URL=https://your-prod-backend.onrender.com
REACT_APP_ENV=production
```

#### Vercel Environment Variables

Set these in your Vercel project settings:

**Development Project:**

- `REACT_APP_API_URL`: `https://your-dev-backend.onrender.com`
- `REACT_APP_ENV`: `development`

**Production Project:**

- `REACT_APP_API_URL`: `https://your-prod-backend.onrender.com`
- `REACT_APP_ENV`: `production`

### 6. CORS Configuration

Update the backend CORS configuration to allow requests from your Vercel domains:

```java
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://your-dev-frontend.vercel.app",
    "https://your-prod-frontend.vercel.app"
})
```

## Workflow Overview

### Development Workflow:

1. Push changes to `dev` branch
2. GitHub Actions triggers:
   - Backend tests and deployment to Render (dev)
   - Frontend tests and deployment to Vercel (dev)

### Production Workflow:

1. Merge `dev` into `main` branch
2. GitHub Actions triggers:
   - Backend tests and deployment to Render (prod)
   - Frontend tests and deployment to Vercel (prod)

## Testing the Setup

### 1. Test Development Deployment:

```bash
git checkout dev
# Make changes to Backend or Frontend
git add .
git commit -m "Test dev deployment"
git push origin dev
```

### 2. Test Production Deployment:

```bash
git checkout main
git merge dev
git push origin main
```

## Monitoring

### GitHub Actions:

- Monitor workflow runs in the Actions tab
- Check for any build or deployment failures

### Render:

- Monitor backend deployments in Render dashboard
- Check logs for any runtime errors

### Vercel:

- Monitor frontend deployments in Vercel dashboard
- Check build logs and deployment status

## Troubleshooting

### Common Issues:

1. **Backend deployment fails:**

   - Check Maven build logs
   - Verify Java version compatibility
   - Check Render service configuration

2. **Frontend deployment fails:**

   - Check npm build logs
   - Verify environment variables
   - Check Vercel project configuration

3. **CORS errors:**

   - Update backend CORS configuration
   - Verify frontend API URL configuration

4. **Environment variables not working:**
   - Check Vercel environment variable settings
   - Verify variable names start with `REACT_APP_`

## Security Considerations

1. **API Keys**: Never commit secrets to the repository
2. **Environment Variables**: Use different values for dev and prod
3. **CORS**: Only allow necessary domains
4. **Dependencies**: Regularly update dependencies for security patches

## Cost Optimization

1. **Render**: Use free tier for development, paid tier for production
2. **Vercel**: Free tier is sufficient for most use cases
3. **GitHub Actions**: Free tier includes 2000 minutes/month

## Support

For issues with:

- **GitHub Actions**: Check GitHub documentation
- **Render**: Contact Render support
- **Vercel**: Contact Vercel support
- **Project-specific**: Check the project README
