// width : 2 blocks
// initial length: 50 blocks
// inital position: (5,10)

// render snake
const renderSnake = (x,y,color,gotFood, player) => {
  const head = $(`#${x}_${y}`);
  // head.addClass(`${player}Block`)
  // check if collsion with food or other snake
  if (head.attr('class') === 'cell food' && player === 'p1') {
    gotFood(true,null);
  }
  if (head.attr('class') === 'cell food' && player === 'p2') {
    gotFood(null,true);
  }


  head.css({backgroundColor: color});
};


export {renderSnake};
