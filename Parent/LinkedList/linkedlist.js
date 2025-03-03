class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.delay = 1000;
    }

    async insertAtEnd(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            await this.visualize();
            return;
        }

        let current = this.head;
        while (current.next) {
            await this.highlightNode(current);
            current = current.next;
        }
        await this.highlightNode(current);
        current.next = newNode;
        await this.visualize();
    }

    async insertAtStart(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        await this.visualize();
    }

    async insertAtPosition(value, position) {
        if (position < 0) {
            this.updateInfo("Invalid position");
            return;
        }

        if (position === 0) {
            await this.insertAtStart(value);
            return;
        }

        const newNode = new Node(value);
        let current = this.head;
        let count = 0;

        while (current && count < position - 1) {
            await this.highlightNode(current);
            current = current.next;
            count++;
        }

        if (!current) {
            this.updateInfo("Position out of bounds");
            return;
        }

        await this.highlightNode(current);
        newNode.next = current.next;
        current.next = newNode;
        await this.visualize();
    }

    async deleteFromStart() {
        if (!this.head) {
            this.updateInfo("List is empty");
            return;
        }

        await this.highlightNode(this.head);
        this.head = this.head.next;
        await this.visualize();
    }

    async deleteFromEnd() {
        if (!this.head) {
            this.updateInfo("List is empty");
            return;
        }

        if (!this.head.next) {
            await this.highlightNode(this.head);
            this.head = null;
            await this.visualize();
            return;
        }

        let current = this.head;
        while (current.next.next) {
            await this.highlightNode(current);
            current = current.next;
        }
        await this.highlightNode(current.next);
        current.next = null;
        await this.visualize();
    }

    async deleteAtPosition(position) {
        if (!this.head || position < 0) {
            this.updateInfo("Invalid operation");
            return;
        }

        if (position === 0) {
            await this.deleteFromStart();
            return;
        }

        let current = this.head;
        let count = 0;

        while (current && count < position - 1) {
            await this.highlightNode(current);
            current = current.next;
            count++;
        }

        if (!current || !current.next) {
            this.updateInfo("Position out of bounds");
            return;
        }

        await this.highlightNode(current.next);
        current.next = current.next.next;
        await this.visualize();
    }

    async visualize() {
        const container = document.getElementById('list-container');
        container.innerHTML = '';

        let current = this.head;
        while (current) {
            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'node';

            const valueDiv = document.createElement('div');
            valueDiv.className = 'node-value';
            valueDiv.textContent = current.value;
            nodeDiv.appendChild(valueDiv);

            if (current.next) {
                const arrowDiv = document.createElement('div');
                arrowDiv.className = 'arrow';
                nodeDiv.appendChild(arrowDiv);
            }

            container.appendChild(nodeDiv);
            current = current.next;
        }
        this.getListStats();
    }

    async highlightNode(node) {
        await this.visualize();
        const nodes = document.querySelectorAll('.node');
        let current = this.head;
        let index = 0;

        while (current !== node && current) {
            current = current.next;
            index++;
        }

        if (nodes[index]) {
            nodes[index].classList.add('highlight');
            await this.wait();
            nodes[index].classList.remove('highlight');
        }
    }

    updateInfo(message) {
        document.getElementById('operation-info').textContent = message;
    }

    wait() {
        return new Promise(resolve => setTimeout(resolve, this.delay));
    }

    async searchNode(value) {
        if (!this.head) {
            this.updateInfo("List is empty");
            return;
        }

        let current = this.head;
        let position = 0;
        let found = false;

        while (current) {
            await this.highlightNode(current);
            if (current.value === value) {
                found = true;
                this.updateInfo(`Value ${value} found at position ${position}`);
                const nodes = document.querySelectorAll('.node');
                nodes[position].classList.add('found');
                await this.wait();
                nodes[position].classList.remove('found');
                break;
            }
            current = current.next;
            position++;
        }

        if (!found) {
            this.updateInfo(`Value ${value} not found in the list`);
        }
    }

    async reverseList() {
        if (!this.head || !this.head.next) {
            return;
        }

        let prev = null;
        let current = this.head;
        let next = null;

        while (current) {
            await this.highlightNode(current);
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
            await this.visualize();
        }
        this.head = prev;
    }

    async clearList() {
        this.head = null;
        await this.visualize();
        this.updateInfo("List cleared");
    }

    async generateRandomList(size = 5) {
        await this.clearList();
        for (let i = 0; i < size; i++) {
            const value = Math.floor(Math.random() * 100);
            await this.insertAtEnd(value);
        }
        this.updateInfo("Random list generated");
    }

    getListStats() {
        let length = 0;
        let sum = 0;
        let min = Infinity;
        let max = -Infinity;

        let current = this.head;
        while (current) {
            length++;
            sum += current.value;
            min = Math.min(min, current.value);
            max = Math.max(max, current.value);
            current = current.next;
        }

        const stats = {
            length,
            sum,
            min: min === Infinity ? 0 : min,
            max: max === -Infinity ? 0 : max,
            average: length ? (sum / length).toFixed(2) : 0
        };

        document.getElementById('list-stats').innerHTML = `
            <p>Length: ${stats.length}</p>
            <p>Sum: ${stats.sum}</p>
            <p>Min: ${stats.min}</p>
            <p>Max: ${stats.max}</p>
            <p>Average: ${stats.average}</p>
        `;
    }
}

const list = new LinkedList();

function insertAtEnd() {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        list.insertAtEnd(value);
        document.getElementById('nodeValue').value = '';
    }
}

function insertAtStart() {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        list.insertAtStart(value);
        document.getElementById('nodeValue').value = '';
    }
}

function insertAtPosition() {
    const value = parseInt(document.getElementById('nodeValue').value);
    const position = parseInt(document.getElementById('position').value);
    if (!isNaN(value) && !isNaN(position)) {
        list.insertAtPosition(value, position);
        document.getElementById('nodeValue').value = '';
        document.getElementById('position').value = '';
    }
}

function deleteFromStart() {
    list.deleteFromStart();
}

function deleteFromEnd() {
    list.deleteFromEnd();
}

function deleteAtPosition() {
    const position = parseInt(document.getElementById('position').value);
    if (!isNaN(position)) {
        list.deleteAtPosition(position);
        document.getElementById('position').value = '';
    }
}

function searchNode() {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        list.searchNode(value);
        document.getElementById('nodeValue').value = '';
    }
}

function reverseList() {
    list.reverseList();
}

function clearList() {
    list.clearList();
}

function generateRandomList() {
    const size = Math.floor(Math.random() * 5) + 5; // 5-10 nodes
    list.generateRandomList(size);
}

// Initialize with sample nodes
window.onload = async () => {
    await list.insertAtEnd(10);
    await list.insertAtEnd(20);
    await list.insertAtEnd(30);
    await list.insertAtEnd(40);
}; 