import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

interface AnatomyPart {
  id: string;
  name: string;
  description: string;
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
}

interface AnatomyAtlasProps {
  imageUrl: string;
  parts: AnatomyPart[];
}

const AtlasContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: #f5f5f5;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoPanel = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  z-index: 10;
`;

const Controls = styled.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const ControlButton = styled.button`
  padding: 10px 20px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  min-width: 100px;

  &:hover {
    background: #357abd;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background: white;
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  pointer-events: none;
  z-index: 20;
`;

export function AnatomyAtlas({ imageUrl, parts }: AnatomyAtlasProps) {
  const [scale, setScale] = useState(0.8);
  const [position, setPosition] = useState({ x: 0, y: -100 });
  const [selectedPart, setSelectedPart] = useState<AnatomyPart | null>(null);
  const [hoveredPart, setHoveredPart] = useState<AnatomyPart | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showAllAreas, setShowAllAreas] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - container.left;
    const mouseY = e.clientY - container.top;

    const delta = e.deltaY;
    const newScale = Math.min(Math.max(scale - delta * 0.001, 0.5), 4);
    
    // 计算缩放导致的位置偏移
    const scaleChange = newScale / scale;
    const newPosition = {
      x: mouseX - (mouseX - position.x) * scaleChange,
      y: mouseY - (mouseY - position.y) * scaleChange
    };

    setScale(newScale);
    setPosition(newPosition);
  }, [scale, position]);

  const handlePartClick = (part: AnatomyPart) => {
    setSelectedPart(part);
  };

  const resetView = () => {
    setScale(0.8);
    setPosition({ x: 0, y: -100 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !imageRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setTooltipPosition({ x, y });
  };

  return (
    <AtlasContainer 
      ref={containerRef} 
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
    >
      <ImageContainer
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={(_, info) => {
          setPosition(prev => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y,
          }));
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%'
        }}
      >
        <div style={{
          position: 'relative',
          width: '50%',
          maxHeight: '60vh',
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center'
        }}>
          <img
            ref={imageRef}
            src={imageUrl}
            alt="大脑解剖图"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}>
            {parts.map(part => (
              <motion.div
                key={part.id}
                style={{
                  position: 'absolute',
                  left: `${part.position.x}%`,
                  top: `${part.position.y}%`,
                  width: `${part.width}px`,
                  height: `${part.height}px`,
                  border: selectedPart?.id === part.id ? '2px solid #4a90e2' : '2px solid transparent',
                  cursor: 'pointer',
                  backgroundColor: (showAllAreas || hoveredPart?.id === part.id) ? 'rgba(74, 144, 226, 0.2)' : 'transparent',
                }}
                onClick={() => handlePartClick(part)}
                onMouseEnter={() => setHoveredPart(part)}
                onMouseLeave={() => setHoveredPart(null)}
                whileHover={{ borderColor: '#6ba6e8' }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </ImageContainer>
      
      {hoveredPart && (
        <Tooltip style={{ left: tooltipPosition.x + 10, top: tooltipPosition.y + 10 }}>
          {hoveredPart.name}
        </Tooltip>
      )}
      
      {selectedPart && (
        <InfoPanel>
          <h3>{selectedPart.name}</h3>
          <p>{selectedPart.description}</p>
        </InfoPanel>
      )}

      <Controls>
        <ControlButton onClick={() => setShowAllAreas(!showAllAreas)}>
          {showAllAreas ? '隐藏区域' : '显示区域'}
        </ControlButton>
        <ControlButton onClick={resetView}>重置视图</ControlButton>
      </Controls>
    </AtlasContainer>
  );
} 