import {
    Box,
    Button,
    Heading,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Card = ({ title, description, imageSrc }) => {
    // Implement the UI for the Card component according to the instructions.
    // You should be able to implement the component with the elements imported above.
    // Feel free to import other UI components from Chakra UI if you wish to.

    return (
        <Box
            borderRadius="lg"
            backgroundColor="white"
        >
            <Image src={imageSrc} alt={title} />

            <Box>
                <VStack align="start" color="black" spacing={4} padding={5}>
                    <Heading size="md" >{title}</Heading>
                    <Text>{description}</Text>
                    <Button
                        rightIcon={<FontAwesomeIcon icon={faArrowRight} size='1x' />}
                        colorScheme="teal"
                        variant="outline"
                    >
                        See More
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default Card;
