"use client";

import React, { useState, useRef, useEffect } from "react";
import OpenAI from "openai";
import type { ChatCompletionMessageParam, ChatCompletionContentPart } from "openai/resources/chat/completions";
import Webcam from "react-webcam";
import {
  FiSend,
  FiX,
  FiCamera,
  FiUpload,
  FiChevronDown,
  FiChevronUp,
  FiTrash2,
} from "react-icons/fi";
import { FaDumbbell, FaRegUserCircle, FaRobot } from "react-icons/fa";
import { TbMessageChatbotFilled } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

// ─── Types ────────────────────────────────────────────────────────────────────

type MessageRole = "user" | "bot";

interface Message {
  role: MessageRole;
  content: string;
}

// Use OpenAI's own type for full type-safety — no custom type needed
type OpenAIMessage = ChatCompletionMessageParam;

// ─── OpenAI client ────────────────────────────────────────────────────────────
// NOTE: For production, move API calls to a Next.js API Route
// (app/api/chat/route.ts) so the key is never exposed to the browser.
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? "",
  dangerouslyAllowBrowser: true, // required when calling from a browser context
});

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `
You are an AI Gym Trainer specializing in fitness, gym workouts, and healthcare.
You are NOT allowed to talk about anything unrelated to these topics.

### User Inputs You Can Handle:
- Answer gym and workout-related questions.
- Provide exercise tutorials based on user queries.
- Analyze images of gym machines and explain how to use them.
- Suggest fitness routines and diet plans.
- DO NOT discuss politics, entertainment, or any non-health topics.

### Image Processing:
If the user uploads an image of a gym machine, identify it and provide:
1. Usage Instructions for that machine.
2. Exercise Benefits (which muscles it targets).

### Response Format:
- Use markdown formatting for clarity.
- Use bold text for section headers.
- Use bullet points for lists.
- Include emoji where appropriate.

If the image is NOT related to fitness/gym, politely respond:
"I can only assist with gym equipment and fitness-related images."
`.trim();

// ─── Component ────────────────────────────────────────────────────────────────

const AITrainerChatbot: React.FC = () => {
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  // Full OpenAI-format history kept for multi-turn context
  const [history, setHistory] = useState<ChatCompletionMessageParam[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [typingText, setTypingText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const suggestedQuestions: string[] = [
    "How do I perform a proper squat?",
    "What's a good beginner workout routine?",
    "How often should I train each muscle group?",
    "What's the best way to lose belly fat?",
  ];

  useEffect(() => {
    if (chatOpen && inputRef.current) inputRef.current.focus();
  }, [chatOpen]);

  useEffect(() => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
  }, [messages, typingText]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const clearChat = (): void => {
    setMessages([]);
    setHistory([]);
    setTypingText("");
    setIsTyping(false);
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
  };

  const simulateTyping = (text: string): void => {
    setIsTyping(true);
    setTypingText("");
    let i = 0;
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    typingIntervalRef.current = setInterval(() => {
      if (i < text.length) {
        setTypingText((prev) => prev + text.charAt(i));
        i++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "bot", content: text }]);
        setTypingText("");
      }
    }, 15);
  };

  // ─── Core: send to OpenAI ─────────────────────────────────────────────────

  const sendMessage = async (
    text: string,
    imageBase64: string | null = null
  ): Promise<void> => {
    if (!text && !imageBase64) return;

    const userText = text || "What is this gym equipment?";

    // Build content — plain text OR multimodal (text + image)
    // Use explicit typed discriminated union so TypeScript is satisfied
    const newUserMsg: ChatCompletionMessageParam = imageBase64
      ? {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
            } as ChatCompletionContentPart,
            { type: "text", text: userText } as ChatCompletionContentPart,
          ],
        }
      : { role: "user", content: userText };

    const updatedHistory: ChatCompletionMessageParam[] = [...history, newUserMsg];

    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setInputText("");
    setIsLoading(true);
    setShowCamera(false);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",       // vision-capable; use "gpt-4o-mini" to reduce cost
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...updatedHistory,
        ],
        max_tokens: 1024,
      });

      const botReply =
        response.choices[0]?.message?.content ?? "Sorry, I couldn't respond.";

      // Save assistant reply to history for next turn
      const assistantMsg: ChatCompletionMessageParam = { role: "assistant", content: botReply };
      setHistory([...updatedHistory, assistantMsg]);
      simulateTyping(botReply);
    } catch (error) {
      console.error("OpenAI API error:", error);
      simulateTyping("Sorry, I encountered an error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Image handlers ───────────────────────────────────────────────────────

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      sendMessage("", base64);
    };
    reader.readAsDataURL(file);
  };

  const captureImage = (): void => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) sendMessage("", imageSrc.split(",")[1]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputText.trim()) sendMessage(inputText);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="relative z-50">
      {/* Floating Button */}
      <button
        className="flex fixed right-4 bottom-4 justify-center items-center p-3 text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-full shadow-lg transition-all duration-300 transform sm:right-5 sm:bottom-5 sm:p-4 hover:from-purple-700 hover:to-purple-800 hover:scale-105"
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="Toggle AI Trainer Chat"
      >
        {chatOpen ? <FiX size={22} /> : <TbMessageChatbotFilled size={22} />}
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-16 sm:bottom-20 right-2 sm:right-5 w-[calc(100%-16px)] sm:w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col max-h-[80vh] sm:max-h-[600px] overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="flex justify-between items-center p-3 text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-t-xl sm:p-4">
            <div className="flex items-center">
              <FaDumbbell className="mr-2 text-yellow-300" size={20} />
              <h3 className="text-base font-bold sm:text-lg">AI Gym Trainer</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="text-white hover:text-gray-200"
                aria-label="Clear chat"
                title="Clear chat"
              >
                <FiTrash2 size={18} />
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white hover:text-gray-200"
                aria-label="Close chat"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-purple-50 border-b border-purple-100">
            <button
              className="flex justify-between items-center px-3 py-2 w-full text-purple-700 hover:bg-purple-100 sm:px-4"
              onClick={() => setShowTips(!showTips)}
            >
              <span className="text-sm font-medium sm:text-base">
                Tips for better results
              </span>
              {showTips ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {showTips && (
              <ul className="pl-8 pr-4 py-2 space-y-1 text-xs text-purple-800 list-disc sm:text-sm sm:py-3">
                <li>Be specific about your fitness goals</li>
                <li>Mention any limitations or injuries</li>
                <li>Take clear photos of equipment</li>
                <li>Ask about proper form to avoid injuries</li>
              </ul>
            )}
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="overflow-y-auto flex-1 p-3 space-y-3 bg-gray-50 sm:p-4 sm:space-y-4"
          >
            {/* Welcome */}
            {messages.length === 0 && (
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 sm:p-4">
                <h4 className="mb-2 text-sm font-semibold text-purple-800 sm:text-base">
                  👋 Welcome to your AI Gym Trainer!
                </h4>
                <p className="mb-3 text-xs text-gray-700 sm:text-sm">
                  Ask me anything about workouts, exercise technique, or upload
                  a photo of gym equipment for guidance.
                </p>
                <p className="mb-2 text-xs font-medium text-purple-700 sm:text-sm">
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInputText(q);
                        sendMessage(q);
                      }}
                      className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 bg-white text-purple-700 rounded-full border border-purple-200 hover:bg-purple-100 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bubbles */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start max-w-[90%] sm:max-w-[85%]">
                  {msg.role !== "user" && (
                    <div className="mr-1 sm:mr-2 mt-1 bg-purple-600 text-white p-1 sm:p-1.5 rounded-full shrink-0">
                      <FaRobot size={14} />
                    </div>
                  )}
                  <div
                    className={`p-2 sm:p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-tr-none"
                        : "bg-white text-gray-800 rounded-tl-none border border-gray-200 shadow-sm"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="text-sm sm:text-base">{msg.content}</p>
                    ) : (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          rehypePlugins={[rehypeRaw]}
                          remarkPlugins={[remarkGfm]}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="ml-1 sm:ml-2 mt-1 bg-gray-300 text-gray-700 p-1 sm:p-1.5 rounded-full shrink-0">
                      <FaRegUserCircle size={14} />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing effect */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[90%] sm:max-w-[85%]">
                  <div className="mr-1 sm:mr-2 mt-1 bg-purple-600 text-white p-1 sm:p-1.5 rounded-full shrink-0">
                    <FaRobot size={14} />
                  </div>
                  <div className="p-2 sm:p-3 bg-white text-gray-800 rounded-lg rounded-tl-none border border-gray-200 shadow-sm">
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}
                      >
                        {typingText}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading dots */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start">
                  <div className="mr-2 mt-1 bg-purple-600 text-white p-1.5 rounded-full shrink-0">
                    <FaRobot size={14} />
                  </div>
                  <div className="p-3 bg-white rounded-lg rounded-tl-none border border-gray-200 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Webcam */}
          {showCamera && (
            <div className="p-3 bg-gray-50 border-t border-gray-200 sm:p-4">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                className="w-full rounded-lg shadow-md"
              />
              <div className="flex justify-center mt-3 space-x-3">
                <button
                  onClick={captureImage}
                  className="flex items-center px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  <FiCamera className="mr-2" /> Capture
                </button>
                <button
                  onClick={() => setShowCamera(false)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  <FiX className="mr-2" /> Cancel
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200 sm:p-4">
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputText(e.target.value)
                }
                placeholder="Ask about fitness or workouts..."
                className="flex-1 p-2 text-sm rounded-l-lg border border-gray-300 sm:p-3 sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={isLoading || isTyping}
                className="p-3 text-white bg-purple-600 rounded-r-lg sm:p-4 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend size={18} />
              </button>
            </form>

            <div className="flex mt-2 space-x-2">
              <button
                onClick={() => setShowCamera(!showCamera)}
                disabled={isLoading || isTyping}
                className="flex items-center px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded-lg sm:px-3 sm:text-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiCamera className="mr-1" /> Camera
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading || isTyping}
                className="flex items-center px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded-lg sm:px-3 sm:text-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiUpload className="mr-1" /> Upload
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITrainerChatbot;