import PropTypes from 'prop-types';

/**
 * GraphVisualizer - Visualizes graph/tree structures
 *
 * Shows nodes arranged by levels (BFS level-order)
 * with edges showing connections between nodes
 */
function GraphVisualizer({ graph, pathFound = [] }) {
  if (!graph || !graph.nodes || graph.nodes.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">No graph to display</p>
      </div>
    );
  }

  // Get node color based on state
  const getNodeColor = (state) => {
    switch (state) {
      case 'current':
        return 'bg-blue-500 text-white border-blue-600 shadow-lg';
      case 'processing':
        return 'bg-blue-400 text-white border-blue-500 ring-4 ring-blue-300';
      case 'enqueued':
        return 'bg-green-400 text-white border-green-500 animate-pulse';
      case 'visited':
        return 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border-gray-400';
      case 'path':
        return 'bg-green-500 text-white border-green-600 font-bold shadow-lg';
      case 'target':
        return 'bg-purple-500 text-white border-purple-600 font-bold';
      case 'found':
        return 'bg-emerald-500 text-white border-emerald-600 font-bold animate-pulse shadow-lg';
      default:
        return 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600';
    }
  };

  // Get edge color based on state
  const getEdgeColor = (state) => {
    switch (state) {
      case 'active':
        return 'stroke-blue-500 stroke-[3]';
      case 'path':
        return 'stroke-green-500 stroke-[3]';
      case 'found':
        return 'stroke-emerald-500 stroke-[3]';
      case 'visited':
      default:
        return 'stroke-gray-300 dark:stroke-gray-600 stroke-[2]';
    }
  };

  // Group nodes by level
  const nodesByLevel = {};
  graph.nodes.forEach((node) => {
    const level = node.level || 0;
    if (!nodesByLevel[level]) {
      nodesByLevel[level] = [];
    }
    nodesByLevel[level].push(node);
  });

  const levels = Object.keys(nodesByLevel).sort((a, b) => parseInt(a) - parseInt(b));
  const maxNodesPerLevel = Math.max(...Object.values(nodesByLevel).map(nodes => nodes.length));

  // Calculate positions for nodes
  const nodePositions = {};
  const nodeWidth = 80;
  const nodeHeight = 60;
  const levelHeight = 120;
  const horizontalSpacing = 120;

  levels.forEach((level, levelIndex) => {
    const nodesInLevel = nodesByLevel[level];
    const levelWidth = (nodesInLevel.length - 1) * horizontalSpacing;
    const startX = -levelWidth / 2;

    nodesInLevel.forEach((node, nodeIndex) => {
      const x = startX + nodeIndex * horizontalSpacing;
      const y = levelIndex * levelHeight;
      nodePositions[node.id] = { x, y };
    });
  });

  // Calculate SVG viewBox
  const maxWidth = maxNodesPerLevel * horizontalSpacing;
  const maxHeight = levels.length * levelHeight;
  const padding = 100;
  const viewBoxMinX = -maxWidth / 2 - padding;
  const viewBoxMinY = -padding;
  const viewBoxWidth = maxWidth + padding * 2;
  const viewBoxHeight = maxHeight + padding;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        BFS Transformation Graph
      </h3>

      {/* SVG Graph */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full min-h-[400px] max-h-[600px]"
          style={{ minWidth: '600px' }}
        >
          {/* Draw edges first (so they appear behind nodes) */}
          {graph.edges && graph.edges.map((edge, index) => {
            const fromPos = nodePositions[edge.from];
            const toPos = nodePositions[edge.to];

            if (!fromPos || !toPos) return null;

            // Calculate start and end points (accounting for node size)
            const dx = toPos.x - fromPos.x;
            const dy = toPos.y - fromPos.y;
            const angle = Math.atan2(dy, dx);

            const startX = fromPos.x + (nodeWidth / 2) * Math.cos(angle);
            const startY = fromPos.y + (nodeHeight / 2) * Math.sin(angle);
            const endX = toPos.x - (nodeWidth / 2) * Math.cos(angle);
            const endY = toPos.y - (nodeHeight / 2) * Math.sin(angle);

            return (
              <g key={index}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  className={getEdgeColor(edge.state)}
                  markerEnd="url(#arrowhead)"
                />
              </g>
            );
          })}

          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3, 0 6"
                className="fill-gray-400 dark:fill-gray-500"
              />
            </marker>
          </defs>

          {/* Draw nodes */}
          {graph.nodes.map((node) => {
            const pos = nodePositions[node.id];
            if (!pos) return null;

            return (
              <g key={node.id}>
                {/* Node rectangle */}
                <rect
                  x={pos.x - nodeWidth / 2}
                  y={pos.y - nodeHeight / 2}
                  width={nodeWidth}
                  height={nodeHeight}
                  className={`${getNodeColor(node.state)} border-2 rounded-lg transition-all duration-300`}
                  rx="8"
                />

                {/* Node label */}
                <text
                  x={pos.x}
                  y={pos.y - 5}
                  textAnchor="middle"
                  className="font-mono font-bold text-sm"
                  fill="currentColor"
                >
                  {node.label}
                </text>

                {/* Node level */}
                <text
                  x={pos.x}
                  y={pos.y + 12}
                  textAnchor="middle"
                  className="text-xs opacity-75"
                  fill="currentColor"
                >
                  L{node.level}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Path Found Display */}
      {pathFound && pathFound.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Shortest Path Found
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            {pathFound.map((word, index) => (
              <div key={index} className="flex items-center">
                <div className="px-4 py-2 bg-green-500 text-white rounded-lg font-mono font-bold border-2 border-green-600 shadow">
                  {word}
                </div>
                {index < pathFound.length - 1 && (
                  <div className="mx-2 text-green-600 dark:text-green-400 font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Path length: <span className="font-bold text-green-600 dark:text-green-400">{pathFound.length}</span> words
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Node States
        </h4>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 bg-blue-400 border border-blue-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Processing</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 bg-green-400 border border-green-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Enqueued</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 bg-gray-300 dark:bg-gray-600 border border-gray-400 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Visited</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 bg-green-500 border border-green-600 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">In Path</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 bg-emerald-500 border border-emerald-600 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Found!</span>
          </div>
        </div>
      </div>

      {/* Graph Stats */}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {graph.nodes.length} node{graph.nodes.length !== 1 ? 's' : ''} • {' '}
        {graph.edges ? graph.edges.length : 0} edge{graph.edges && graph.edges.length !== 1 ? 's' : ''} • {' '}
        {levels.length} level{levels.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

GraphVisualizer.propTypes = {
  graph: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        state: PropTypes.string,
        level: PropTypes.number,
      })
    ).isRequired,
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        state: PropTypes.string,
      })
    ),
  }),
  pathFound: PropTypes.arrayOf(PropTypes.string),
};

export default GraphVisualizer;
