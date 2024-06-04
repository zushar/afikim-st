import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    // 1m = 40px
    const [modules] = useState([
        { id: '2', type: ' ריבוע ', dimensions: 'מטר על 2 מטר', width: 40, length: 80 },
        { id: '3', type: ' ריבוע ', dimensions: 'מטר על חצי מטר', width: 20, length: 40 },
        { id: '4', type: ' ריבוע ', dimensions: 'מטר על 30 סמ', width: 12, length: 40 },
        { id: '5', type: ' ריבוע ', dimensions: 'שני מטר על מטר', width: 20, length: 80 },
        { id: '6', type: ' ריבוע ', dimensions: 'מטר על מטר', width: 40, length: 40 },
        { id: '7', type: ' משולש ', dimensions: 'מטר על מטר', width: 40, length: 40 },
        { id: '8', type: ' חצי עיגול ', dimensions: 'מטר על מטר', width: 40, length: 40 },
        { id: '9', type: ' משולש שמאל ', dimensions: 'מטר על שני מטר', width: 40, length: 80 },
        { id: '10', type: ' משולש ימין ', dimensions: 'מטר על שני מטר', width: 40, length: 80 }
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
    const [workspaceRef, setWorkspaceRef] = useState(null);

    const deleteElement = () => {
        setElements((prevElements) => prevElements.filter(el => el.id !== selectedElement));
        setLegs((prevLegs) => prevLegs.filter(leg => leg.key !== selectedElement));
        localStorage.setItem('elements', JSON.stringify(elements));
        localStorage.setItem('legs', JSON.stringify(legs));
        setSelectedElement(null);
    };

    const deleteAll = () => {
        setElements([]);
        setLegs([]);
        localStorage.removeItem('elements');
        localStorage.removeItem('legs');
        setSelectedElement(null);
        window.location.reload();
    };

    useEffect(() => {
        setElements((prevElements) =>
            prevElements.map((el) =>
                el.id === selectedElement ? { ...el, fill: '#6B7280' } : { ...el, fill: 'transparent' }
            )
        );

        // Set the elements to local storage if the elements array is not empty
        if (elements.length > 0) {
            localStorage.setItem('elements', JSON.stringify(elements));
        }
        // Set the legs to local storage if the legs array is not empty
        if (legs.length > 0) {
            localStorage.setItem('legs', JSON.stringify(legs));
        }
    }, [selectedElement]);

    // useEffect to get the elements and legs from the local storage only after refreshing the page
    useEffect(() => {
        const elements = JSON.parse(localStorage.getItem('elements'));
        if (elements) {
            setElements(elements);
        }

        const legs = JSON.parse(localStorage.getItem('legs'));
        if (legs) {
            setLegs(legs);
        }
    }, []);

    const handleRotateElement = () => {
        setElements((prevElements) =>
            prevElements.map((el) =>
                el.id === selectedElement ? { ...el, rotation: (el.rotation + 90) % 360 } : el
            )
        );
    };

    const globalState = {
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
        workspaceRef, setWorkspaceRef,
        deleteElement,
        deleteAll
    };

    return (
        <AppContext.Provider value={globalState}>
            {children}
        </AppContext.Provider>
    );
};