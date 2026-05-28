import { useState, useRef, useEffect, useCallback } from 'react';
import { cosineSimilarity } from '../modules/math';

export const useCardSearch = (initialItems) => {
  const [items, setItems] = useState(
    initialItems.map((item) => ({ ...item, score: 0, isVisible: true }))
  );
  const [imageEmbedding, setImageEmbedding] = useState(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/search.worker.js', import.meta.url),
      { type: 'module' }
    );
    workerRef.current.onmessage = (e) => {
      const { type, data } = e.data;
      switch (type) {
        case 'progress':
          if (data.status === 'progress') setProgress(data.progress ?? 0);
          else if (data.status === 'ready') setReady(true);
          break;
        case 'text_embeddings_ready':
          setItems((prev) =>
            prev.map((item) => ({ ...item, embedding: data[item.id] }))
          );
          setReady(true);
          break;
        case 'image_embedding_ready':
          setImageEmbedding(data);
          break;
        default:
          break;
      }
    };
    workerRef.current.postMessage({ type: 'init', data: initialItems });
    return () => workerRef.current?.terminate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!imageEmbedding) return;
    setItems((prevItems) => {
      if (!prevItems[0]?.embedding) return prevItems;
      const threshold = 0.005;
      const processed = prevItems.map((item) => {
        if (!item.embedding) return item;
        const similarity = cosineSimilarity(imageEmbedding, item.embedding);
        return { ...item, score: similarity, isVisible: similarity > threshold };
      });
      processed.sort((a, b) => b.score - a.score);
      return processed;
    });
  }, [imageEmbedding]);

  const searchByImage = useCallback((file) => {
    workerRef.current?.postMessage({ type: 'image', data: file });
  }, []);

  const resetSearch = useCallback(() => {
    setImageEmbedding(null);
    setItems((prev) =>
      [...prev]
        .sort((a, b) => a.id - b.id)
        .map((item) => ({ ...item, score: 0, isVisible: true }))
    );
  }, []);

  return { items, ready, progress, imageEmbedding, searchByImage, resetSearch };
};