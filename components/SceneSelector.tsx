import React from 'react';
import { Scene } from '../types';
import { SCENES } from '../constants';

interface SceneSelectorProps {
  selectedSceneId: string | null;
  onSelect: (scene: Scene) => void;
}

const SceneSelector: React.FC<SceneSelectorProps> = ({ selectedSceneId, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
      {SCENES.map((scene) => {
        const isSelected = selectedSceneId === scene.id;
        return (
          <button
            key={scene.id}
            onClick={() => onSelect(scene)}
            className={`
              relative overflow-hidden group rounded-xl p-1 text-left transition-all duration-300
              ${isSelected ? 'ring-2 ring-blue-500 scale-[1.02]' : 'hover:scale-[1.02] opacity-80 hover:opacity-100'}
            `}
          >
            <div className={`
              absolute inset-0 opacity-20 bg-gradient-to-br ${scene.color}
              ${isSelected ? 'opacity-40' : 'group-hover:opacity-30'}
            `} />
            
            <div className="relative bg-slate-900/90 h-full p-5 rounded-lg border border-slate-700/50 backdrop-blur-sm flex flex-col gap-3">
              <div className="text-4xl">{scene.emoji}</div>
              <div>
                <h3 className="text-lg font-bold text-white">{scene.name}</h3>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  {scene.description}
                </p>
              </div>
              
              <div className={`
                mt-auto pt-4 flex items-center text-sm font-medium
                ${isSelected ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}
              `}>
                {isSelected ? 'Selected' : 'Select Scene'}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SceneSelector;