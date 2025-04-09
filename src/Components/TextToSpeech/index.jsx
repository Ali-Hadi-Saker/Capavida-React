import React, { useState, useEffect } from 'react';
import './style.css';

const TextToSpeech = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        if (text) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-US';
            speech.rate = 1;
            speech.pitch = 1;
            speech.volume = 1;

            speech.onstart = () => {
                setIsSpeaking(true);
                setIsPaused(false);
            };

            speech.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
            };

            speech.onpause = () => {
                setIsPaused(true);
            };

            speech.onresume = () => {
                setIsPaused(false);
            };

            setUtterance(speech);

            return () => {
                window.speechSynthesis.cancel();
            };
        }
    }, [text]);

    const handleSpeak = () => {
        if (isPaused) {
            window.speechSynthesis.resume();
        } else {
            window.speechSynthesis.speak(utterance);
        }
    };

    const handlePause = () => {
        window.speechSynthesis.pause();
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    return (
        <div className="text-to-speech">
            <button 
                onClick={handleSpeak} 
                className={`speak-btn ${isSpeaking ? 'active' : ''}`}
                disabled={!text}
            >
                <i className={`fa ${isPaused ? 'fa-play' : 'fa-volume-up'}`}></i>
                {isSpeaking ? '' : 'Read Aloud'}
            </button>
            {isSpeaking && (
                <>
                    <button onClick={handlePause} className="pause-btn">
                        <i className="fa fa-pause"></i>
                        
                    </button>
                    <button onClick={handleStop} className="stop-btn">
                        <i className="fa fa-stop"></i>
                        
                    </button>
                </>
            )}
        </div>
    );
};

export default TextToSpeech; 