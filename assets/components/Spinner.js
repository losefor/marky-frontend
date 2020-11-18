export default function Spinner({ isLoading }) {
  return (
    <div className="spinner-cont" style={{display:isLoading?'flex':'none'}}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
