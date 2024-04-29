import { useEffect, useState, useRef } from 'react';
import Xarrow from 'react-xarrows';
import { motion, AnimatePresence } from "framer-motion"

const SkipList = ({ getValue }) => {
    // State for array of nodes
    const [nodes, setNodes] = useState([]);

    // State for number of levels
    const [levels, setLevels] = useState(0);

    // State for number of nodes
    const [numNodes, setNumNodes] = useState(0);

    // State for the last node
    const [lastNode, setLastNode] = useState(null);

    useEffect(() => {
        // Random chance for the last node to get promoted to the next level until it fails the coin flip or reaches the max level
        if (lastNode) {
            //console.log("Possible Promotion")
            if (Math.random() > 0.5 && lastNode.level > 0) {
                const newNode = { ...lastNode, level: lastNode.level - 1 };
                setNodes(prevNodes => [...prevNodes, newNode]);
                setLastNode(newNode);
                //console.log("Promoted", newNode)
            } else {
                setLastNode(null);
            }
        }
    }, [lastNode]);


    // Function to insert a node to the skip list
    function insertNode(value) {
        console.log("Inserting", {value})
        // Ensure we don't add duplicate node with same value
        if (nodes.find(node => node.value === value && node.level === 4)) {
            return;
        }
    
        setNodes(prevNodes => [...prevNodes, {value, level: 4}]);
        setNumNodes(numNodes + 1);
        setLastNode({value, level: 4});
    }

    function flushNodes(){
        let nodesCopy = JSON.parse(JSON.stringify(nodes));
        nodes = [];
        return nodesCopy;
    }


    return (
        <div>
            <AnimatePresence>
                {nodes.map((node, index) => (
                    <motion.div
                        key={index}
                        id={`node-${node.value}-${node.level}`} // Add id
                        style={{ position: 'absolute' }}
                        initial={{ opacity: 0, x: -50 }} // start state
                        animate={{ opacity: 1, x: node.value * 50, y: node.level * 50 }} // end state
                        exit={{ opacity: 0, x: -50 }} // exit state
                        transition={{ duration: 1, delay: index * 0.1 }} // control the duration and type of animation
                    >
                        {node.value}
                    </motion.div>
                ))}
            </AnimatePresence>
            <button 
                onClick={() => insertNode(getValue())}
                style={{ position: 'relative', right: 0, bottom: 0 }}
            >
                Insert Node
            </button>
            {/* Draw arrows between nodes */}
            {nodes.map((node, index) => {
                const nextNode = nodes.find(n => n.value === node.value && n.level === node.level + 1);
                return nextNode && (
                    <Xarrow
                        start={`node-${node.value}-${node.level}`}
                        end={`node-${nextNode.value}-${nextNode.level}`}
                        headSize={1}
                        color='blue'
                        strokeWidth={1}
                    />
                );
            })}
        </div>
    );
    
};

export default SkipList;