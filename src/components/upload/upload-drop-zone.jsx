import { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FilePreview = ({ file, onRemove }) => {
    const sizeKB = (file.size / 1024).toFixed(1);
    return (
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 group animate-fadeIn">
            <InsertDriveFileIcon className="text-blue-400" fontSize="small" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{sizeKB} KB</p>
            </div>
            <CheckCircleIcon className="text-green-400" fontSize="small" />
            <button
                onClick={() => onRemove(file.name)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400"
            >
                <CloseIcon fontSize="small" />
            </button>
        </div>
    );
};

const Uploaddropzone = ({ files, setFiles }) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleDrop = useCallback(
        (item) => {
            if (item?.files) {
                setFiles((prev) => {
                    const existing = new Map(prev.map((f) => [f.name, f]));
                    item.files.forEach((f) => existing.set(f.name, f));
                    return Array.from(existing.values());
                });
            }
            setIsDraggingOver(false);
        },
        [setFiles]
    );

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: [NativeTypes.FILE],
            drop: handleDrop,
            collect: (monitor) => ({ isOver: monitor.isOver() }),
            hover: () => setIsDraggingOver(true),
        }),
        [handleDrop]
    );

    const handleBrowse = (e) => {
        const selected = Array.from(e.target.files || []);
        setFiles((prev) => {
            const existing = new Map(prev.map((f) => [f.name, f]));
            selected.forEach((f) => existing.set(f.name, f));
            return Array.from(existing.values());
        });
    };

    const handleRemove = (name) => {
        setFiles((prev) => prev.filter((f) => f.name !== name));
    };

    const active = isOver || isDraggingOver;

    return (
        <div className="space-y-3">
            <div
                ref={drop}
                onDragLeave={() => setIsDraggingOver(false)}
                className={`relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-3 transition-all duration-200 cursor-pointer
          ${active ? "border-blue-500 bg-blue-50 scale-[1.01]" : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/40"}`}
            >
                <div
                    className={`p-3 rounded-full transition-colors duration-200 ${active ? "bg-blue-100" : "bg-white shadow-sm"}`}
                >
                    <CloudUploadIcon
                        className={`transition-colors duration-200 ${active ? "text-blue-500" : "text-gray-400"}`}
                        style={{ fontSize: 36 }}
                    />
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Drag and drop files here, or{" "}
                        <label className="text-blue-600 font-semibold cursor-pointer hover:underline">
                            browse
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleBrowse}
                            />
                        </label>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Upload any file type</p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((f) => (
                        <FilePreview key={f.name} file={f} onRemove={handleRemove} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Uploaddropzone;