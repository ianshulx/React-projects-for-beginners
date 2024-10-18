import { useState } from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <>
      <footer className="bg-gray-100 px-6 py-12 md:px-12 flex-grow">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logos/light-logo.svg"
                  alt="KrushiMitra Logo"
                  className="h-10 w-10"
                  style={{ height: '80px', width: '180px' }}
                />
              </div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-4 md:gap-16">
              <div>
                <h3 className="mb-4 font-semibold text-gray-900">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover-underline">
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover-underline">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-gray-900">Contact Us</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:sihhackathon1@gmail.com" className="hover-underline">
                      info@KrushiMitra.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+24810567624" className="hover-underline">
                      +91 1234567890
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center text-sm text-gray-500">
            © 2024 KrushiMitra. All Rights Reserved.
          </div>
        </div>
      </footer>

      <style>{`
        .hover-underline {
          position: relative;
          display: inline-block;
          color: #4a5568;
          transition: color 0.3s ease;
        }
        .hover-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #48bb78;
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.3s ease;
        }
        .hover-underline:hover {
          color: #1a202c;
        }
        .hover-underline:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>
    </>
  );
}
