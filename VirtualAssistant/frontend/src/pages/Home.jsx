import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from './../Context/usercontext';
import { authStore } from '../stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import userSpeack from "../assets/user.gif";

const Home = () => {
    const { users, setUsers, getGeminiResponse } = useContext(UserContext);
    const { getCurrentUser, logout } = authStore();
    const navigate = useNavigate();

    // Refs
    const recognitionRef = useRef(null);
    const silenceTimerRef = useRef(null);
    const transcriptRef = useRef('');
    const isProcessingRef = useRef(false);
    const getGeminiResponseRef = useRef(getGeminiResponse);

    // State
    const [isListening, setIsListening] = useState(false);
    const [command, setCommand] = useState('');
    const [assistantResponse, setAssistantResponse] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showResponse, setShowResponse] = useState(false);
    const [userSpeaking, setUserSpeaking] = useState(false);

    // Device detection for mobile-specific handling
    const isMobileDeviceRef = useRef(/Mobi|Android|iP(ad|hone|od)/i.test(navigator.userAgent));

    // Clean up repeated phrases that some mobile browsers emit (e.g., "let's let's open ...")
    const cleanTranscript = (text) => {
        const normalized = (text || '').replace(/\s+/g, ' ').trim();
        if (!isMobileDeviceRef.current) return normalized;

        const words = normalized.split(' ');
        const result = [];
        let i = 0;
        const maxGram = 3; // collapse up to trigram repeats
        while (i < words.length) {
            result.push(words[i]);
            let skipped = false;
            for (let n = Math.min(maxGram, result.length); n >= 1; n--) {
                const prev = result.slice(-n).join(' ').toLowerCase();
                const next = words.slice(i + 1, i + 1 + n).join(' ').toLowerCase();
                if (prev && prev === next) {
                    i += n; // skip duplicated n-gram once
                    skipped = true;
                    break;
                }
            }
            i += 1;
        }
        // Also collapse consecutive duplicate single words (handles let's/let’s)
        const collapsed = result.join(' ').replace(/\b([\w’']+)(\s+\1\b)+/gi, '$1');
        return collapsed;
    };

    useEffect(() => {
        getGeminiResponseRef.current = getGeminiResponse;
    }, [getGeminiResponse]);

    // Fetch user
    useEffect(() => {
        const fetchUser = async () => {
            const response = await getCurrentUser();
            if (response?.user) setUsers(response.user);
        };
        fetchUser();
    }, []);
    useEffect(() => {
        startListening();

        return () => {
            stopListening();
        };
    }, []);
    const initRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("SpeechRecognition not supported in this browser.");
            return;
        }

        if (!recognitionRef.current) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            // On mobile, disable interimResults to reduce duplicate phrases
            recognitionRef.current.interimResults = isMobileDeviceRef.current ? false : true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onstart = () => {
                setIsListening(true);
            };

            recognitionRef.current.onend = () => {
                if (!isProcessingRef.current) {
                    setIsListening(false);
                    setUserSpeaking(false);
                }
            };

            recognitionRef.current.onresult = (e) => {
                if (isProcessingRef.current) return;

                clearTimeout(silenceTimerRef.current);

                const newTranscript = Array.from(e.results)
                    .map(result => result[0].transcript)
                    .join('');

                transcriptRef.current = newTranscript;
                setCommand(transcriptRef.current);
                setUserSpeaking(true);

                silenceTimerRef.current = setTimeout(() => {
                    setUserSpeaking(false);
                    const finalTranscript = transcriptRef.current.trim();
                    if (!finalTranscript) return;
                    const processedTranscript = isMobileDeviceRef.current ? cleanTranscript(finalTranscript) : finalTranscript;

                    transcriptRef.current = '';
                    setCommand(processedTranscript);
                    isProcessingRef.current = true;
                    stopListening();

                    getGeminiResponseRef.current(processedTranscript)
                        .then(response => {
                            if (response) {
                                setAssistantResponse(response.response);
                                setShowResponse(true);
                                speak(response.response);
                                if (response.actionUrl) {
                                    setTimeout(() => {
                                        window.open(response.actionUrl, '_blank');
                                    }, 1000);
                                }
                            }
                            isProcessingRef.current = false;
                        })
                        .catch(error => {
                            console.error("Error getting Gemini response:", error);
                            isProcessingRef.current = false;
                        });
                }, 1000);
            };
        }
    };

    const startListening = () => {
        initRecognition();
        try {
            recognitionRef.current.start();
            setShowResponse(false);
        } catch (err) {
            console.error("Failed to start recognition:", err);
        }
    };

    const stopListening = () => {
        try {
            recognitionRef.current?.stop();
        } catch (err) {
            console.error("Failed to stop recognition:", err);
        }
        setIsListening(false);
        setUserSpeaking(false);
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const speak = (text) => {
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
            setIsSpeaking(false);
            startListening();
        };
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col justify-center items-center p-6 relative overflow-hidden">

            {/* 3D Bubble Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {[...Array(25)].map((_, i) => {
                    const size = 20 + Math.random() * 60;
                    const depth = Math.random(); // 0 (far) → 1 (close)
                    return (
                        <div
                            key={i}
                            className="bubble"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${6 + Math.random() * 12}s`,
                                animationDelay: `${Math.random() * 5}s`,
                                width: `${size}px`,
                                height: `${size}px`,
                                zIndex: Math.floor(depth * 10),
                                filter: `blur(${(1 - depth) * 4}px)`,
                                opacity: 0.5 + depth * 0.5,
                                transform: `scale(${0.5 + depth * 1.2})`
                            }}
                        />
                    );
                })}
            </div>

            <h1 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 z-10'>
                Welcome to Your Virtual Assistant
            </h1>

            {/* Customize Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed top-4 right-4 p-3 rounded-full pl-6 pr-6 
                bg-gradient-to-r from-cyan-400 to-blue-500
                text-black font-bold text-lg shadow-lg z-10"
                onClick={() => navigate('/customize')}
            >
                Customize Your Assistant
            </motion.button>

            {/* Logout Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed top-20 right-4 p-3 rounded-full pl-6 pr-6
                bg-gradient-to-r from-cyan-400 to-blue-500
                text-black font-bold text-lg shadow-lg z-10"
                onClick={handleLogout}
            >
                Logout
            </motion.button>

            {/* Assistant Avatar */}
            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    onClick={toggleListening}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative rounded-full overflow-hidden cursor-pointer 
                        w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[250px]
                        border-4 transition-all`}
                    style={{
                        borderColor: isSpeaking
                            ? '#FFD700'
                            : isListening
                                ? '#00FFFF'
                                : '#555'
                    }}
                >
                    {/* Assistant Image */}
                    <img
                        src={users?.assistantImage}
                        alt="Assistant"
                        className="w-full h-full object-cover rounded-full"
                    />

                    {/* Speaking glowing ring overlay */}
                    {isSpeaking && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                src={userSpeack}
                                alt="Speaking Animation"
                                className="w-full h-full object-cover rounded-full mix-blend-screen"
                            />
                        </div>
                    )}

                    {/* User speaking wave bars */}
                    {userSpeaking && (
                        <div className="absolute inset-0 flex items-center justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-cyan-400 rounded-full"
                                    style={{ width: 4, height: 20 }}
                                    animate={{ height: [20, 40, 20] }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Mic Icon */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isListening ? "#00FFFF" : "#FFFFFF"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                    </div>
                </motion.div>

                {/* Assistant Name */}
                <h1 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-6'>
                    Hi, I'm {users?.assistantName || 'your assistant'}
                </h1>

                {/* Command display */}
                <AnimatePresence>
                    {command && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-cyan-300 text-lg mt-2 italic"
                        >
                            "{command}"
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Assistant Response */}
                <AnimatePresence>
                    {showResponse && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-4 p-4 bg-blue-900 bg-opacity-50 rounded-lg max-w-md"
                        >
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mr-3 relative">
                                    <img
                                        src={users?.assistantImage}
                                        alt="Assistant"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </div>
                                <div className="text-white">
                                    <p>{assistantResponse}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Home;
