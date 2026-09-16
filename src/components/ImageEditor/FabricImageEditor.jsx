import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, FabricImage, Rect, IText, filters } from "fabric";

import {
    Box,
    IconButton,
    Tooltip,
    Slider,
    Typography,
    Divider,
    Portal,
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
    Contrast as ContrastIcon,
    Type,
    Download,
    Check,
    X,
    Image as ImageIcon,
} from "lucide-react";

import useThemeColors from "../../hooks/useThemeColors";

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 450;


// FabricImageEditor
//  1. Shows a floating image-editing toolbar.
//  2. Uses Fabric.js for image editing.
//  3. Supports crop, rotate, zoom, flip, brightness,
//      contrast, grayscale, text and download.
//  4. Sends the final edited image back to Tiptap.

export default function FabricImageEditor({
    imageSrc,
    anchorElement,
    onApply,
    onClose,
}) {
    const canvasElementRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const imageObjectRef = useRef(null);
    const cropRectRef = useRef(null);

    const colors = useThemeColors();

    const primary = colors.primary;
    const subText = colors.subText;
    const borderStyle = colors.border;
    const cardColor = colors.card;
    const inputColor = colors.input;
    const shadowColor = colors.shadow;


    //  Floating toolbar position.

    const [toolbarPosition, setToolbarPosition] =
        useState(null);

    // Canvas editor visibility.
    //   Toolbar is visible immediately when an image
    //   is selected. Fabric canvas opens when an editing
    //   action is clicked.

    const [editorOpen, setEditorOpen] =
        useState(false);


    //   Crop state.

    const [isCropping, setIsCropping] =
        useState(false);


    //  Image filter states.

    const [brightness, setBrightness] =
        useState(0);

    const [contrast, setContrast] =
        useState(0);

    const [isGrayscale, setIsGrayscale] =
        useState(false);


    //   Calculate toolbar position according to
    //   selected Tiptap image.

    const updateToolbarPosition = useCallback(() => {
        if (!anchorElement) return;

        const imageBounds =
            anchorElement.getBoundingClientRect();


        //  Toolbar dimensions are approximate.
        //  The toolbar will automatically move below
        //  the image if there is not enough space above it.

        const toolbarHeight = 52;
        const gap = 8;

        const shouldPlaceBelow =
            imageBounds.top <
            toolbarHeight + gap;

        let top;

        if (shouldPlaceBelow) {
            top =
                imageBounds.bottom +
                gap;
        } else {
            top =
                imageBounds.top -
                toolbarHeight -
                gap;
        }

        /*
         * Keep toolbar inside viewport horizontally.
         */
        const viewportPadding = 8;
        const estimatedToolbarWidth =
            Math.min(
                window.innerWidth -
                viewportPadding * 2,
                720
            );

        let left =
            imageBounds.left +
            imageBounds.width / 2;

        const minLeft =
            estimatedToolbarWidth / 2 +
            viewportPadding;

        const maxLeft =
            window.innerWidth -
            estimatedToolbarWidth / 2 -
            viewportPadding;

        left = Math.max(
            minLeft,
            Math.min(maxLeft, left)
        );

        setToolbarPosition({
            top,
            left,
        });
    }, [anchorElement]);

    /*
     * Update toolbar when image position changes
     * because of scrolling or window resizing.
     */
    useEffect(() => {
        if (!anchorElement) return;

        updateToolbarPosition();

        window.addEventListener(
            "scroll",
            updateToolbarPosition,
            true
        );

        window.addEventListener(
            "resize",
            updateToolbarPosition
        );

        return () => {
            window.removeEventListener(
                "scroll",
                updateToolbarPosition,
                true
            );

            window.removeEventListener(
                "resize",
                updateToolbarPosition
            );
        };
    }, [
        anchorElement,
        updateToolbarPosition,
    ]);

    /*
     * Apply Fabric filters to the selected image.
     */
    const applyFilters = useCallback(
        (
            brightnessValue,
            contrastValue,
            grayscaleValue
        ) => {
            const image =
                imageObjectRef.current;

            const fabricCanvas =
                fabricCanvasRef.current;

            if (!image || !fabricCanvas) {
                return;
            }

            const activeFilters = [];

            /*
             * Brightness filter.
             */
            if (
                brightnessValue !== 0
            ) {
                activeFilters.push(
                    new filters.Brightness({
                        brightness:
                            brightnessValue,
                    })
                );
            }

            /*
             * Contrast filter.
             */
            if (
                contrastValue !== 0
            ) {
                activeFilters.push(
                    new filters.Contrast({
                        contrast:
                            contrastValue,
                    })
                );
            }

            /*
             * Grayscale filter.
             */
            if (grayscaleValue) {
                activeFilters.push(
                    new filters.Grayscale()
                );
            }

            image.filters =
                activeFilters;

            image.applyFilters();

            fabricCanvas.requestRenderAll();
        },
        []
    );

    /*
     * Create Fabric canvas only when the editor
     * panel is opened.
     */
    useEffect(() => {
        if (
            !editorOpen ||
            !imageSrc ||
            !canvasElementRef.current
        ) {
            return;
        }

        /*
         * Prevent creating multiple Fabric canvases.
         */
        if (fabricCanvasRef.current) {
            return;
        }

        const fabricCanvas =
            new Canvas(
                canvasElementRef.current,
                {
                    width: CANVAS_WIDTH,
                    height: CANVAS_HEIGHT,
                    backgroundColor:
                        "transparent",
                    selection: true,
                    skipTargetFind: false,
                }
            );

        // Allow keyboard input
        fabricCanvas.upperCanvasEl.tabIndex = 0;

        // Delete selected text with keyboard
        fabricCanvas.upperCanvasEl.addEventListener("keydown", (event) => {
            if (
                event.key === "Delete" ||
                event.key === "Backspace"
            ) {
                const activeObject =
                    fabricCanvas.getActiveObject();

                if (activeObject instanceof IText) {
                    fabricCanvas.remove(activeObject);
                    fabricCanvas.discardActiveObject();
                    fabricCanvas.requestRenderAll();
                }
            }
        });

        fabricCanvasRef.current =
            fabricCanvas;

        // Enable text editing on double-click
        fabricCanvas.on("mouse:dblclick", (event) => {
            const target = event.target;

            if (target instanceof IText) {
                fabricCanvas.setActiveObject(target);
                target.enterEditing();
                target.selectAll();
                fabricCanvas.upperCanvasEl.focus();
                fabricCanvas.requestRenderAll();
            }
        });

        /*
         * Load selected image into Fabric.
         */
        FabricImage.fromURL(
            imageSrc,
            {
                crossOrigin:
                    "anonymous",
            }
        )
            .then((image) => {
                /*
                 * Fit image inside Fabric canvas.
                 */
                const maxWidth =
                    CANVAS_WIDTH - 40;

                const maxHeight =
                    CANVAS_HEIGHT - 40;

                const imageWidth =
                    image.width || 1;

                const imageHeight =
                    image.height || 1;

                const widthScale =
                    maxWidth /
                    imageWidth;

                const heightScale =
                    maxHeight /
                    imageHeight;

                const fitScale =
                    Math.min(
                        widthScale,
                        heightScale,
                        1
                    );

                image.set({
                    left:
                        CANVAS_WIDTH / 2,

                    top:
                        CANVAS_HEIGHT / 2,

                    originX:
                        "center",

                    originY:
                        "center",

                    scaleX:
                        fitScale,

                    scaleY:
                        fitScale,

                    selectable:
                        false,

                    evented:
                        false,

                    hasControls:
                        false,

                    hasBorders:
                        false,
                });

                imageObjectRef.current =
                    image;

                fabricCanvas.add(image);

                fabricCanvas.requestRenderAll();
            })
            .catch((error) => {
                console.error(
                    "Failed to load image into Fabric:",
                    error
                );
            });

        /*
         * Cleanup Fabric canvas.
         */
        return () => {
            fabricCanvas.dispose();

            fabricCanvasRef.current =
                null;

            imageObjectRef.current =
                null;

            cropRectRef.current =
                null;
        };
    }, [
        editorOpen,
        imageSrc,
    ]);

    /*
     * Open Fabric editor.
     */
    const openEditor = () => {
        setEditorOpen(true);

        /*
         * Recalculate toolbar position after
         * opening the editor.
         */
        setTimeout(
            updateToolbarPosition,
            0
        );
    };

    /*
     * Rotate image.
     */
    const rotateImage = (degrees) => {
        openEditor();

        const image =
            imageObjectRef.current;

        const fabricCanvas =
            fabricCanvasRef.current;

        if (!image || !fabricCanvas) {
            return;
        }

        const currentAngle =
            image.angle || 0;

        image.set({
            angle:
                currentAngle +
                degrees,
        });

        image.setCoords();

        fabricCanvas.requestRenderAll();
    };

    /*
     * Zoom image.
     */
    const zoomImage = (factor) => {
        openEditor();

        const image =
            imageObjectRef.current;

        const fabricCanvas =
            fabricCanvasRef.current;

        if (!image || !fabricCanvas) {
            return;
        }

        const currentScaleX =
            image.scaleX || 1;

        const currentScaleY =
            image.scaleY || 1;

        const nextScaleX =
            Math.max(
                0.1,
                Math.min(
                    5,
                    currentScaleX *
                    factor
                )
            );

        const nextScaleY =
            Math.max(
                0.1,
                Math.min(
                    5,
                    currentScaleY *
                    factor
                )
            );

        image.set({
            scaleX:
                nextScaleX,

            scaleY:
                nextScaleY,
        });

        image.setCoords();

        fabricCanvas.requestRenderAll();
    };

    /*
     * Flip image horizontally or vertically.
     */
    const flipImage = (axis) => {
        openEditor();

        const image =
            imageObjectRef.current;

        const fabricCanvas =
            fabricCanvasRef.current;

        if (!image || !fabricCanvas) {
            return;
        }

        if (axis === "horizontal") {
            image.set({
                flipX:
                    !image.flipX,
            });
        }

        if (axis === "vertical") {
            image.set({
                flipY:
                    !image.flipY,
            });
        }

        image.setCoords();

        fabricCanvas.requestRenderAll();
    };

    /*
     * Brightness slider.
     */
    const handleBrightnessChange = (
        event,
        value
    ) => {
        openEditor();

        setBrightness(value);

        applyFilters(
            value,
            contrast,
            isGrayscale
        );
    };

    /*
     * Contrast slider.
     */
    const handleContrastChange = (
        event,
        value
    ) => {
        openEditor();

        setContrast(value);

        applyFilters(
            brightness,
            value,
            isGrayscale
        );
    };

    /*
     * Toggle grayscale.
     */
    const toggleGrayscale = () => {
        openEditor();

        const nextValue =
            !isGrayscale;

        setIsGrayscale(
            nextValue
        );

        applyFilters(
            brightness,
            contrast,
            nextValue
        );
    };

    /*
     * Add editable text to Fabric canvas.
     */
    const addText = () => {
        openEditor();

        const fabricCanvas =
            fabricCanvasRef.current;

        if (!fabricCanvas) {
            return;
        }

        const text =
            new IText(
                "Double click to edit",
                {
                    left:
                        CANVAS_WIDTH / 2,

                    top:
                        CANVAS_HEIGHT / 2,

                    originX:
                        "center",

                    originY:
                        "center",

                    fontSize: 28,

                    fill:
                        primary,

                    fontFamily:
                        "Arial",

                    fontWeight:
                        "600",

                    selectable: true,
                    evented: true,
                }
            );

        fabricCanvas.add(text);

        fabricCanvas.setActiveObject(text);

        // Start editing the new text
        text.enterEditing();
        text.selectAll();
        fabricCanvas.upperCanvasEl.focus();
        fabricCanvas.requestRenderAll();
    };

    /*
     * Start crop mode.
     *
     * The crop rectangle is draggable and
     * resizable using Fabric controls.
     */
    const startCrop = () => {
        openEditor();

        const image =
            imageObjectRef.current;

        const fabricCanvas =
            fabricCanvasRef.current;

        //  Enable the actual image as the active Fabric object
        //  while crop mode is active, so its rotation handle
        //  can be used.

        if (!image || !fabricCanvas) {
            return;
        }

        image.set({
            selectable: false,
            evented: false,
            hasControls: false,
            hasBorders: false,
        });

        /*
         * Show only the rotation control on the image.
         * Resize controls are hidden because crop mode
         * should control the crop area, not image dimensions.
         */
        image.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            tl: false,
            tr: false,
            bl: false,
            br: false,
            mtr: true,
        });

        if (cropRectRef.current) {
            return;
        }

        const imageBounds =
            image.getBoundingRect();

        /*
         * Create crop rectangle inside
         * the selected image area.
         */
        const cropRect =
            new Rect({
                left:
                    imageBounds.left +
                    imageBounds.width *
                    0.15,

                top:
                    imageBounds.top +
                    imageBounds.height *
                    0.15,

                width:
                    imageBounds.width *
                    0.7,

                height:
                    imageBounds.height *
                    0.7,

                fill:
                    "rgba(0,0,0,0.18)",

                stroke:
                    primary,

                strokeWidth:
                    2,

                strokeDashArray:
                    [6, 4],

                excludeFromExport: true,

                cornerColor:
                    primary,

                cornerStrokeColor:
                    primary,

                cornerStyle:
                    "circle",

                transparentCorners:
                    false,

                hasRotatingPoint:
                    true,

                lockRotation:
                    false,

                selectable:
                    true,

                evented:
                    true,
            });

        cropRectRef.current =
            cropRect;

        let previousCropAngle = 0;

        /*
         * Apply only the rotation difference to the actual image.
         * This prevents the image from rotating faster and faster
         * during continuous mouse movement.
         */
        cropRect.on("rotating", () => {
            const currentCropAngle =
                cropRect.angle || 0;

            const rotationDifference =
                currentCropAngle -
                previousCropAngle;

            const currentImageAngle =
                image.angle || 0;

            image.set({
                angle:
                    currentImageAngle +
                    rotationDifference,
            });

            image.setCoords();

            /*
             * Store the current crop angle so the next
             * mouse movement applies only the new difference.
             */
            previousCropAngle =
                currentCropAngle;

            /*
             * Keep the crop rectangle visually straight.
             */
            cropRect.set({
                angle: 0,
            });

            previousCropAngle = 0;

            fabricCanvas.requestRenderAll();
        });

        fabricCanvas.add(
            cropRect
        );

        fabricCanvas.setActiveObject(
            cropRect
        );

        fabricCanvas.requestRenderAll();

        setIsCropping(true);
    };

    /*
     * Apply crop.
     *
     * We export the visible crop area and then
     * reload that result as the new Fabric image.
     *
     * This approach also preserves:
     * - rotation
     * - flip
     * - zoom
     * - filters
     * - added text
     */
    const confirmCrop = () => {
        const fabricCanvas =
            fabricCanvasRef.current;

        const cropRect =
            cropRectRef.current;

        if (
            !fabricCanvas ||
            !cropRect
        ) {
            return;
        }

        const cropBounds =
            cropRect.getBoundingRect();

        const canvasWidth =
            fabricCanvas.getWidth();

        const canvasHeight =
            fabricCanvas.getHeight();

        /*
         * Keep crop area inside Fabric canvas.
         */
        const cropLeft =
            Math.max(
                0,
                cropBounds.left
            );

        const cropTop =
            Math.max(
                0,
                cropBounds.top
            );

        const cropRight =
            Math.min(
                canvasWidth,
                cropBounds.left +
                cropBounds.width
            );

        const cropBottom =
            Math.min(
                canvasHeight,
                cropBounds.top +
                cropBounds.height
            );

        const cropWidth =
            cropRight -
            cropLeft;

        const cropHeight =
            cropBottom -
            cropTop;

        if (
            cropWidth <= 5 ||
            cropHeight <= 5
        ) {
            return;
        }

        /*
         * Export selected crop region.
         */
        const croppedDataUrl =
            fabricCanvas.toDataURL({
                format: "png",

                quality: 1,

                left:
                    cropLeft,

                top:
                    cropTop,

                width:
                    cropWidth,

                height:
                    cropHeight,

                multiplier: 1,
            });

        /*
         * Remove current crop rectangle.
         */
        fabricCanvas.remove(
            cropRect
        );

        cropRectRef.current =
            null;

        setIsCropping(false);

        /*
         * Clear existing Fabric objects.
         */
        fabricCanvas
            .getObjects()
            .slice()
            .forEach((object) => {
                fabricCanvas.remove(
                    object
                );
            });

        /*
         * Load cropped result as new Fabric image.
         */
        FabricImage.fromURL(
            croppedDataUrl,
            {
                crossOrigin:
                    "anonymous",
            }
        ).then((newImage) => {
            const maxWidth =
                CANVAS_WIDTH - 40;

            const maxHeight =
                CANVAS_HEIGHT - 40;

            const imageWidth =
                newImage.width || 1;

            const imageHeight =
                newImage.height || 1;

            const widthScale =
                maxWidth /
                imageWidth;

            const heightScale =
                maxHeight /
                imageHeight;

            const fitScale =
                Math.min(
                    widthScale,
                    heightScale,
                    1
                );

            newImage.set({
                left:
                    CANVAS_WIDTH / 2,

                top:
                    CANVAS_HEIGHT / 2,

                originX:
                    "center",

                originY:
                    "center",

                scaleX:
                    fitScale,

                scaleY:
                    fitScale,

                selectable:
                    false,

                evented:
                    false,

                hasControls:
                    false,

                hasBorders:
                    false,
            });

            imageObjectRef.current =
                newImage;

            fabricCanvas.add(
                newImage
            );

            /*
             * Reset filter state because the crop
             * result already contains the applied filters.
             */
            setBrightness(0);

            setContrast(0);

            setIsGrayscale(false);

            fabricCanvas.requestRenderAll();
        });
    };

    /*
     * Cancel crop.
     */
    const cancelCrop = () => {
        const fabricCanvas =
            fabricCanvasRef.current;

        const cropRect =
            cropRectRef.current;

        if (
            cropRect &&
            fabricCanvas
        ) {
            fabricCanvas.remove(
                cropRect
            );

            fabricCanvas.requestRenderAll();
        }

        cropRectRef.current =
            null;

        setIsCropping(false);
    };

    /*
     * Download current edited image.
     */
    const downloadImage = () => {
        const fabricCanvas = fabricCanvasRef.current;

        if (!fabricCanvas) {
            return;
        }

        // Remove crop area before exporting
        const cropRect = cropRectRef.current;

        if (cropRect) {
            fabricCanvas.remove(cropRect);
            cropRectRef.current = null;
        }

        // Remove active selection controls
        fabricCanvas.discardActiveObject();
        fabricCanvas.requestRenderAll();

        // Export only the actual canvas image
        const dataUrl =
            fabricCanvas.toDataURL({
                format: "png",
                multiplier: 1,
            });

        const link =
            document.createElement("a");

        link.href = dataUrl;
        link.download = "edited-image.png";

        link.click();
    };

    /*
     * Apply final edited image back to Tiptap.
     */
    const handleApply = () => {
        const fabricCanvas =
            fabricCanvasRef.current;

        if (!fabricCanvas) {
            return;
        }

        // Remove temporary crop area
        if (cropRectRef.current) {
            fabricCanvas.remove(
                cropRectRef.current
            );

            cropRectRef.current = null;
        }

        // Remove active Fabric selection
        fabricCanvas.discardActiveObject();
        fabricCanvas.requestRenderAll();

        // Export edited image
        const dataUrl =
            fabricCanvas.toDataURL({
                format: "png",
                multiplier: 1,
            });

        if (!dataUrl) {
            return;
        }

        // Send edited image to Tiptap
        onApply(dataUrl);
    };

    /*
     * Close editor.
     */
    const handleClose = () => {
        if (
            cropRectRef.current
        ) {
            cancelCrop();
        }

        setEditorOpen(false);

        if (onClose) {
            onClose();
        }
    };

    /*
     * Common toolbar button styling.
     *
     * All colors come from NextHire theme.
     */
    const toolButtonSx = (
        active = false
    ) => ({
        minWidth: 34,

        width: 34,

        height: 34,

        padding: "7px",

        borderRadius: "9px",

        color: active
            ? "#ffffff"
            : subText,

        backgroundColor: active
            ? primary
            : inputColor,

        border:
            `1px solid ${borderStyle}`,

        transition:
            "all 0.2s ease",

        "&:hover": {
            backgroundColor:
                active
                    ? primary
                    : `${primary}14`,

            color:
                active
                    ? "#ffffff"
                    : primary,

            transform:
                "translateY(-1px)",
        },
    });

    /*
     * Floating toolbar.
     *
     * Portal ensures the toolbar is rendered
     * outside Tiptap/Paper transformed parents.
     */
    const floatingToolbar =
        toolbarPosition && (
            <Box
                sx={{
                    position:
                        "fixed",

                    top:
                        toolbarPosition.top,

                    left:
                        toolbarPosition.left,

                    transform:
                        "translateX(-50%)",

                    zIndex:
                        1600,

                    maxWidth:
                        "calc(100vw - 16px)",

                    overflowX:
                        "auto",

                    scrollbarWidth:
                        "thin",
                }}
            >
                <Box
                    sx={{
                        display:
                            "flex",

                        alignItems:
                            "center",

                        gap: 0.5,

                        padding:
                            "6px",

                        borderRadius:
                            "12px",

                        bgcolor:
                            cardColor,

                        border:
                            `1px solid ${borderStyle}`,

                        boxShadow:
                            shadowColor,

                        backdropFilter:
                            "blur(16px)",

                        whiteSpace:
                            "nowrap",
                    }}
                >
                    {isCropping ? (
                        <>
                            <Tooltip title="Apply Crop">
                                <IconButton
                                    size="small"
                                    onClick={
                                        confirmCrop
                                    }
                                    sx={toolButtonSx(
                                        true
                                    )}
                                    aria-label="Apply Crop"
                                >
                                    <Check
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Cancel Crop">
                                <IconButton
                                    size="small"
                                    onClick={
                                        cancelCrop
                                    }
                                    sx={toolButtonSx()}
                                    aria-label="Cancel Crop"
                                >
                                    <X
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip title="Crop image">
                                <IconButton
                                    size="small"
                                    onClick={
                                        startCrop
                                    }
                                    sx={toolButtonSx()}
                                    aria-label="Crop image"
                                >
                                    <Crop
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    borderColor:
                                        borderStyle,
                                    mx: 0.25,
                                }}
                            />

                            <Tooltip title="Rotate left">
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        rotateImage(
                                            -90
                                        )
                                    }
                                    sx={toolButtonSx()}
                                    aria-label="Rotate image left"
                                >
                                    <RotateCcw
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Rotate right">
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        rotateImage(
                                            90
                                        )
                                    }
                                    sx={toolButtonSx()}
                                    aria-label="Rotate image right"
                                >
                                    <RotateCw
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    borderColor:
                                        borderStyle,
                                    mx: 0.25,
                                }}
                            />

                            <Tooltip title="Zoom in">
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        zoomImage(
                                            1.1
                                        )
                                    }
                                    sx={toolButtonSx()}
                                    aria-label="Zoom in"
                                >
                                    <ZoomIn
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Zoom out">
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        zoomImage(
                                            0.9
                                        )
                                    }
                                    sx={toolButtonSx()}
                                    aria-label="Zoom out"
                                >
                                    <ZoomOut
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    borderColor:
                                        borderStyle,
                                    mx: 0.25,
                                }}
                            />

                            <Tooltip title="Flip horizontally">
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        flipImage(
                                            "horizontal"
                                        )
                                    }
                                    sx={toolButtonSx()}
                                    aria-label="Flip image horizontally"
                                >
                                    <FlipHorizontal
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Flip vertically">
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        flipImage(
                                            "vertical"
                                        )
                                    }
                                    sx={toolButtonSx()}
                                    aria-label="Flip image vertically"
                                >
                                    <FlipVertical
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip
                                title={
                                    isGrayscale
                                        ? "Remove grayscale"
                                        : "Apply grayscale"
                                }
                            >
                                <IconButton
                                    size="small"
                                    onClick={
                                        toggleGrayscale
                                    }
                                    sx={toolButtonSx(
                                        isGrayscale
                                    )}
                                    aria-label="Toggle grayscale"
                                >
                                    <ContrastIcon
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Add text">
                                <IconButton
                                    size="small"
                                    onClick={
                                        addText
                                    }
                                    sx={toolButtonSx()}
                                    aria-label="Add text to image"
                                >
                                    <Type
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Download edited image">
                                <IconButton
                                    size="small"
                                    onClick={
                                        downloadImage
                                    }
                                    sx={toolButtonSx()}
                                    aria-label="Download edited image"
                                >
                                    <Download
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    borderColor:
                                        borderStyle,
                                    mx: 0.25,
                                }}
                            />

                            <Tooltip title="Apply changes to note">
                                <IconButton
                                    size="small"
                                    onClick={
                                        handleApply
                                    }
                                    sx={toolButtonSx(
                                        true
                                    )}
                                    aria-label="Apply image changes to note"
                                >
                                    <Check
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Close image editor">
                                <IconButton
                                    size="small"
                                    onClick={
                                        handleClose
                                    }
                                    sx={toolButtonSx()}
                                    aria-label="Close image editor"
                                >
                                    <X
                                        size={
                                            17
                                        }
                                    />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                </Box>
            </Box>
        );

    return (
        <Portal>
            {/* Floating toolbar appears directly above selected Tiptap image. */}
            {floatingToolbar}

            {/* Fabric editing surface. This is NOT a Dialog/modal. */}
            {editorOpen && (
                <Box
                    sx={{
                        position:
                            "fixed",

                        left: "50%",

                        top: {
                            xs: 72,
                            sm: 90,
                        },

                        transform:
                            "translateX(-50%)",

                        zIndex:
                            1550,

                        width:
                            "min(760px, calc(100vw - 20px))",

                        maxHeight:
                            "calc(100vh - 110px)",

                        overflow:
                            "auto",

                        bgcolor:
                            cardColor,

                        border:
                            `1px solid ${borderStyle}`,

                        borderRadius:
                            "14px",

                        boxShadow:
                            shadowColor,

                        padding: {
                            xs: 1,
                            sm: 1.5,
                        },
                    }}
                >
                    {/* Editor heading */}
                    <Box
                        sx={{
                            display:
                                "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "space-between",

                            mb: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display:
                                    "flex",

                                alignItems:
                                    "center",

                                gap: 1,
                            }}
                        >
                            <ImageIcon
                                size={18}
                                color={
                                    primary
                                }
                            />

                            <Typography
                                sx={{
                                    color:
                                        subText,

                                    fontSize:
                                        "0.82rem",

                                    fontWeight:
                                        700,
                                }}
                            >
                                Image Editor
                            </Typography>
                        </Box>

                        <Typography
                            sx={{
                                color:
                                    subText,

                                fontSize:
                                    "0.72rem",
                            }}
                        >
                            Double-click text to edit
                        </Typography>
                    </Box>

                    {/* Brightness and contrast controls */}
                    <Box
                        sx={{
                            display:
                                "flex",

                            gap: 2,

                            flexWrap:
                                "wrap",

                            mb: 1.5,

                            px: 0.5,
                        }}
                    >
                        <Box
                            sx={{
                                display:
                                    "flex",

                                alignItems:
                                    "center",

                                gap: 1,

                                flex:
                                    "1 1 280px",
                            }}
                        >
                            <Sun
                                size={16}
                                color={
                                    subText
                                }
                            />

                            <Typography
                                sx={{
                                    color:
                                        subText,

                                    fontSize:
                                        "0.75rem",

                                    minWidth:
                                        65,
                                }}
                            >
                                Brightness
                            </Typography>

                            <Slider
                                size="small"
                                value={
                                    brightness
                                }
                                min={-1}
                                max={1}
                                step={0.05}
                                onChange={
                                    handleBrightnessChange
                                }
                                sx={{
                                    color:
                                        primary,
                                }}
                                aria-label="Brightness"
                            />
                        </Box>

                        <Box
                            sx={{
                                display:
                                    "flex",

                                alignItems:
                                    "center",

                                gap: 1,

                                flex:
                                    "1 1 280px",
                            }}
                        >
                            <ContrastIcon
                                size={16}
                                color={
                                    subText
                                }
                            />

                            <Typography
                                sx={{
                                    color:
                                        subText,

                                    fontSize:
                                        "0.75rem",

                                    minWidth:
                                        65,
                                }}
                            >
                                Contrast
                            </Typography>

                            <Slider
                                size="small"
                                value={
                                    contrast
                                }
                                min={-1}
                                max={1}
                                step={0.05}
                                onChange={
                                    handleContrastChange
                                }
                                sx={{
                                    color:
                                        primary,
                                }}
                                aria-label="Contrast"
                            />
                        </Box>
                    </Box>

                    {/* Fabric canvas */}
                    <Box
                        sx={{
                            display:
                                "flex",

                            justifyContent:
                                "center",

                            alignItems:
                                "center",

                            bgcolor:
                                inputColor,

                            border:
                                `1px solid ${borderStyle}`,

                            borderRadius:
                                "10px",

                            padding:
                                1,

                            overflow:
                                "auto",
                        }}
                    >
                        <canvas
                            ref={
                                canvasElementRef
                            }
                        />
                    </Box>
                </Box>
            )}
        </Portal>
    );
}