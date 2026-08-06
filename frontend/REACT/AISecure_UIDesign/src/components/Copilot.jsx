import React, { useState, useEffect, useRef } from "react";
import { askQuestion, getChatHistory } from "../services/chat";

const Copilot = ({ selectedocument }) => {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const messagesEndRef = useRef(null);

    // Load chat history when document changes
    useEffect(() => {

        const loadHistory = async () => {

            if (!selectedocument) {
                setMessages([]);
                setError("");
                return;
            }

            try {

                setError("");

                const history = await getChatHistory(
                    selectedocument.id
                );

                setMessages(history);

            } catch (error) {

                console.error(error);

                setMessages([]);

                setError(
                    "Unable to load chat history."
                );

            }

        };

        loadHistory();

    }, [selectedocument]);


    // Automatically scroll to newest message
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);


    const handlesend = async () => {

        if (!selectedocument) {
            setError("Please select a document first.");
            return;
        }

        if (!question.trim() || loading) {
            return;
        }

        const currentQuestion = question;

        try {

            setLoading(true);
            setError("");
            setQuestion("");

            const response = await askQuestion(
                selectedocument.id,
                currentQuestion
            );

            setMessages((prev) => [

                ...prev,

                {
                    role: "user",
                    content: currentQuestion,
                },

                {
                    role: "assistant",
                    content: response.answer,
                },

            ]);

        } catch (error) {

            console.error(error);

            setQuestion(currentQuestion);

            setError(
                error.response?.data?.detail ||
                "Unable to get an AI response. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="
            fixed
            bottom-5
            left-[310px]
            right-8
            z-30
        ">

            {/* CHAT ERROR */}

            {error && (

                <div className="
                    max-w-3xl
                    mx-auto
                    mb-3
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-red-500/30
                    bg-red-950/80
                    backdrop-blur-md
                    px-4
                    py-3
                    text-sm
                    text-red-300
                    shadow-lg
                ">

                    <span>
                        ⚠️ {error}
                    </span>

                    <button
                        onClick={() => setError("")}
                        className="
                            ml-4
                            text-red-400
                            hover:text-red-200
                            transition-colors
                        "
                    >
                        ✕
                    </button>

                </div>

            )}


            {/* CHAT HISTORY */}

            {messages.length > 0 && (

                <div className="
                    mb-3
                    max-w-3xl
                    mx-auto
                    max-h-64
                    overflow-y-auto
                    px-3
                    py-3
                    rounded-2xl
                    bg-indigo-950/95
                    backdrop-blur-xl
                    border
                    border-indigo-800
                    shadow-2xl
                ">

                    <div className="space-y-3">

                        {messages.map((message, index) => (

                            <div
                                key={message.id || index}
                                className={`flex ${
                                    message.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >

                                <div
                                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-6 ${
                                        message.role === "user"

                                            ? "bg-cyan-500 text-white rounded-br-md"

                                            : "bg-slate-900 border border-indigo-700 text-slate-200 rounded-bl-md"
                                    }`}
                                >

                                    <div className="
                                        text-[11px]
                                        opacity-60
                                        mb-1
                                    ">
                                        {message.role === "user"
                                            ? "You"
                                            : "✨ AI"}
                                    </div>

                                    <div className="whitespace-pre-wrap">
                                        {message.content}
                                    </div>

                                </div>

                            </div>

                        ))}


                        {/* AI THINKING */}

                        {loading && (

                            <div className="flex justify-start">

                                <div className="
                                    bg-slate-900
                                    border
                                    border-indigo-700
                                    text-cyan-300
                                    px-4
                                    py-3
                                    rounded-2xl
                                    rounded-bl-md
                                    text-sm
                                ">

                                    <span className="animate-pulse">
                                        ✨ AI is thinking...
                                    </span>

                                </div>

                            </div>

                        )}

                        <div ref={messagesEndRef} />

                    </div>

                </div>

            )}


            {/* COMPOSER */}

            <div className="
                max-w-3xl
                mx-auto
                rounded-2xl
                bg-slate-950/95
                backdrop-blur-xl
                border
                border-indigo-800
                shadow-2xl
                p-2
            ">

                <div className="flex items-center gap-2">

                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}

                        onKeyDown={(e) => {

                            if (e.key === "Enter") {
                                handlesend();
                            }

                        }}

                        placeholder={
                            selectedocument
                                ? "Ask about this document..."
                                : "Select a document to start chatting..."
                        }

                        disabled={!selectedocument || loading}

                        className="
                            flex-1
                            bg-transparent
                            text-slate-100
                            placeholder:text-slate-500
                            outline-none
                            px-4
                            py-3
                            text-sm
                        "
                    />

                    <button
                        onClick={handlesend}
                        disabled={!selectedocument || loading}

                        className={`
                            px-5
                            py-2.5
                            rounded-xl
                            text-sm
                            font-semibold
                            transition-all
                            duration-300

                            ${
                                !selectedocument || loading

                                    ? "bg-indigo-900 text-slate-500 cursor-not-allowed"

                                    : "bg-cyan-500 text-white hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30"
                            }
                        `}
                    >

                        {loading ? "..." : "Send"}

                    </button>

                </div>

            </div>

        </div>

    );

};

export default Copilot;

