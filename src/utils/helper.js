export const getTrianglePoints = (type, width, length) => {
  switch (type) {
    case ' משולש ':
      return `M0,${length} L${width},0 L${width},${length} Z`;
    case ' חצי עיגול ':
      return `M0,${length} L${width},${length} L${width},0 Q0,0 0,${length} Z`;
    case ' משולש שמאל ':
      return `M0,${length} L${width},${length} L${width},0 Z`;
    case ' משולש ימין ':
      return `M0,0 L${width},${length} L0,${length} Z`;
    default:
      return '';
  }
};  