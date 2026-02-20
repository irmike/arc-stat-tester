import React from "react";
import "./Expeditions.css";

function Expeditions({ expeditions, onAdd, onRemove, onChange }) {
    return (
        <div className="expeditions-root">
            <button
                className="expeditions-add"
                onClick={onAdd}
                disabled={expeditions.length >= 5}
            >
                Add Expedition
            </button>
            {expeditions.map((value, idx) => (
                <div key={idx} className="expedition-item">
                    <span>{`Exp. ${idx + 1}`}</span>
                    <input
                        type="number"
                        min={0}
                        max={5}
                        value={value === 0 ? "" : value}
                        onChange={e => {
                            const inputValue = e.target.value;
                            let v = inputValue === "" ? 0 : parseInt(inputValue, 10);
                            onChange(idx, v);
                        }}
                    />
                    <button
                        className="expedition-remove"
                        onClick={() => onRemove(idx)}
                    >
                        x
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Expeditions;
