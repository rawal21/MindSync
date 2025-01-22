import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RecentJournalEntries() {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch recent mood entries from the backend
  const fetchRecentEntries = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/moods/recent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Use token-based authentication
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch mood entries");
      }

      const result = await response.json();
      setMoodData(result.data || []); // Assuming `result.data` contains the mood entries
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentEntries();
  }, []);

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Journal Entries</CardTitle>
          <CardDescription className="text-white/70">
            Your latest mood updates
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="text-white">
          <Calendar className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : moodData.length > 0 ? (
          <div className="space-y-2">
            {moodData.map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white/5 p-3 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{entry.emojiLabel || "🙂"}</span> {/* Emoji label */}
                  <div>
                    <p className="font-medium">{entry.moodEntry}</p> {/* Mood description */}
                    <p className="text-sm text-white/70">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {entry.sentimentScore ? entry.sentimentScore.toFixed(2) : "N/A"}
                  </p>
                  <p className="text-sm text-white/70">Sentiment Score</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No recent entries found.</p>
        )}
      </CardContent>
    </Card>
  );
}
