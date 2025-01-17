import express from 'express';
import sharp from 'sharp';

const router = express.Router();

router.get('/:width/:height', async (req, res) => {
  try {
    const width = parseInt(req.params.width);
    const height = parseInt(req.params.height);

    // Input validation
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      return res.status(400).json({ error: 'Invalid dimensions' });
    }

    // Generate a placeholder image
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#666" text-anchor="middle" dominant-baseline="middle">
          ${width}x${height}
        </text>
      </svg>
    `;

    // Convert SVG to PNG using sharp
    const pngBuffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    // Set response headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

    // Send the image
    res.send(pngBuffer);
  } catch (error) {
    console.error('Error generating placeholder image:', error);
    res.status(500).json({ error: 'Error generating image' });
  }
});

export default router;
