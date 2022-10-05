const tab = "\u00A0\u00A0\u00A0\u00A0"

export const map = {
    singlylinkedlist: [
        "insert(element) {",
        tab + "let node = new Node(element,id, this.ref, id);",
        tab + "if (this.head == null) this.head = node;",
        tab + "else {",
        tab + tab + "let current = this.head;",
        tab + tab + "while (current.next) current = current.next;",
        tab + tab + "current.next = node;",
        tab + "}",
        tab + "this.size++;",
        "}",
        "removeTail() {",
        tab + "let current = this.head;",
        tab + "if (current.next === null) current = null;",
        tab + "else { ",
        tab + tab + "while (current.next.next != null) current = current.next;",
        tab + tab + "current.next = null;",
        tab + "}",
        "}"
    ]
}