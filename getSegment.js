const tree = [
  {
    title: 'A',
    id: 1,
    children: [
      { id: 2, title: 'B', children: [] },
      {
        id: 3,
        title: 'C',
        children: [
          {
            id: 5,
            title: 'E',
            children: [
              {
                id: 8,
                title: 'H',
                children: [{ id: 16, title: 'P', children: [] }],
              },
              { id: 9, title: 'I', children: [] },
            ],
          },
          {
            id: 6,
            title: 'F',
            children: [
              { id: 10, title: 'J', children: [] },
              { id: 11, title: 'K', children: [] },
              { id: 12, title: 'L', children: [] },
            ],
          },
        ],
      },
      {
        id: 4,
        title: 'D',
        children: [
          {
            id: 7,
            title: 'G',
            children: [
              { id: 13, title: 'M', children: [] },
              { id: 14, title: 'N', children: [] },
              { id: 15, title: 'O', children: [] },
            ],
          },
        ],
      },
    ],
  },
];

function getElement(node, id) {
  const index = node.children.findIndex((e) => e.id === id);
  if (node.id === id) {
    this.element = node;
    return;
  } else if (index > -1) {
    this.parent = { id: node.id, title: node.title };
    getElement(node.children[index], id);
  } else if (!this.element && node.children.length)
    node.children.forEach((n) => {
      getElement(n, id);
    });
}

function getSegment(tree, id) {
  this.parent = null;
  this.element = null;
  tree.map((branch) => getElement(branch, id));
  return { parent: this.parent, node: this.element };
}

getSegment(tree, 7);
