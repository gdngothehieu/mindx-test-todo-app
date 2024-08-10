import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./Tabs.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function DeleteModal({
  showDeleteAllModal,
  setShowDeleteAllModal,
  setShowDeleteAll,
  showDeleteAll,
  deleteAll,
  ...props
}) {
  const handleClose = () => {
    setShowDeleteAllModal(false);
  };
  React.useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      showDeleteAll(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showDeleteAll]);
  return (
    <div>
      <Modal
        open={showDeleteAllModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 className="mb-10" id="parent-modal-title">
            Are you sure you want to delete all tasks?
          </h2>
          <div>
            <button
              className="add-button"
              onClick={() => {
                deleteAll();
                setShowDeleteAllModal(false);
                setShowDeleteAll(true);
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setShowDeleteAllModal(false);
              }}
              className="add-button ml-10"
            >
              No
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
