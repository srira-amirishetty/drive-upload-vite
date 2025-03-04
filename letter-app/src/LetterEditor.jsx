import { useState } from "react";
import axios from "axios";

const LetterEditor = ({ user }) => {
  const [text, setText] = useState("");

  const saveToGoogleDrive = async () => {
    const metadata = {
      name: "MyLetter.txt",
      mimeType: "text/plain",
    };

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", new Blob([text], { type: "text/plain" }));

    try {
      await axios.post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        form,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert("Saved to Google Drive!");
    } catch (error) {
      console.error("Error saving file:", error);
      alert("Failed to save.");
    }
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows="10" cols="50" />
      <button onClick={saveToGoogleDrive}>Save to Google Drive</button>
    </div>
  );
};

export default LetterEditor;
