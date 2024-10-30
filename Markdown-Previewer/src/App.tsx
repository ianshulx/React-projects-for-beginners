"use client"

import { useState } from 'react'
import { marked } from 'marked'

export default function Component() {
  const [markdown, setMarkdown] = useState(`# Welcome to the Markdown Previewer!
    
Built by [@arjuncodess](https://arjuncodess.vercel.app)

## This is a sub-heading...
### Here's a smaller sub-heading...
    
You can make text **bold** or *italic*. You can even ~~cross things out~~.
    
Here is a list:
- Item 1
- Item 2
- Item 3
    
This is a code block:
    
\`\`\`
function helloWorld() {
  console.log("Hello, World!");
}
\`\`\`
    
[Link to Google](https://www.google.com)
    
> This is a blockquote.
    
![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)
`);

  // Configure marked options
  marked.setOptions({
    breaks: true, // Enables line breaks for better formatting
  })

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col py-10 font-sans">
      <h1 className="text-3xl font-bold p-4 text-center text-neutral-50">Markdown Previewer</h1>
      <div className="flex-grow flex flex-col lg:flex-row">
        <div className="flex-1 p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-neutral-300">Editor</h2>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-grow p-4 rounded-lg border border-neutral-700 bg-neutral-800 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 font-sans resize-y min-h-[200px]"
            placeholder="Type your markdown here..."
          />
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-neutral-300">Preview</h2>
          <div
            className="flex-grow p-4 rounded-lg border border-neutral-700 bg-neutral-800 shadow-sm overflow-auto prose prose-sm max-w-none prose-invert font-sans"
            dangerouslySetInnerHTML={{ __html: marked(markdown) }}
          />
        </div>
      </div>
      <div className="text-center mt-4 text-neutral-400">
        Built by <a href="https://arjuncodess.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:underline text-neutral-300 hover:text-neutral-300 transition-colors">@arjuncodess</a>
      </div>
    </div>
  )
}