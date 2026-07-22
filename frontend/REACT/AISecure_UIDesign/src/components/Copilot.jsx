import React, { useState } from "react";
import { askQuestion } from "../services/chat";

const Copilot = ({ selectedocument }) => {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handlesend = async () => {

        if (!selectedocument) {
            alert("Please select a document first.");
            return;
        }

        if (question.trim() === "") return;

        try {

            const response = await askQuestion(
                selectedocument.id,
                question
            );

            setAnswer(response.answer);
            setQuestion("");

        } catch (error) {
            console.error(error);
        }

    };

    return (

        <div className="fixed bottom-5 left-[310px] right-8 z-20">

            {/* AI Response */}

            {answer && (

                <div className="mb-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-indigo-700 shadow-xl p-5">

                    <div className="flex items-center gap-2 mb-3">

                        <span className="text-cyan-400 text-lg">
                            ✨
                        </span>

                        <h3 className="font-semibold text-cyan-300">
                            AI Response
                        </h3>

                    </div>

                    <p className="text-slate-200 leading-7 whitespace-pre-wrap">
                        {answer}
                    </p>

                </div>

            )}

            {/* Copilot */}

            <div className="rounded-2xl bg-slate-900/90 backdrop-blur-md border border-indigo-700 shadow-2xl p-4">

                <div className="flex items-center gap-4">

                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask anything about this document..."
                        className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 outline-none px-2"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handlesend();
                            }
                        }}
                    />

                    <button
                        onClick={handlesend}
                        className="rounded-xl bg-cyan-500 hover:bg-cyan-400 px-6 py-2 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>

    );

};

export default Copilot;