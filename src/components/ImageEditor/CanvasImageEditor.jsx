import { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    IconButton,
    Slider,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    Crop,
    RotateCcw,
    RotateCw,
    ZoomIn,
    ZoomOut,
    FlipHorizontal,
    FlipVertical,
    Sun,
    Contrast,
    Palette,
    Type,
    Download,
    Check,
    X,
    MousePointer2,
} from "lucide-react";

import useThemeColors from "../../hooks/useThemeColors";

/*
 * Canvas size used by the image editor.
 * The actual exported image keeps the original image resolution.
 */
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 450;

export default function CanvasImageEditor({
    imageSrc,
    imageElement,
    onApply,
    onClose,
}) {
    const canvasRef = useRef(null);

    // Store the original loaded image.
    const imageRef = useRef(null);

    // Store the current crop selection.
    const cropStartRef = useRef(null);
    const cropSelectionRef = useRef(null);

    // Store text objects added by the user.
    const textObjectsRef = useRef([]);

    const colors = useThemeColors();

    const primary = colors.primary;
    const subText = colors.subText;
    const borderStyle = colors.border;
    const cardColor = colors.card;
    const inputColor = colors.input;
    const textColor = colors.text;
    const shadowColor = colors.shadow;

    /*
     * Image editing state.
     */
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [flipX, setFlipX] = useState(false);
    const [flipY, setFlipY] = useState(false);

    const [brightness, setBrightness] = useState(0);
    const [contrast, setContrast] = useState(0);
    const [grayscale, setGrayscale] = useState(false);

    /*
     * Crop mode state.
     */
    const [isCropping, setIsCropping] = useState(false);
    const [cropSelection, setCropSelection] = useState(null);

    /*
     * Text tool state.
     */
    const [isAddingText, setIsAddingText] = useState(false);
    const [textValue, setTextValue] = useState("");

    /*
     * Currently selected text object.
     */
    const [selectedTextIndex, setSelectedTextIndex] = useState(null);

    /*
     * Load image whenever imageSrc changes.
     */
    useEffect(() => {
        if (!imageSrc) return;

        const image = new Image();

        /*
         * Allow images from URLs to be loaded where CORS permits it.
         */
        image.crossOrigin = "anonymous";

        image.onload = () => {
            imageRef.current = image;

            /*
             * Reset editor state whenever a new image is opened.
             */
            setRotation(0);
            setZoom(1);
            setFlipX(false);
            setFlipY(false);
            setBrightness(0);
            setContrast(0);
            setGrayscale(false);
            setIsCropping(false);
            setCropSelection(null);
            setSelectedTextIndex(null);

            textObjectsRef.current = [];

            drawCanvas();
        };

        image.onerror = () => {
            console.error("Unable to load image:", imageSrc);
        };

        image.src = imageSrc;

        return () => {
            image.onload = null;
            image.onerror = null;
        };
        // drawCanvas is intentionally not included because it depends on
        // the current canvas/image state.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageSrc]);

    /*
     * Apply brightness, contrast and grayscale
     * using Canvas pixel manipulation.
     */
    const applyPixelFilters = (ctx, width, height) => {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        /*
         * Convert slider values:
         *
         * brightness: -1 to 1
         * contrast: -1 to 1
         */
        const brightnessAmount = brightness * 255;

        /*
         * Standard contrast calculation.
         */
        const contrastFactor =
            (259 * (contrast * 255 + 255)) /
            (255 * (259 - contrast * 255));

        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            /*
             * Brightness.
             */
            r += brightnessAmount;
            g += brightnessAmount;
            b += brightnessAmount;

            /*
             * Contrast.
             */
            r = contrastFactor * (r - 128) + 128;
            g = contrastFactor * (g - 128) + 128;
            b = contrastFactor * (b - 128) + 128;

            /*
             * Grayscale.
             */
            if (grayscale) {
                const gray =
                    0.299 * r +
                    0.587 * g +
                    0.114 * b;

                r = gray;
                g = gray;
                b = gray;
            }

            /*
             * Keep RGB values inside the valid 0-255 range.
             */
            data[i] = Math.max(0, Math.min(255, r));
            data[i + 1] = Math.max(0, Math.min(255, g));
            data[i + 2] = Math.max(0, Math.min(255, b));
        }

        ctx.putImageData(imageData, 0, 0);
    };

    /*
     * Draw the image and all editing changes on Canvas.
     */
    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const image = imageRef.current;

        if (!canvas || !image) return;

        const ctx = canvas.getContext("2d");

        /*
         * Clear previous canvas content.
         */
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        /*
         * Use a transparent background.
         */
        ctx.save();

        /*
         * Move canvas origin to its center.
         */
        ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        /*
         * Rotation is applied around the image center.
         */
        ctx.rotate((rotation * Math.PI) / 180);

        /*
         * Flip is implemented by negative scale.
         */
        ctx.scale(
            flipX ? -1 : 1,
            flipY ? -1 : 1
        );

        /*
         * Calculate a base scale so the image fits inside
         * the editing canvas.
         */
        const maxWidth = CANVAS_WIDTH - 40;
        const maxHeight = CANVAS_HEIGHT - 40;

        const scaleX = maxWidth / image.width;
        const scaleY = maxHeight / image.height;

        let baseScale = Math.min(scaleX, scaleY);

        /*
         * Never make the initial image larger than its
         * original resolution.
         */
        baseScale = Math.min(baseScale, 1);

        /*
         * Apply user zoom.
         */
        const finalScale = baseScale * zoom;

        const drawWidth = image.width * finalScale;
        const drawHeight = image.height * finalScale;

        /*
         * Draw image centered.
         */
        ctx.drawImage(
            image,
            -drawWidth / 2,
            -drawHeight / 2,
            drawWidth,
            drawHeight
        );

        ctx.restore();

        /*
         * Apply pixel filters after the image has been drawn.
         */
        if (
            brightness !== 0 ||
            contrast !== 0 ||
            grayscale
        ) {
            applyPixelFilters(
                ctx,
                CANVAS_WIDTH,
                CANVAS_HEIGHT
            );
        }

        /*
         * Draw text objects after image filters.
         */
        drawTextObjects(ctx);

        /*
         * Draw crop rectangle on top of the image.
         */
        if (isCropping && cropSelection) {
            drawCropOverlay(ctx);
        }
    };

    /*
     * Draw all added text objects.
     */
    const drawTextObjects = (ctx) => {
        textObjectsRef.current.forEach((textObject, index) => {
            ctx.save();

            ctx.font = `${textObject.fontSize}px Arial`;
            ctx.fillStyle = textObject.color;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(
                textObject.text,
                textObject.x,
                textObject.y
            );

            /*
             * Highlight currently selected text.
             */
            if (selectedTextIndex === index) {
                const textWidth = ctx.measureText(textObject.text).width;

                ctx.strokeStyle = primary;
                ctx.lineWidth = 2;

                ctx.strokeRect(
                    textObject.x - textWidth / 2 - 8,
                    textObject.y - textObject.fontSize / 2 - 8,
                    textWidth + 16,
                    textObject.fontSize + 16
                );
            }

            ctx.restore();
        });
    };

    /*
     * Draw crop selection rectangle.
     */
    const drawCropOverlay = (ctx) => {
        if (!cropSelection) return;

        const {
            startX,
            startY,
            width,
            height,
        } = cropSelection;

        /*
         * Dark overlay around the crop area.
         */
        ctx.save();

        ctx.fillStyle = "rgba(0,0,0,0.45)";

        ctx.fillRect(
            0,
            0,
            CANVAS_WIDTH,
            startY
        );

        ctx.fillRect(
            0,
            startY,
            startX,
            height
        );

        ctx.fillRect(
            startX + width,
            startY,
            CANVAS_WIDTH - startX - width,
            height
        );

        ctx.fillRect(
            0,
            startY + height,
            CANVAS_WIDTH,
            CANVAS_HEIGHT - startY - height
        );

        /*
         * Crop border.
         */
        ctx.strokeStyle = primary;
        ctx.lineWidth = 2;
        ctx.setLineDash([7, 5]);

        ctx.strokeRect(
            startX,
            startY,
            width,
            height
        );

        ctx.setLineDash([]);

        /*
         * Draw crop handles.
         */
        const handleSize = 8;

        ctx.fillStyle = primary;

        const handles = [
            [startX, startY],
            [startX + width, startY],
            [startX, startY + height],
            [startX + width, startY + height],
        ];

        handles.forEach(([x, y]) => {
            ctx.beginPath();
            ctx.arc(
                x,
                y,
                handleSize / 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        });

        ctx.restore();
    };

    /*
     * Redraw whenever an editing value changes.
     */
    useEffect(() => {
        drawCanvas();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        rotation,
        zoom,
        flipX,
        flipY,
        brightness,
        contrast,
        grayscale,
        cropSelection,
        isCropping,
        selectedTextIndex,
    ]);

    /*
     * Rotate image left/right.
     */
    const rotateImage = (degrees) => {
        setRotation((current) => {
            const next = current + degrees;

            if (next >= 360) return next - 360;
            if (next < 0) return next + 360;

            return next;
        });
    };

    /*
     * Zoom image.
     */
    const zoomImage = (factor) => {
        setZoom((current) => {
            const next = current + factor;

            /*
             * Prevent extremely small or extremely large zoom.
             */
            return Math.max(
                0.2,
                Math.min(3, next)
            );
        });
    };

    /*
     * Flip image horizontally/vertically.
     */
    const handleFlipHorizontal = () => {
        setFlipX((current) => !current);
    };

    const handleFlipVertical = () => {
        setFlipY((current) => !current);
    };

    /*
     * Start crop mode.
     */
    const startCrop = () => {
        setIsCropping(true);

        /*
         * Start with a crop area covering 70% of the canvas.
         */
        const width = CANVAS_WIDTH * 0.7;
        const height = CANVAS_HEIGHT * 0.7;

        setCropSelection({
            startX: (CANVAS_WIDTH - width) / 2,
            startY: (CANVAS_HEIGHT - height) / 2,
            width,
            height,
        });
    };

    /*
     * Convert mouse coordinates to Canvas coordinates.
     */
    const getCanvasCoordinates = (event) => {
        const canvas = canvasRef.current;

        if (!canvas) return null;

        const rect = canvas.getBoundingClientRect();

        const scaleX =
            canvas.width / rect.width;

        const scaleY =
            canvas.height / rect.height;

        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY,
        };
    };

    /*
     * Start dragging crop area.
     */
    const handleCanvasMouseDown = (event) => {
        if (!isCropping) return;

        const point = getCanvasCoordinates(event);

        if (!point) return;

        cropStartRef.current = point;
    };

    /*
     * Update crop area while dragging.
     */
    const handleCanvasMouseMove = (event) => {
        if (!isCropping || !cropStartRef.current) return;

        const point = getCanvasCoordinates(event);

        if (!point) return;

        const start = cropStartRef.current;

        const width = point.x - start.x;
        const height = point.y - start.y;

        /*
         * Support dragging in any direction.
         */
        const normalizedX =
            width < 0
                ? point.x
                : start.x;

        const normalizedY =
            height < 0
                ? point.y
                : start.y;

        const normalizedWidth =
            Math.abs(width);

        const normalizedHeight =
            Math.abs(height);

        /*
         * Keep crop area inside canvas.
         */
        const safeX = Math.max(
            0,
            Math.min(
                normalizedX,
                CANVAS_WIDTH - normalizedWidth
            )
        );

        const safeY = Math.max(
            0,
            Math.min(
                normalizedY,
                CANVAS_HEIGHT - normalizedHeight
            )
        );

        setCropSelection({
            startX: safeX,
            startY: safeY,
            width: Math.max(10, normalizedWidth),
            height: Math.max(10, normalizedHeight),
        });
    };

    /*
     * Finish crop dragging.
     */
    const handleCanvasMouseUp = () => {
        cropStartRef.current = null;
    };

    /*
     * Cancel crop mode.
     */
    const cancelCrop = () => {
        cropStartRef.current = null;
        cropSelectionRef.current = null;

        setCropSelection(null);
        setIsCropping(false);
    };

    /*
     * Add text to image.
     */
    const addText = () => {
        if (!textValue.trim()) return;

        const textObject = {
            text: textValue.trim(),
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2,
            fontSize: 28,
            color: primary,
        };

        textObjectsRef.current.push(textObject);

        setSelectedTextIndex(
            textObjectsRef.current.length - 1
        );

        setTextValue("");
        setIsAddingText(false);

        drawCanvas();
    };

    /*
     * Click on Canvas while text tool is active.
     *
     * This places the new text at the clicked position.
     */
    const handleTextCanvasClick = (event) => {
        if (!isAddingText || !textValue.trim()) return;

        const point = getCanvasCoordinates(event);

        if (!point) return;

        const textObject = {
            text: textValue.trim(),
            x: point.x,
            y: point.y,
            fontSize: 28,
            color: primary,
        };

        textObjectsRef.current.push(textObject);

        setSelectedTextIndex(
            textObjectsRef.current.length - 1
        );

        setTextValue("");
        setIsAddingText(false);

        drawCanvas();
    };

    /*
     * Convert Canvas to a downloadable PNG.
     */
    const getExportDataUrl = () => {
        const canvas = canvasRef.current;

        if (!canvas) return null;

        /*
         * Draw final state before exporting.
         */
        drawCanvas();

        /*
         * Export at 2x resolution for better quality.
         */
        return canvas.toDataURL(
            "image/png",
            1
        );
    };

    /*
     * Download edited image.
     */
    const downloadImage = () => {
        const dataUrl = getExportDataUrl();

        if (!dataUrl) return;

        const link = document.createElement("a");

        link.href = dataUrl;
        link.download = "edited-image.png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    /*
     * Apply the edited image back to Tiptap.
     */
    const handleApply = () => {
        const dataUrl = getExportDataUrl();

        if (!dataUrl) return;

        /*
         * Pass the final Canvas image to NotesEditorPage.
         */
        onApply(dataUrl);
    };

    /*
     * Tool button styling using NextHire theme colors.
     */
    const toolButtonSx = (active = false) => ({
        minWidth: 38,
        width: 38,
        height: 38,
        borderRadius: "9px",
        color: active ? "#ffffff" : subText,
        backgroundColor: active
            ? primary
            : inputColor,

        "&:hover": {
            color: active
                ? "#ffffff"
                : primary,
            backgroundColor: active
                ? primary
                : `${primary}14`,
        },
    });

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 2000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,

                /*
                 * Theme-aware translucent backdrop.
                 */
                backgroundColor: darkModeSafeBackdrop(
                    colors
                ),
            }}
        >
            <Box
                sx={{
                    width: "min(960px, 96vw)",
                    maxHeight: "94vh",
                    overflow: "auto",
                    bgcolor: cardColor,
                    border: `1px solid ${borderStyle}`,
                    borderRadius: "16px",
                    boxShadow: shadowColor,
                    p: 2,
                }}
            >
                {/* Editor header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1.5,
                    }}
                >
                    <Typography
                        sx={{
                            color: textColor,
                            fontWeight: 800,
                            fontSize: "1rem",
                        }}
                    >
                        Image Editor
                    </Typography>

                    <Tooltip title="Close editor">
                        <IconButton
                            onClick={onClose}
                            sx={toolButtonSx()}
                            aria-label="Close image editor"
                        >
                            <X size={18} />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Image editing toolbar */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 0.7,
                        mb: 1.5,
                        p: 1,
                        bgcolor: inputColor,
                        border: `1px solid ${borderStyle}`,
                        borderRadius: "12px",
                    }}
                >
                    {/* Crop */}
                    {!isCropping ? (
                        <Tooltip title="Crop image">
                            <IconButton
                                onClick={startCrop}
                                sx={toolButtonSx()}
                                aria-label="Crop image"
                            >
                                <Crop size={18} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <>
                            <Tooltip title="Apply crop">
                                <IconButton
                                    onClick={() => {
                                        setIsCropping(false);
                                        cropSelectionRef.current =
                                            cropSelection;
                                    }}
                                    sx={toolButtonSx(true)}
                                    aria-label="Apply crop"
                                >
                                    <Check size={18} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Cancel crop">
                                <IconButton
                                    onClick={cancelCrop}
                                    sx={toolButtonSx()}
                                    aria-label="Cancel crop"
                                >
                                    <X size={18} />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}

                    <Tooltip title="Rotate left">
                        <IconButton
                            onClick={() => rotateImage(-90)}
                            sx={toolButtonSx()}
                            aria-label="Rotate left"
                        >
                            <RotateCcw size={18} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Rotate right">
                        <IconButton
                            onClick={() => rotateImage(90)}
                            sx={toolButtonSx()}
                            aria-label="Rotate right"
                        >
                            <RotateCw size={18} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Zoom in">
                        <IconButton
                            onClick={() => zoomImage(0.1)}
                            sx={toolButtonSx()}
                            aria-label="Zoom in"
                        >
                            <ZoomIn size={18} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Zoom out">
                        <IconButton
                            onClick={() => zoomImage(-0.1)}
                            sx={toolButtonSx()}
                            aria-label="Zoom out"
                        >
                            <ZoomOut size={18} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Flip horizontally">
                        <IconButton
                            onClick={handleFlipHorizontal}
                            sx={toolButtonSx(flipX)}
                            aria-label="Flip horizontally"
                        >
                            <FlipHorizontal size={18} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Flip vertically">
                        <IconButton
                            onClick={handleFlipVertical}
                            sx={toolButtonSx(flipY)}
                            aria-label="Flip vertically"
                        >
                            <FlipVertical size={18} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Grayscale">
                        <IconButton
                            onClick={() =>
                                setGrayscale(
                                    (current) => !current
                                )
                            }
                            sx={toolButtonSx(grayscale)}
                            aria-label="Toggle grayscale"
                        >
                            <Palette size={18} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Add text">
                        <IconButton
                            onClick={() =>
                                setIsAddingText(
                                    (current) => !current
                                )
                            }
                            sx={toolButtonSx(isAddingText)}
                            aria-label="Add text"
                        >
                            <Type size={18} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Download edited image">
                        <IconButton
                            onClick={downloadImage}
                            sx={toolButtonSx()}
                            aria-label="Download edited image"
                        >
                            <Download size={18} />
                        </IconButton>
                    </Tooltip>

                    <Box sx={{ flexGrow: 1 }} />

                    <Tooltip title="Apply changes to note">
                        <IconButton
                            onClick={handleApply}
                            sx={toolButtonSx(true)}
                            aria-label="Apply image changes"
                        >
                            <Check size={18} />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Add text input */}
                {isAddingText && (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            mb: 1.5,
                        }}
                    >
                        <TextField
                            size="small"
                            value={textValue}
                            onChange={(event) =>
                                setTextValue(
                                    event.target.value
                                )
                            }
                            placeholder="Enter text to add"
                            fullWidth
                            autoFocus
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: textColor,
                                    "& fieldset": {
                                        borderColor:
                                            borderStyle,
                                    },
                                    "&:hover fieldset": {
                                        borderColor:
                                            primary,
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor:
                                            primary,
                                    },
                                },
                            }}
                        />

                        <Button
                            variant="contained"
                            onClick={addText}
                            disabled={!textValue.trim()}
                            sx={{
                                bgcolor: primary,
                                textTransform: "none",
                                fontWeight: 700,
                                minWidth: 90,
                                "&:hover": {
                                    bgcolor: primary,
                                },
                            }}
                        >
                            Add
                        </Button>
                    </Box>
                )}

                {/* Brightness + Contrast controls */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                        },
                        gap: 2,
                        mb: 1.5,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Sun
                            size={17}
                            color={subText}
                        />

                        <Typography
                            sx={{
                                color: subText,
                                fontSize: "0.78rem",
                                minWidth: 70,
                            }}
                        >
                            Brightness
                        </Typography>

                        <Slider
                            size="small"
                            value={brightness}
                            min={-1}
                            max={1}
                            step={0.05}
                            onChange={(_, value) =>
                                setBrightness(value)
                            }
                            sx={{
                                color: primary,
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Contrast
                            size={17}
                            color={subText}
                        />

                        <Typography
                            sx={{
                                color: subText,
                                fontSize: "0.78rem",
                                minWidth: 70,
                            }}
                        >
                            Contrast
                        </Typography>

                        <Slider
                            size="small"
                            value={contrast}
                            min={-1}
                            max={1}
                            step={0.05}
                            onChange={(_, value) =>
                                setContrast(value)
                            }
                            sx={{
                                color: primary,
                            }}
                        />
                    </Box>
                </Box>

                {/* Canvas workspace */}
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: inputColor,
                        border: `1px solid ${borderStyle}`,
                        borderRadius: "12px",
                        p: 1,
                        overflow: "auto",
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        width={CANVAS_WIDTH}
                        height={CANVAS_HEIGHT}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                        onClick={handleTextCanvasClick}
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            display: "block",
                            cursor: isCropping
                                ? "crosshair"
                                : isAddingText
                                    ? "text"
                                    : "default",
                        }}
                    />
                </Box>

                {/* Small instruction */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.7,
                        mt: 1,
                    }}
                >
                    <MousePointer2
                        size={14}
                        color={subText}
                    />

                    <Typography
                        sx={{
                            color: subText,
                            fontSize: "0.72rem",
                        }}
                    >
                        {isCropping
                            ? "Drag on the image to create the crop area."
                            : isAddingText
                                ? "Enter text and click on the image to place it."
                                : "Use the toolbar above to edit the image."}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

/*
 * Create a theme-aware editor backdrop.
 *
 * This avoids using a fixed hardcoded light/dark color.
 */
function darkModeSafeBackdrop(colors) {
    if (colors.background) {
        return `${colors.background}CC`;
    }

    if (colors.card) {
        return `${colors.card}CC`;
    }

    return "rgba(0,0,0,0.55)";
}