import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UpcomingActivities() {
  const [activities, setActivities] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await fetch("http://localhost:3000/api/routine", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setActivities(data.routines);
        }
      } catch (error) {
        console.error("Error fetching wellness routines:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <Card className="mt-6 bg-white/10 backdrop-blur-sm border-none text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Wellness Schedule</CardTitle>
          <CardDescription className="text-white/70">
            Upcoming activities and sessions
          </CardDescription>
        </div>
        <Button variant="secondary" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View All"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {activities.length > 0 ? (
            (showAll ? activities : activities.slice(0, 3)).flatMap((activity) => 
              activity.recommendations.map((rec, idx) => (
                <div key={`${activity.id}-${idx}`} className="flex items-center gap-4 rounded-lg bg-white/5 p-4">
                  {/* <div className="h-12 w-12 rounded-lg bg-purple-400/20 flex items-center justify-center">
                    
                  </div> */}
                  <div>
                    <div className="font-medium">
                      <p>{rec.name} - {rec.duration}</p>
                    </div>
                    <p className="text-sm text-white/70">
                      {activity.activityTime ? new Date(activity.activityTime).toLocaleString() : "Scheduled Soon"}
                    </p>
                  </div>
                </div>
              ))
            )
          ) : (
            <p className="text-center text-white/70">No upcoming activities.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
