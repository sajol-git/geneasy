import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  className?: string;
  accentColor?: 'cyan' | 'purple' | 'green';
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  title, 
  icon, 
  className = '',
  accentColor = 'cyan'
}) => {
  const borderColors = {
    cyan: 'border-cyan-500/30',
    purple: 'border-fuchsia-500/30',
    green: 'border-green-500/30'
  };

  const glowColors = {
    cyan: 'shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)]',
    purple: 'shadow-[0_0_30px_-5px_rgba(217,70,239,0.15)]',
    green: 'shadow-[0_0_30px_-5px_rgba(34,197,94,0.15)]'
  };
  
  const textColors = {
    cyan: 'text-cyan-400',
    purple: 'text-fuchsia-400',
    green: 'text-green-400'
  };

  return (
    <div className={`
      relative group overflow-hidden rounded-xl 
      bg-dark-card/60 backdrop-blur-xl 
      border ${borderColors[accentColor]} 
      ${glowColors[accentColor]}
      transition-all duration-500 hover:border-opacity-60
      ${className}
    `}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="relative p-6 border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-white/5 ${textColors[accentColor]}`}>
            {icon}
          </div>
          <h2 className={`text-xl font-bold tracking-widest uppercase ${textColors[accentColor]}`}>
            {title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        {children}
      </div>
    </div>
  );
};
