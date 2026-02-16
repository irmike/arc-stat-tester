import {useState} from "react";
import Node from "../nodes/node.jsx";

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
        <div style={{display: 'flex', flexDirection: directionToFlex[direction][0]}}>
            {data.map((subsection, subSectionIndex) => (
                // Create an outer div for each row
                <div
                    key={subSectionIndex}
                    className="row-div"
                    style={{
                        display: 'flex',
                        flexDirection: directionToFlex[direction][1],
                        justifyContent: 'space-evenly',
                        // gap: '16px',
                        alignItems: 'center'
                }}
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
            <div>
                <h2>{name.toUpperCase()}</h2>
                <h2>{total}</h2>
            </div>
        </div>
    );
};

export default TreeSection;