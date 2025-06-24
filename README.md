# EventSpark Calculator Project

A simple calculator application demonstrating full-stack development with Express.js backend and React frontend, featuring complete CI/CD pipeline with GitHub Actions.

## Project Structure

```
EventSpark/
├── Backend/                 # Express.js Application
│   ├── services/
│   │   └── calculatorService.js
│   ├── routes/
│   │   ├── calculatorRoutes.js
│   │   └── healthRoutes.js
│   ├── tests/
│   │   └── calculatorService.test.js
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── render.yaml
├── Frontend/                # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── vercel.json
├── .github/
│   └── workflows/
│       ├── backend-dev.yml
│       ├── backend-prod.yml
│       ├── frontend-dev.yml
│       └── frontend-prod.yml
├── README.md
└── DEPLOYMENT.md
```

## Features

- **Backend (Express.js)**:

  - RESTful API endpoints for calculator operations
  - Support for addition, subtraction, multiplication, and division
  - Error handling for invalid operations (e.g., division by zero)
  - CORS configuration for frontend communication
  - Comprehensive unit tests with Jest
  - Security headers with Helmet.js
  - Request logging with Morgan

- **Frontend (React)**:

  - Modern, responsive UI with beautiful styling
  - Real-time calculation with backend integration
  - Error handling and loading states
  - Mobile-friendly design
  - Component testing with Jest and React Testing Library

- **CI/CD Pipeline**:
  - GitHub Actions workflows for both development and production
  - Automated testing and deployment
  - Separate environments for dev and prod
  - Backend deployment to Render
  - Frontend deployment to Vercel

## Branch Strategy

- **`dev` branch**: Development environment
- **`main` branch**: Production environment

## Prerequisites

- Node.js 18 or higher
- npm
- GitHub account
- Render account (for backend deployment)
- Vercel account (for frontend deployment)

## Local Development Setup

### Backend Setup

1. Navigate to the Backend directory:

   ```bash
   cd Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the Express.js application:
   ```bash
   npm start
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the Frontend directory:

   ```bash
   cd Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

## CI/CD Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Setup:

1. **Push to GitHub**: Create a repository and push your code
2. **Configure Secrets**: Add required secrets in GitHub repository settings
3. **Set up Render**: Create two web services for backend deployment
4. **Set up Vercel**: Create two projects for frontend deployment
5. **Configure Environment Variables**: Set up environment-specific variables

### Workflow:

- **Development**: Push to `dev` branch → Automatic deployment to dev environments
- **Production**: Merge to `main` branch → Automatic deployment to production environments

## API Endpoints

### POST `/api/calculator/calculate`

Performs mathematical calculations.

**Request Body:**

```json
{
  "num1": 10,
  "num2": 5,
  "operation": "+"
}
```

**Response:**

```json
{
  "result": 15.0,
  "message": "Success"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**

```
Calculator Backend is running!
```

## Supported Operations

- `+` or `add` - Addition
- `-` or `subtract` - Subtraction
- `*` or `multiply` - Multiplication
- `/` or `divide` - Division

## How to Use

1. Start both the backend and frontend servers (or use deployed versions)
2. Open your browser and navigate to the frontend URL
3. Enter two numbers in the input fields
4. Select an operation using the operation buttons
5. Click "Calculate" to perform the calculation
6. The result will be displayed below the calculator

## Testing

### Backend Tests

```bash
cd Backend
npm test
```

### Frontend Tests

```bash
cd Frontend
npm test
```

## Error Handling

The application handles various error scenarios:

- Division by zero
- Invalid operations
- Network connectivity issues
- Missing input validation

## Technologies Used

- **Backend**: Express.js, Node.js 18, Jest, Helmet.js, Morgan
- **Frontend**: React 18, Axios, CSS3, Jest, React Testing Library
- **Communication**: RESTful API with JSON
- **CI/CD**: GitHub Actions, Render, Vercel
- **Testing**: Jest, React Testing Library

## Development

To modify the calculator:

- Add new operations in `services/calculatorService.js`
- Update the frontend operation buttons in `Calculator.js`
- Modify styling in the respective CSS files
- Add tests for new functionality

## Troubleshooting

1. **Backend won't start**: Ensure Node.js 18+ is installed and run `npm install`
2. **Frontend won't start**: Ensure Node.js 16+ is installed and run `npm install`
3. **Connection errors**: Verify both servers are running and check CORS configuration
4. **Port conflicts**: Change ports in `server.js` (backend) or `package.json` (frontend)
5. **CI/CD issues**: Check GitHub Actions logs and verify secrets configuration

## License

This project is created as a sample for EventSpark development.
