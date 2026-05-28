import { useState, useRef, useEffect } from 'react';
import type { IFurnitureCard } from '../modules/cards';
import { cosineSimilarity } from '../modules/math';

export interface IProcessedCard extends IFurnitureCard {
    score: number;
    isVisible: boolean;
}

export const useCardSearch = (initialItems: IFurnitureCard[]) => {
    const [items, setItems] = useState<IProcessedCard[]>(
        initialItems.map(item => ({ ...item, score: 0, isVisible: true }))
    );
    const [imageEmbedding, setImageEmbedding] = useState<number[] | null>(null);
    const [ready, setReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        workerRef.current = new Worker(new URL('../workers/search.worker.ts', import.meta.url), { type: 'module' });
        workerRef.current.onmessage = (e) => {
            const { type, data } = e.data;
            switch (type) {
                case 'progress':
                    if (data.status === 'progress') setProgress(data.progress);
                    else if (data.status === 'ready') setReady(true);
                    break;
                case 'text_embeddings_ready':
                    setItems(prev => prev.map(item => ({ ...item, embedding: data[item.id] })));
                    setReady(true);
                    break;
                case 'image_embedding_ready':
                    setImageEmbedding(data);
                    break;
            }
        };
        workerRef.current.postMessage({ type: 'init', data: initialItems });
        return () => workerRef.current?.terminate();
    }, []);

    useEffect(() => {
        if (!imageEmbedding) return;
        setItems(prevItems => {
            if (!prevItems[0]?.embedding) return prevItems;
            const threshold = 0.005;
            const processed = prevItems.map(item => {
                if (!item.embedding) return item;
                const similarity = cosineSimilarity(imageEmbedding, item.embedding as number[]);
                return { ...item, score: similarity, isVisible: similarity > threshold };
            });
            processed.sort((a, b) => b.score - a.score);
            return processed;
        });
    }, [imageEmbedding]);

    const searchByImage = (file: File) => workerRef.current?.postMessage({ type: 'image', data: file });
    const resetSearch = () => {
        setImageEmbedding(null);
        setItems(prev => [...prev].sort((a, b) => a.id - b.id).map(item => ({ ...item, score: 0, isVisible: true })));
    };

    return { items, ready, progress, imageEmbedding, searchByImage, resetSearch };
};