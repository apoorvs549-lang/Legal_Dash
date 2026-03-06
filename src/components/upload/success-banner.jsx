import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Successbanner = ({ clientName, fileCount, onReset }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-12 animate-fadeIn">
    <div className="p-4 bg-green-100 rounded-full">
      <CheckCircleIcon style={{ fontSize: 56, color: "#22c55e" }} />
    </div>
    <div className="text-center">
      <h2 className="text-xl font-bold text-gray-800">Upload Successful!</h2>
      <p className="text-sm text-gray-500 mt-1">
        {fileCount} file{fileCount !== 1 ? "s" : ""} uploaded for{" "}
        <span className="font-semibold text-gray-700">{clientName}</span>
      </p>
    </div>
    <button
      onClick={onReset}
      className="mt-2 text-sm text-blue-600 hover:underline font-medium"
    >
      Upload more files
    </button>
  </div>
);

export default Successbanner;