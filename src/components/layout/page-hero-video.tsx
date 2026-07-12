"use client";

import { useEffect, useRef, useState } from "react";
import { optimizedVideo, posterFrame } from "@/lib/cloudinary";

export function PageHeroVideo({ videoUrl }: { videoUrl: string }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [loaded, setLoaded] = useState(false);

	const src = optimizedVideo(videoUrl);
	const poster = posterFrame(videoUrl);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const markLoaded = () => setLoaded(true);
		if (video.readyState >= 2) markLoaded();
		video.addEventListener("loadeddata", markLoaded);

		const attempt = video.play();
		if (attempt) attempt.catch(() => {});

		return () => video.removeEventListener("loadeddata", markLoaded);
	}, []);

	return (
		<video
			ref={videoRef}
			src={src}
			poster={poster}
			autoPlay
			muted
			loop
			playsInline
			preload="auto"
			onLoadedData={() => setLoaded(true)}
			className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
				loaded ? "opacity-100" : "opacity-0"
			}`}
		/>
	);
}
