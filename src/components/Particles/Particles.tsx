import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

const Particles = () => {
    const [gravity, setGravity] = useState(0.3);

    useEffect(() => {
        // Increase gravity after a short delay to simulate bounce
        const timeout = setTimeout(() => setGravity(1), 500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            tweenDuration={2000}
            numberOfPieces={300}
            gravity={gravity}
            initialVelocityX={10}
            initialVelocityY={10}
        />
    );
};

export default Particles;
