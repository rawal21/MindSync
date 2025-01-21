import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const affirmations = [
  "Every day in every way, I'm getting better and better. My mind is calm, my body is healthy, and my spirit is peaceful.",
  "I am confident, capable, and deserving of all the good things that come my way.",
  "I trust in the process of life, and I am at peace with where I am right now.",
  "I radiate positive energy and attract positivity into my life.",
  "I am grateful for the abundance that I have and the abundance on its way.",
];

export function DailyAffirmation() {
  const [affirmation, setAffirmation] = useState(affirmations[0]);

  const generateNewAffirmation = () => {
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(randomAffirmation);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
      <CardHeader>
        <CardTitle>Today's Affirmation</CardTitle>
        <CardDescription className="text-white/70">Your daily dose of positivity</CardDescription>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-2 border-white/20 pl-4 italic">
          "{affirmation}"
        </blockquote>
        <Button variant="ghost" className="mt-4 w-full" onClick={generateNewAffirmation}>
          Generate New Affirmation
        </Button>
      </CardContent>
    </Card>
  );
}
