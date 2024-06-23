const Strike = ({ strikeClass }) => {
  return strikeClass ? <div className={`strike ${strikeClass}`}></div> : null;
};

export default Strike;
