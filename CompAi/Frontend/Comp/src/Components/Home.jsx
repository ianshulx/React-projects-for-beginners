import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import Editor from '@monaco-editor/react';
import { Code, Clipboard, Check, AlertTriangle, Download, View, Sparkles, FileCode, Loader2, Zap } from "lucide-react";
import PreviewModal from './PreviewModal';
import { FRAMEWORK_OPTIONS } from '../utils/constants';
import { generateComponentCode } from '../services/aiService';
import { downloadFile } from '../utils/fileUtils';

const Home = () => {
    const [framework, setFramework] = useState(null);
    const [description, setDescription] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const generateComponent = async () => {
        if (!description || !framework) {
            setError("Please select a framework and provide a description.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedCode('');

        try {
            const code = await generateComponentCode(framework.value, description);
            setGeneratedCode(code);
        } catch (err) {
            setError(err.message || "An unexpected error occurred. Please check your API key and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (copy(generatedCode)) {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500);
        }
    };

    const handleDownload = () => {
        if (!generatedCode || !framework) return;
        downloadFile(generatedCode, `component.${framework.extension}`);
        setIsDownloaded(true);
        setTimeout(() => setIsDownloaded(false), 2500);
    };

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-12 xl:px-16 py-6 lg:py-8' style={{ minHeight: 'calc(100vh - 64px)' }}>
                {/* Left Panel: Input Form */}
                <div className="w-full py-8 px-6 rounded-2xl bg-gradient-to-br text-black from-[var(--color-base-200)] to-[var(--color-base-300)] border border-gray-700/50 shadow-2xl self-start overflow-y-auto hover:shadow-3xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 rounded-lg">
                            <Sparkles className="text-fuchsia-400" size={24} />
                        </div>
                        <h3 className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                            AI Component Generator
                        </h3>
                    </div>
                    <p className='text-gray-400 mb-6 text-sm lg:text-base'>Describe your component and let AI code it for you.</p>

                    <div className="mb-6 text-black">
                        <label htmlFor="framework-select" className='text-sm font-semibold text-black mb-2 block flex items-center gap-2'>
                            <FileCode size={16} className="text-cyan-400" />
                            Framework
                        </label>
                        <div className="relative">
                            <select
                                id="framework-select"
                                value={framework?.value || ""}
                                onChange={(e) => {
                                    const selectedOption = FRAMEWORK_OPTIONS.find(opt => opt.value === e.target.value) || null;
                                    setFramework(selectedOption);
                                }}
                                className="w-full p-3.5 pl-4 pr-10 bg-[var(--color-base-300)] border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-500 shadow-sm"
                            >
                                <option value="" disabled>Select a framework...</option>
                                {FRAMEWORK_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description-textarea" className='text-sm font-semibold text-gray-300 mb-2 block flex items-center gap-2'>
                            <Zap size={16} className="text-fuchsia-400" />
                            Component Description
                        </label>
                        <textarea
                            id="description-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={8}
                            className="w-full p-4 bg-[var(--color-base-300)] border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 transition-all duration-200 resize-none shadow-sm"
                            placeholder="E.g., A responsive product card with an image, title, price, and an 'Add to Cart' button with hover effects..."
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            {description.length} characters
                        </p>
                    </div>

                    <button
                        onClick={generateComponent}
                        disabled={isLoading || !framework || !description.trim()}
                        className="group relative w-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:shadow-fuchsia-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    <span>Generate Component</span>
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    {error && (
                        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                            <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}
                </div>

                {/* Right Panel: Code Display */}
                <div className="w-full py-8 px-6 rounded-2xl bg-gradient-to-br from-[var(--color-base-200)] to-[var(--color-base-300)] border border-gray-700/50 shadow-2xl flex flex-col h-full hover:shadow-3xl transition-all duration-300">
                    <div className="flex justify-between items-center mb-6 flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
                                <Code className="text-cyan-400" size={20} />
                            </div>
                            <h3 className='text-xl lg:text-2xl font-bold text-gray-200'>Generated Code</h3>
                        </div>
                        {generatedCode && (
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => setIsPreviewOpen(true)}
                                    className="flex items-center gap-2 text-xs sm:text-sm bg-gray-700/80 hover:bg-gray-600 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-md border border-gray-600/50"
                                >
                                    <View size={16} /> Preview
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-md border ${isCopied
                                        ? 'bg-green-500/20 hover:bg-green-500/30 border-green-500/50 text-green-400'
                                        : 'bg-gray-700/80 hover:bg-gray-600 border-gray-600/50'
                                        }`}
                                >
                                    {isCopied ? <><Check size={16} /> Copied!</> : <><Clipboard size={16} /> Copy</>}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className={`flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-md border ${isDownloaded
                                        ? 'bg-green-500/20 hover:bg-green-500/30 border-green-500/50 text-green-400'
                                        : 'bg-gray-700/80 hover:bg-gray-600 border-gray-600/50'
                                        }`}
                                >
                                    {isDownloaded ? <><Check size={16} /> Downloaded!</> : <><Download size={16} /> Download</>}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className='w-full border border-gray-600/50 flex-grow bg-[var(--color-base-300)] rounded-xl overflow-hidden min-h-0 shadow-inner'>
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 size={80} className="animate-spin text-fuchsia-500/30" />
                                    </div>
                                    <Sparkles size={60} className="text-fuchsia-400 animate-pulse" />
                                </div>
                                <p className="mt-6 text-lg font-medium">AI is thinking...</p>
                                <p className="mt-2 text-sm text-gray-500">This may take a few seconds</p>
                                <div className="mt-6 w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 animate-[loading_2s_ease-in-out_infinite]"></div>
                                </div>
                            </div>
                        ) : generatedCode ? (
                            <Editor
                                height="100%"
                                theme="vs-dark"
                                language={framework?.extension === 'jsx' ? 'javascript' : (framework?.extension || 'html')}
                                value={generatedCode}
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true
                                }}
                            />
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center h-full text-red-400 text-center p-8">
                                <div className="p-4 bg-red-500/10 rounded-full mb-4">
                                    <AlertTriangle size={60} className="text-red-400" />
                                </div>
                                <p className="mt-2 text-xl font-semibold">Generation Failed</p>
                                <p className="text-sm text-gray-400 mt-2 max-w-md">{error}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 blur-3xl rounded-full"></div>
                                    <Code size={120} className="relative text-gray-600" />
                                </div>
                                <p className="text-lg font-medium text-gray-400 mb-2">Your code will appear here</p>
                                <p className="text-sm text-gray-600 text-center max-w-sm">
                                    Select a framework, describe your component, and click generate to get started
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <PreviewModal
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                code={generatedCode}
                framework={framework}
            />
        </>
    );
};

export default Home;