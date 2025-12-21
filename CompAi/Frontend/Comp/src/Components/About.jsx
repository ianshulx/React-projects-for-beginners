import React from 'react';
import { Users, Eye, Target, Heart, Linkedin } from 'lucide-react';
import image from '../assets/profile.jpg';

/**
 * Team member data
 */
const teamMembers = [
    {
        name: 'Shreyash Patel',
        role: 'Co-Founder & CEO',
        imageUrl: image,
    },
];

/**
 * Feature highlights for the About page
 */
const features = [
    {
        icon: <Heart size={32} className="text-fuchsia-500" />,
        title: 'Passionate Team',
        description: 'We are a team of passionate individuals dedicated to delivering the best possible experience for our users.',
    },
    {
        icon: <Target size={32} className="text-fuchsia-500" />,
        title: 'Customer-Centric',
        description: 'Our users are at the heart of everything we do. We listen to your feedback to continuously improve our product.',
    },
    {
        icon: <Eye size={32} className="text-fuchsia-500" />,
        title: 'Innovation-Driven',
        description: 'We stay ahead of the curve by embracing the latest technologies and innovating our solutions.',
    },
];

/**
 * About page component
 * Displays company information, mission, vision, and team members
 */
const About = () => {
    return (
        <div className="bg-[var(--color-base-100)] text-white min-h-screen">
            <div className="container mx-auto px-6 py-16">

                <div className="text-center py-12">
                    <h1 className="text-5xl md:text-6xl font-bold sp-text mb-4">
                        Crafting the Future, One Line of Code at a Time.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        We are a collective of creators, thinkers, and innovators on a mission to build software that not only works flawlessly but also inspires and empowers people.
                    </p>
                </div>

                <div className="my-20 lg:my-24 grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold mb-4 sp-text">Our Story</h2>
                        <p className="text-gray-400 mb-4">
                            Founded in a small garage with a big dream, our journey began with a shared passion for solving complex problems through elegant technology. We saw a gap in the market for tools that were both powerful and a joy to use.
                        </p>
                        <p className="text-gray-400">
                            Through years of dedication, late nights, and countless cups of coffee, we've grown into a dynamic company that has served thousands of happy customers worldwide, all while staying true to our core values of integrity and innovation.
                        </p>
                    </div>
                    <div className="order-1 md:order-2">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600"
                            alt="Our Team"
                            className="rounded-xl shadow-2xl w-full h-auto object-cover"
                        />
                    </div>
                </div>

                <div className="my-20 lg:my-24 grid md:grid-cols-2 gap-10">
                    <div className="bg-[var(--color-base-200)] p-8 rounded-lg">
                        <Target className="text-cyan-400 mb-4" size={40} />
                        <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                        <p className="text-gray-400">To empower businesses and individuals by creating intuitive, powerful, and accessible software solutions that drive growth and foster creativity.</p>
                    </div>
                    <div className="bg-[var(--color-base-200)] p-8 rounded-lg">
                        <Eye className="text-cyan-400 mb-4" size={40} />
                        <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
                        <p className="text-gray-400">To be a globally recognized leader in software innovation, known for our commitment to quality, user-centric design, and positive impact on technology.</p>
                    </div>
                </div>

                <div className="my-20 lg:my-24 text-center">
                    <Users className="mx-auto text-fuchsia-500 mb-4" size={48} />
                    <h2 className="text-4xl font-bold mb-4 sp-text">Meet the Innovators</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                        We are a group of diverse and talented individuals united by a single goal: creating amazing things.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="flex flex-col items-center">
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg border-2 border-fuchsia-500/50"
                                />
                                <h4 className="text-lg font-semibold">{member.name}</h4>
                                <p className="text-cyan-400">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-20 lg:my-24">
                    <h2 className="text-4xl font-bold text-center mb-12 sp-text">Why Partner With Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-[var(--color-base-200)] p-8 rounded-xl transform hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-[var(--color-base-300)] rounded-full">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-20 lg:my-24 text-center bg-[var(--color-base-200)] p-12 rounded-xl">
                    <h2 className="text-4xl font-bold mb-4 sp-text">Join Our Journey</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        We believe in the power of collaboration. If you're passionate about what we're building and want to contribute, or just want to connect, we'd love to hear from you.
                    </p>
                    <a
                        href="https://www.linkedin.com/in/shreyash-patel-ba27b02a6/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-fuchsia-600 hover:to-cyan-600 transition-all duration-300 shadow-lg transform hover:scale-105"
                    >
                        <Linkedin size={20} />
                        Connect on LinkedIn
                    </a>
                </div>

            </div>
        </div>
    );
};

export default About;