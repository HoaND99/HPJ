import express from "express";
import { google } from "googleapis";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    // Setup service account auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL
      },
      scopes: ["https://www.googleapis.com/auth/drive.file"]
    });

    const drive = google.drive({ version: "v3", auth });

    // Save as JSON (you can change to PDF later)
    const fileMetadata = { name: `hpj_record_${Date.now()}.json` };
    const media = {
      mimeType: "application/json",
      body: JSON.stringify(payload)
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id, name, webViewLink"
    });

    res.json({ success: true, file: response.data });
  } catch (err) {
    console.error("Drive upload error:", err?.message || err);
    res.status(500).json({ success: false, error: "Drive upload failed" });
  }
});

export default router;
