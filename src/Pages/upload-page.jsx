import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Uploaddropzone from "@/components/upload/upload-drop-zone";
import FormFields
    from "@/components/upload/form-fields";
import SubmitButton from "@/components/upload/submit-button";
import Successbanner from "@/components/upload/success-banner";
import UploadProgressOverlay from "@/components/upload/upload-progress-overlay";
const INITIAL_FORM = {
    clientName: "",
    caseType: "",
    description: "",
    version: "",
};

const UploadPage = () => {
    const [files, setFiles] = useState([]);
    const [form, setForm] = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const isValid =
        files.length > 0 &&
        form.clientName.trim() &&
        form.caseType &&
        form.version.trim();

    const handleSubmit = async () => {
        if (!isValid) return;
        setLoading(true);
        setShowOverlay(true);

        try {
            const formData = new FormData();
            formData.append("clientName", form.clientName);
            formData.append("caseType", form.caseType);
            formData.append("description", form.description);
            formData.append("version", form.version);

            // Append each file object with its binary data
            files.forEach((file) => {
                formData.append("file", file);
            });

            // Note: When sending FormData via fetch, DO NOT set the Content-Type header manually.
            // The browser will automatically set it to 'multipart/form-data' with the correct boundary boundary string
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/documents/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Upload failed");
            }

            console.log("✅ Document and Files saved:", data);
        } catch (err) {
            console.error("Upload error:", err);
            setShowOverlay(false);
            setLoading(false);
            alert(err.message || "Upload failed. Please try again.");
        }
    };

    const handleOverlayDone = () => {
        setShowOverlay(false);
        setLoading(false);
        setSuccess(true);
    };

    const handleReset = () => {
        setFiles([]);
        setForm(INITIAL_FORM);
        setSuccess(false);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <UploadProgressOverlay
                visible={showOverlay}
                onDone={handleOverlayDone}
            />
            <div className="h-dvh overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center ">
                <div className="w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col ">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-5 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <FolderOpenIcon className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Upload Files</h1>
                                <p className="text-blue-100 text-xs mt-0.5">
                                    Upload your files and provide case details
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-7 py-6 flex-1 min-h-0 overflow-y-auto">
                        {success ? (
                            <Successbanner
                                clientName={form.clientName}
                                fileCount={files.length}
                                onReset={handleReset}
                            />
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Files <span className="text-red-500">*</span>
                                    </label>
                                    <Uploaddropzone files={files} setFiles={setFiles} />
                                </div>

                                <div className="border-t border-gray-100 pt-5">
                                    <FormFields form={form} setForm={setForm} />
                                </div>
                                <div className="sticky bottom-6 bg-white border-t p-4 ">
                                    <SubmitButton
                                        loading={loading}
                                        disabled={!isValid}
                                        onClick={handleSubmit}
                                    />
                                </div>

                                {!isValid && !loading && (
                                    <p className="text-center text-xs  text-gray-400">
                                        Please upload at least one file and fill all required fields.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default UploadPage;