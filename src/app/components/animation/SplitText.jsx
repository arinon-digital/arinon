"use client";

import { useSprings, animated, easings } from '@react-spring/web';
import { Children, useEffect, useMemo, useRef, useState } from 'react';

/**
 * @typedef {Object} SplitTextProps
 * @property {any} children
 * @property {string} [className]
 * @property {number} [delay]
 * @property {{opacity:number, transform:string}} [animationFrom]
 * @property {{opacity:number, transform:string}} [animationTo]
 * @property {any} [easing]
 * @property {number} [duration]
 * @property {number} [threshold]
 * @property {string} [rootMargin]
 * @property {string} [textAlign]
 * @property {() => void} [onLetterAnimationComplete]
 */

/** @param {SplitTextProps} props */
const SplitText = ({
    children, // Use children instead of text prop
    className = '',
    delay = 100,
    animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
    animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
    easing = easings.easeOutCubic,
    duration = 400,
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    onLetterAnimationComplete,
}) => {
    // Normalize children -> plain text
    const text = useMemo(() => {
        if (typeof children === 'string') return children;
        const parts = Children.toArray(children).map((c) => {
            if (typeof c === 'string') return c;
            // attempt to read nested string children
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return typeof c?.props?.children === 'string' ? c.props.children : '';
        });
        return parts.join('');
    }, [children]);
    const words = text.split(' ').map(word => word.split(''));

    const letters = words.flat();
    const [inView, setInView] = useState(false);
    const ref = useRef();
    const animatedCount = useRef(0);

    useEffect(() => {
        if (!ref.current) return;
        const element = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (element) observer.unobserve(element);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    // Support string easing names passed as props (e.g., "easeOutCubic")
    const resolvedEasing = useMemo(() => {
        if (typeof easing === 'function') return easing;
        // try map string to easings
        if (typeof easing === 'string' && easing in easings) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return easings[easing] || easings.easeOutCubic;
        }
        return easings.easeOutCubic;
    }, [easing]);

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: animationFrom,
            to: inView
                ? async (next) => {
                    await next(animationTo);
                    animatedCount.current += 1;
                    if (animatedCount.current === letters.length && onLetterAnimationComplete) {
                        onLetterAnimationComplete();
                    }
                }
                : animationFrom,
            delay: i * delay,
            config: { duration, easing: resolvedEasing },
        }))
    );

    return (
        <span
            ref={ref}
            className={`split-parent ${className}`}
            style={{ textAlign, overflow: 'hidden', display: 'inline', whiteSpace: 'normal', wordWrap: 'break-word' }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {word.map((letter, letterIndex) => {
                        const index = words
                            .slice(0, wordIndex)
                            .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                        return (
                            <animated.span
                                key={index}
                                style={{
                                    ...springs[index],
                                    display: 'inline-block',
                                    willChange: 'transform, opacity',
                                }}
                            >
                                {letter}
                            </animated.span>
                        );
                    })}
                    <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
                </span>
            ))}
        </span>
    );
};

export default SplitText;