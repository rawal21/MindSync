import { Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const moodData = [
  { date: "Mon", sentiment: 0.8, mood: "Happy" },
  { date: "Tue", sentiment: 0.6, mood: "Content" },
  { date: "Wed", sentiment: 0.4, mood: "Neutral" },
  { date: "Thu", sentiment: 0.7, mood: "Excited" },
  { date: "Fri", sentiment: 0.9, mood: "Joyful" },
  { date: "Sat", sentiment: 0.5, mood: "Okay" },
  { date: "Sun", sentiment: 0.8, mood: "Happy" },
];

export function RecentJournalEntries() {
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
        <div className="space-y-2">
          {moodData.slice(-3).map((entry, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{entry.mood}</p>
                <p className="text-sm text-white/70">{entry.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{entry.sentiment.toFixed(2)}</p>
                <p className="text-sm text-white/70">Sentiment Score</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
