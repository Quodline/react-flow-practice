import ReactFlow, {
    Connection,
    Edge,
    addEdge,
    useEdgesState,
    useNodesState,
    Background,
    Controls,
    MiniMap, BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import {useCallback} from 'react';

const initialNodes = [
    {id: '1', position: {x: 0, y: 0}, data: {label: '1'}},
    {id: '2', position: {x: 100, y: 100}, data: {label: '2'}},
];
const initialEdges = [{id: 'e1-2', source: '1', target: '2', animated: true}];

function App() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges(edges => addEdge(params, edges)),
        [setEdges]
    );

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                defaultEdgeOptions={{animated: true}}
                fitView
            >
                <button onClick={() => setEdges([])}>Remove all edges</button>
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}

export default App;
