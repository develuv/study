import {
  useHistory,
} from "react-router-dom";
import DetailPage from './DetailPage';

function ModalDetailPage() {
  const history = useHistory();

  const back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div
      onClick={back}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)"
      }}
    >
      <div
        className="modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
        <DetailPage />
      </div>
    </div>
  );
}

export default ModalDetailPage;