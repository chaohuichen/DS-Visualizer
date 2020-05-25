import React, { useState } from 'react';
import Tree from 'react-tree-graph';
import './App.css';
import 'react-tree-graph/dist/style.css';
import Navbar from 'react-bootstrap/Navbar';
// let data = {
//   name: '0',
//   children: [],
// };
function Treegraph() {
  const [data, setData] = useState({
    name: '0',
    children: [
      {
        name: '1',
        children: [{ name: '5' }],
      },
      {
        name: '2',
      },
    ],
  });
  //example data
  let preorder = [8, 5, 1, 7, 10, 12];
  //function to build a tree
  const insert = () => {
    let idx = 0;
    let n = preorder.length;
    function helper(lower, upper) {
      if (idx === n) return '';
      let val = preorder[idx];
      if (val < lower || val > upper) return '';
      let newNode = { name: '' + val, children: [] };
      idx++;
      newNode.children[1] = helper(lower, val);
      newNode.children[0] = helper(val, upper);
      return newNode;
    }
    let a = helper(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

    setData(a);
  };
  return (
    <>
      <Tree
        data={data}
        height={500}
        width={500}
        animated
        nodeRadius={25}
        margins={{ top: 50, bottom: 10, left: 20, right: 200 }}
        svgProps={{
          transform: 'rotate(90)',
          className: 'custom',
        }}
        textProps={{
          x: '-28.5px',
        }}
        pathFunc={(x1, y1, x2, y2) => `M${y1},${x1} ${y2},${x2}`}
      />
      <button onClick={() => insert()}>Click</button>
    </>
  );
}

export default Treegraph;
