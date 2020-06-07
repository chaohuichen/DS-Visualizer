import { singleStyle, visitedStyle } from './treeStyle';
import { sleep } from './ult.js';
const breathFirstSearch = async (root, setTree, setArray, warning) => {
  let node = root;
  let prev = null;
  let array = [];

  if (!node || node === 'undefined' || node.length === 0) {
    warning();
    return;
  }
  let queue = [root];

  while (queue.length || node) {
    node = queue.shift();
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
    if (node && node.children[0]) queue.push(node.children[0]);
    if (node && node.children[1]) queue.push(node.children[1]);
  }
  console.log('finish bfs', array);
  //color effect
  if (prev) prev.nodeSvgShape = visitedStyle;
  setTree({ ...root });

  return array;
};

export default breathFirstSearch;
