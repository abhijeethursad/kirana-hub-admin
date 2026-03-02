import { useRef, useState, useCallback } from "react";
import axios from "axios";
import { 
  CameraIcon, 
  CheckBadgeIcon, 
  PencilSquareIcon, 
  ArrowPathIcon,
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from "@heroicons/react/24/outline";
import { UserProfile } from "@/types/profile";
import Cropper from 'react-easy-crop';

interface Props {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  onSave: () => void;
  loading: boolean;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// --- Robust Canvas Utility (Supports Rotation) ---
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: any, rotation = 0): Promise<Blob | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const safeArea = Math.max(image.width, image.height) * 2;
  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);

  const data = ctx.getImageData(
    safeArea / 2 - image.width * 0.5 + pixelCrop.x,
    safeArea / 2 - image.height * 0.5 + pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.putImageData(data, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((file) => resolve(file!), 'image/jpeg');
  });
}

export default function ProfileHeader({ user, setUser, isEditing, setIsEditing, onSave, loading }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleAvatarClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    e.target.value = ''; 
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropAndUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setIsUploadingAvatar(true);
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      if (!croppedBlob) throw new Error("Canvas crop failed");

      const data = new FormData();
      data.append("file", croppedBlob);
      data.append("upload_preset", UPLOAD_PRESET!);

      const res = await axios.post(CLOUDINARY_URL, data);
      
      setUser(prev => ({ ...prev, avatar: res.data.secure_url }));
      cancelCrop(); 
    } catch (err) {
      console.error("Avatar upload failed", err);
      alert("Failed to upload image. Please check your connection.");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const cancelCrop = () => {
    setImageSrc(null);
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };

  return (
    <>
      {/* --- Main Profile Header --- */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 transition-transform duration-300">
        
        <style>{`
          @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
          @keyframes popIn { 0% { opacity: 0; transform: scale(0.8) translateY(10px); } 60% { transform: scale(1.1) translateY(-2px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
          .animate-slide-up { animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-slide-up-delayed { opacity: 0; animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.08s; }
          .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-stagger { opacity: 0; animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>

        {/* Avatar Display */}
        <div className="relative group shrink-0 animate-stagger" style={{ animationDelay: '0ms' }}>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          <div 
            onClick={handleAvatarClick}
            className={`relative h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-slate-50 dark:border-slate-800 overflow-hidden transition-transform duration-500 ease-out
              ${isEditing 
                ? 'cursor-pointer ring-4 ring-indigo-500/30 ring-offset-4 ring-offset-white dark:ring-offset-slate-900 opacity-90 shadow-[0_0_30px_rgba(99,102,241,0.2)]' 
                : 'shadow-lg'
              }`}
          >
            {isUploadingAvatar && !imageSrc && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 backdrop-blur-sm">
                 <ArrowPathIcon className="h-8 w-8 text-white animate-spin" />
              </div>
            )}
            <img src={user.avatar} alt="Profile" className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isUploadingAvatar && !imageSrc ? 'opacity-50' : 'opacity-100'}`} />
          </div>
          
          {isEditing && (
            <button 
              onClick={handleAvatarClick} 
              disabled={isUploadingAvatar}
              className="absolute bottom-1 right-1 p-2.5 bg-indigo-600/90 backdrop-blur-md text-white rounded-full hover:bg-indigo-700 shadow-xl shadow-indigo-500/30 active:scale-95 border-2 border-white dark:border-slate-900 animate-pop-in z-10 disabled:opacity-50 outline-none"
            >
              <CameraIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1 text-center sm:text-left space-y-1 sm:mt-2 animate-stagger" style={{ animationDelay: '100ms' }}>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{user.name}</h1>
          <p className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center sm:justify-start gap-1.5 text-sm">
            <CheckBadgeIcon className="h-5 w-5" /> {user.role}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 max-w-lg mx-auto sm:mx-0 leading-relaxed font-medium">
            {user.bio}
          </p>
        </div>

        {/* Actions */}
        <div className="shrink-0 mt-4 sm:mt-2 w-full sm:w-auto h-11 flex items-center justify-center sm:justify-end animate-stagger" style={{ animationDelay: '200ms' }}>
          {isEditing ? (
            <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button onClick={() => setIsEditing(false)} className="animate-slide-up flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-transform active:scale-95 outline-none">
                Cancel
              </button>
              <button onClick={onSave} disabled={loading || isUploadingAvatar} className="animate-slide-up-delayed flex-[2] sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed outline-none">
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="animate-slide-up w-full sm:w-auto flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-500/50 transition-transform gap-2 bg-white dark:bg-slate-700 shadow-sm active:scale-95 group outline-none">
              <PencilSquareIcon className="h-4 w-4 text-slate-400 group-hover:text-indigo-300 transition-[color]" /> 
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* 🚀 FIXED CROP MODAL: Light/Dark Support & Responsive Vertical Slider */}
      {imageSrc && (
        <div className="fixed inset-0 z-[200] flex sm:items-center sm:justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200 sm:p-6 h-full">
          
          <div className="bg-white dark:bg-slate-800 w-full h-dvh sm:h-162.5 sm:max-h-[85vh] sm:w-150 rounded-none sm:rounded-4xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 sm:border border-slate-200 dark:border-white/10">
            
            {/* Theme-Aware Header */}
            <div className="px-4 py-3 flex justify-between items-center shrink-0 z-10 text-slate-800 dark:text-white border-b border-slate-100 sm:border-transparent dark:border-white/5 pt-safe">
              <button onClick={cancelCrop} disabled={isUploadingAvatar} className="h-10 w-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors active:scale-95 disabled:opacity-50 outline-none">
                <ArrowLeftIcon className="h-6 w-6 text-slate-600 dark:text-white" />
              </button>
              <h3 className="text-[17px] font-bold sm:font-normal tracking-wide">Crop and rotate</h3>
              <button disabled={isUploadingAvatar} className="h-10 w-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors active:scale-95 disabled:opacity-50 outline-none">
                <EllipsisVerticalIcon className="h-6 w-6 text-slate-600 dark:text-white" />
              </button>
            </div>

            {/* The Cropper Container */}
            <div className="relative flex-1 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              
              <style>{`
                .reactEasyCrop_CropArea { border: 2px solid rgba(255,255,255,0.4) !important; }
                .reactEasyCrop_CropArea::before, .reactEasyCrop_CropArea::after,
                .reactEasyCrop_CropArea > div::before, .reactEasyCrop_CropArea > div::after { content: ''; position: absolute; width: 20px; height: 20px; border-color: white; border-style: solid; }
                .reactEasyCrop_CropArea::before { top: -2px; left: -2px; border-width: 4px 0 0 4px; }
                .reactEasyCrop_CropArea::after { top: -2px; right: -2px; border-width: 4px 4px 0 0; }
                .reactEasyCrop_CropArea > div::before { bottom: -2px; left: -2px; border-width: 0 0 4px 4px; }
                .reactEasyCrop_CropArea > div::after { bottom: -2px; right: -2px; border-width: 0 4px 4px 0; }
              `}</style>

              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape="round" 
                showGrid={true} 
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                classes={{
                  containerClassName: "absolute inset-0",
                  mediaClassName: "opacity-100"
                }}
              />

              {/* 🚀 THE RESPONSIVE ZOOM SLIDER (Horizontal on Mobile, Vertical on Right side Desktop) */}
              <div className="absolute 
                bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[320px] 
                sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:left-auto sm:right-6 sm:translate-x-0 sm:w-auto sm:h-auto 
                bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl px-4 py-2.5 sm:px-2.5 sm:py-4 
                rounded-full shadow-lg dark:shadow-2xl border border-slate-200 dark:border-white/5 
                flex flex-row sm:flex-col-reverse items-center gap-4 z-50"
              >
                {/* Zoom Out (Minus) */}
                <button onClick={() => setZoom(Math.max(1, zoom - 0.1))} className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-transform active:scale-90 outline-none shrink-0">
                  <MagnifyingGlassMinusIcon className="h-5 w-5" />
                </button>
                
                {/* 🚀 Geometry Wrapper: Shifts horizontal input to vertical visually on sm screens */}
                <div className="flex-1 sm:flex-none flex items-center justify-center sm:h-[160px] sm:w-4">
                  <input 
                    type="range" min={1} max={3} step={0.05} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} 
                    className="w-full sm:w-[160px] sm:-rotate-90 origin-center h-1 bg-slate-300 dark:bg-white/20 rounded-full appearance-none outline-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
                      [&::-webkit-slider-thumb]:bg-indigo-600 dark:[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md 
                      [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-125"
                  />
                </div>

                {/* Zoom In (Plus) */}
                <button onClick={() => setZoom(Math.min(3, zoom + 0.1))} className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-transform active:scale-90 outline-none shrink-0">
                  <MagnifyingGlassPlusIcon className="h-5 w-5" />
                </button>
              </div>

            </div>

            {/* Theme-Aware Footer Controls */}
            <div className="pb-8 pt-6 px-6 bg-white dark:bg-slate-800 flex flex-col items-center gap-6 shrink-0 z-10 pb-safe">
              
              {/* Rotate Button */}
              <button 
                onClick={() => setRotation(r => r + 90)} 
                disabled={isUploadingAvatar}
                className="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white group outline-none disabled:opacity-50"
              >
                <div className="p-3.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:group-hover:bg-slate-600 rounded-xl transition-colors active:scale-95 shadow-sm dark:shadow-inner">
                  <ArrowPathIcon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium tracking-wide">Rotate</span>
              </button>

              {/* Next / Save Button */}
              <button 
                onClick={handleCropAndUpload} 
                disabled={isUploadingAvatar} 
                className="w-[120px] py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center outline-none shadow-sm"
              >
                {isUploadingAvatar ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}