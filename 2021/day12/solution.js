const fs = require("fs");

if (process.argv[2] == undefined) {
    console.log("You should pass a filename");
    process.exit(1);
}

const input = fs.readFileSync(process.argv[2], 'utf8')
    .toString()
    .trim()
    .split('\n');

class Graph {
    allPathsList1 = []
    allPathsList2 = []

    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    addVertex(v) {
        this.AdjList.set(v, []);
    }

    addEdge(v, w) {
        this.AdjList.get(v).push(w);
        this.AdjList.get(w).push(v);
    }

    printGraph() {
        var get_keys = this.AdjList.keys();
        for (var i of get_keys) {
            var get_values = this.AdjList.get(i);
            var conc = "";
            for (var j of get_values)
                conc += j + " ";
            console.log(i + " -> " + conc);
        }
    }

    dfs() {
        let isVisited = {}
        this.AdjList.forEach((adj, node) => isVisited[node] = false)

        let pathList = ['start'];

        this.dfsUtil1('start', isVisited, pathList);
        this.dfsUtil2('start', isVisited, pathList);

        this.printAllPaths();
    }

    dfsUtil1(u, isVisited, localPathList) {
        if (u == 'end') {
            this.allPathsList1.push(localPathList.slice());
            return;
        }
        if (u == u.toLowerCase())
            isVisited[u] = true;

        this.AdjList.get(u).forEach(adj => {
            if (!isVisited[adj]) {
                localPathList.push(adj);
                this.dfsUtil1(adj, isVisited, localPathList);
                localPathList.pop();
            }
        })
        isVisited[u] = false;
    }

    dfsUtil2(u, isVisited, localPathList, visitedTwice = undefined) {
        if (u == 'end') {
            this.allPathsList2.push(localPathList.slice());
            return;
        }
        if (u == u.toLowerCase())
            isVisited[u] = true;

        this.AdjList.get(u).filter(adj => adj != 'start').forEach(adj => {
            if (!isVisited[adj]) {
                localPathList.push(adj);
                this.dfsUtil2(adj, isVisited, localPathList, visitedTwice);
                localPathList.pop();
            } else if (visitedTwice == undefined) {
                localPathList.push(adj);
                this.dfsUtil2(adj, isVisited, localPathList, adj);
                localPathList.pop();
            }
        })
        if (visitedTwice != u)
            isVisited[u] = false;
    }

    printAllPaths() {
        console.log(`There are ${this.allPathsList1.length} paths that visit small caves at most once`)
        console.log(`There are ${this.allPathsList2.length} paths that can visit one cave twice, and the rest at most once`)
    }
}

var vertices = []
input.forEach(line => line.trim().split('-').forEach(node => {
    if (vertices.filter(vert => vert == node).length == 0)
        vertices.push(node);
}))

var graph = new Graph(vertices.length);
vertices.forEach(node => graph.addVertex(node))

input.forEach(line => {
    graph.addEdge(...line.trim().split('-'));
})

graph.dfs();