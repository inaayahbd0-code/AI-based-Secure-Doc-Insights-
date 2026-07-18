import React, { useState } from "react";
import { askQuestion } from "../services/chat";

const Copilot = ({selectedocument}) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handlesend = async () => {

    if (!selectedocument) {
      alert("Please select a document first.");
      return;
    }

    try{
      const response = await askQuestion(
        selectedocument.id,
        question
      );

      setAnswer(response.answer)

    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-0 left-60 right-0 bg-gradient-to-t from-cyan-800 to-teal-700 border-t-4 border-blue-900 p-4">

      <div className="flex items-center gap-4">

        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What's on your mind today..?"
          className="flex-1 p-3 rounded-lg border-2 border-cyan-300 bg-blue-900 text-white placeholder-gray-300 outline-none"
        />

        <button
          onClick={handlesend}
          className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-lg"
        >
          Send
        </button>

      </div>

      {answer && (
        <div className="mt-4 p-3 bg-blue-900 rounded-lg text-white">
          {answer}
        </div>
      )}

    </div>
  );
};

export default Copilot;