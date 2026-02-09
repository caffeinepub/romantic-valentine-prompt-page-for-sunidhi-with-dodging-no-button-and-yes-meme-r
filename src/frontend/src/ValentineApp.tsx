import { useState, useRef, useCallback } from 'react';
import { Heart } from 'lucide-react';

export default function ValentineApp() {
  const [answered, setAnswered] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe bounds (keep button fully visible with padding)
    const padding = 20;
    const maxX = container.width - button.width - padding * 2;
    const maxY = container.height - button.height - padding * 2;

    // Generate random position within safe bounds
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPosition({ x: newX, y: newY });
  }, []);

  const handleYesClick = () => {
    setAnswered(true);
  };

  if (answered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4">
        <div className="text-center max-w-2xl w-full animate-in fade-in duration-700">
          <div className="mb-8 flex justify-center">
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-rose-600 mb-8">
            Good choice❤❤❤
          </h1>
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-rose-200">
            <img
              src="/assets/generated/good-choice-meme.dim_900x600.png"
              alt="Good choice meme"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4">
      <div className="text-center max-w-2xl w-full">
        <div className="mb-8 flex justify-center">
          <Heart className="w-20 h-20 text-rose-500 fill-rose-500 animate-pulse" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-rose-600 mb-4">
          Will you be my Valentine,
        </h1>
        <h2 className="text-5xl md:text-6xl font-bold text-pink-500 mb-12">
          Sunidhi🌸?
        </h2>

        <div
          ref={containerRef}
          className="relative min-h-[200px] flex items-center justify-center gap-8 p-8"
        >
          {/* Yes Button */}
          <button
            onClick={handleYesClick}
            className="px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-rose-300 active:scale-95"
          >
            Yes 💕
          </button>

          {/* No Button - Dodges on hover */}
          <button
            ref={noButtonRef}
            onPointerEnter={moveNoButton}
            onPointerMove={moveNoButton}
            style={{
              position: 'absolute',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transition: 'all 0.3s ease-out',
            }}
            className="px-12 py-6 text-2xl font-bold text-rose-600 bg-white border-4 border-rose-300 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-rose-300"
          >
            No 💔
          </button>
        </div>

        <footer className="mt-16 text-sm text-rose-400">
          © 2026. Built with <Heart className="inline w-4 h-4 fill-rose-400" /> using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-rose-600 transition-colors"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );
}
