import { useEffect, useState, useRef } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onComplete: (videoUrl: string) => void;
}

const mediaAssets = {
  video: 'https://res.cloudinary.com/dzc1dckta/video/upload/v1782894914/01c1a040-5653-4ad2-aa1a-7b7597f5f09a_jfwatg.mp4',
  images: [
    // Brand Logos
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176575/7fe50562-401b-4b07-83e0-0403e8623a7d_zlkafn.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176459/09268353-e979-4e36-b321-f47c29402a77_duggis.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176447/abc13492-b3f6-4698-aa8d-1e4963b60a56_betacv.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176433/01c4bde0-35eb-49d1-a84d-e2398dcd88bd_x55pkj.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176329/796af120-ea7e-42a3-b718-bfb58202b343_uejoyf.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176114/a6c82763-2b7e-4441-8782-e51c5c812f2e_nzkqri.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176107/05ff8729-9e5f-4052-a5bc-de8bd13c6d2f_vcr86b.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175957/4afc1aa6-05df-419a-83cf-9bd4723d886e_k2ho56.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175851/ff4a87af-4dd3-4bdf-8bd2-7b860bba3da6_blx363.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175844/ac0c201e-ac19-4e73-92aa-3fc966eae0d8_xhnwlj.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175350/61b6b1bf-8c67-48ee-844d-56d94828afd6_hdwywj.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175321/79d309c2-1b7d-40dd-b266-e11224854ad5_ehcocb.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175307/ed450ced-185d-4f24-a0e3-0a7651177f2c_buqo4l.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783174891/cb3b2fda-8bd7-47ca-bee1-202ea5a320f3_xvc7ai.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1783174850/90b4ce01-96eb-4472-8ee7-37f32131f242_rk0dis.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1781607710/Screenshot_2026-06-07_171134_o9vmc4.png',
    'https://res.cloudinary.com/dzc1dckta/image/upload/v1774343553/Gemini_Generated_Image_pu8p2ppu8p2ppu8p-removebg-preview_w0sdcy.png',
    // Section Showcase Assets
    '/about_data_systems.png',
    '/about_team_execution.png',
    '/digital-architecture.png',
    '/ecommerce.png',
    '/fintech.png',
    '/health.png',
    '/proptech.png',
    '/saas.png',
    '/services.png'
  ]
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [targetPercent, setTargetPercent] = useState(0);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEMS...');
  const [isDone, setIsDone] = useState(false);
  const videoObjectUrlRef = useRef<string>('');

  useEffect(() => {
    let imagesProgress = 0;
    let videoProgress = 0;

    const updateCombinedPercent = (imgProgress: number, vidProgress: number) => {
      // Weight: Video accounts for 75% of total loading, Images accounts for 25%
      const combined = Math.round((imgProgress * 0.25) + (vidProgress * 0.75));
      setTargetPercent(combined);
    };

    // 1. Preload Images
    let loadedImages = 0;
    const totalImages = mediaAssets.images.length;
    mediaAssets.images.forEach(url => {
      const img = new Image();
      img.src = url;
      const handleImageLoad = () => {
        loadedImages++;
        imagesProgress = Math.round((loadedImages / totalImages) * 100);
        updateCombinedPercent(imagesProgress, videoProgress);
      };
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // resolve error cases so preloader doesn't hang
    });

    // 2. Preload Video via Fetch to track direct byte percentage
    let controller = new AbortController();
    const preloadVideoAsset = async () => {
      try {
        const response = await fetch(mediaAssets.video, { signal: controller.signal });
        if (!response.ok) throw new Error('Video fetch error');
        
        const contentLength = response.headers.get('content-length');
        if (!contentLength) {
          videoProgress = 100;
          updateCombinedPercent(imagesProgress, videoProgress);
          const blob = await response.blob();
          videoObjectUrlRef.current = URL.createObjectURL(blob);
          return;
        }

        const totalBytes = parseInt(contentLength, 10);
        let loadedBytes = 0;
        const reader = response.body?.getReader();
        if (!reader) {
          videoProgress = 100;
          updateCombinedPercent(imagesProgress, videoProgress);
          const blob = await response.blob();
          videoObjectUrlRef.current = URL.createObjectURL(blob);
          return;
        }

        const chunks: BlobPart[] = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            loadedBytes += value.length;
            videoProgress = Math.round((loadedBytes / totalBytes) * 100);
            updateCombinedPercent(imagesProgress, videoProgress);
          }
        }

        const blob = new Blob(chunks, { type: 'video/mp4' });
        videoObjectUrlRef.current = URL.createObjectURL(blob);
      } catch (err) {
        // Fetch failed or aborted, fallback to direct streaming
        videoProgress = 100;
        updateCombinedPercent(imagesProgress, videoProgress);
      }
    };

    preloadVideoAsset();

    return () => {
      controller.abort();
    };
  }, []);

  // Smooth numeric counter update
  useEffect(() => {
    if (displayPercent < targetPercent) {
      const timer = setTimeout(() => {
        setDisplayPercent(prev => prev + 1);
      }, 15);
      return () => clearTimeout(timer);
    }
  }, [displayPercent, targetPercent]);

  // Status subtitle updates based on progress stages
  useEffect(() => {
    if (displayPercent < 25) {
      setStatusText('INITIALIZING COGNITIVE ENGINE...');
    } else if (displayPercent < 55) {
      setStatusText('CACHING INTERACTIVE INTERFACE...');
    } else if (displayPercent < 80) {
      setStatusText('SYNCING HIGH-RES PLATFORM MEDIA...');
    } else if (displayPercent < 100) {
      setStatusText('OPTIMIZING STACK COMPONENT REVEAL...');
    } else {
      setStatusText('SYSTEM PRELOAD COMPLETE. READY TO LAUNCH.');
      // Keep "100%" on screen briefly for premium presentation, then animate hide
      const hideTimer = setTimeout(() => {
        setIsDone(true);
        onComplete(videoObjectUrlRef.current);
      }, 700);
      return () => clearTimeout(hideTimer);
    }
  }, [displayPercent, onComplete]);

  return (
    <div className={`preloader-overlay ${isDone ? 'preloader-overlay--hidden' : ''}`}>
      <div className="preloader-content">
        {/* Glow backdrop decorative rings */}
        <div className="preloader-glow-ring" />

        {/* Typographic Digital Counter */}
        <div className="preloader-counter">
          <span className="preloader-number">{String(displayPercent).padStart(3, '0')}</span>
          <span className="preloader-unit">%</span>
        </div>

        {/* High-tech status taglines */}
        <div className="preloader-status-container">
          <p className="preloader-status-label">{statusText}</p>
          <div className="preloader-track-bar">
            <div className="preloader-progress-fill" style={{ width: `${displayPercent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
