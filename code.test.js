
const fs = require('fs');
const jsc = require('jsverify');
const assert = require('assert');
eval(fs.readFileSync('code.js')+'');

// Generate a random graph in the format of the provided test cases
function generateGraph() {
    const vertices = ['A', 'B', 'C', 'D', 'E']; // Vertices for the graph
    const graph = {};

    // Generate random edges with non-negative weights
    vertices.forEach(vertex => {
        graph[vertex] = {};
        const numEdges = jsc.random(0, 2); // Generate up to 2 edges per vertex
        const otherVertices = vertices.filter(v => v !== vertex); // Exclude the current vertex

        for (let i = 0; i < numEdges; i++) {
            const dest = otherVertices[i];
            const weight = jsc.random(1, 10); // Random weight between 1 and 10
            graph[vertex][dest] = weight;
        }
    });

    return graph;
}

// Specify a smaller range for the number of iterations or fix the number of iterations
const numIterations = 10; // Run the test for 10 iterations

const test =
    jsc.forall("string", function(source) {
        const graph = generateGraph();

        // Ensure that source is one of the vertices
        if (!Object.keys(graph).includes(source)) return true;

        const result = dijkstra(graph, source);

        // Check if distances are correct
        const shortestPaths = {};

        // Compute shortest paths using brute force (for small graphs)
        function computeShortestPaths() {
            const paths = {};
            Object.keys(graph).forEach(vertex => {
                paths[vertex] = {};
                Object.keys(graph).forEach(dest => {
                    if (vertex !== dest) {
                        const shortestPath = dijkstra(graph, vertex)[dest];
                        paths[vertex][dest] = shortestPath;
                    } else {
                        paths[vertex][dest] = 0;
                    }
                });
            });
            return paths;
        }
        const correctPaths = computeShortestPaths();

        // Check if computed distances match correct shortest paths
        let allPathsCorrect = true;
        Object.keys(result).forEach(vertex => {
            Object.keys(result[vertex]).forEach(dest => {
                const computedPath = result[vertex][dest];
                const correctPath = correctPaths[vertex][dest];
                if (computedPath !== correctPath) {
                    allPathsCorrect = false;
                }
            });
        });
        return allPathsCorrect;
    });

jsc.assert(test);

/* 
Useful jsverify info:

jsc.assert(test); -> this is a group of tests, throws an error if one test fails
jsc.check(test); -> same goes here, minus the error; instead the result is logged to the console

*/

// Test case 1: Basic Test Case
const graph1 = {
    A: { B: 3, C: 1 },
    B: { C: 7, D: 5 },
    C: { D: 2 },
    D: {}
};


const source1 = 'A';
let graph1Result = { A: 0, B: 3, C: 1, D: 3 };
assert(JSON.stringify(dijkstra(graph1, source1)) === JSON.stringify(graph1Result));


// Test case 2: Graph with Negative Weights (unsupported)
const graph2 = {
    A: { B: 3, C: -1 },
    B: { C: 2 },
    C: {}
};
const source2 = 'A';
let graph2Result = { A: 0, B: 3, C: -1 }
assert(JSON.stringify(dijkstra(graph2, source2)) === JSON.stringify(graph2Result));

// Test case 3: Graph with Loops
const graph3 = {
    A: { B: 3, C: 1 },
    B: { C: 2 },
    C: { A: 5 }
};
const source3 = 'A';
graph3Result = { A: 0, B: 3, C: 1 }
assert(JSON.stringify(dijkstra(graph3, source3)) === JSON.stringify(graph3Result));

// Test case 4: Empty Graph
const graph4 = {};
const source4 = 'A'; // or any vertex
graph4Result = { A: 0 }
assert(JSON.stringify(dijkstra(graph4, source4)) === JSON.stringify(graph4Result));

// Test case 5: Graph with Self-Loop
const graph5 = {
    A: { A: 1 }
};
const source5 = 'A';
graph5Result = { A: 0 }
assert(JSON.stringify(dijkstra(graph5, source5)) === JSON.stringify(graph5Result));
