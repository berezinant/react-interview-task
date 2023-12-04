import React, {JSX, memo, useRef} from 'react';
import {useHoveredOverlay} from './hoveredOverlay';
import './styles.css';

function CodeWordsComponent(): JSX.Element {
    const hoveredOverlayRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    useHoveredOverlay(hoveredOverlayRef.current, containerRef.current);
    const [active, setActive] = React.useState(false);

    return (
        <div ref={containerRef} className="codeWords">
            <div ref={hoveredOverlayRef} className="circledOverlay">
                &nbsp;
            </div>
            <div className="noiseOverlay">&nbsp;</div>
            <div className="content">
                <button onClick={() => setActive(true)}>Activate</button>
            </div>
        </div>
    );
}

export const CodeWords = memo(CodeWordsComponent);
