import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

// Generate a secure random secret
const generateSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};
// Create .env file with BETTER_AUTH_SECRET and BETTER_AUTH_URL
const createEnvFile = () => {
  const envPath = path.join(process.cwd(), ".env");
  const secret = generateSecret();
  const envContent = `BETTER_AUTH_SECRET=${secret}
BETTER_AUTH_URL=http://localhost:3000`;
  // Check if .env already exists
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envContent);
    console.log(
      ".env file created with BETTER_AUTH_SECRET and BETTER_AUTH_URL",
    );
  } else {
    console.log(
      ".env file already exists. Please add BETTER_AUTH_SECRET and BETTER_AUTH_URL manually if needed.",
    );
  }
};
// Execute the function
createEnvFile();
