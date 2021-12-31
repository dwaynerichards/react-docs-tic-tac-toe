const Square = (props) => {
  //always call super when defining the constructor of subclass
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
