export interface AnatomyPart {
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

// Sample data for human head anatomy
export const headAnatomyParts: AnatomyPart[] = [
  {
    id: 'frontal-pole-left',
    name: 'Frontal pole (Left)',
    description: '左额极，大脑左半球的前端部分，负责高级认知功能，包括计划、决策和语言处理。',
    position: { x: 42, y: 10 },
    width: 90,
    height: 60
  },
  {
    id: 'frontal-pole-right',
    name: 'Frontal pole (Right)',
    description: '右额极，大脑右半球的前端部分，负责高级认知功能，包括空间感知和情感处理。',
    position: { x: 55, y: 10 },
    width: 90,
    height: 60
  },
  {
    id: 'temporal-pole-left',
    name: 'Temporal pole (Left)',
    description: '颞极，位于颞叶的前端，与听觉、记忆和情感处理相关。',
    position: { x: 40, y: 30 },
    width: 80,
    height: 60
  },  
  {
    id: 'temporal-pole-right',
    name: 'Temporal pole (Right)',
    description: '颞极，位于颞叶的前端，与听觉、记忆和情感处理相关。',
    position: { x: 60, y: 30 },
    width: 80,
    height: 60
  },
  {
    id: 'olfactory-bulb-left',
    name: 'Olfactory bulb and tract (Left)',
    description: '嗅球和嗅束，处理嗅觉信息的神经结构。',
    position: { x: 48, y: 22 },
    width: 40,
    height: 70
  },  
  {
    id: 'olfactory-bulb-right',
    name: 'Olfactory bulb and tract (Right)',
    description: '嗅球和嗅束，处理嗅觉信息的神经结构。',
    position: { x: 54, y: 22 },
    width: 40,
    height: 70
  },
  {
    id: 'mammillary-bodies',
    name: 'Mammillary bodies',
    description: '乳头体，与记忆功能相关的神经结构。',
    position: { x: 52, y: 47 },
    width: 37,
    height: 20
  },
  {
    id: 'midbrain',
    name: 'Midbrain',
    description: '中脑，控制视觉、听觉和运动功能的重要结构。',
    position: { x: 49, y: 58 },
    width: 85,
    height: 50
  },
  {
    id: 'occipital-pole-left',
    name: 'Occipital pole (Left)',
    description: '枕极，大脑的后端部分，主要负责视觉信息处理。',
    position: { x: 46, y: 98 },
    width: 70,
    height: 30
  },
  {
    id: 'occipital-pole-right',
    name: 'Occipital pole (Right)',
    description: '枕极，大脑的后端部分，主要负责视觉信息处理。',
    position: { x: 55, y: 98 },
    width: 70,
    height: 30
  }
];

// You can add more anatomical systems here
export const anatomySystems = {
  head: headAnatomyParts,
  // Add more systems as needed
}; 