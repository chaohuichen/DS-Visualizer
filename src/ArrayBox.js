import React from 'react';
import boxStyle from './boxStyle.module.css';
function ArrayBox(props) {
  if (props.data.length !== 0) {
    return (
      <div className={boxStyle.box}>
        {props.data.map((ele, idx) => {
          return (
            <div key={idx}>
              <h3>{ele}</h3>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div
        style={{ margin: '5px 15px 0 15px', height: '5rem', width: '5rem' }}
      ></div>
    );
  }
}

export default ArrayBox;
