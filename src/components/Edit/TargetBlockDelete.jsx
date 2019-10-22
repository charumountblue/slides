import React from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = '#dc3545';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  return (
    <div ref={drop} className="drag-delete" style={{ backgroundColor }}>
      {isActive ? 'Release to delete' : 'Drag a block here to Delete'}
    </div>
  );
};
export default Dustbin;
