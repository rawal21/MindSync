import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";
import { io } from "socket.io-client";
import { JoinModal } from "./JoinModal";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:3000");

export function SupportCommunity() {
  const [groups, setGroups] = useState([]);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await axios.get("http://localhost:3000/api/groups");
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching chat groups:", error);
      }
    }

    fetchGroups();

    socket.on("updateActiveMembers", (data) => {
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === data.chatGroupId ? { ...group, activeMembers: data.count } : group
        )
      );
    });

    return () => {
      socket.off("updateActiveMembers");
    };
  }, []);

  const handleJoinClick = (group) => {
    setSelectedGroup(group);
    setShowJoinModal(true);
  };

  const handleJoinSubmit = (username) => {
    const finalUsername = username.trim() || "Anonymous";
    localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
    
    // Add callback for join confirmation
    socket.emit("joinRoom", 
      { 
        groupId: selectedGroup._id, 
        username: finalUsername 
      }, 
      (response) => {
        if (response.success) {
          navigate(`/chat/${selectedGroup._id}`, { 
            state: { username: finalUsername } // Pass username to chat page
          });
        } else {
          alert("Failed to join group: " + (response.error || "Unknown error"));
        }
      }
    );
    setShowJoinModal(false);
  };


  return (
    <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Support Community</CardTitle>
          <CardDescription className="text-white/70">Recent group activity</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="text-white">
          <Users className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div>
          {(showAll ? groups : groups.slice(0, 5)).map((group) => (
            <div key={group._id} className="flex items-center gap-4 py-2">
              <Avatar>
                <AvatarFallback>{group.shortName}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{group.name}</p>
                <p className="text-sm text-white/70">{group.activeMembers} members active</p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => handleJoinClick(group)}>
                Join
              </Button>
            </div>
          ))}
          {groups.length > 5 && (
            <Button variant="link" className="mt-2 text-white" onClick={() => setShowAll(!showAll)}>
              {showAll ? "View Less" : "View All"}
            </Button>
          )}
        </div>
      </CardContent>
      {showJoinModal && (
        <JoinModal open={showJoinModal} onClose={() => setShowJoinModal(false)} onJoin={handleJoinSubmit}  />
      )}
    </Card>
  );
}
