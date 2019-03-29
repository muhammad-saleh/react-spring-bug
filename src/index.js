import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTransition, animated } from 'react-spring'
import data from './data'
import shuffle from 'lodash/shuffle'
import './index.css';

function App() {
  const [rows, set] = useState(data)
  useEffect(() => void setInterval(() => set(shuffle), 2000), [])

  let height = 0
  const transitions = useTransition(
    rows.map(data => ({ ...data, y: (height += data.height) - data.height })),
    d => d.name,
    {
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height })
    }
  )

  return (
    <div className="list" style={{ height }}>
      {transitions.map(({ item, props: { y, ...rest }, key }, index) => (
        <animated.div
          key={key}
          className="card"
          style={{ zIndex: data.length - index, transform: y.interpolate(y => `translate3d(0,${y}px,0)`), ...rest }}>
          <div className="cell">
            <div className="details" style={{ backgroundImage: item.css }} />
          </div>
        </animated.div>
      ))}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
