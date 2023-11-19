import React from 'react'
import { animated, useSpring } from '@react-spring/web'

const AnimatedSphere = ({color = '#5cabff', to = 0}) => {
  const springs = useSpring({
    from: { 
      y: 0,
      zIndex: 40
    },
    to: { 
      y: to,
      zIndex: 40
    },
    config: {
      duration: 1500,
    },
    delay: 500,
    loop: true
  })

  return (
    <animated.div
      style={{
        display: "flex",
        borderRadius: "50%",
        height: "37.5px",
        width: "37.5px",
        margin: "0",
        background: `radial-gradient(circle at 12.5px 12.5px, ${color}, #000)`,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        ...springs
      }}
    />
  )
}

export default AnimatedSphere