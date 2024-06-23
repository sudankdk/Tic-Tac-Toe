import Strike from "./Strike";
import Tiles from "./Tiles";

const Board = ({ tiles, onTileClick, playerTurn, strikeClass }) => {
  return (
    <div className="board">
      {tiles.map((value, index) => (
        <Tiles
          key={index}
          playerTurn={playerTurn}
          onClick={() => onTileClick(index)}
          value={value}
          className={`tile ${getClassNames(index)}`}
        />
      ))}
      <Strike strikeClass={strikeClass} />
    </div>
  );
};

function getClassNames(index) {
  const classNames = [];
  if ([0, 1, 3, 4, 6, 7].includes(index)) {
    classNames.push("right-border");
  }
  if ([0, 1, 2, 3, 4, 5].includes(index)) {
    classNames.push("bottom-border");
  }
  return classNames.join(" ");
}

export default Board;
