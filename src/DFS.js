import { singleStyle, visitedStyle } from './treeStyle';
import { sleep } from './ult.js';

export const inOrderDFS = async (root, setTree, setArray, warning) => {
  let node = root;
  let prev = null;
  let array = [];

  if (!node || node === 'undefined') {
    warning();
    return;
  }
  let stack = [];

  while (stack.length || node) {
    console.log('running in order');
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
    setArray([...array]);

    //color effect
    if (prev) prev.nodeSvgShape = visitedStyle;
    prev = node;
    setTree({ ...root });
    await sleep(800);

    if (node.children[1]) node = node.children[1];
    else node = null;
  }
  //color effect
  if (prev) prev.nodeSvgShape = visitedStyle;
  setTree({ ...root });
};

export const postOrderDFS = async (root, setTree, setArray, warning) => {
  if (!root || root === 'undefined') {
    warning();
    return;
  }
  let current = root;
  let array = [];
  let stack = [];
  let prev = null;
  while (true) {
    while (current) {
      if (current.children[1]) stack.push(current.children[1]);
      stack.push(current);
      if (current.children[0]) current = current.children[0];
      else current = null;
    }
    current = stack.pop();
    if (
      current.children[1] &&
      stack[stack.length - 1] === current.children[1]
    ) {
      stack.pop();
      stack.push(current);
      if (current.children[1]) current = current.children[1];
      else current = null;
    } else {
      current.nodeSvgShape = singleStyle;
      array.push(current.name);
      setArray([...array]);
      console.log(current.name);
      current.nodeSvgShape = singleStyle;
      if (prev) prev.nodeSvgShape = visitedStyle;
      setTree({ ...root });
      await sleep(800);
      prev = current;
      current = null;
    }
    if (!stack.length) break;
  }
  if (prev) prev.nodeSvgShape = visitedStyle;
  setTree({ ...root });
};

export const preOrderDFS = async (root, setTree, setArray, warning) => {
  let node = root;
  let prev = null;
  let array = [];

  if (!node || node === 'undefined') {
    warning();
    return;
  }
  let stack = [root];

  while (stack.length || node) {
    node = stack.pop();
    if (node) {
      node.nodeSvgShape = singleStyle;
      //set the array for displaying the box
      array.push(node.name);
    }
    setArray([...array]);
    //color effect
    if (prev) prev.nodeSvgShape = visitedStyle;
    prev = node;
    setTree({ ...root });
    await sleep(800);
    if (node && node.children[1]) stack.push(node.children[1]);
    if (node && node.children[0]) stack.push(node.children[0]);
  }
  //color effect
  if (prev) prev.nodeSvgShape = visitedStyle;
  setTree({ ...root });
  console.log('end', array);
  return array;
};
