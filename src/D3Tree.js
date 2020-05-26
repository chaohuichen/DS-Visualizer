import React, { useState } from "react";
import Tree from "react-d3-tree";
const myTreeData = [
  {
    name: "1",

    children: [
      {
        name: "2",
      },
      {
        name: "3",
      },
    ],
  },
];
const svgSquare = { shape: "circle", shapeProps: { r: 20 } };
function D3Tree() {
  const [data, setData] = useState([
    {
      name: "1",

      children: [
        {
          name: "2",
        },
        {
          name: "3",
        },
      ],
    },
  ]);
  const [heapData, setHeap] = useState([
    {
      name: "1",
      children: [
        {
          name: "2",
        },
        {
          name: "3",
        },
      ],
    },
  ]);
  let dummyData = [8, 5, 1, 7, 10, 12];
  //function to build a tree
  const buildTree = () => {
    const arr = dummyData.slice();
    let len = arr.length;
    let i = 0;
    let node;
    while (i < len) {
      if (typeof arr[i] === "object" && arr[i] !== null) {
        node = arr[i];
      } else {
        if (arr[i] === null) {
          i++;
          continue;
        }
        node = { name: "" + arr[i], children: [] };
        arr[i] = node;
      }
      console.log(i, arr, node);
      let left = i * 2 + 1;
      let right = i * 2 + 2;
      if (left < len && arr[left] !== null && node !== null) {
        node.children[0] = { name: "" + arr[left], children: [] };
        arr[left] = node.children[0];
      }
      if (right < len && arr[right] !== null && node !== null) {
        if (!node.children[0]) {
          node.children[0] = { name: "" + arr[right], children: [] };
          arr[right] = node.children[0];
        } else {
          node.children[1] = { name: "" + arr[right], children: [] };
          arr[right] = node.children[1];
        }
      }
      i++;
    }
    setHeap(arr[0]);
    console.log("HEAP ", heapData, arr);
  };

  let preorder = [8, 5, 1, 7];
  const insert = () => {
    let idx = 0;
    let n = preorder.length;
    function helper(lower, upper) {
      if (idx === n) return;
      let val = preorder[idx];
      if (val < lower || val > upper) return;
      let newNode = { name: "" + val, children: [] };
      idx++;
      let left = helper(lower, val);
      if (left) newNode.children[0] = left;
      let right = helper(val, upper);
      if (right) newNode.children[1] = right;
      // newNode.children[1] = helper(val, upper);
      return newNode;
    }
    let a = helper(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    console.log(a);
    setData([a]);
  };
  return (
    <section className="main-container">
      <div id="treeWrapper" style={{ height: "50em", width: "100%" }}>
        <Tree
          data={heapData}
          translate={{ x: 100, y: 50 }}
          orientation="vertical"
          circleRadius={20}
          textLayout={{
            textAnchor: "start",
            x: -5,
            y: 0,
            transform: undefined,
          }}
        />
      </div>
      {/* <button style={{height: "fit-content"}} onClick={() => insert()}>Click</button> */}
      <button style={{ height: "fit-content" }} onClick={() => buildTree()}>
        Click
      </button>
    </section>
  );
}

export default D3Tree;
