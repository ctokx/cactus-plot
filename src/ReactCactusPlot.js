import React, { useEffect, useRef } from 'react';
import { CactusPlot } from './CactusPlot'; 

const ReactCactusPlot = ({ dataSets, options }) => {
    const canvasRef = useRef(null);
    const plotRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current && !plotRef.current) {
            plotRef.current = new CactusPlot(canvasRef.current);
        }

        const plot = plotRef.current;
        if (plot) {
            plot.dataSets = [];
            dataSets.forEach(dataSet => plot.addDataSet(dataSet));
            plot.draw(options);
        }


        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                canvasRef.current.width = width;
                canvasRef.current.height = height;
                if (plot) {
                    plot.draw(options);
                }
            }
        });

        observer.observe(canvasRef.current);

        return () => observer.disconnect();
    }, [dataSets, options]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default ReactCactusPlot;
