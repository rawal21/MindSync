import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Achievements() {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
      <CardHeader>
        <CardTitle>Your Achievements</CardTitle>
        <CardDescription className="text-white/70">Progress & Milestones</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-400/20 flex items-center justify-center">
              🌟
            </div>
            <div className="flex-1">
              <p className="font-medium">Consistency Master</p>
              <div className="h-2 rounded-full bg-white/20">
                <div className="h-full w-3/4 rounded-full bg-purple-400"></div>
              </div>
              <p className="text-xs text-white/70 mt-1">15/20 daily check-ins</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-400/20 flex items-center justify-center">
              🎯
            </div>
            <div className="flex-1">
              <p className="font-medium">Meditation Guru</p>
              <div className="h-2 rounded-full bg-white/20">
                <div className="h-full w-1/2 rounded-full bg-blue-400"></div>
              </div>
              <p className="text-xs text-white/70 mt-1">5/10 sessions completed</p>
            </div>
          </div>
        </div> */}
        <h3>under maintaince </h3>
      </CardContent>
    </Card>
  );
}
