// Credit goes to ChatGPT
//    -It created the test cases used in this program
//    -It also explained why the provided algorithm worked
//        -I actually knew dijkstra's prior to this class but had issues
//         understanding your implementation of it
//        -So ChatGPT walked me through your algorithm, line by line,
//         to see how the recursive calls worked and how an answer was
//         sent back


/*
* Implements djikstra's algorithm based off the provided formula (listed below)
* @param {Object.<string, Object.<string, number>>} graph -> adjacency list representation of a graph
* @param {integer} source -> The source node that we start on
* @returns {Array} dist -> A list of the shortest paths
*
* The algorithm:
* 1. initialize the dist to each vertex to infinity, source to 0
* 2. while there are unmarked vertices left in the graph
* 3.      select the unmarked vertex v with the lowest dist
* 4.      mark v with distance dist
* 5.      for each edge(v,w)
* 6.          dist(w) = min(dist(w), dist(v) + weight(v,w))
*/
function dijkstra(graph, source) {
    // Step 0 -> error cases
    //if (Object.keys(graph).length === 0 || !(source in graph) || !graph)
        //return {}; // Source vertex is not in graph

    // Step 1
    const dist = {};
    for (const vertex in graph)
        dist[vertex] = Infinity;
    dist[source] = 0;

    // Step 2
    const unmarked = new Set(Object.keys(graph));
    while (unmarked.size > 0) {
        // Step 3
        let min = Infinity;
        let v = null;
        unmarked.forEach(vertex => {
            if (dist[vertex] < min) {
                min = dist[vertex];
                v = vertex;
            }
        });

        // Step 4
        unmarked.delete(v);

        // Steps 5 and 6
        for (const neighbor in graph[v]) {
            const weight = graph[v][neighbor];
            const newDist = dist[v] + weight;
            dist[neighbor] = Math.min(dist[neighbor], newDist);
        }
    }
    return dist;
}
/*
// Test case 1: Basic Test Case
const graph1 = {
    A: { B: 3, C: 1 },
    B: { C: 7, D: 5 },
    C: { D: 2 },
    D: {}
};
const source1 = 'A';
console.log("Test case 1:", dijkstra(graph1, source1));

// Test case 2: Graph with Negative Weights (unsupported)
const graph2 = {
    A: { B: 3, C: -1 },
    B: { C: 2 },
    C: {}
};
const source2 = 'A';
console.log("Test case 2:", dijkstra(graph2, source2));

// Test case 3: Graph with Loops
const graph3 = {
    A: { B: 3, C: 1 },
    B: { C: 2 },
    C: { A: 5 }
};
const source3 = 'A';
console.log("Test case 4:", dijkstra(graph3, source3));

// Test case 4: Empty Graph
const graph4 = {};
const source4 = 'A'; // or any vertex
console.log("Test case 4:", dijkstra(graph4, source4));

// Test case 5: Graph with Self-Loop
const graph5 = {
    A: { A: 1 }
};
const source5 = 'A';
console.log("Test case 5:", dijkstra(graph5, source5));
*/