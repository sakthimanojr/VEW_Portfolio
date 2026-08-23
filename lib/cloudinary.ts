import crypto from 'crypto';

// SERVER-ONLY Cloudinary helpers. Do not import from client components.
// Uses direct REST calls (signed upload / destroy) so no extra SDK is required.

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

function signParams(params: Record<string, string | number>) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return crypto
    .createHash('sha1')
    .update(toSign + API_SECRET)
    .digest('hex');
}

export async function uploadImageToCloudinary(
  file: File,
  folder = 'vinayaga-engineering-works'
) {
  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = { folder, timestamp };
  const signature = signParams(paramsToSign);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', API_KEY);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);
  formData.append('folder', folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Cloudinary upload failed: ${errBody}`);
  }

  const data = await res.json();
  return {
    public_id: data.public_id as string,
    secure_url: data.secure_url as string,
    width: data.width as number,
    height: data.height as number,
  };
}

export async function deleteImageFromCloudinary(publicId: string) {
  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = { public_id: publicId, timestamp };
  const signature = signParams(paramsToSign);

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('api_key', API_KEY);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Cloudinary delete failed: ${errBody}`);
  }

  return res.json();
}

// Build an optimized, responsive Cloudinary delivery URL on the fly.
// Works for any stored secure_url without needing extra DB columns.
export function cloudinaryUrl(
  publicId: string,
  opts: { width?: number; height?: number; crop?: string } = {}
) {
  const { width, height, crop = 'fill' } = opts;
  const transforms = ['f_auto', 'q_auto'];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(',')}/${publicId}`;
}
