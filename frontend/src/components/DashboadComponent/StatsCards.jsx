import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsCards() {
  const [stats, setStats] = useState({ averageMood: 0, totalEntries: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("http://localhost:3000/api/moods/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming token-based auth
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setStats(data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle>Average Mood</CardTitle>
          <CardDescription className="text-white/70">This Week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.averageMood}</div>
          <p className="text-xs text-white/70">Based on all entries</p>
        </CardContent>
      </Card>
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle>Journal Entries</CardTitle>
          <CardDescription className="text-white/70">Total Count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.totalEntries}</div>
          <p className="text-xs text-white/70">All-time count</p>
        </CardContent>
      </Card>
      {/* Remaining cards are unchanged */}
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle>Support Group</CardTitle>
          <CardDescription className="text-white/70">Active Members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">28</div>
          <p className="text-xs text-white/70">3 new this week</p>
        </CardContent>
      </Card>
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle>Next Session</CardTitle>
          <CardDescription className="text-white/70">Scheduled</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">2h</div>
          <p className="text-xs text-white/70">Group meditation</p>
        </CardContent>
      </Card>
    </div>
  );
}
