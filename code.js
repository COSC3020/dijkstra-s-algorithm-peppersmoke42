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