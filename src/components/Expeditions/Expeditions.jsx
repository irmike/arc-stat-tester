import React from "react";

function Expeditions({ expeditions, onAdd, onRemove, onChange }) {
    return (
        <div className="expeditions-root" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            <button
                className="expeditions-add"
                onClick={onAdd}
                disabled={expeditions.length >= 5}
            >
                Add Expedition
            </button>
            {expeditions.map((value, idx) => (
                <div key={idx} className="expedition-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{`Exp. ${idx + 1}`}</span>
                    <input
                        type="number"
                        min={0}
                        max={5}
                        value={value}
                        onChange={e => {
                            let v = parseInt(e.target.value, 10);
                            onChange(idx, v);
                        }}
                        style={{ width: '40px', marginRight: '4px' }}
                    />
                    <button
                        className="expedition-remove"
                        style={{ background: 'red', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '4px', padding: '2px 8px' }}
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

