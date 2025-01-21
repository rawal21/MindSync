import React from 'react';
import { Heart, Brain, Activity, Zap } from 'lucide-react';

const FeatureIcon = ({ type }) => {
  const icons = {
    mental: Brain,
    health: Heart,
    monitoring: Activity,
    technology: Zap
  };

  const Icon = icons[type];

  return (
    <div className="feature-icon">
      <Icon size={32} />
    </div>
  );
};

export default FeatureIcon;
