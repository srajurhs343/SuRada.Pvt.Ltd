import { google } from "googleapis";
import readline from "readline";

// Paste your credentials here
const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; // keep this same
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Gmail scope
const SCOPES = ["https://mail.google.com/"];

// Generate the auth URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline", // important to get refresh token
  scope: SCOPES,
});

console.log("Authorize this app by visiting this url:", authUrl);

// Read the code from command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the code from that page here: ", async (code) => {
  rl.close();
  const { tokens } = await oAuth2Client.getToken(code);
  console.log("Your refresh token:", tokens.refresh_token);
});
