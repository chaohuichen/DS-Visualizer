import React, { useState } from "react";
import Tree from "react-tree-graph";
import "./App.css";
import "react-tree-graph/dist/style.css";
import Navbar from "react-bootstrap/Navbar";
// let data = {
//   name: '0',
//   children: [],
// };
function Treegraph() {
  const [data, setData] = useState({
    name: "0",
    children: [
      {
        name: "1",
        children: [{ name: "5" }],
      },
      {
        name: "2",
      },
    ],
  });
  //example data
  let preorder = [8, 5, 1, 7, 10, 12];
  let arr = [8, 5, 1, 7, 10, 12];
  const [heapData, setHeap] = useState({
    name: "0",
    children: [
      {
        name: "1",
        children: [{name: '4'}, { name: "5" }],
      },
      {
        name: "2",
      },
    ],
  });
  //function to build a tree
  const buildTree = () => {
    let len = arr.length;
    let i = 0;
    let node;
    while (i < len) {
      debugger;
      if (typeof arr[i] === "object" && arr[i] !== null) {
        node = arr[i];
      } else {
        if (arr[i] === null) {
          i++;
          continue;
        }
        node = { name: "" + arr[i], children: [] };
      }
      let left = i * 2 + 1;
      let right = i * 2 + 2;
      if (left < len && arr[left] !== null && node !== null) {
        node.children[1] = { name: "" + arr[left], children: [] };
        arr[left] = node.children[1];
      }
      if (right < len && arr[right] !== null && node !== null) {
        node.children[0] = { name: "" + arr[right], children: [] };
        arr[right] = node.children[0];
      }
      if(!node.children[0] && node.children[1]) node.children[0] = node.children.pop()
      arr[i] = node;
      i++;
    }
    setHeap(arr[0]);
    console.log("HEAP ", heapData, arr);
  };

  const insert = () => {
    let idx = 0;
    let n = preorder.length;
    function helper(lower, upper) {
      if (idx === n) return "";
      let val = preorder[idx];
      if (val < lower || val > upper) return "";
      let newNode = { name: "" + val, children: [] };
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
        data={heapData}
        height={500}
        width={500}
        animated
        nodeRadius={25}
        margins={{ top: 50, bottom: 10, left: 20, right: 200 }}
        svgProps={{
          transform: "rotate(90)",
          className: "custom",
        }}
        textProps={{
          x: "-28.5px",
        }}
        pathFunc={(x1, y1, x2, y2) => `M${y1},${x1} ${y2},${x2}`}
      />
      <button onClick={() => insert()}>Click</button>
      <button onClick={() => buildTree()}>Test Heap</button>
    </>
  );
}

export default Treegraph;
