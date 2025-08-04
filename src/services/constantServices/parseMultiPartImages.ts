function parseMultipartImages(multipartData: string, boundary: string) {
  const parts = multipartData.split(`--${boundary}`);
  const imageUrls = [];

  for (const part of parts) {
    const headerEndIndex = part.indexOf('\r\n\r\n');
    
    if (headerEndIndex === -1) {
      continue;
    }

    const headers = part.substring(0, headerEndIndex);
    const base64Data = part.substring(headerEndIndex + 4).trim();

    const contentTypeMatch = headers.match(/Content-Type:\s*(\S+)/i);
    const mimeType = contentTypeMatch ? contentTypeMatch[1] : 'image/png';

    if (base64Data) {
      const imageUrl = `data:${mimeType};base64,${base64Data}`;
      imageUrls.push(imageUrl);
    }
  }

  return imageUrls;
}

export default parseMultipartImages;