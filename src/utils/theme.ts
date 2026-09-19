import { Layers, Droplets, Sun, Activity, UserCheck, Sprout } from 'lucide-react';
import React from 'react';

export type DimensionKey = 'SOIL' | 'CLIMATE' | 'LAND' | 'BIODIVERSITY' | 'WATER' | 'HUMAN IMPACT';

export interface DimensionConfig {
  key: DimensionKey;
  label: string;
  iconName: string;
  colorName: string;
  dotColor: string;
  textColor: string;
  badgeBg: string;
  badgeBorder: string;
  borderAccent: string;
  cardBg: string;
}

export const DIMENSION_THEMES: Record<DimensionKey, DimensionConfig> = {
  SOIL: {
    key: 'SOIL',
    label: 'Soil',
    iconName: 'Layers',
    colorName: 'Warm Earth / Terracotta',
    dotColor: 'bg-amber-600',
    textColor: 'text-amber-400',
    badgeBg: 'bg-amber-950/40',
    badgeBorder: 'border-amber-700/40',
    borderAccent: 'border-amber-700/30',
    cardBg: 'bg-[#121614]'
  },
  CLIMATE: {
    key: 'CLIMATE',
    label: 'Climate',
    iconName: 'Sun',
    colorName: 'Amber / Warm Orange',
    dotColor: 'bg-orange-500',
    textColor: 'text-orange-400',
    badgeBg: 'bg-orange-950/40',
    badgeBorder: 'border-orange-700/40',
    borderAccent: 'border-orange-700/30',
    cardBg: 'bg-[#121614]'
  },
  WATER: {
    key: 'WATER',
    label: 'Water',
    iconName: 'Droplets',
    colorName: 'Blue / Cyan',
    dotColor: 'bg-sky-500',
    textColor: 'text-sky-400',
    badgeBg: 'bg-sky-950/40',
    badgeBorder: 'border-sky-700/40',
    borderAccent: 'border-sky-700/30',
    cardBg: 'bg-[#121614]'
  },
  BIODIVERSITY: {
    key: 'BIODIVERSITY',
    label: 'Biodiversity',
    iconName: 'Activity',
    colorName: 'Muted Violet / Purple',
    dotColor: 'bg-purple-500',
    textColor: 'text-purple-300',
    badgeBg: 'bg-purple-950/40',
    badgeBorder: 'border-purple-700/40',
    borderAccent: 'border-purple-700/30',
    cardBg: 'bg-[#121614]'
  },
  LAND: {
    key: 'LAND',
    label: 'Land',
    iconName: 'Sprout',
    colorName: 'Olive / Muted Green',
    dotColor: 'bg-lime-500',
    textColor: 'text-lime-400',
    badgeBg: 'bg-lime-950/40',
    badgeBorder: 'border-lime-700/40',
    borderAccent: 'border-lime-700/30',
    cardBg: 'bg-[#121614]'
  },
  'HUMAN IMPACT': {
    key: 'HUMAN IMPACT',
    label: 'Human Impact',
    iconName: 'UserCheck',
    colorName: 'Muted Red / Coral',
    dotColor: 'bg-rose-500',
    textColor: 'text-rose-400',
    badgeBg: 'bg-rose-950/40',
    badgeBorder: 'border-rose-700/40',
    borderAccent: 'border-rose-700/30',
    cardBg: 'bg-[#121614]'
  }
};

export function getDimensionTheme(dimensionName: string): DimensionConfig {
  const norm = dimensionName.toUpperCase().trim() as DimensionKey;
  return DIMENSION_THEMES[norm] || {
    key: 'LAND',
    label: dimensionName,
    iconName: 'Layers',
    colorName: 'Neutral',
    dotColor: 'bg-gray-400',
    textColor: 'text-gray-300',
    badgeBg: 'bg-white/5',
    badgeBorder: 'border-white/10',
    borderAccent: 'border-white/10',
    cardBg: 'bg-[#121614]'
  };
}
