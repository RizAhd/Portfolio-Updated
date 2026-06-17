import React from 'react';
import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';

type WavePathProps = React.ComponentProps<'div'>;

export function WavePath({ className, ...props }: WavePathProps) {
	const path = useRef<SVGPathElement>(null);
	const progress = useRef(0);
	const x = useRef(0.5);
	const time = useRef(Math.PI / 2);
	const reqId = useRef<number | null>(null);

	const setPath = (value: number) => {
		const width = window.innerWidth;
		if (path.current) {
			path.current.setAttributeNS(
				null,
				'd',
				`M0 100 Q${width * x.current} ${100 + value * 0.6}, ${width} 100`,
			);
		}
	};

	useEffect(() => {
		setPath(progress.current);
		const onResize = () => setPath(progress.current);
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

	const manageMouseEnter = () => {
		if (reqId.current) {
			cancelAnimationFrame(reqId.current);
			resetAnimation();
		}
	};

	const manageMouseMove = (e: React.MouseEvent) => {
		const { movementY, clientX } = e;
		if (path.current) {
			const pathBound = path.current.getBoundingClientRect();
			x.current = (clientX - pathBound.left) / pathBound.width;
			progress.current += movementY;
			setPath(progress.current);
		}
	};

	const manageMouseLeave = () => {
		animateOut();
	};

	const animateOut = () => {
		const newProgress = progress.current * Math.sin(time.current);
		progress.current = lerp(progress.current, 0, 0.025);
		time.current += 0.2;
		setPath(newProgress);
		if (Math.abs(progress.current) > 0.75) {
			reqId.current = requestAnimationFrame(animateOut);
		} else {
			resetAnimation();
		}
	};

	const resetAnimation = () => {
		time.current = Math.PI / 2;
		progress.current = 0;
	};

	return (
		<div className={cn('relative h-px w-full', className)} {...props}>
			<div
				onMouseEnter={manageMouseEnter}
				onMouseMove={manageMouseMove}
				onMouseLeave={manageMouseLeave}
				className="relative -top-5 z-10 h-10 w-full hover:-top-37.5 hover:h-75"
			/>
			<svg className="absolute -top-25 h-75 w-full">
				<path ref={path} className="fill-none stroke-current" strokeWidth={2} />
			</svg>
		</div>
	);
}
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
