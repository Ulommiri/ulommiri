"use client";

import { useEffect, useRef } from "react";
import {
	Mesh,
	OrthographicCamera,
	PlaneGeometry,
	Scene,
	ShaderMaterial,
	Vector2,
	WebGLRenderer,
} from "three";

const vertexShader = /* glsl */ `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = vec4(position.xy, 0.0, 1.0);
	}
`;

const fragmentShader = /* glsl */ `
	precision highp float;
	uniform float uTime;
	uniform vec2 uResolution;
	uniform vec2 uMouse;
	varying vec2 vUv;

	float hash(vec2 p) {
		return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
	}

	float noise(vec2 p) {
		vec2 i = floor(p);
		vec2 f = fract(p);
		vec2 u = f * f * (3.0 - 2.0 * f);
		return mix(
			mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
			mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
			u.y
		);
	}

	float fbm(vec2 p) {
		float v = 0.0;
		float a = 0.5;
		for (int i = 0; i < 4; i++) {
			v += a * noise(p);
			p *= 2.0;
			a *= 0.5;
		}
		return v;
	}

	void main() {
		vec2 uv = vUv;
		float aspect = uResolution.x / uResolution.y;
		vec2 p = uv;
		p.x *= aspect;

		float t = uTime * 0.05;
		vec2 q = vec2(fbm(p * 3.0 + t), fbm(p * 3.0 - t + 5.2));
		vec2 r = vec2(fbm(p * 3.0 + q * 1.5 + t * 1.3), fbm(p * 3.0 + q * 1.5 - t));
		float f = fbm(p * 3.0 + r * 1.2);

		vec2 m = uMouse;
		m.x *= aspect;
		float d = distance(p, m);
		float ripple = sin(d * 26.0 - uTime * 2.2) * exp(-d * 6.5) * 0.5;
		f += ripple;

		vec3 obsidian = vec3(0.039, 0.02, 0.008);
		vec3 copper = vec3(0.392, 0.263, 0.16);
		vec3 gold = vec3(0.792, 0.631, 0.486);

		vec3 col = mix(obsidian, copper, smoothstep(0.2, 0.6, f));
		col = mix(col, gold, smoothstep(0.62, 0.92, f));

		float caustic = pow(smoothstep(0.72, 1.0, f), 2.0);
		col += gold * caustic * 0.45;

		float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
		col *= vig;

		gl_FragColor = vec4(col, 1.0);
	}
`;

export function WaterCanvas() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		let renderer: WebGLRenderer;
		try {
			renderer = new WebGLRenderer({ antialias: true, alpha: false });
		} catch {
			return;
		}

		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		container.appendChild(renderer.domElement);
		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";
		renderer.domElement.style.display = "block";

		const scene = new Scene();
		const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

		const uniforms = {
			uTime: { value: 0 },
			uResolution: { value: new Vector2(1, 1) },
			uMouse: { value: new Vector2(0.5, 0.5) },
		};

		const material = new ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms,
		});
		const mesh = new Mesh(new PlaneGeometry(2, 2), material);
		scene.add(mesh);

		const target = new Vector2(0.5, 0.5);

		const resize = () => {
			const { clientWidth, clientHeight } = container;
			renderer.setSize(clientWidth, clientHeight, false);
			uniforms.uResolution.value.set(clientWidth, clientHeight);
		};
		resize();

		const onPointerMove = (e: PointerEvent) => {
			const rect = container.getBoundingClientRect();
			target.set(
				(e.clientX - rect.left) / rect.width,
				1 - (e.clientY - rect.top) / rect.height
			);
		};
		container.addEventListener("pointermove", onPointerMove);
		window.addEventListener("resize", resize);

		let raf = 0;
		let visible = false;
		const start = performance.now();

		const renderFrame = (now: number) => {
			uniforms.uTime.value = (now - start) / 1000;
			uniforms.uMouse.value.lerp(target, 0.05);
			renderer.render(scene, camera);
			raf = requestAnimationFrame(renderFrame);
		};

		const startLoop = () => {
			if (!raf) raf = requestAnimationFrame(renderFrame);
		};
		const stopLoop = () => {
			if (raf) {
				cancelAnimationFrame(raf);
				raf = 0;
			}
		};

		const io = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
				if (reduce) {
					if (visible) {
						uniforms.uTime.value = 12;
						renderer.render(scene, camera);
					}
					return;
				}
				if (visible) startLoop();
				else stopLoop();
			},
			{ threshold: 0.01 }
		);
		io.observe(container);

		return () => {
			stopLoop();
			io.disconnect();
			container.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("resize", resize);
			mesh.geometry.dispose();
			material.dispose();
			renderer.dispose();
			if (renderer.domElement.parentNode === container) {
				container.removeChild(renderer.domElement);
			}
		};
	}, []);

	return <div ref={containerRef} className="absolute inset-0" aria-hidden />;
}
