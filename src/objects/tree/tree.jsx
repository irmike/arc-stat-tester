import {useCallback, useMemo, useState} from "react";
import TreeSection from "./treeSection.jsx";
import mobility from "../../Data/mobilityData.jsx";

function Tree(){
    const defaultPoints = 76;
    const [points, setPoints] = useState(defaultPoints);

    const increasePoints = useCallback(() => setPoints(p => p + 1), []);
    const decreasePoints = useCallback(() => setPoints(p => Math.max(0, p - 1)), []);

    const pointFuncts = useMemo(
        () => ({ points, increasePoints, decreasePoints }),
        [points, increasePoints, decreasePoints]
    );


    return (
        <div>
            <h1> Points available: {points}</h1>
            <div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TreeSection name="mobility" direction="up" data={mobility} pointFuncts={pointFuncts}/>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <TreeSection name="mobility" direction="left" data={mobility} pointFuncts={pointFuncts}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <TreeSection name="mobility" direction="right" data={mobility} pointFuncts={pointFuncts}/>
                </div>
            </div>
        </div>
    )
}

export default Tree;