import { Bell, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brain } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-white/10 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
        <Brain className="text-white" size={24} />
          <span className="text-2xl font-bold text-white">MindSync</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
