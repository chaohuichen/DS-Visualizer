import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { sleep, genernrateRandomArray } from './ult.js';

//styling
const svgCircle = {
  shape: 'circle',
  shapeProps: { r: 20, stroke: 'red', fill: 'red' },
};
const style = {
  links: { stroke: 'blue', strokeWidth: 2 },
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
const singleStyle = {
  shape: 'circle',
  shapeProps: {
    r: 20,
    fill: 'blue',
  },
};
const visitedStyle = {
  shape: 'circle',
  shapeProps: {
    r: 20,
    fill: 'green',
  },
};

const width = window.screen.width;
const height = window.screen.height;

//Tree
function D3Tree() {
  const [heapData, setHeap] = useState([
    {
      name: '1',
      children: [],
    },
  ]);
  const [inputData, setInput] = useState([]);
  const [toggle, setToggle] = useState(true);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const warning = () => {
    store.addNotification({
      title: 'Wrong Input',
      message: 'invalid input data',
      type: 'danger',
      container: 'top-left',
      insert: 'top',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 2000,
      },
      width: 400,
    });
  };

  const validateDate = () => {
    let dummyData = [];
    console.log(inputData[0], inputData[inputData.length - 1]);
    if (inputData[0] !== '[' || inputData[inputData.length - 1] !== ']') {
      warning();
      return false;
    }

    let copy = inputData.slice(1, inputData.length - 1).split(',');

    for (let i = 0; i < copy.length; ++i) {
      if (copy[i] === 'null') {
        dummyData.push(JSON.parse(copy[i]));
      } else {
        if (copy[i] === '') {
          warning();
          return;
        }
        let curr = +copy[i];

        if ((!curr && curr !== 0) || curr === '') {
          warning();
          return false;
        } else dummyData.push(curr);
      }
    }
    return dummyData;
  };
  const genernateData = () => {
    let arr;
    console.log(toggle, arr);
    if (toggle) {
      //if toggle true, use the data from the userinput
      arr = validateDate();
    } else {
      //if not, then use the random array
      arr = genernrateRandomArray();
      console.log('i am here', genernrateRandomArray());
    }
    // buildTree(arr);
  };

  //function to build a tree
  const buildTree = async (array) => {
    const arr = array.slice();
    if (!arr) return;
    let len = arr.length;
    let i = 0;
    let left = 1; // i * 2 + 1;
    let right = 2; // i * 2 + 2;
    let node;
    while (i < len) {
      if (typeof arr[i] === 'object' && arr[i] !== null) {
        node = arr[i];
      } else {
        if (arr[i] === null) {
          i++;
          continue;
        }
        node = { name: '' + arr[i], children: [] };
        arr[i] = node;
      }

      if (left < len && arr[left] !== null && node !== null) {
        node.children[0] = { name: '' + arr[left], children: [] };
        arr[left] = node.children[0];
        setHeap({ ...arr[0] });
        await sleep(1000);
      }
      if (right < len && arr[right] !== null && node !== null) {
        if (!node.children[0]) {
          node.children[0] = { name: '' + arr[right], children: [] };
          arr[right] = node.children[0];

          setHeap({ ...arr[0] });
          await sleep(1000);
        } else {
          node.children[1] = { name: '' + arr[right], children: [] };
          arr[right] = node.children[1];
          setHeap({ ...arr[0] });
          await sleep(1000);
        }
      }

      i++;
      left += 2;
      right += 2;
    }
  };

  const dfs = async (root) => {
    let node = root;
    let prev = null;
    if (!node || node === 'undefined') return;
    let stack = [];
    while (stack.length || node) {
      while (node) {
        stack.push(node);
        if (node.children.length) node = node.children[0];
        else node = null;
      }
      if (node !== stack[stack.length - 1]) node = stack.pop();
      else node = null;
      node.nodeSvgShape = singleStyle;
      if (prev) prev.nodeSvgShape = visitedStyle;
      prev = node;
      console.log(node.name);
      setHeap({ ...heapData });
      await sleep(800);
      if (node.children[1]) node = node.children[1];
      else node = null;
    }
    if (prev) prev.nodeSvgShape = visitedStyle;
    setHeap({ ...heapData });
  };

  return (
    <div id='treeWrapper' style={{ width: '100%', height: '100vh' }}>
      <div className='myheader'>
        <h4>DS-Visualizer</h4>
        <label>
          Input: <input type='text' name='input' onChange={handleChange} />
        </label>
        <button key='bKey' onClick={() => buildTree(validateDate())}>
          GenerateTree
        </button>
        <button key='aKey' onClick={() => dfs(heapData)}>
          InorderDFS
        </button>
        <button
          key='cKey'
          onClick={() => {
            buildTree(genernrateRandomArray());
          }}
        >
          RandomTree
        </button>
      </div>
      <ReactNotification />
      <Tree
        data={heapData}
        translate={{ x: width / 2, y: height / 3 }}
        orientation='vertical'
        textLayout={{
          textAnchor: 'start',
          x: -5,
          y: 0,
          transform: undefined,
        }}
        nodeSvgShape={svgCircle}
        styles={style}
        pathFunc='straight'
        transitionDuration={0}
      />
    </div>
  );
}

export default D3Tree;
