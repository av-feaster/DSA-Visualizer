class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
        this.delay = 1000;
        this.nodeSize = 50;
        this.levelHeight = 100;
    }

    async insert(value) {
        const newNode = new Node(value);

        if (!this.root) {
            console.log(`Inserting ${value} as root node.`);
            this.root = newNode;
            await this.visualize();
            return;
        }

        let current = this.root;
        while (true) {
            await this.highlightNode(current);
            console.log(`Current node: ${current.value}`);

            if (value < current.value) {
                console.log(`Going left: ${value} < ${current.value}`);
                if (!current.left) {
                    console.log(`Inserting ${value} to the left of ${current.value}`);
                    current.left = newNode;
                    await this.addNode(current, newNode, 'left');
                    break;
                }
                current = current.left;
            } else {
                console.log(`Going right: ${value} >= ${current.value}`);
                if (!current.right) {
                    console.log(`Inserting ${value} to the right of ${current.value}`);
                    current.right = newNode;
                    await this.addNode(current, newNode, 'right');
                    break;
                }
                current = current.right;
            }
        }
    }

    async addNode(parent, child, direction) {
        const container = document.getElementById('tree-container');
        const parentPos = this.getNodePosition(parent);
        const childPos = this.getNodePosition(child);

        console.log("Parent Position:", parentPos);
        console.log("Child Position:", childPos);

        // Create node element
        const nodeElem = document.createElement('div');
        nodeElem.className = 'node';
        nodeElem.textContent = child.value;
        nodeElem.style.left = `${childPos.x}px`;
        nodeElem.style.top = `${childPos.y}px`;
        container.appendChild(nodeElem);

        // Create edge
        const edge = this.createEdge(parentPos, childPos, container);
        if (edge) {
            container.appendChild(edge);
        } else {
            console.error("Failed to create edge.");
        }

        // Animate edge growing
        requestAnimationFrame(() => {
            edge.style.transition = `width ${this.delay / 1000}s ease`;
            edge.style.width = `${Math.sqrt(Math.pow(childPos.x - parentPos.x, 2) + Math.pow(childPos.y - parentPos.y, 2))}px`;
        });
    }

    getNodePosition(node) {
        const container = document.getElementById('tree-container');
        const positions = new Map();
        const queue = [{ node: this.root, x: container.clientWidth / 2, y: 50, level: 0 }];

        while (queue.length > 0) {
            const { node: currentNode, x, y } = queue.shift();
            positions.set(currentNode, { x, y });

            const offset = container.clientWidth / Math.pow(2, positions.size + 2);
            if (currentNode.left) {
                queue.push({ node: currentNode.left, x: x - offset, y: y + this.levelHeight });
            }
            if (currentNode.right) {
                queue.push({ node: currentNode.right, x: x + offset, y: y + this.levelHeight });
            }
        }

        return positions.get(node);
    }

    async visualize() {
        const container = document.getElementById('tree-container');
        container.innerHTML = '';

        if (!this.root) return;

        const queue = [{ node: this.root, x: container.clientWidth / 2, y: 50, level: 0 }];
        const positions = new Map();

        while (queue.length > 0) {
            const { node, x, y, level } = queue.shift();

            // Create node element
            const nodeElem = document.createElement('div');
            nodeElem.className = 'node';
            nodeElem.textContent = node.value;
            nodeElem.style.left = `${x}px`;
            nodeElem.style.top = `${y}px`;
            container.appendChild(nodeElem);
            positions.set(node, { x, y });

            // Calculate offset based on level
            const offset = container.clientWidth / Math.pow(2, level + 2); // Adjusted for better spacing

            if (node.left) {
                queue.push({
                    node: node.left,
                    x: x - offset,
                    y: y + this.levelHeight,
                    level: level + 1
                });
            }

            if (node.right) {
                queue.push({
                    node: node.right,
                    x: x + offset,
                    y: y + this.levelHeight,
                    level: level + 1
                });
            }
        }

        // Draw edges after all nodes are positioned
        this.drawEdges(this.root, positions, container);
    }

    drawEdges(node, positions, container) {
        if (!node) return;

        if (node.left) {
            const parentPos = positions.get(node);
            const childPos = positions.get(node.left);
            this.createEdge(parentPos, childPos, container);
            this.drawEdges(node.left, positions, container);
        }

        if (node.right) {
            const parentPos = positions.get(node);
            const childPos = positions.get(node.right);
            this.createEdge(parentPos, childPos, container);
            this.drawEdges(node.right, positions, container);
        }
    }

    createEdge(from, to, container) {
        const edge = document.createElement('div');
        edge.className = 'edge';

        const length = Math.sqrt(
            Math.pow(to.x - from.x, 2) +
            Math.pow(to.y - from.y, 2)
        );

        const angle = Math.atan2(to.y - from.y, to.x - from.x);

        edge.style.width = '0px'; // Start with zero width
        edge.style.transform = `rotate(${angle}rad)`;
        edge.style.left = `${from.x + this.nodeSize / 2}px`;
        edge.style.top = `${from.y + this.nodeSize / 2}px`;

        return edge;
    }

    async highlightNode(node) {
        const nodes = document.querySelectorAll('.node');
        const nodeArray = Array.from(nodes);
        const nodeElem = nodeArray.find(elem => parseInt(elem.textContent) === node.value);

        if (nodeElem) {
            nodeElem.classList.add('highlight');
            await this.wait();
            nodeElem.classList.remove('highlight');
        }
    }

    updateInfo(message) {
        document.getElementById('operation-info').textContent = message;
    }

    wait() {
        return new Promise(resolve => setTimeout(resolve, this.delay));
    }

    // Add traversal methods here (similar to previous implementation)
}

const tree = new BinaryTree();

function insertNode() {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        tree.insert(value);
        document.getElementById('nodeValue').value = '';
    }
}

// Initialize with sample nodes
window.onload = async () => {
    await tree.insert(50);
    await tree.insert(30);
    await tree.insert(70);
    await tree.insert(20);
    await tree.insert(40);
    await tree.insert(60);
    await tree.insert(80);
}; 