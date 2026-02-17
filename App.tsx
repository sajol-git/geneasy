import React, { useState } from 'react';
import { Camera, FileText, Megaphone, Zap, ChevronRight, Activity } from 'lucide-react';
import { GlassCard } from './components/GlassCard';
import { SectionPromptBuilder } from './components/SectionPromptBuilder';
import { PromptType } from './types';
import {
  PHOTO_PROMPT_PREFIX,
  PHOTO_PROMPT_SUFFIX,
  DESCRIPTION_PROMPT_PREFIX,
  AD_COPY_PROMPT_PREFIX,
  APP_NAME,
  APP_TAGLINE
} from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PromptType>(PromptType.PHOTO);

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12 max-w-6xl">
        
        {/* Header */}
        <header className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            System Online v2.5
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
            {APP_NAME}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
            {APP_TAGLINE}
          </p>
        </header>

        {/* Navigation Tabs (Mobile) */}
        <div className="flex lg:hidden overflow-x-auto gap-2 pb-4 mb-4 snap-x">
          {Object.values(PromptType).map((type) => (
             <button
               key={type}
               onClick={() => setActiveTab(type)}
               className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all
                 ${activeTab === type 
                   ? 'bg-white/10 text-white border border-white/20' 
                   : 'text-slate-500 border border-transparent'}
               `}
             >
               {type.replace('_', ' ')}
             </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
             <div className="bg-dark-card/40 backdrop-blur-md rounded-xl border border-white/5 p-4 sticky top-8">
                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 pl-2">
                  Modules
                </h3>
                <nav className="space-y-1">
                  <SidebarItem 
                    active={activeTab === PromptType.PHOTO} 
                    onClick={() => setActiveTab(PromptType.PHOTO)}
                    icon={<Camera size={18} />}
                    label="Visual Engine"
                    color="cyan"
                  />
                  <SidebarItem 
                    active={activeTab === PromptType.DESCRIPTION} 
                    onClick={() => setActiveTab(PromptType.DESCRIPTION)}
                    icon={<FileText size={18} />}
                    label="Description Core"
                    color="purple"
                  />
                  <SidebarItem 
                    active={activeTab === PromptType.AD_COPY} 
                    onClick={() => setActiveTab(PromptType.AD_COPY)}
                    icon={<Megaphone size={18} />}
                    label="Ad Virality"
                    color="green"
                  />
                </nav>

                <div className="mt-8 pt-6 border-t border-white/5">
                   <div className="flex items-center gap-3 px-2 text-slate-500">
                      <Activity size={16} />
                      <span className="text-xs font-mono">API Status: Connected</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* Conditional Rendering based on Active Tab */}
            {activeTab === PromptType.PHOTO && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <GlassCard 
                  title="Visual Synthesis Protocol" 
                  icon={<Camera size={24} />}
                  accentColor="cyan"
                >
                  <p className="mb-6 text-slate-400 text-sm">
                    Generate high-fidelity product photography prompts and render previews using Gemini 2.5 Flash Image capabilities.
                  </p>
                  <SectionPromptBuilder
                    type={PromptType.PHOTO}
                    prefix={PHOTO_PROMPT_PREFIX}
                    suffix={PHOTO_PROMPT_SUFFIX}
                    inputLabel="Target Subject / Product Name"
                    placeholder="e.g. Neon-lit Cyberpunk Sneaker with holographic sole"
                    accentColor="cyan"
                  />
                </GlassCard>
              </div>
            )}

            {activeTab === PromptType.DESCRIPTION && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <GlassCard 
                  title="Description Core Logic" 
                  icon={<FileText size={24} />}
                  accentColor="purple"
                >
                  <p className="mb-6 text-slate-400 text-sm">
                    Synthesize high-converting product descriptions for NeedieShop, optimized for the Bangladeshi market.
                  </p>
                  <SectionPromptBuilder
                    type={PromptType.DESCRIPTION}
                    prefix={DESCRIPTION_PROMPT_PREFIX}
                    inputLabel="Reference Description / Product Details"
                    placeholder="Paste a reference description or list the product features here..."
                    accentColor="purple"
                  />
                </GlassCard>
              </div>
            )}

            {activeTab === PromptType.AD_COPY && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                 <GlassCard 
                  title="Ad Virality Matrix" 
                  icon={<Zap size={24} />}
                  accentColor="green"
                >
                  <p className="mb-6 text-slate-400 text-sm">
                    Generate high-performing Facebook ad copy in Bangla for NeedieShop, using advanced analysis of reference material.
                  </p>
                  <SectionPromptBuilder
                    type={PromptType.AD_COPY}
                    prefix={AD_COPY_PROMPT_PREFIX}
                    inputLabel="Reference Ad Copy / Campaign Details"
                    placeholder="Paste a reference ad or list key selling points for the Bangla ad copy..."
                    accentColor="green"
                  />
                </GlassCard>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Sidebar
const SidebarItem = ({ active, onClick, icon, label, color }: any) => {
  const activeStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400',
    purple: 'bg-fuchsia-500/10 text-fuchsia-400 border-r-2 border-fuchsia-400',
    green: 'bg-green-500/10 text-green-400 border-r-2 border-green-400',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group
        ${active 
          ? activeStyles[color as keyof typeof activeStyles] 
          : 'text-slate-400 hover:bg-white/5 hover:text-white'}
      `}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-bold tracking-wide text-sm">{label}</span>
      </div>
      {active && <ChevronRight size={16} className="animate-pulse" />}
    </button>
  );
};

export default App;
