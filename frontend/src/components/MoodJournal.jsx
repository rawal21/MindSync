import React, { useState, useEffect } from "react";
import styles from "./MoodJournal.module.css"; // Import the CSS Module

const MoodJournal = () => {
  const [mood, setMood] = useState("");
  const [journal, setJournal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [entries, setEntries] = useState([]);

  // Fetch previous mood entries on component mount
  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/moods", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming token is stored in localStorage
          },
        });
        if (!response.ok) throw new Error("Failed to fetch mood entries");
        const data = await response.json();
        setEntries(data.data || []);
      } catch (err) {
        console.error(err);
        setError("Could not load mood entries.");
      }
    };
    fetchMoodEntries();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood || !journal) {
      setError("Please select a mood and write about your day.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/moods/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify({ moodEntry: `${mood}: ${journal}` }),
      });

      if (!response.ok) throw new Error("Failed to submit mood entry");
      const data = await response.json();

      // Update the entries with the new mood entry
      setEntries((prevEntries) => [data.data, ...prevEntries]);

      // Clear form fields
      setMood("");
      setJournal("");
    } catch (err) {
      console.error(err);
      setError("Failed to save mood entry.");
    } finally {
      setLoading(false);
    }
  };

  const moods = [
    { label: "Happy", emoji: "😊", value: "happy" },
    { label: "Sad", emoji: "😢", value: "sad" },
    { label: "Anxious", emoji: "😟", value: "anxious" },
    { label: "Calm", emoji: "😌", value: "calm" },
    { label: "Angry", emoji: "😡", value: "angry" },
  ];

  return (
    <div className={`card shadow ${styles.moodCard}`}>
      <div className="card-body">
        <h5 className={`card-title text-center ${styles.cardTitle}`}>
          🌟 Mood Journal 🌟
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="mood" className="form-label">
              How are you feeling today?
            </label>
            <div className={styles.emojiSelect}>
              {moods.map((item) => (
                <div
                  key={item.value}
                  className={`${styles.emojiOption} ${
                    mood === item.value ? styles.emojiOptionActive : ""
                  }`}
                  onClick={() => setMood(item.value)}
                >
                  <span className={styles.emoji}>{item.emoji}</span>
                  <span className={styles.emojiLabel}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="journal" className="form-label">
              Write About Your Day
            </label>
            <textarea
              className={`${styles.journalInput} ${mood && styles.journalInputFocus}`}
              id="journal"
              rows="4"
              placeholder="Share your thoughts..."
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
            ></textarea>
          </div>
          {error && <div className={`alert alert-danger ${styles.alertDanger}`}>{error}</div>}
          <button type="submit" className={`${styles.submitBtn} w-100`} disabled={loading}>
            {loading ? "Submitting..." : "Submit Your Mood"}
          </button>
        </form>

        <hr />

        <h6 className="text-center">Your Mood Entries</h6>
        {entries.length === 0 ? (
          <p className="text-muted text-center">No entries yet. Start journaling today!</p>
        ) : (
          <ul className="list-group">
            {entries.map((entry) => (
              <li key={entry._id} className="list-group-item">
                <strong>{entry.moodEntry}</strong> <br />
                <small className="text-muted">
                  {new Date(entry.timestamp).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MoodJournal;
