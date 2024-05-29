import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {

    //1m = 40px
    const [modules] = useState([
        { id: '1', type: 'square 2mx2m', dimensions: '2mx2m', width: 80, length: 80 },
        { id: '2', type: 'square 1mx2m', dimensions: '1mx2m', width: 40, length: 80 },
        { id: '3', type: 'square 0.5mx1m', dimensions: '0.5mx1m', width: 20, length: 40 },
        { id: '4', type: 'square 0.3mx1m', dimensions: '0.3mx1m', width: 12, length: 40 },
        { id: '5', type: 'square 0.5mx2m', dimensions: '0.5mx2m', width: 20, length: 80 },
        { id: '6', type: 'square 1mx1m', dimensions: '1mx1m', width: 40, length: 40 },
        { id: '7', type: 'triangle', dimensions: '1mx1m', width: 40, length: 40 },
        { id: '8', type: 'rounded triangle', dimensions: '1mx1m', width: 40, length: 40 },
        { id: '9', type: 'triangle lift', dimensions: '1mx2m', width: 40, length: 80 },
        { id: '10', type: 'triangle right', dimensions: '1mx2m', width: 40, length: 80 }
    ]);

    const handleDragStartModule = (e, module) => {
        e.dataTransfer.setData("type", module.type);
        e.dataTransfer.setData("moduleData", JSON.stringify({
            width: module.width,
            length: module.length
        }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);

    useEffect(() => {
        setElements((prevElements) =>
            prevElements.map((el) =>
                el.id === selectedElement ? { ...el, fill: '#6B7280' } : { ...el, fill: 'transparent' }
            )
        );
    }, [selectedElement])

    const glovalState = {
        modules,
        handleDragStartModule,
        handleDragOver,
        elements,
        setElements,
        selectedElement,
        setSelectedElement
    };

    return (
        <AppContext.Provider value={glovalState}>
            {children}
        </AppContext.Provider>
    );
};
