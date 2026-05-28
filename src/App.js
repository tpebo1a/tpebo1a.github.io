import React, { useState, useRef, useEffect, useCallback } from "react";
import cv from "@techstark/opencv-js";
import { Tensor, InferenceSession } from "onnxruntime-web";
import Loader from "./components/loader";
import { detectImage } from "./utils/detect";
import { useCardSearch } from "./hooks/useCardSearch";
import { CARDS_MOCK } from "./modules/cards";
import "./style/App.css";

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState({ text: "Loading OpenCV.js", progress: null });
  const [image, setImage] = useState(null);
  const inputImage = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  // CLIP search hook
  const { items, ready, progress, imageEmbedding, searchByImage, resetSearch } = useCardSearch(CARDS_MOCK);

  // configs
  const modelName = "best_one.onnx";
  const modelInputShape = [1, 3, 640, 640];
  const topk = 100;
  const iouThreshold = 0.45;
  const scoreThreshold = 0.25;

  // wait until opencv.js initialized
  cv["onRuntimeInitialized"] = async () => {
    setLoading({ text: "Loading model...", progress: null });
    const yolov8 = await InferenceSession.create('./best_one.onnx');
    setLoading({ text: "Warming up nms...", progress: null });
    const nms = await InferenceSession.create('./nms-yolov8.onnx');
    setLoading({ text: "Warming up mask...", progress: null });
    const mask = await InferenceSession.create('./mask-yolov8-seg.onnx');
    setLoading({ text: "Warming up model...", progress: null });
    const tensor = new Tensor(
      "float32",
      new Float32Array(modelInputShape.reduce((a, b) => a * b)),
      modelInputShape
    );
    await yolov8.run({ images: tensor });
    setSession({ net: yolov8, nms: nms, mask: mask });
    setLoading(null);
  };

  // After segmentation: crop detected region from canvas and send to CLIP
  const searchSegmentedObject = useCallback((canvas, box) => {
    if (!box) return;
    const { x, y, w, h } = box;
    if (w <= 0 || h <= 0) return;

    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = w;
    cropCanvas.height = h;
    const cropCtx = cropCanvas.getContext("2d");
    // Draw the original image region (not the mask overlay) onto the crop canvas
    cropCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);
    cropCanvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "segment_crop.jpg", { type: "image/jpeg" });
        searchByImage(file);
      }
    }, "image/jpeg", 0.9);
  }, [searchByImage]);

  // Group visible items by class for display
  const groupedItems = items.reduce((acc, item) => {
    if (!item.isVisible) return acc;
    const cls = item.classLabel;
    if (!acc[cls]) acc[cls] = [];
    acc[cls].push(item);
    return acc;
  }, {});

  const hasSearchResults = imageEmbedding !== null;

  return (
    <div className="App">
      {loading && (
        <Loader>
          {loading.progress ? `${loading.text} - ${loading.progress}%` : loading.text}
        </Loader>
      )}

      {/* ── Header ── */}
      <div className="header">
        <h1>YOLOv8 Object Segmentation App</h1>
        <p>
          YOLOv8 object detection application live on browser powered by{" "}
          <code>onnxruntime-web</code>
        </p>
        <p>
          Serving : <code className="code">{modelName}</code>
        </p>
      </div>

      {/* ── Segmentation canvas ── */}
      <div className="content">
        <img
          ref={imageRef}
          src="#"
          alt=""
          style={{ display: image ? "block" : "none" }}
          onLoad={() => {
            detectImage(
              imageRef.current,
              canvasRef.current,
              session,
              topk,
              iouThreshold,
              scoreThreshold,
              modelInputShape
            );
          }}
        />
        <canvas
          id="canvas"
          width={modelInputShape[2]}
          height={modelInputShape[3]}
          ref={canvasRef}
        />
      </div>

      {/* ── File controls ── */}
      <input
        type="file"
        ref={inputImage}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          if (image) {
            URL.revokeObjectURL(image);
            setImage(null);
          }
          const url = URL.createObjectURL(e.target.files[0]);
          imageRef.current.src = url;
          setImage(url);
          // Reset previous CLIP results when new image is loaded
          resetSearch();
        }}
      />
      <div className="btn-container">
        <button onClick={() => inputImage.current.click()}>
          Open local image
        </button>
        {image && (
          <button
            onClick={() => {
              inputImage.current.value = "";
              imageRef.current.src = "#";
              URL.revokeObjectURL(image);
              setImage(null);
              resetSearch();
            }}
          >
            Close image
          </button>
        )}
        {/* Button: crop full canvas and search via CLIP */}
        {image && session && (
          <button
            className="btn-search-clip"
            disabled={!ready}
            onClick={() => {
              const canvas = canvasRef.current;
              if (!canvas) return;
              // Crop the full canvas content (the segmented result) and send to CLIP
              canvas.toBlob((blob) => {
                if (blob) {
                  const file = new File([blob], "segment.jpg", { type: "image/jpeg" });
                  searchByImage(file);
                }
              }, "image/jpeg", 0.9);
            }}
          >
            {ready ? "🔍 Найти похожие карточки" : "Загрузка CLIP..."}
          </button>
        )}
        {hasSearchResults && (
          <button className="btn-reset-clip" onClick={resetSearch}>
            ✕ Сбросить поиск
          </button>
        )}
      </div>

      {/* ── CLIP loading progress ── */}
      {!ready && (
        <div className="clip-progress-bar">
          <span>Загрузка CLIP-модели: {Math.round(progress)}%</span>
          <div className="clip-progress-track">
            <div className="clip-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* ── Card search results section ── */}
      <div className="cards-section">
        <h2 className="cards-section-title">
          {hasSearchResults ? "Результаты поиска по изображению" : "Каталог карточек"}
        </h2>

        {hasSearchResults && imageEmbedding && (
          <p className="cards-section-hint">
            Карточки отсортированы по степени сходства с загруженным изображением
          </p>
        )}

        {/* Render by class groups */}
        {(hasSearchResults
          ? [{ label: null, cards: items.filter(i => i.isVisible) }]
          : Object.entries(
              CARDS_MOCK.reduce((acc, item) => {
                if (!acc[item.classLabel]) acc[item.classLabel] = [];
                acc[item.classLabel].push({ ...item, score: 0, isVisible: true });
                return acc;
              }, {})
            ).map(([label, cards]) => ({ label, cards }))
        ).map(({ label, cards }, groupIdx) => (
          <div key={groupIdx} className="cards-group">
            {label && <h3 className="cards-group-title">{label}</h3>}
            <div className="cards-grid">
              {cards.map((item) => (
                <div
                  key={item.id}
                  className={`card-item ${item.score > 0.01 ? "card-item--match" : ""}`}
                >
                  <div className="card-image-wrap">
                    <img src={item.image} alt={item.name} className="card-image" />
                    {item.score > 0 && (
                      <span className="card-score-badge">
                        {(item.score * 100).toFixed(1)}%
                      </span>
                    )}
                  </div>
                  <div className="card-body">
                    <p className="card-name">{item.name}</p>
                    <p className="card-class">{item.classLabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
