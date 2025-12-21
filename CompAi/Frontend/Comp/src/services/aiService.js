import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Generates component code using Google's Gemini AI
 * @param {string} framework - The selected framework/language
 * @param {string} description - Component description from user
 * @returns {Promise<string>} Generated code as a string
 * @throws {Error} If generation fails
 */
export const generateComponentCode = async (framework, description) => {
  if (!API_KEY) {
    throw new Error("API key is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite-preview-09-2025" });

  const prompt = `
    You are an expert web and mobile developer. Your task is to generate a single file of production-ready code for a component.
    Framework/Language: ${framework}
    Component Description: ${description}

    **IMPORTANT RULES:**
    1.  Output ONLY the raw code. No comments, explanations, markdown, or any text outside the code itself.
    2.  For "JSX with TailwindCSS", the component MUST be a standard React functional component named exactly "Component". Example: \`function Component() { return <div>...</div>; }\` It must not be an arrow function or have \`export default\`.
    3.  For "Flutter & Dart", create a single, complete Stateless or Stateful widget. Include all necessary imports from \`material.dart\`. The main widget should be named "MyComponent".
    4.  For "React Native", create a single functional component named "MyComponent". Import necessary components from 'react-native' and use \`StyleSheet.create\` for styling. Do not include \`export default\`.
    5.  The code must be fully functional and ready to be copy-pasted.
    6.  For HTML & TailwindCSS, include the Tailwind CDN script. For HTML & CSS, embed the CSS in a <style> tag.
    7.  **For ANY component that requires an image, YOU MUST use the placeholder URL: "https://picsum.photos/seed/compai/500/500" for the image source.**
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

