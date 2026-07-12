const CLOUDINARY_UPLOAD = "/video/upload/";

export function optimizedVideo(url: string) {
	if (!url.includes(CLOUDINARY_UPLOAD)) return url;
	return url.replace(
		CLOUDINARY_UPLOAD,
		`${CLOUDINARY_UPLOAD}q_auto,w_1920,c_limit/`
	);
}

export function filmVideo(url: string) {
	if (!url.includes(CLOUDINARY_UPLOAD)) return url;
	return url.replace(CLOUDINARY_UPLOAD, `${CLOUDINARY_UPLOAD}q_auto/`);
}

export function posterFrame(url: string) {
	if (!url.includes(CLOUDINARY_UPLOAD)) return undefined;
	return url
		.replace(CLOUDINARY_UPLOAD, `${CLOUDINARY_UPLOAD}so_0,q_auto,f_auto/`)
		.replace(/\.(mp4|webm|mov|m4v)$/i, ".jpg");
}
