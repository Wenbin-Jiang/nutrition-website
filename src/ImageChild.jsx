import "./App.css";

const ImageChild = ({ url, name }) => {
  return (
    <div className="imageDiv">
      <h4 className="centered-header">Food Item:</h4>
      <img src={url} width={300} height={300} className={name}></img>
    </div>
  );
};

export default ImageChild;
