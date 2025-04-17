import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';

export const deleteImage = async (req: Request, res: Response) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ error: 'public_id is required' });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return res.json({ result });
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    return res.status(500).json({ error: 'Failed to delete image from Cloudinary' });
  }
};
