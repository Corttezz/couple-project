export function LovePageMessage({ message }: { message: string }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm shadow-xl">
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <span className="text-2xl">💌</span>
        </div>
        
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed whitespace-pre-wrap break-words">
          {message}
        </p>
      </div>
    </div>
  );
} 