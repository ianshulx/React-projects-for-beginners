import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Code, AlertTriangle, X, Monitor, Tablet, Smartphone } from "lucide-react";
import { transform } from '@babel/standalone';

/**
 * Preview modal component for displaying generated code
 * Supports live preview for HTML/JSX frameworks and code view for others
 * @param {boolean} isOpen - Controls modal visibility
 * @param {Function} onClose - Callback to close modal
 * @param {string} code - Generated code to preview
 * @param {Object} framework - Selected framework object with value and extension
 */
const PreviewModal = ({ isOpen, onClose, code, framework }) => {
    const [viewMode, setViewMode] = useState('desktop');
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [previewContent, setPreviewContent] = useState('');
    const [compileError, setCompileError] = useState(null);

    const isHtmlFramework = framework?.value?.includes('HTML') ?? false;
    const isJsxFramework = framework?.value?.includes('JSX') ?? false;

    useEffect(() => {
        if (!isOpen || !code) return;

        setCompileError(null);

        if (isHtmlFramework) {
            setPreviewContent(code);
        } else if (isJsxFramework) {
            try {
                const compiledJs = transform(code, { presets: ['react'] }).code;
                const htmlTemplate = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <script src="https://cdn.tailwindcss.com"></script>
                        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                        <style> body { background-color: white; padding: 1rem; } </style>
                    </head>
                    <body>
                        <div id="root"></div>
                        <script type="text/javascript">
                            try {
                                ${compiledJs}
                                const container = document.getElementById('root');
                                const root = ReactDOM.createRoot(container);
                                // Component must be named "Component" as per generation rules
                                root.render(React.createElement(Component));
                            } catch (e) {
                                document.body.innerHTML = '<div style="color: red; font-family: sans-serif;"><strong>Render Error:</strong><pre>' + e.message + '</pre></div>';
                            }
                        </script>
                    </body>
                    </html>
                `;
                setPreviewContent(htmlTemplate);
            } catch (error) {
                setCompileError(error.message);
                setPreviewContent('');
            }
        } else {
            // For other languages like Python, Java, Dart, we don't generate an iframe srcDoc
            setPreviewContent('');
        }
    }, [isOpen, code, framework, isHtmlFramework, isJsxFramework]);

    const handleClose = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            onClose();
            setIsAnimatingOut(false);
        }, 300);
    };

    if (!isOpen) return null;

    const viewClasses = {
        desktop: 'w-full h-full max-w-full',
        tablet: 'w-full h-full max-w-[768px] shadow-2xl rounded-lg',
        mobile: 'w-full h-full max-w-[420px] shadow-2xl rounded-lg'
    };

    /**
     * Renders the appropriate content in the modal body
     * Shows live preview for HTML/JSX, error message for compilation failures, or code editor for other languages
     */
    const renderModalBody = () => {
        // Case 1: Live Preview for HTML or successfully compiled JSX
        if (previewContent && (isHtmlFramework || isJsxFramework)) {
            return (
                <div className={`transition-all duration-300 ease-in-out ${viewClasses[viewMode]}`}>
                    <div className="bg-gray-800 rounded-t-lg flex items-center p-2 gap-1.5">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <iframe
                        srcDoc={previewContent}
                        title="Preview"
                        className="w-full h-[80vh] bg-white border-none rounded-b-lg"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>
            );
        }
        // Case 2: JSX compilation failed - show error message
        if (compileError) {
            return (
                <div className="text-center text-white bg-red-900/50 p-8 rounded-lg max-w-2xl">
                    <AlertTriangle size={60} className="mx-auto text-red-400 mb-4" />
                    <h4 className="font-bold text-xl mb-2">JSX Compilation Failed</h4>
                    <p className="text-red-300 font-mono bg-gray-900 p-3 rounded-md text-sm">{compileError}</p>
                </div>
            );
        }
        // Case 3: Code Preview for non-renderable languages (Python, Dart, Java, etc.)
        return (
            <div className="w-full h-full flex flex-col text-white bg-gray-900/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4 text-left">
                    <Code size={24} className="text-cyan-400 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-xl">Code Preview</h4>
                        <p className="text-gray-400 text-sm">Live preview isn't available for this language, but here's your code!</p>
                    </div>
                </div>
                <div className="flex-grow w-full border border-gray-700 rounded-lg overflow-hidden min-h-0">
                    <Editor
                        height="100%"
                        theme="vs-dark"
                        language={framework?.extension || 'javascript'}
                        value={code}
                        options={{ readOnly: true, minimap: { enabled: false } }}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className={`modal-backdrop ${isAnimatingOut ? 'modal-leave-active' : 'modal-enter-active'}`}>
            <div className={`modal-content ${isAnimatingOut ? 'modal-leave-active' : 'modal-enter-active'}`}>
                <div className="flex justify-between items-center p-4 border-b border-gray-700 text-white flex-shrink-0">
                    <h3 className="font-bold text-lg">Component Preview</h3>
                    {(isHtmlFramework || isJsxFramework) && !compileError && (
                        <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-lg">
                            <button onClick={() => setViewMode('desktop')} className={`p-2 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-fuchsia-500' : 'hover:bg-gray-700'}`}><Monitor size={20} /></button>
                            <button onClick={() => setViewMode('tablet')} className={`p-2 rounded-md transition-colors ${viewMode === 'tablet' ? 'bg-fuchsia-500' : 'hover:bg-gray-700'}`}><Tablet size={20} /></button>
                            <button onClick={() => setViewMode('mobile')} className={`p-2 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-fuchsia-500' : 'hover:bg-gray-700'}`}><Smartphone size={20} /></button>
                        </div>
                    )}
                    <button 
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors" 
                        onClick={handleClose}
                        aria-label="Close preview"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-grow p-4 md:p-6 bg-[#1e1e1e] overflow-auto flex items-center justify-center">
                    {renderModalBody()}
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;