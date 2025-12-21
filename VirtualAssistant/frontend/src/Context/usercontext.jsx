import React, { useEffect, useState, createContext } from 'react';
import { authStore } from "../stores/auth.store.js";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [selectedAssistant, setSelectedAssistant] = useState(null);
    const { getCurrentUser, getResponse } = authStore();

    const handleCurrentUser = async () => {
        try {
            const response = await getCurrentUser();
            const currentUser = response?.user || response?.data?.user;
            if (currentUser) {
                setUsers(currentUser);
                localStorage.setItem("user", JSON.stringify(currentUser));

            }
        } catch (error) {
            console.error("Failed to fetch current user:", error);
        }
    };

    const getGeminiResponse = async (userMessage) => {
        try {
            const result = await getResponse(userMessage);

            return result;
        } catch (error) {
            console.error("Error getting Gemini response:", error);
        }
    };

    useEffect(() => {
        handleCurrentUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                users,
                setUsers,
                selectedAssistant,
                setSelectedAssistant,
                getGeminiResponse
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
