# Reframe a Thought

An AI-powered inner freedom journey app for Jongu.org, built with Express.js and Claude AI.

I was playing around the idea of rebuilding a Claude wellness tool artifact (https://claude.ai/public/artifacts/60498b55-5928-4aaf-a2d9-eccaa2a8f9e0?ref=playfulprocess.com) into a full stack app that can be used here: https://reframe-a-thought.onrender.com/.

## Features

- AI-powered inner freedom journey experience
- Modern web interface
- Responsive design
- Health check endpoint for monitoring

## Local Development

### Prerequisites

- Node.js 18.0.0 or higher
- Claude API key

### Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd reframe-a-thought
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   CLAUDE_API_KEY=your_claude_api_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Deployment on Render

### Prerequisites

- GitHub repository with your code
- Render account

### Steps

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create a new Web Service on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Choose the repository containing this code

3. **Configure the Web Service**:
   - **Name**: `reframe-a-thought` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose your preferred plan

4. **Add Environment Variables**:
   - Go to the "Environment" tab
   - Add the following environment variable:
     - **Key**: `CLAUDE_API_KEY`
     - **Value**: Your Claude API key

5. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Your app will be available at the provided URL

### Environment Variables for Production

- `CLAUDE_API_KEY`: Your Claude API key (required)
- `PORT`: Port number (Render will set this automatically)
- `NODE_ENV`: Set to `production` (Render will set this automatically)

## API Endpoints

- `GET /`: Main application interface
- `GET /health`: Health check endpoint

## Project Structure

```
reframe-a-thought/
├── package.json          # Project dependencies and scripts
├── server.js            # Express server setup
├── .env                 # Local environment variables (not in git)
├── .gitignore           # Git ignore rules
├── README.md            # This file
└── public/
    └── index.html       # Main application interface
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is for Jongu.org use. 
