"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function JoinModal({ open, onClose, onJoin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin(username);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-500 to-purple-700 text-white">
        <DialogHeader>
          <DialogTitle>Join Support Group</DialogTitle>
          <DialogDescription className="text-purple-200">
            Enter a username to join the group chat anonymously.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-white">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-200"
              placeholder="Enter anonymous username"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose} className="text-white hover:bg-white/10">
              Cancel
            </Button>
            <Button type="submit" className="bg-white text-purple-700 hover:bg-purple-100">
              Join Chat
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
