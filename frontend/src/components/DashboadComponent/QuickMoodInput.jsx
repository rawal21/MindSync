import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function QuickMoodInput() {
  const [selectedMood, setSelectedMood] = useState("");
  const [moodDescription, setMoodDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedMood || !moodDescription.trim()) {
      alert("Please select a mood and enter a description.");
      return;
    }

    setIsSubmitting(true);

    try {
      const authToken = localStorage.getItem("authToken");

      // Send mood data to /api/moods/add
      const moodResponse = await fetch("http://localhost:3000/api/moods/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          emojiLabel: selectedMood, 
          moodEntry: moodDescription,
        }),
      });

      if (!moodResponse.ok) {
        throw new Error("Failed to submit mood entry");
      }

      // Send mood data to /wellness/routine
      const wellnessResponse = await fetch("http://localhost:3000/api/routine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          emotion: selectedMood, // Send emoji as emotion
          recommendations: [], // You can modify based on mood
          activityTime: new Date(),
        }),
      });

      if (!wellnessResponse.ok) {
        throw new Error("Failed to generate wellness routine");
      }

      alert("Mood entry and wellness routine submitted successfully!");
      setSelectedMood("");
      setMoodDescription("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
      <CardHeader>
        <CardTitle>How are you feeling?</CardTitle>
        <CardDescription className="text-white/70">
          Quick mood check-in
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mood Selection Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {["😊", "😐", "😔", "😡", "😴", "🤗"].map((emoji) => (
            <Button
              key={emoji}
              variant={selectedMood === emoji ? "default" : "secondary"}
              className={`h-12 text-2xl hover:scale-110 transition-transform ${
                selectedMood === emoji ? "bg-blue-500" : ""
              }`}
              onClick={() => setSelectedMood(emoji)}
              disabled={isSubmitting}
            >
              {emoji}
            </Button>
          ))}
        </div>

        {/* Mood Description Input */}
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Describe your mood..."
            className="bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            value={moodDescription}
            onChange={(e) => setMoodDescription(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4 text-right">
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
