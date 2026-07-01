// src/lib/imageUrl.js
export function imageUrl(src) {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;            // already absolute (Cloudinary / external) → leave it
  const clean = src.startsWith('/') ? src : `https://enh.consulting/${src}`;  // turn "uploads/x.jpg" into "/uploads/x.jpg"
  return clean;                                         // relative → resolves against the current site origin
}