import React, { useState } from "react";
import { useEffect } from "react";
import { askQuestion, getChatHistory } from "../services/chat";

const Copilot = ({ selectedocument }) => {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const loadHistory = async () => {
            if (!selectedocument) {
                setMessages([]);
                return;
            }

            try {
                const history = await getChatHistory(
                    selectedocument.id
                );

                setMessages(history);

            } catch(error){
                console.error(error);
            }
            };
            loadHistory();
        }, [selectedocument]);

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

            setMessages((prev) => [
                ...prev,

                {
                    role:"user",
                    content:question,
                },
                {
                    role:"assistant",
                    content:response.answer,
                },
            ]);
            setQuestion("");

        } catch (error) {
            console.error(error);
        }

    };

    return (

    <div className="fixed bottom-5 left-[310px] right-8 z-20">

        {messages.length > 0 && (

            <div className="mb-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-indigo-700 shadow-xl p-5 max-h-80 overflow-y-auto">

                {messages.map((message, index) => (

                    <div key={index} className="mb-4">

                        <p
                            className={`font-semibold ${
                                message.role === "user"
                                    ? "text-cyan-300"
                                    : "text-green-300"
                            }`}
                        >
                            {message.role === "user" ? "You" : "AI"}
                        </p>

                        <p className="text-slate-200 whitespace-pre-wrap">
                            {message.content}
                        </p>

                    </div>

                ))}

            </div>

        )}

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
            

