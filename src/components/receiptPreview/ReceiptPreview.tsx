import { useState, type ChangeEvent, useEffect } from "react"
import { Button, Box, Typography, IconButton } from "@mui/material"
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { IMAGE_MODE } from "../../services/constantServices/constants"
import "./ReceiptPreview.css"

interface ReceiptPreviewProps {
    onImageUpload?: (files: File[]) => void;
    submitted?: boolean;
    reset?: boolean;
    mode?: "upload" | "view";
    images?: string[];
}

function ReceiptPreview({ onImageUpload, submitted, reset, mode = IMAGE_MODE.UPLOAD, images = [] }: ReceiptPreviewProps) {
    const [files, setFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        if (mode === IMAGE_MODE.VIEW) {
            setPreviews(images)
        }
    }, [mode, images])

    useEffect(() => {
        if (reset) {
            setFiles([]);
            setPreviews([]);
            setActiveIndex(0);
        }
    }, [reset]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (mode === IMAGE_MODE.VIEW) return;

        if (event.target.files) {
            const newFiles = Array.from(event.target.files)
            const currentFilesCount = files.length
            const updatedFiles = [...files, ...newFiles];
            setFiles(updatedFiles);
            onImageUpload?.(updatedFiles);
            const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
            setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews])
            setActiveIndex(currentFilesCount)
        }
    }

    const handleRemovePreview = (index: number) => {
        if (previews.length === 0) return

        const newFiles = [...files]
        newFiles.splice(index, 1)
        setFiles(newFiles);
        onImageUpload?.(newFiles);

        const newPreviews = [...previews]
        URL.revokeObjectURL(newPreviews[index])
        newPreviews.splice(index, 1)
        setPreviews(newPreviews)

        setActiveIndex((prev) => Math.min(prev, newPreviews.length))
    }

    const handleNext = () => {
        setActiveIndex((prev) => Math.min(prev + 1, previews.length))
    }

    const handlePrev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0))
    }

    const UploadPlaceholder = () => (
        <Box className={`upload-placeholder ${submitted && files.length === 0 ? "error" : ""}`}>
            <Typography className="upload-placeholder-text">+ Upload Attachments</Typography>
            <Button component="label" variant="contained" disabled={mode === IMAGE_MODE.VIEW}>
                Upload
                <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, application/pdf"
                    disabled={mode === IMAGE_MODE.VIEW}
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
                        mode === IMAGE_MODE.UPLOAD ? (
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
                                <div className="image-preview-wrapper" >
                                    <TransformWrapper wheel={{ step: 20 }}>
                                        <TransformComponent
                                            wrapperStyle={{ width: "100%", height: "100%" }}
                                            contentStyle={{ width: "100%", height: "100%" }}
                                        >
                                            <img
                                                src={previews[activeIndex]}
                                                alt={`Receipt preview ${activeIndex + 1}`}
                                                className="receipt-image"
                                            />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </div>
                            ) : (
                                mode === IMAGE_MODE.UPLOAD && <UploadPlaceholder />
                            )}

                            <IconButton
                                onClick={handleNext}
                                disabled={
                                    (mode === IMAGE_MODE.VIEW && activeIndex >= previews.length - 1 && previews.length > 0) ||
                                    (mode === IMAGE_MODE.UPLOAD && activeIndex === previews.length)
                                }
                                className="nav-button"
                            >
                                <ArrowForwardIos />
                            </IconButton>
                        </Box>
                    )}
                </Box>
                {mode === IMAGE_MODE.UPLOAD && activeIndex < previews.length && (
                    <Box className="remove-button-section">
                        <Button
                            className="remove-image-button"
                            onClick={() => handleRemovePreview(activeIndex)}
                        >
                            Remove
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default ReceiptPreview