export function LovePageHeader({ title }: { title: string }) {
  return (
    <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
          {title}
        </h1>
      </div>
      
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
} 