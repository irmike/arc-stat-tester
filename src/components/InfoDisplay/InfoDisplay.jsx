import React, { useState } from "react";
import './InfoDisplay.css';

function InfoDisplay() {
    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <div className={`info-overlay ${isMinimized ? 'minimized' : ''}`}>
            <button
                className="info-toggle"
                type="button"
                onClick={() => setIsMinimized(prev => !prev)}
                aria-label={isMinimized ? 'Open info panel' : 'Minimize info panel'}
            >
                {isMinimized ? '+' : '-'}
            </button>
            {!isMinimized && (
                <div className="info-content">
                    <h2 className='info-title'>INFO</h2>
                    <p className='info-message'>
                        This is a work in progress, so expect some bugs and a simple UI (for now). Please feel free to view the
                        github repo and README for more details. I created this project to showcase and practice my abilities
                        in react by replicating the functionality of the Skill Tree from the video game Arc Raiders. Thank you
                        for visiting!
                    </p>
                    <div>
                        <h2 className='info-title'>
                            USAGE INSTRUCTIONS:
                        </h2>
                        <ul>
                            <li>Click on the + and - buttons to allocate or deallocate points to each node.</li>
                            <li>Click on the nodes to view their descriptions and names.</li>
                            <li>Keep an eye on your available points at the top.</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InfoDisplay;