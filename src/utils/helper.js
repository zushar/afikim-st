export const getTrianglePoints = (type, width, length) => {
  switch (type) {
    case 'משולש':
      return `M0,${length} L${width},0 L${width},${length} Z`;
    case 'חצי עיגול':
      return `M0,${length} L${width},${length} L${width},0 Q0,0 0,${length} Z`;
    case 'משולש שמאל':
      return `M0,${length} L${width},${length} L${width},0 Z`;
    case 'משולש ימין':
      return `M0,0 L${width},${length} L0,${length} Z`;
    default:
      return '';
  }
};

export const styleForRotationButton = (type, centerX, centerY) => {
  switch (type) {
    case 'משולש':
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
    case 'משולש שמאל':
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
    case 'משולש ימין':
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