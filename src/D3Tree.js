import React, { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { sleep, genernrateRandomArray } from './ult.js';
import { svgCircle, style, singleStyle, visitedStyle } from './treeStyle';
import {
  Button,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  IconButton,
} from '@material-ui/core';
import styles from './buttonStyle.module.css';
import ArrayBox from './ArrayBox';
import { inOrderDFS, postOrderDFS, preOrderDFS } from './DFS';
import breathFirstSearch from './BFS';

let defaultTree = {
  name: '1',
  children: [],
};

const traversalAnimations = {
  1: preOrderDFS,
  2: inOrderDFS,
  3: postOrderDFS,
  4: breathFirstSearch,
};
//Tree
function D3Tree() {
  //set the tree val
  const [heapData, setHeap] = useState([]);
  //set the travseral data for box
  const [travseralData, setTravseralData] = useState([]);
  //set the travseral method
  const [traversalMethod, setTraversal] = useState(1);
  //set the user input data
  const [inputData, setInput] = useState([]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const treeContainer = useRef();
  //set the tree in center by getting the dimensions
  const [dimensions, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension(treeContainer.current.getBoundingClientRect());
  }, []);

  const handleSelect = (e) => {
    setTraversal(e.target.value);
  };

  //warning function for display the card
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

  //validate the input function
  const validateData = () => {
    let dummyData = [];
    if (inputData[0] !== '[' || inputData[inputData.length - 1] !== ']') {
      warning();
      return false;
    }

    let copy = inputData.slice(1, inputData.length - 1).split(',');

    for (let i = 0; i < copy.length; ++i) {
      if (copy[i].trim() === 'null') {
        dummyData.push(null);
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

  //function to build a tree
  const buildTree = async (array) => {
    if (!array) return;
    const arr = array.slice();

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
        await sleep(800);
      }
      if (right < len && arr[right] !== null && node !== null) {
        if (!node.children[0]) {
          node.children[0] = { name: '' + arr[right], children: [] };
          arr[right] = node.children[0];

          setHeap({ ...arr[0] });
          await sleep(800);
        } else {
          node.children[1] = { name: '' + arr[right], children: [] };
          arr[right] = node.children[1];

          setHeap({ ...arr[0] });
          await sleep(800);
        }
      }

      i++;
      left += 2;
      right += 2;
    }
    setHeap({ ...arr[0] });
  };

  return (
    <div id='treeWrapper' className='treeWapper'>
      <div className='myheader'>
        <h3>DS-Visualizer</h3>
        <label>
          <TextField
            label=' Input your array:'
            variant='filled'
            type='text'
            name='input'
            className='ipttext'
            onChange={handleChange}
          />
        </label>
        <Button
          variant='contained'
          color='primary'
          className={styles.button}
          onClick={() => buildTree(validateData())}
        >
          Generate Tree
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={styles.button}
          onClick={() => {
            buildTree(genernrateRandomArray());
          }}
        >
          Random Tree
        </Button>
        <FormControl>
          <InputLabel id='traversal-label'>Tree Travseral</InputLabel>
          <Select
            className='menuitem'
            onChange={handleSelect}
            value={traversalMethod}
          >
            <MenuItem value={1}>Pre-Order-DFS</MenuItem>
            <MenuItem value={2}>In-Order-DFS</MenuItem>
            <MenuItem value={3}>Post-Order-DFS</MenuItem>
            <MenuItem value={4}>Breath-First-Search</MenuItem>
          </Select>
        </FormControl>
        <div className={styles.roundBtnDiv}>
          <button
            className={styles.roundBtn}
            onClick={() =>
              traversalAnimations[traversalMethod](
                heapData,
                setHeap,
                setTravseralData,
                warning
              )
            }
          >
            Go!
          </button>
        </div>
        <div className={styles.roundBtnDiv}>
          <button
            className={styles.roundBtn}
            onClick={() => {
              setHeap([]);
              setTravseralData([]);
            }}
          >
            Clear!
          </button>
        </div>
      </div>

      <ReactNotification />

      <ArrayBox data={travseralData} />
      <section style={{ width: '100%', height: '100vh' }} ref={treeContainer}>
        {heapData.length !== 0 && (
          <Tree
            data={heapData}
            translate={{
              x: dimensions ? +(dimensions.width / 2) : 0,
              y: dimensions ? +(dimensions.height / 4) : 0,
            }}
            orientation='vertical'
            textLayout={{
              textAnchor: 'middle',
              x: 0,
              y: 0,
              transform: undefined,
            }}
            nodeSvgShape={svgCircle}
            styles={style}
            pathFunc='straight'
            transitionDuration={0}
          />
        )}
      </section>
    </div>
  );
}

export default D3Tree;
