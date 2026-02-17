import React, { useState } from 'react';
import { Copy, Sparkles, Terminal } from 'lucide-react';
import { NeonButton } from './NeonButton';
import { generateTextContent, generateImageContent } from '../services/geminiService';
import { PromptType } from '../types';

interface SectionPromptBuilderProps {
  type: PromptType;
  prefix: string;
  suffix?: string;
  inputLabel: string;
  placeholder: string;
  accentColor: 'cyan' | 'purple' | 'green';
}

export const SectionPromptBuilder: React.FC<SectionPromptBuilderProps> = ({
  type,
  prefix,
  suffix = '',
  inputLabel,
  placeholder,
  accentColor
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const finalPrompt = `${prefix}${inputValue}${suffix}`;
  
  const handleExecute = async () => {
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      if (type === PromptType.PHOTO) {
        const imageBase64 = await generateImageContent(finalPrompt);
        setResult(imageBase64);
      } else {
        const text = await generateTextContent(finalPrompt);
        setResult(text);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  const accentText = {
    cyan: 'text-cyan-400',
    purple: 'text-fuchsia-400',
    green: 'text-green-400'
  }[accentColor];

  const accentBorder = {
    cyan: 'focus:border-cyan-500',
    purple: 'focus:border-fuchsia-500',
    green: 'focus:border-green-500'
  }[accentColor];

  // Dynamic button label for better UX
  const getButtonLabel = () => {
    if (isLoading) return 'Generating...';
    switch (type) {
      case PromptType.PHOTO: return 'Generate Image';
      case PromptType.DESCRIPTION: return 'Generate Description';
      case PromptType.AD_COPY: return 'Generate Ad Copy';
      default: return 'Generate Output';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Input Section */}
      <div className="space-y-2">
        <label className={`text-xs font-mono uppercase tracking-widest ${accentText}`}>
          // {inputLabel}
        </label>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:outline-none ${accentBorder} focus:ring-1 focus:ring-opacity-50 transition-all h-24 resize-none font-mono text-sm`}
        />
      </div>

      {/* Generated Prompt Preview (Read Only) */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-mono uppercase tracking-widest text-slate-500">
             Final Compiled Prompt
          </label>
          <button 
            onClick={() => copyToClipboard(finalPrompt)}
            className="text-xs flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <Copy size={12} /> Copy
          </button>
        </div>
        <div className="bg-black/60 rounded-lg p-3 border border-white/5 text-xs font-mono text-slate-400 break-words whitespace-pre-wrap">
          <span className="text-slate-600 select-none">{prefix}</span>
          <span className={accentText}>{inputValue || '...'}</span>
          <span className="text-slate-600 select-none">{suffix}</span>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex justify-end pt-2">
        <NeonButton 
          onClick={handleExecute} 
          isLoading={isLoading}
          variant={accentColor === 'cyan' ? 'primary' : accentColor === 'purple' ? 'secondary' : 'primary'}
          disabled={!inputValue.trim()}
        >
          {getButtonLabel()}
        </NeonButton>
      </div>

      {/* Results Display */}
      {result && (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className={accentText} />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Output Generated</h3>
          </div>
          
          <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
            {type === PromptType.PHOTO ? (
              <div className="relative aspect-square w-full">
                 {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={result} className="w-full h-full object-cover" />
                <a 
                  href={result} 
                  download={`nexus-gen-${Date.now()}.png`}
                  className="absolute bottom-4 right-4 bg-black/80 hover:bg-black text-white px-3 py-1 rounded text-xs backdrop-blur-md border border-white/20 transition-colors"
                >
                  Download Asset
                </a>
              </div>
            ) : (
              <div className="p-4 relative group">
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed">
                  {result}
                </pre>
                <button 
                  onClick={() => copyToClipboard(result)}
                  className="absolute top-2 right-2 p-2 bg-white/5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <Copy size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono">
          <div className="flex items-center gap-2 mb-1">
             <Terminal size={14} /> 
             <span>SYSTEM ERROR</span>
          </div>
          {error}
        </div>
      )}
    </div>
  );
};
