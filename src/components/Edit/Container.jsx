import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Box from './Box';
import update from 'immutability-helper';
import TextElement from './utils';

let styles = {
  marginTop: 16,
  marginLeft: 10,
  width: 700,
  height: 500,
  border: '1px solid black',
  position: 'relative',
  backgroundColor: 'white'
};
const Container = ({
  hideSourceOnDrag,
  workspace,
  onBlockMove,
  onDoubleClickEvent,
  onInputChange,
  onContainerClick,
  onDeleteBlock,
  slide,
  onContainerBodyClicked
}) => {
  // console.log(slide);
  if (slide !== undefined && slide.backgroundColor !== undefined) {
    styles = {
      marginTop: 16,
      marginLeft: 10,
      width: 700,
      height: 500,
      border: '1px solid black',
      position: 'relative',
      backgroundColor: slide.backgroundColor
    };
  }
  const [boxes, setBoxes] = useState([]);
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      // console.log(item);
      // console.log(workspace);
      moveBox(item.id, left, top);
      return undefined;
    }
  });
  const moveBox = (id, left, top) => {
    // Update the slide state here passing id and (left, top) co-ordinate.
    // onBlockMove({ id, left, top });
    let blockIndex = boxes.findIndex((box) => box.id === id);
    setBoxes(
      update(boxes, {
        [blockIndex]: {
          $merge: { left, top }
        }
      })
    );
    onBlockMove({ id, left, top });
  };

  // Will be run as the componentDidUpdate
  useEffect(() => {
    // if (componentDidUpdate & (x or y changed))
    setBoxes([...workspace]);
  }, [workspace]);

  return (
    <div ref={drop} style={styles} onClick={(e) => onContainerBodyClicked(e)}>
      {boxes.map((box) => {
        const { id, left, top } = box;
        return (
          <Box
            {...box}
            key={id}
            id={id}
            left={left}
            top={top}
            hideSourceOnDrag={true}
            box={box}
            onDoubleClickEvent={onDoubleClickEvent}
            onDeleteBlock={onDeleteBlock}
          >
            <TextElement
              jsonElement={box}
              onContainerClick={onContainerClick}
              onInputChange={onInputChange}
            />
          </Box>
        );
      })}
    </div>
  );
};

export default Container;
