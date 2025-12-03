// src/CustomNode.jsx
import React from 'react';

const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #888', background: '#fff', borderRadius: 5 }}>
      <input value={data.label} onChange={(e) => data.onChange(e.target.value)} style={{ width: '100%' }} />
    </div>
  );
};

export default CustomNode;
