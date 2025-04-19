import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import { db, FieldValue } from '../firebase';

export const deleteImage = async (req: Request, res: Response) => {
  const { public_id, userId } = req.body;

  console.log('Incoming delete request:', req.body);

  if (!public_id || !userId) {
    return res.status(400).json({ error: 'public_id and userId are required' });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    console.log('Cloudinary deletion result:', result);

    const userRef = db.doc(`users/${userId}`);
    await userRef.update({
      photoURL: FieldValue.delete(),
      photoPublicId: FieldValue.delete()
    });

    return res.json({ result });
  } catch (error) {
    console.error('Cloudinary deletion or Firestore update failed:', error);
    return res.status(500).json({ error: 'Failed to delete image or update user metadata' });
  }
};
