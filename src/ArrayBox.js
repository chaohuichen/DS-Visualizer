import React from 'react';
import boxStyle from './boxStyle.module.css';
function ArrayBox(props) {
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
}

export default ArrayBox;
