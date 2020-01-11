import _ from "lodash";

export const Types = {
  COLUMN: "column",
  CARD: "card"
};

const dummyCards = () => {
  let boardList = [];

  const card = {
    name: "Card",
    id: 0,
    detail: "Card detail"
  };
  _.times(7, i => {
    const index = i + 1;
    let newCard = {
      ...card,
      detail: `Card ${index} detail`,
      name: `Card ${index}`,
      id: index,
      position: index
    };
    boardList.push(newCard);
  });

  return boardList;
};

export const dummyBoardList = () => {
  let boardList = [];
  const cards = dummyCards();

  const listObject = {
    name: "Column",
    id: 0,
    position: ""
  };
  _.times(4, i => {
    let newList = {
      ...listObject,
      name: `Column ${i + 1}`,
      id: i++,
      cards: [],
      position: i++
    };

    boardList.push(newList);
  });

  if (boardList[0]) {
    const updatedColumn = { ...boardList[0], cards };
    boardList.shift();
    boardList.unshift(updatedColumn);
  }

  return boardList;
};
