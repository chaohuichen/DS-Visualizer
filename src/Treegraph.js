import React from 'react';
import Tree from 'react-tree-graph';
import './App.css';
import 'react-tree-graph/dist/style.css';

let data = {
  name: 'Parent',
  children: [
    {
      name: '1',
      children: [
        {
          name: '2',
          children: [
            {
              name: '3',
            },
            {
              name: '4',
            },
          ],
        },
        {
          name: '5',
        },
      ],
    },
    {
      name: 'Child Two',
      children: [
        {name: 6},
        {name: 7}
      ]
    },
  ],
};
function Treegraph() {
  return (
    <>
      <Tree
        data={data}
        height={500}
        width={500}
        animated
        nodeRadius={25}
        svgProps={{
          transform: 'rotate(90)',
          className: 'custom',
        }}
        textProps={{
          x: "-28.5px"
        }}
        pathFunc={(x1, y1, x2, y2) =>
          `M${y1},${x1} ${y2},${x2}`}
      />
    </>
  );
}

export default Treegraph;
