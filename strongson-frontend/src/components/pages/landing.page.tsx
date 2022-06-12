import React, {Suspense} from 'react';
import {TextureLoader} from 'three';
import {Canvas, useLoader} from '@react-three/fiber';
import {MapControls} from '@react-three/drei';
import './landing.styles.scss';
import {Vector3Tuple} from 'three';

export const LandingPage = () => {

    return <section id="landing-page">
        Landing
        <Canvas orthographic camera={{position: [0, 0, 10], zoom: 100, up: [0, 0, 1], far: 10000}}>
            <Suspense fallback={null}>
                <Image url="city-lvl-1-0.png" scale={2} ratio={1.295}/>
                <Image url="city-lvl-1-0.png" position={[1, 1, 0]} ratio={1.295}/>
                <Image url="city-lvl-1-0.png" position={[-1, 1, 0]} ratio={1.295}/>
            </Suspense>
            <MapControls/>
        </Canvas>
    </section>;
};

interface ImageProps {
    url: string;
    position?: Vector3Tuple;
    /**
     * Scale of X and Y dimensions.
     */
    scale?: number;
    /**
     * Height to width relation.
     */
    ratio?: number;
}

export const Image = ({url, position, scale = 1, ratio = 1}: ImageProps) => {
    const texture = useLoader(TextureLoader, url)
    return <mesh position={position || [0, 0, 0]} scale={scale}>
        <planeGeometry args={[1 / ratio, 1]}/>
        <meshBasicMaterial transparent map={texture} toneMapped={false}/>
    </mesh>
};