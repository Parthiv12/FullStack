import React, { useEffect } from 'react';

const ParticleBackground = () => {
    useEffect(() => {
        if (window.particlesJS) {
            window.particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ["#00ffff", "#ff00ff", "#00ff00"] // Cyberpunk colors
                    },
                    shape: {
                        type: ["circle", "edge"],
                        stroke: {
                            width: 0,
                            color: "#000000"
                        }
                    },
                    opacity: {
                        value: 0.8,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#00ffff", // Neon cyan
                        opacity: 0.4,
                        width: 1,
                        shadow: {
                            enable: true,
                            color: "#00ffff",
                            blur: 5
                        }
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }, []);

    return (
        <div
            id="particles-js"
            style={{
                backgroundColor: '#0a0a2a', // Dark blue background
                background: 'linear-gradient(45deg, #0a0a2a 0%, #1a1a3a 100%)', // Gradient background
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                boxShadow: 'inset 0 0 100px rgba(0,255,255,0.2)' // Inner glow effect
            }}
        />
    );
};

export default ParticleBackground;