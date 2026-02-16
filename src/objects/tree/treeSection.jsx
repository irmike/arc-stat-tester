import {useState} from "react";
import Node from "../nodes/node.jsx";
import "./treeSection.css";

const directionToFlex = {
    "left": ["row-reverse", "column-reverse"],
    "right": ["row", "column"],
    "up": ["column-reverse", "row"]
};

function TreeSection ({name, direction, data, pointFuncts}) {
    const [total, setTotal] = useState(0);

    const increaseTotal = () => {
        setTotal(prevTotal => prevTotal + 1);
        pointFuncts["decreasePoints"]();
    };

    const decreaseTotal = () => {
        if(total > 0){
            setTotal(prevTotal => prevTotal - 1);
            pointFuncts["increasePoints"]()
        }
    };

    // create the subsection with each node then create the branch in same iteration IF previous nodes were rendered
    return (
        <div
            className="tree-section"
            style={{flexDirection: directionToFlex[direction][0]}}
        >
            {data.map((subsection, subSectionIndex) => (
                <div
                    key={subSectionIndex}
                    className="tree-section__row"
                    style={{flexDirection: directionToFlex[direction][1]}}
                >
                    {subsection.map((nodeData, i) => (
                        <Node
                            key={nodeData.name ?? i}
                            name={nodeData.name}
                            description={nodeData.description}
                            pointCap={nodeData.pointCap}
                            image={nodeData.image}
                            increaseTotal={increaseTotal}
                            decreaseTotal={decreaseTotal}
                            points={pointFuncts["points"]}
                        />
                    ))}
                </div>
            ))}
            <div
                className="tree-section__summary"
                style={{flexDirection: directionToFlex[direction][1]}}
            >
                <div className="tree-section__summary-inner">
                    <h2>{name.toUpperCase()}</h2>
                    <h2>{total}</h2>
                </div>
            </div>
        </div>
    );
};

export default TreeSection;