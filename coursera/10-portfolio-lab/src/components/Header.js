import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
    faGithub,
    faLinkedin,
    faMedium,
    faStackOverflow,
} from '@fortawesome/free-brands-svg-icons';
import { Box, HStack } from '@chakra-ui/react';

const socials = [
    {
        icon: faEnvelope,
        url: 'mailto: hello@example.com',
    },
    {
        icon: faGithub,
        url: 'https://github.com',
    },
    {
        icon: faLinkedin,
        url: 'https://www.linkedin.com',
    },
    {
        icon: faMedium,
        url: 'https://medium.com',
    },
    {
        icon: faStackOverflow,
        url: 'https://stackoverflow.com',
    },
];

const Header = () => {
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);

    const handleScroll = () => {
        if (window.scrollY > lastScrollY.current) {
            // Scrolling down
            setShowHeader(false);
        } else {
            // Scrolling up
            setShowHeader(true);
        }
        lastScrollY.current = window.scrollY;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = (anchor) => (event) => {
        const id = `${anchor}-section`;
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            transform={showHeader ? 'translateY(0)' : 'translateY(-200px)'}
            transitionProperty="transform"
            transitionDuration=".3s"
            transitionTimingFunction="ease-in-out"
            backgroundColor="#18181b"
        >
            <Box color="white" maxWidth="1280px" margin="0 auto">
                <HStack
                    px={16}
                    py={4}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <nav>
                        <HStack spacing={8}>
                            {socials.map((social) => (
                                <a
                                    key={social.icon.iconName}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon
                                        icon={social.icon}
                                        size="2x"
                                    />
                                </a>
                            ))}
                        </HStack>
                    </nav>
                    <nav>
                        <HStack spacing={8}>
                            <a
                                href="#contact-me"
                                id="#contactme-section"
                                onClick={handleClick('contactme')}
                            >
                                Contact Me
                            </a>
                            <a
                                href="#projects"
                                id="#projects-section"
                                onClick={handleClick('projects')}
                            >
                                Projects
                            </a>
                        </HStack>
                    </nav>
                </HStack>
            </Box>
        </Box>
    );
};

export default Header;
