import { useState } from "react";
import { Bell, Settings, Brain, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle

  const storeduser = localStorage.getItem("user");
  const user = storeduser ? JSON.parse(storeduser) : null;


  return (
    <header className="border-b bg-white/10 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Brain className="text-white" size={24} />
          <span className="text-2xl font-bold text-white">MindSync</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white font-medium hover:text-gray-300"
            onClick={() => navigate("/games")}
          >
            Games
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>

          </Avatar>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-3 p-4 bg-white/10 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="sm"
            className="text-white font-medium"
            onClick={() => {
              navigate("/games");
              setMenuOpen(false);
            }}
          >
            Games
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>

          </Avatar>
        </div>
      )}
    </header>
  );
}
