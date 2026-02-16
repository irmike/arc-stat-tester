import React from "react";
import {useState, useRef} from "react";
import DescriptionModal from "../Displays/descriptionModal.jsx";
import "./node.css";


function Node (props) {
    const { name: nodeName, description, pointCap, image } = props;
    const [count, setCount] = useState(0);
    const [isDescOpen, setIsDescOpen] = useState(false)
    const buttonRef = useRef(null);

    const increaseCount = () => {
        if(count < pointCap && props.points > 0){
            setCount(prevCount => prevCount + 1);
            props.increaseTotal();
        }
    };

    const decreaseCount = () => {
        if(count > 0){
            setCount(prevCount => prevCount - 1);
            props.decreaseTotal()
        }
    };

    return (
        <div className="node-root">
            <div className="node-image-wrapper">
                <button ref={buttonRef}
                        className="node-image-button"
                        onClick={() => setIsDescOpen(!isDescOpen)}
                        aria-label={`Open Description for ${nodeName}`}
                >
                    <img src={image} className={"node-image node-" + nodeName} alt={nodeName} />
                </button>
            </div>

            <DescriptionModal isOpen={isDescOpen} onClose={() => setIsDescOpen(false)} anchorRef={buttonRef}>
                <h2>{nodeName}</h2>
                <p>{description}</p>
            </DescriptionModal>

            <div className="stat-display">
                <span> <button onClick={decreaseCount} aria-label={`Decrease ${nodeName}`}> - </button> </span>
                <span> <h2>{count}/{pointCap}</h2> </span>
                <span> <button onClick={increaseCount} aria-label={`Increase ${nodeName}`}> + </button>< /span>
            </div>
        </div>
    );
}

export default Node;