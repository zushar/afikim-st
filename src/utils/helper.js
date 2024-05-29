export const getTrianglePoints = (type, width, length) => {
  switch (type) {
    case 'triangle':
      return `M0,${length} L${width},0 L${width},${length} Z`;
    case 'rounded triangle':
      return `M0,${length} L${width},${length} L${width},0 Q0,0 0,${length} Z`;
    case 'triangle lift':
      return `M0,${length} L${width},${length} L${width},0 Z`;
    case 'triangle right':
      return `M0,0 L${width},${length} L0,${length} Z`;
    default:
      return '';
  }
};

export const styleForRotationButton = (type, centerX, centerY) => {
  switch (type) {
    case 'triangle':
      return {
        position: 'absolute',
        left: `${centerX + 7}px`,
        top: `${centerY + 7}px`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        color: 'black',
        fontSize: '13px',
        background: 'none',
        border: 'none',
      };
    case 'triangle lift':
      return {
        position: 'absolute',
        left: `${centerX + 7}px`,
        top: `${centerY + 7}px`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        color: 'black',
        fontSize: '13px',
        background: 'none',
        border: 'none',
      };
    case 'triangle right':
      return {
        position: 'absolute',
        left: `${centerX - 7}px`,
        top: `${centerY+6}px`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        color: 'black',
        fontSize: '13px',
        background: 'none',
        border: 'none',
      };
    default:
      return {
        position: 'absolute',
        left: `${centerX}px`,
        top: `${centerY}px`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        color: 'black',
        fontSize: '13px',
        background: 'none',
        border: 'none',
      };
  }
};