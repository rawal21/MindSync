import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MoodChart() {
  const [moodData, setMoodData] = useState([]);  // State to store the mood data
  const token = localStorage.getItem('authToken');  // Retrieve the token from localStorage (or any other storage)
 console.log("token in moofchart" ,token);  // Log the token to the console for debugging purposes

  // Fetch mood data when the component mounts
  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/moods', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Add the token to the Authorization header
            'Content-Type': 'application/json',  // Ensure the request body is in JSON format
          },
        });

        // Check if the response is OK
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json(); // Parse the response as JSON
        
        // Format the data for the chart
        const formattedData = data.data.map(entry => ({
          date: new Date(entry.timestamp).toLocaleDateString('en-US', { weekday: 'short' }), // Formatting date (Mon, Tue, etc.)
          sentiment: entry.sentimentScore,
          mood: entry.moodEntry,
        }));

        setMoodData(formattedData);  // Update state with fetched data
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };

    fetchMoodData();  // Call the function to fetch data
  }, [token]);  // Empty array ensures it only runs once when the component mounts, token is dependency

  return (
    <Card className="mt-6 bg-white/10 backdrop-blur-sm border-none text-white">
      <CardHeader>
        <CardTitle>Mood Trends</CardTitle>
        <CardDescription className="text-white/70">
          Your sentiment analysis over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.5)"
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                domain={[0, 1]}  // Sentiment score is between 0 and 1
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: "8px",
                  color: "white"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sentiment" 
                stroke="#fff" 
                strokeWidth={2}
                dot={{ fill: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
