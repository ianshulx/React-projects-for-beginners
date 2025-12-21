import { axiosInstance } from '../utils/axiosInstance.js';
import { create } from "zustand";
import { toast } from 'react-hot-toast';

export const authStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    isSignup: false,
    isLogin: false,
    isSendOtp: false,
    isVerifyOtp: false,
    isUpdateProfile: false,

    sendOtp: async (email) => {
        try {
            const response = await axiosInstance.post('/auth/send-otp', { email });
            if (response.data.success) {
                toast.success("OTP sent successfully");
                set({ isSendOtp: true });
            } else {
                toast.error("Failed to send OTP");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Error sending OTP");
        }
    },

    verifyOtp: async (email, otp) => {
        try {
            const response = await axiosInstance.post('/auth/verify-otp', { email, otp });
            if (response.data.success) {
                toast.success("OTP verified successfully");
                set({ isVerifyOtp: true });
            } else {
                toast.error("Invalid OTP");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("Error verifying OTP");
        }
    },

    signUP: async (name, email, password) => {
        try {
            const response = await axiosInstance.post('/auth/register', { name, email, password });
            if (response.data.success) {
                toast.success("Sign up successful");
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // Store token in localStorage as fallback for Authorization header
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }
                set({ isSignup: true });
            } else {
                toast.error("Sign up failed");
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            toast.error("Error during sign up");
        }
    },

    login: async (email, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            if (response.data.success) {
                toast.success("Login successful");
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // Store token in localStorage as fallback for Authorization header
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }
                set({ isLogin: true });
            } else {
                toast.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Error during login");
        }
    },

    passwordReset: async (email) => {
        try {
            const response = await axiosInstance.post('/auth/password-reset', { email });
            if (response.data.success) {
                toast.success("Password reset link sent");
            } else {
                toast.error("Failed to send password reset link");
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            toast.error("Error during password reset");
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await axiosInstance.get(`/auth/user-profile`);
            if (response.data.success) {
                set({ user: response.data.user, isAuthenticated: true });
                return response.data;
            } else {
                set({ user: null, isAuthenticated: false });
                return null;
            }
        } catch (error) {
            console.error("Error fetching current user:", error);
            set({ user: null, isAuthenticated: false });
            return null;
        }
    },

    updateAssistant: async (assistantImage, assistantName) => {
        try {
            const response = await axiosInstance.post(
                '/auth/updateAssistant',
                { assistantImage, assistantName },
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success("Profile updated successfully");
                set({ user: response.data.user });
                return true;
            } else {
                toast.error(response.data.message || "Failed to update profile");
                return false;
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile");
            return false;
        }
    },

    logout: async () => {
        try {
            const response = await axiosInstance.post('/auth/logout');
            if (response.data.success) {
                toast.success("Logout successful");
                set({ user: null, isAuthenticated: false });
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Error during logout");
            // Clear local storage even if request fails
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    },

    getResponse: async (userMessage) => {
        try {
            const response = await axiosInstance.post(
                '/VA/getRespone',
                { message: userMessage },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching the result of response:", error);
            toast.error("Error while getting assistant response");
        }
    },
}));

