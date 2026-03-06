import UploadFileIcon from "@mui/icons-material/UploadFile";
import CircularProgress from "@mui/material/CircularProgress";

const SubmitButton = ({ loading, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-sm font-semibold text-white transition-all duration-200 shadow-md
        ${
          disabled || loading
            ? "bg-blue-300 cursor-not-allowed shadow-none"
            : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] hover:shadow-blue-200 hover:shadow-lg"
        }`}
    >
      {loading ? (
        <>
          <CircularProgress size={16} thickness={5} style={{ color: "#fff" }} />
          <span>Uploading...</span>
        </>
      ) : (
        <>
          <UploadFileIcon fontSize="small" />
          <span>Upload Files</span>
        </>
      )}
    </button>
  );
};

export default SubmitButton;