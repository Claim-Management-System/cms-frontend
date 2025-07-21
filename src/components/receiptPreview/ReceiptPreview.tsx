import type React from "react"
import { useState, type ChangeEvent, useEffect } from "react"
import { Button, Box, Typography, IconButton } from "@mui/material"
import {
    // Clear as ClearIcon,
    ArrowBackIosNew,
    ArrowForwardIos,
    PlayArrow as PlayArrowIcon,
} from "@mui/icons-material"
import "./ReceiptPreview.css"

interface ReceiptPreviewProps {
    onImageUpload?: (files: File[]) => void;
    submitted?: boolean;
    reset?: boolean;
    mode?: "upload" | "view";
    images?: string[];
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({
    onImageUpload,
    submitted,
    reset,
    mode = "upload",
    images = [],
}) => {
    const [files, setFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [showDuplicateError, setShowDuplicateError] = useState(false)

    useEffect(() => {
        if (mode === "view") {
            setPreviews(images)
        }
    }, [mode, images])

    useEffect(() => {
        if (reset) {
            setFiles([]);
            setPreviews([]);
            setActiveIndex(0);
            setShowDuplicateError(false);
        }
    }, [reset]);

    const isDuplicateFile = (_file: File) => {
        // Dummy function: will be replaced with actual duplicate detection logic
        return false;
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (mode === "view") return;

        if (event.target.files) {
            const newFiles = Array.from(event.target.files)
            if (newFiles.length > 0 && isDuplicateFile(newFiles[0])) {
                setShowDuplicateError(true);
            } else {
                setShowDuplicateError(false);
            }

            const currentFilesCount = files.length
            const updatedFiles = [...files, ...newFiles];
            setFiles(updatedFiles);
            onImageUpload?.(updatedFiles);
            const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
            setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews])
            setActiveIndex(currentFilesCount)
        }
    }

    // const handleRemovePreview = (index: number) => {
    //     if (previews.length === 0) return

    //     setShowDuplicateError(false)

    //     const newFiles = [...files]
    //     newFiles.splice(index, 1)
    //     setFiles(newFiles)
    //     onImageUpload(newFiles);

    //     const newPreviews = [...previews]
    //     URL.revokeObjectURL(newPreviews[index])
    //     newPreviews.splice(index, 1)
    //     setPreviews(newPreviews)

    //     setActiveIndex((prev) => Math.min(prev, newPreviews.length))
    // }

    const handleReplaceImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (mode === "view") return;

        if (event.target.files) {
            const newFile = Array.from(event.target.files)[0];
            if (!newFile) return;

            const updatedFiles = [...files];
            updatedFiles[activeIndex] = newFile;

            const updatedPreviews = [...previews];
            URL.revokeObjectURL(updatedPreviews[activeIndex]);
            updatedPreviews[activeIndex] = URL.createObjectURL(newFile);

            setFiles(updatedFiles);
            setPreviews(updatedPreviews);
            onImageUpload?.(updatedFiles);

            if (isDuplicateFile(newFile)) {
                setShowDuplicateError(true);
            } else {
                setShowDuplicateError(false);
            }

            event.target.value = "";
        }
    };

    const handleNext = () => {
        setActiveIndex((prev) => Math.min(prev + 1, previews.length))
        setShowDuplicateError(false);
    }

    const handlePrev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0))
        setShowDuplicateError(false);
    }

    const UploadPlaceholder = () => (
        <Box className={`upload-placeholder ${submitted && files.length === 0 ? "error" : ""}`}>
            <Typography>+ Upload Attachments</Typography>
            <Button component="label" variant="contained" disabled={mode === "view"}>
                Upload
                <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, application/pdf"
                    disabled={mode === "view"}
                />
            </Button>
        </Box>
    )

    return (
        <Box className="receipt-preview-container">
            <Box className={`preview-box ${submitted && files.length === 0 ? "error" : ""}`}>
                {previews.length === 0 && (
                    <Box className="header-section">
                        <Typography variant="h6" className="preview-title">
                            Receipt Preview Window
                        </Typography>
                        <Typography variant="body2" className="preview-subtitle">
                            (Could be more than one)
                        </Typography>
                    </Box>
                )}

                <Box className="preview-content">
                    {previews.length === 0 ? (
                        mode === "upload" ? (
                            <UploadPlaceholder />
                        ) : (
                            <Box className="upload-placeholder">
                                <Typography>No attachments to display.</Typography>
                            </Box>
                        )
                    ) : (
                        <Box className="carousel-container">
                            <IconButton
                                onClick={handlePrev}
                                disabled={activeIndex === 0}
                                className="nav-button"
                            >
                                <ArrowBackIosNew />
                            </IconButton>

                            {activeIndex < previews.length ? (
                                <div className="image-preview-wrapper">
                                    {showDuplicateError && mode === "upload" && (
                                        <Box className="duplicate-error-box">
                                            <Box className="duplicate-error-content">
                                                <Typography className="duplicate-error-heading">The document looks like a duplicate</Typography>
                                                <Typography className="duplicate-error-body">The document uploaded appears to be a duplicate of a previously uploaded document. Please upload a new document.</Typography>
                                                <Button className="duplicate-error-button" component="label">
                                                    Re-Upload the Document
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={handleReplaceImage}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </Button>
                                            </Box>
                                            <PlayArrowIcon className="duplicate-error-arrow" />
                                        </Box>
                                    )}
                                    <div className="image-container">
                                        <img
                                            src={previews[activeIndex] || "/placeholder.svg"}
                                            alt={`Receipt preview ${activeIndex + 1}`}
                                            className="receipt-image"
                                        />
                                        {/* <IconButton
                                            aria-label="delete"
                                            className="remove-btn"
                                            size="small"
                                            onClick={() => handleRemovePreview(activeIndex)}
                                        >
                                            <ClearIcon fontSize="inherit" />
                                        </IconButton> */}
                                    </div>
                                </div>
                            ) : (
                                mode === "upload" && <UploadPlaceholder />
                            )}

                            <IconButton
                                onClick={handleNext}
                                disabled={
                                    (mode === "view" && activeIndex >= previews.length - 1 && previews.length > 0) ||
                                    (mode === "upload" && activeIndex === previews.length) ||
                                    (showDuplicateError && mode === "upload")
                                }
                                className="nav-button"
                            >
                                <ArrowForwardIos />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default ReceiptPreview