import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function UpcomingActivities() {
  return (
    <Card className="mt-6 bg-white/10 backdrop-blur-sm border-none text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Wellness Schedule</CardTitle>
          <CardDescription className="text-white/70">Upcoming activities and sessions</CardDescription>
        </div>
        <Button variant="secondary">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-lg bg-white/5 p-4">
            <div className="h-12 w-12 rounded-lg bg-purple-400/20 flex items-center justify-center">
              🧘‍♀️
            </div>
            <div>
              <p className="font-medium">Group Meditation</p>
              <p className="text-sm text-white/70">Today, 3:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-white/5 p-4">
            <div className="h-12 w-12 rounded-lg bg-blue-400/20 flex items-center justify-center">
              💭
            </div>
            <div>
              <p className="font-medium">Therapy Session</p>
              <p className="text-sm text-white/70">Tomorrow, 2:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-white/5 p-4">
            <div className="h-12 w-12 rounded-lg bg-purple-400/20 flex items-center justify-center">
              👥
            </div>
            <div>
              <p className="font-medium">Support Group</p>
              <p className="text-sm text-white/70">Wed, 5:00 PM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

