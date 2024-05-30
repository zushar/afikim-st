import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {

    //1m = 40px
    const [modules] = useState([
        { id: '2', type: ' ריבוע ' , dimensions: '1mx2m', width: 40, length: 80 },
        { id: '3', type: ' ריבוע ', dimensions: '0.5mx1m', width: 20, length: 40 },
        { id: '4', type: ' ריבוע ', dimensions: '0.3mx1m', width: 12, length: 40 },
        { id: '5', type: ' ריבוע ', dimensions: '0.5mx2m', width: 20, length: 80 },
        { id: '6', type: ' ריבוע ', dimensions: '1mx1m', width: 40, length: 40 },
        { id: '7', type: ' משולש ', dimensions: '1mx1m', width: 40, length: 40 },
        { id: '8', type: ' חצי עיגול ', dimensions: '1mx1m', width: 40, length: 40 },
        { id: '9', type: ' משולש שמאל ', dimensions: '1mx2m', width: 40, length: 80 },
        { id: '10', type: ' משולש ימין ', dimensions: '1mx2m', width: 40, length: 80 }
    ]);

    const handleDragStartModule = (e, module) => {
        e.dataTransfer.setData("type", module.type);
        e.dataTransfer.setData("moduleData", JSON.stringify({
            dimensions: module.dimensions,
            width: module.width,
            length: module.length
        }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [color, setColor] = useState(null);
    const [legs, setLegs] = useState([]);
    const [height, setHeight] = useState(null);

    const deletElement = () => {
        setElements((prevElements) => prevElements.filter(el => el.id !== selectedElement));
        setLegs((prevLegs) => prevLegs.filter(leg => leg.key !== selectedElement));
        setSelectedElement(null);
    };

    useEffect(() => {
        setElements((prevElements) =>
            prevElements.map((el) =>
                el.id === selectedElement ? { ...el, fill: '#6B7280' } : { ...el, fill: 'transparent' }
            )
        );
    }, [selectedElement])

    const handleRotateElement = () => {
        setElements((prevElements) =>
            prevElements.map((el) =>
                el.id === selectedElement ? { ...el, rotation: (el.rotation + 90) % 360 } : el
            )
        );
    };

    const glovalState = {
        modules,
        handleDragStartModule,
        handleDragOver,
        elements,
        setElements,
        selectedElement,
        legs, setLegs,
        color, setColor,
        setSelectedElement,
        handleRotateElement,
        height, setHeight,
        deletElement
    };

    return (
        <AppContext.Provider value={glovalState}>
            {children}
        </AppContext.Provider>
    );
};
