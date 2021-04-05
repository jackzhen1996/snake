const renderFood = (x,y) => {
  $(`#${x}_${y}`).css('background-color','black');
  $(`#${x}_${y}`).addClass('food');
  $(`#${x+1}_${y+1}`).css('background-color','black');
  $(`#${x+1}_${y+1}`).addClass('food');
  $(`#${x}_${y+1}`).css('background-color','black');
  $(`#${x}_${y+1}`).addClass('food');
  $(`#${x+1}_${y}`).css('background-color','black');
  $(`#${x+1}_${y}`).addClass('food');
};



export {renderFood};