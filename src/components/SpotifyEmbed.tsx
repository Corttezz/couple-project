export function SpotifyEmbed({ url }: { url: string }) {
  // Converter URL normal para URL de embed
  // Ex: https://open.spotify.com/track/ID -> https://open.spotify.com/embed/track/ID
  const getEmbedUrl = (spotifyUrl: string) => {
    try {
      if (!spotifyUrl) return '';
      
      // Se já for uma URL de embed, retorna como está
      if (spotifyUrl.includes('/embed/')) return spotifyUrl;
      
      // Extrair tipo (track, album, playlist) e ID
      const urlParts = spotifyUrl.split('spotify.com/');
      if (urlParts.length < 2) return '';
      
      const typeAndId = urlParts[1];
      return `https://open.spotify.com/embed/${typeAndId}`;
    } catch (error) {
      console.error('Erro ao processar URL do Spotify:', error);
      return '';
    }
  };

  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className="w-full aspect-[16/5] rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="w-full h-full"
      ></iframe>
    </div>
  );
} 