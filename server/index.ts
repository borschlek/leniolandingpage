import express from "express";
import { createServer } from "http";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

async function startServer() {
  // Only serve static files, no API routes needed for landing page
  if (app.get("env") === "development") {
    const server = createServer(app);
    await setupVite(app, server);
    
    const port = 5000;
    server.listen(port, "0.0.0.0", () => {
      log(`serving on port ${port}`);
    });
  } else {
    serveStatic(app);
    
    const port = 5000;
    app.listen(port, "0.0.0.0", () => {
      log(`serving on port ${port}`);
    });
  }
}

startServer().catch(console.error);
