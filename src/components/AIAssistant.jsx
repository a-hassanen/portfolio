import React from 'react';
import { GoogleGenAI } from "@google/genai";
import '../styles/AIAssistant.css';

const AIAssistant = ({ onAddItem }) => {
    const [chat, setChat] = React.useState(null);
    const [messages, setMessages] = React.useState([]);
    const [userInput, setUserInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [confirmation, setConfirmation] = React.useState(null);
    const chatBoxRef = React.useRef(null);

    React.useEffect(() => {
        const initChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
                const schema = {
                    aboutme: { description: 'string' }, 
                    experience: { company: 'string', title: 'string', period: 'string', description: 'string' },
                    education: { institution: 'string', degree: 'string', period: 'string', description: 'string' },
                    projects: { name: 'string', description: 'string', link: 'string' },
                    certificates: { name: 'string', link: 'string', category: 'string' },
                    badges: { name: 'string', imageUrl: 'string', link: 'string', skills: ['string'] }
                };
                const systemInstruction = `You are a portfolio management assistant. Your goal is to help the user update their portfolio data by asking them questions. The portfolio data structure for items that can be added is: ${JSON.stringify(schema, null, 2)}. When a user wants to add an item, ask for all the necessary fields for that item type, including the category for certificates. Once you have all the information, present it as a JSON object for the user to confirm. IMPORTANT: You MUST wrap the final JSON object within <json> tags. For example: <json>{"section": "certificates", "data": {"category": "Cloud Certs", "name": "Certificate Name", "link": "https://example.com"}}</json>. Do not add the <json> block until you have all the required information. Start by asking what they'd like to do.`;

                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction },
                });
                setChat(newChat);
                setMessages([{ role: 'model', text: 'Hello! How can I help you update your portfolio today?' }]);
            } catch (error) {
                console.error("Failed to initialize AI Assistant:", error);
                setMessages([{ role: 'model', text: 'Error: Could not connect to the AI service. Please check your API key and refresh.' }]);
            }
        };
        initChat();
    }, []);
    
    React.useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chat) return;

        const newUserMessage = { role: 'user', text: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);
        setConfirmation(null);

        try {
            const response = await chat.sendMessage({ message: userInput });
            let responseText = response.text;
            
            const jsonRegex = /<json>([\s\S]*?)<\/json>/;
            const match = responseText.match(jsonRegex);

            if (match) {
                const jsonString = match[1];
                responseText = responseText.replace(jsonRegex, '').trim();
                try {
                    const parsedJson = JSON.parse(jsonString);
                    setConfirmation(parsedJson);
                } catch (error) {
                    console.error("Failed to parse JSON from AI:", error);
                    responseText += "\n[Error: I received invalid data structure from the AI.]";
                }
            }

            setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // const handleConfirm = () => {
    //     if (confirmation) {
    //         onAddItem(confirmation.section, confirmation.data);
    //         setConfirmation(null);
    //         setMessages(prev => [...prev, { role: 'model', text: "Great! I've added that to the editor. You can see the new item in the form below. What's next?" }]);
    //     }
    // };
    const handleConfirm = () => {
        if (!confirmation) return;

        if (confirmation.section === "aboutme") {
            // Direct overwrite instead of adding items
            onAddItem("aboutme", confirmation.data);
        } else {
            onAddItem(confirmation.section, confirmation.data);
        }

        setConfirmation(null);
        setMessages(prev => [
            ...prev,
            { role: 'model', text: "Great! I've updated that section. What would you like to do next?" }
        ]);
    };

    return (
        <div className="ai-assistant">
            <div className="ai-chat-box" ref={chatBoxRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`ai-message ${msg.role}`}>
                        {msg.text}
                        {index === messages.length - 1 && confirmation && (
                            <div className="confirmation-card">
                                <p><strong>Does this look correct?</strong></p>
                                <pre><code>{JSON.stringify(confirmation.data, null, 2)}</code></pre>
                                <button className="button" onClick={handleConfirm}>Yes, add it</button>
                                <button className="button" onClick={() => setConfirmation(null)}>No, cancel</button>
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && <div className="ai-message model">...</div>}
            </div>
            <form className="ai-input-area" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="e.g., Add a new project..."
                    disabled={isLoading || !chat}
                />
                <button className="button" type="submit" disabled={isLoading || !chat}>Send</button>
            </form>
        </div>
    );
};

export default AIAssistant;