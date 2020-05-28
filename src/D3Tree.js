import React, { useState } from "react";
import Tree from "react-d3-tree";

const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};
const svgCircle = {
  shape: "circle",
  shapeProps: { r: 20, stroke: "red", fill: "red" },
};
const style = {
  links: { stroke: "blue", strokeWidth: 2 },
  nodes: {
    node: {
      circle: {},
      name: {},
      attributes: {},
    },
    leafNode: {
      circle: {},
      name: {},
      attributes: {},
    },
  },
};

function D3Tree() {
  const [heapData, setHeap] = useState([
    {
      name: "1",
      children: [],
    },
  ]);
  let dummyData = [1, 2, 3, 4, 5, 6, 7, 8];
  //function to build a tree
  const buildTree = async () => {
    const arr = dummyData.slice();
    let len = arr.length;
    let i = 0;
    let left = 1; // i * 2 + 1;
    let right = 2; // i * 2 + 2;
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

      if (left < len && arr[left] !== null && node !== null) {
        node.children[0] = { name: "" + arr[left], children: [] };
        arr[left] = node.children[0];
        setHeap({ ...arr[0] });
        //await sleep(2000);
      }
      if (right < len && arr[right] !== null && node !== null) {
        if (!node.children[0]) {
          node.children[0] = { name: "" + arr[right], children: [] };
          arr[right] = node.children[0];

          setHeap({ ...arr[0] });
          //await sleep(2000);
        } else {
          node.children[1] = { name: "" + arr[right], children: [] };
          arr[right] = node.children[1];
          setHeap({ ...arr[0] });
          //await sleep(2000);
        }
      }

      i++;
      left += 2;
      right += 2;
    }
    // setHeap(arr])
  };
  const singleStyle = {
    shape: "circle",
    shapeProps: {
      r: 20,
      fill: "blue",
    },
  };
  const visitedStyle = {
    shape: "circle",
    shapeProps: {
      r: 20,
      fill: "green",
    },
  };
  const dfs = async (root) => {
    let node = root;
    let prev = null
    if (!node || node === "undefined") return;
    let stack = [];
    while (stack.length || node) {
      while (node) {
        stack.push(node);
        if(node.children.length) node = node.children[0]
        else node = null
      }
      if(node !== stack[stack.length - 1]) node = stack.pop();
      else node = null
      node.nodeSvgShape = singleStyle;
      if(prev) prev.nodeSvgShape = visitedStyle
      prev = node
      console.log(node.name);
      setHeap({ ...heapData });
      await sleep(800);
      if (node.children[1]) node = node.children[1];
      else node = null
    }
    if(prev) prev.nodeSvgShape = visitedStyle
    setHeap({ ...heapData });
  };

  return (
    <section className="main-container">
      <div id="treeWrapper" style={{ height: "50em", width: "100%" }}>
        <Tree
          data={heapData}
          translate={{ x: 900, y: 250 }}
          orientation="vertical"
          textLayout={{
            textAnchor: "start",
            x: -5,
            y: 0,
            transform: undefined,
          }}
          nodeSvgShape={svgCircle}
          styles={style}
          pathFunc="straight"
          transitionDuration={0}
        />
      </div>
      {/* <button style={{height: "fit-content"}} onClick={() => insert()}>Click</button> */}
      <button
        key="bKey"
        style={{ height: "fit-content" }}
        onClick={() => buildTree()}
      >
        Click
      </button>
      <button
        key="aKey"
        style={{ height: "fit-content" }}
        onClick={() => dfs(heapData)}
      >
        Click
      </button>
    </section>
  );
}

export default D3Tree;
