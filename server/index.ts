import express from "express";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Only serve static files, no API routes needed for landing page
if (app.get("env") === "development") {
  const server = await setupVite(app);
  
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
} else {
  serveStatic(app);
  
  const port = 5000;
  app.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
}
