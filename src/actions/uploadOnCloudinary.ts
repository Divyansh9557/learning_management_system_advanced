"use server"
import { TRPCError } from '@trpc/server';
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadOnCloudinary = async (formData:FormData) => {

    const file = formData.get("thumbnail") as File;
  if (!file) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'No file provided',
    })
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "learning-management-app" }, (error, result) => {
        if (error) reject(error);
        resolve(result);
      })
      .end(buffer);
  });
  
  return result
}


export const uploadImage= async(file:File)=>{

      const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "learning-management-app",resource_type:"auto"}, (error, result) => {
        if (error) reject(error);
        resolve(result);
      })
      .end(buffer);
  });
  return result;
}


export async function deleteFromCloudinary(publicId: string) {
  try {
    
     publicId = publicId.split('/upload/')[1]          
       .split('/')                      
       .slice(1)                        
       .join('/')                      
       .replace(/\.[^/.]+$/, '');
    
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video',
    });

    console.log('Cloudinary delete result:', result);
    return result;
  } catch (err) {
    console.error('Error deleting from Cloudinary:', err);
    throw err;
  }
}
export async function deleteImageFromCloudinary(publicId: string) {
  try {
    
     publicId = publicId.split('/upload/')[1]          
       .split('/')                      
       .slice(1)                        
       .join('/')                      
       .replace(/\.[^/.]+$/, '');
    
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    console.log('Cloudinary delete result:', result);
    return result;
  } catch (err) {
    console.error('Error deleting from Cloudinary:', err);
    throw err;
  }
}