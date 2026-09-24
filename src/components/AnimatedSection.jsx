import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' // 'up' | 'down' | 'left' | 'right'
}) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 }
  };

  const offset = directions[direction] || directions.up;

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...offset,
        filter: 'blur(4px)'
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0, 
        filter: 'blur(0px)'
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
