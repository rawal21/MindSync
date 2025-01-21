import { Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function SupportCommunity() {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Support Community</CardTitle>
          <CardDescription className="text-white/70">
            Recent group activity
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="text-white">
          <Users className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>A1</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">Meditation Group</p>
              <p className="text-sm text-white/70">5 members active</p>
            </div>
            <Button variant="secondary" size="sm">
              Join
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>A2</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">Mindfulness Practice</p>
              <p className="text-sm text-white/70">3 members active</p>
            </div>
            <Button variant="secondary" size="sm">
              Join
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>A3</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">Wellness Chat</p>
              <p className="text-sm text-white/70">8 members active</p>
            </div>
            <Button variant="secondary" size="sm">
              Join
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

