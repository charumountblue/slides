import React from 'react';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';
const style = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'transparent',
  padding: '0.2rem',
  cursor: 'move',
};
const Box = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  children,
  onDoubleClickEvent,
  box,
  onDeleteBlock,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (dropResult.name === 'Dustbin') {
          // alert(`You dropped ${item.id} into ${dropResult.name}!`);
          onDeleteBlock(item);
        }
      }
    },
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div
      id="dragBox"
      onClick={(e) => onDoubleClickEvent(e, box)}
      ref={drag}
      style={{ ...style, left, top }}
    >
      {children}
    </div>
  );
};
export default Box;
