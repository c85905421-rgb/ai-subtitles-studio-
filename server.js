import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { promisify } from "node:util";
import { GoogleGenAI, createPartFromUri, createUserContent } from "@google/genai";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 3000);
const MAX_GB = Math.min(Number(process.env.MAX_UPLOAD_GB || 2), 2);
const MAX_BYTES = MAX_GB * 1024 * 1024 * 1024;
const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

app.use(express.static("public"));
app.get("/api/status", (_req, res) => {
  res.json({
    ready: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "PASTE_YOUR_KEY_HERE"),
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    maxUploadGB: MAX_GB
  });
});

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = (file.originalname || "video").replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: MAX_BYTES, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("video/")) return cb(new Error("Video ဖိုင်ကိုသာ တင်နိုင်ပါတယ်။"));
    cb(null, true);
  }
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

app.post("/api/translate-video", upload.single("video"), async (req, res) => {
  const videoPath = req.file?.path;
  try {
    if (!videoPath) return res.status(400).json({ error: "Video ဖိုင်ရွေးပေးပါ။" });
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "PASTE_YOUR_KEY_HERE") {
      return res.status(400).json({ error: ".env ဖိုင်ထဲမှာ GEMINI_API_KEY ထည့်ပြီး Server ကို ပြန်ဖွင့်ပါ။" });
    }

    const target = (req.body.targetLanguage || "Burmese").slice(0, 40);
    const style = (req.body.style || "natural conversational").slice(0, 100);
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const ai = new GoogleGenAI({ apiKey: key });

    const uploaded = await ai.files.upload({
      file: videoPath,
      config: { mimeType: req.file.mimetype || "video/mp4", displayName: req.file.originalname }
    });

    let active = uploaded;
    for (let i = 0; i < 120; i++) {
      if (String(active.state || "").includes("ACTIVE")) break;
      if (String(active.state || "").includes("FAILED")) throw new Error("Google က Video ဖိုင်ကို process မလုပ်နိုင်ခဲ့ပါ။");
      await sleep(5000);
      active = await ai.files.get({ name: uploaded.name });
    }
    if (!String(active.state || "").includes("ACTIVE")) {
      throw new Error("Video processing အချိန်ကြာလွန်းနေပါတယ်။ ထပ်စမ်းကြည့်ပါ။");
    }

    const prompt = `You are a professional subtitle transcriber and translator.
Watch/listen to the entire supplied video. Transcribe the spoken dialogue in its original language, then translate it into ${target}.
Translation style: ${style}. For Chinese dialogue, use natural spoken Burmese, not stiff literary Burmese. Translate 师尊 as ဆရာ when appropriate.
Return ONLY valid SubRip SRT text. Preserve chronological order. Use accurate timestamps in HH:MM:SS,mmm --> HH:MM:SS,mmm format. Keep each subtitle concise and readable. Do not include markdown fences, explanations, speaker notes, or any text outside the SRT.
If the video is too long to process in one response, return the portion you can accurately process and clearly finish at a subtitle boundary.`;

    const result = await ai.models.generateContent({
      model,
      contents: createUserContent([
        createPartFromUri(active.uri, active.mimeType || req.file.mimetype || "video/mp4"),
        prompt
      ])
    });

    const srt = (result.text || "").replace(/^```(?:srt|text)?\s*/i, "").replace(/\s*```$/, "").trim();
    if (!srt) throw new Error("AI က စာတန်းထိုး မထုတ်ပေးနိုင်ခဲ့ပါ။");
    res.json({ srt, model, note: "AI မှထုတ်ပေးထားသော SRT ကို အချိန်နှင့်စာသား မှန်ကန်မှု စစ်ဆေးပြီးမှ အသုံးပြုပါ။" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "ဘာသာပြန်ရာတွင် အမှားဖြစ်နေပါတယ်။" });
  } finally {
    if (videoPath) fs.promises.unlink(videoPath).catch(() => {});
  }
});

app.use((err, _req, res, _next) => {
  const msg = err.code === "LIMIT_FILE_SIZE"
    ? `ဖိုင်အရွယ်အစား ${MAX_GB} GB ထက် မကျော်ရပါ။`
    : (err.message || "Upload မအောင်မြင်ပါ။");
  res.status(400).json({ error: msg });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AI Subtitle Studio running at http://localhost:${PORT}`);
  console.log(`Maximum upload size: ${MAX_GB} GB`);
});
