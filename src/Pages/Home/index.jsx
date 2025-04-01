
import React, { useState, useRef } from 'react';
import Navbar from "../../Components/Navbar";
import "./style.css";

const Home = () => {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [fontSize, setFontSize] = useState("medium");
    const [highContrast, setHighContrast] = useState(false);
    const inputRef = useRef(null);

    // Handle form submission
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);

    try {
        // This would connect to your actual AI backend
        // Replace with your actual API call
        // const responseData = await yourActualAPICall(question);

        // Placeholder for demonstration
        const responseData =
        "This is where the response from your AI API would appear.";
        setResponse(responseData);

        // Add to history
        setHistory((prev) => [
        {
            question,
            response: responseData,
            timestamp: new Date().toISOString(),
        },
        ...prev,
        ]);
    } catch (error) {
        setResponse("Sorry, I couldn't process your request. Please try again.");
        console.error("Error fetching AI response:", error);
    } finally {
        setIsLoading(false);
    }
    };

    // Load previous conversation
    const loadConversation = (index) => {
    const item = history[index];
    setQuestion(item.question);
    setResponse(item.response);
    };

    // Handle font size changes
    const changeFontSize = (size) => {
    setFontSize(size);
    };

    // Apply theme classes based on settings
    const getThemeClasses = () => {
    let classes = `font-size-${fontSize}`;
    if (highContrast) classes += " high-contrast";
    return classes;
    };
    return (
    <>
        <h1 >Home page</h1>
        
        <div className='flex column center'>
        <section className="question-section" aria-labelledby="question-heading">
        <form onSubmit={handleSubmit} className="question-form">
            <div className="input-group">
            <label htmlFor="question-input" className="sr-only">
                Your question
            </label>
            <input
                id="question-input"
                ref={inputRef}
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask AI..."
                className="question-input"
                aria-describedby="input-hint"
                autoComplete="off"
            />
            </div>
        </form>
        </section>

        <section className="response-section" aria-labelledby="response-heading">

        <div
            className="response-content"
            aria-live="polite"
            aria-atomic="true"
            tabIndex={0}
        >
            {isLoading ? (
            <div className="loading-indicator" aria-label="Loading response">
                <p>Processing your question...</p>
            </div>
            ) : response ? (
            <div className="response-text">{response}</div>
            ) : (
            <p className="placeholder-text">Your response will appear here</p>
            )}
        </div>
        </section>
        </div>
    </>
    );
};

export default Home;
