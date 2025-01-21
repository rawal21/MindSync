from deepface import DeepFace
import sys
import json

def analyze_emotion(image_path):
    try:
        result = DeepFace.analyze(img_path=image_path, actions=['emotion'])
        # Extracting only the emotion results
        emotions = result[0]["emotion"]
        return emotions
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    # Accept the image path from command line arguments
    image_path = sys.argv[1]
    emotions = analyze_emotion(image_path)
    # Return the emotions as a JSON response
    print(json.dumps(emotions))
