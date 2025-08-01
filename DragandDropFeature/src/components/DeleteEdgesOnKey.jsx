// src/DeleteEdgesOnKey.jsx
import { useEffect } from 'react';

const DeleteEdgesOnKey = ({ selectedEdges, setEdges }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        setEdges((eds) => eds.filter((e) => !selectedEdges.find((sel) => sel.id === e.id)));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEdges, setEdges]);

  return null;
};

export default DeleteEdgesOnKey;
