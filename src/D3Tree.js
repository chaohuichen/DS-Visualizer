import React, { useState } from 'react';
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
} from '@material-ui/core';
import styles from './buttonStyle.module.css';
import ArrayBox from './ArrayBox';

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
  const [travseralData, setTravseral] = useState([]);
  const [inputData, setInput] = useState([]);

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
  };

  const dfs = async (root) => {
    let node = root;
    let prev = null;
    let array = [];
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
      //set the array for displaying the box
      array.push(node.name);
      setTravseral([...array]);

      //color effect
      if (prev) prev.nodeSvgShape = visitedStyle;
      prev = node;
      setHeap({ ...heapData });
      await sleep(800);

      if (node.children[1]) node = node.children[1];
      else node = null;
    }
    //color effect
    if (prev) prev.nodeSvgShape = visitedStyle;
    setHeap({ ...heapData });
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
          onClick={() => buildTree(validateDate())}
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
          <InputLabel id=''>DFS Travseral</InputLabel>
          <Select labelId='' id='' className='menuitem'>
            <MenuItem value={'preorder'}>Pre-Order</MenuItem>
            <MenuItem value={'inorder'}>In-Order</MenuItem>
            <MenuItem value={'postorder'}>Post-Order</MenuItem>
          </Select>
        </FormControl>
        <button key='aKey' onClick={() => dfs(heapData)}>
          Go!
        </button>
      </div>

      <ReactNotification />

      <ArrayBox data={travseralData} />
      <Tree
        data={heapData}
        translate={{ x: width / 2, y: height / 4 }}
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
