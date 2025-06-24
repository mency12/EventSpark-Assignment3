# EventSpark Calculator Backend - Express.js

This is the Express.js version of the EventSpark Calculator Backend, converted from Spring Boot while maintaining the same API structure and business logic.

## Features

- **Same API Endpoints**: Maintains compatibility with the original Spring Boot API
- **Calculator Operations**: Addition, subtraction, multiplication, division
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **CORS Support**: Configured for the same origins as the original
- **Health Check**: `/api/health` endpoint for monitoring
- **Security**: Helmet.js for security headers
- **Logging**: Morgan for HTTP request logging

## API Endpoints

### POST `/api/calculator/calculate`

Performs mathematical calculations.

**Request Body:**

```json
{
  "num1": 10,
  "num2": 5,
  "operation": "add"
}
```

**Supported Operations:**

- `add` or `+` - Addition
- `subtract` or `-` - Subtraction
- `multiply` or `*` - Multiplication
- `divide` or `/` - Division

**Response:**

```json
{
  "result": 15,
  "message": "Success"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**

```
Calculator Backend is running!
```

## Setup

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Start the production server:

```bash
npm start
```

### Testing

Run tests:

```bash
npm test
```

## Deployment

### Docker

Build the Docker image:

```bash
docker build -t eventspark-calculator-backend .
```

Run the container:

```bash
docker run -p 8080:8080 eventspark-calculator-backend
```

### Render

The `render.yaml` file is configured for deployment on Render. The service will automatically deploy when changes are pushed to the repository.

## Environment Variables

- `PORT` - Server port (default: 8080)

## CORS Configuration

The backend is configured to accept requests from:

- `https://event-spark-self.vercel.app`
- `https://event-spark-prod.vercel.app`
- `http://localhost:3000`

## Migration from Spring Boot

This Express.js version maintains full compatibility with the original Spring Boot API:

- Same endpoint structure (`/api/calculator/calculate`, `/api/health`)
- Same request/response format
- Same business logic for calculations
- Same error handling patterns
- Same CORS configuration

No changes are required in the frontend application.
