import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import img1  from "../images/mindpuzzle.jpg"
import img2 from  "../images/bg.jpeg";


export default function Games() {

  const navigate = useNavigate();
  const games = [
    {
      name: "TheBrainMaping" ,
      description: "Relax with calming jigsaw puzzles featuring nature and abstract art.",
      image: img1, 
      link  : "/games/mindfulness-puzzels"
    },
    {
      name: "SimSon's Says",
      description: "Improve focus and memory with this fun card-matching game.",
      image: img2,
      link: "/games/memory-game"
    },
    {
      name: "Breathing Rhythm Game",
      description: "Follow visual breathing patterns to relax and reduce stress.",
      image: "/breathing-rhythm.jpg", 
      link: "/games/breathing-rhythm-game"
    },
    {
      name: "Mood Quiz",
      description: "Take a fun interactive quiz to boost your mood with positive traits and quotes.",
      image: "/mood-quiz.jpg", 
      link: "/games/mood-quiz"
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-indigo-500 to-purple-500 min-h-screen">
      <h1 className="text-center text-3xl font-bold text-white mb-8">Stress-Relieving Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-sm text-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <CardTitle className="mt-4 text-lg font-bold">{game.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">{game.description}</CardDescription>
            </CardContent>
            <CardFooter className="mt-4">
              <Button variant="default" className="w-full" onClick ={()=>navigate(game.link)}>
                Play Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
