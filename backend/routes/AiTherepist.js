const express = require("express");
const axios = require("axios");
const Sentiment = require("sentiment");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const router = express.Router();
const sentiment = new Sentiment();

// Multer storage for handling voice uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Cohere API Key
const COHERE_API_KEY = process.env.COHERE_API_KEY;
console.log("Cohere API Key Loaded:", !!COHERE_API_KEY);

/**
 * Function to analyze mood using Sentiment
 */
function analyzeMood(text) {
    const result = sentiment.analyze(text);
    const score = result.score;

    if (score > 0) return "positive";
    if (score < 0) return "negative";
    return "neutral";
}

/**
 * Function to get AI chatbot response from Cohere
 */
async function getAIResponse(userMessage) {
    try {
        const response = await axios.post(
            "https://api.cohere.ai/v1/chat",
            {
                message: userMessage,
                model: "command-r-plus",
                temperature: 0.7
            },
            {
                headers: {
                    Authorization: `Bearer ${COHERE_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("AI Response:", response.data);
        return response.data.text || "Sorry, I couldn't process that.";
    } catch (error) {
        console.error("Error fetching AI response:", error.response?.data || error.message);
        throw new Error("Failed to fetch AI response.");
    }
}

/**
 * Route to process text input from the user
 */
router.post("/chat", async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "No text provided" });
    }

    try {
        const mood = analyzeMood(text); // Mood analysis using Sentiment
        const aiResponse = await getAIResponse(text); // AI response using Cohere

        res.json({ mood, aiResponse });
    } catch (error) {
        console.error("Error processing text input:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * Route to process voice input from the user (Currently only supports text-based AI response)
 */
router.post("/voice", upload.single("audio"), async (req, res) => {
    return res.status(501).json({ message: "Voice processing not supported yet" });
});

module.exports = router;
