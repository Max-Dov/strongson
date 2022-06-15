import React from 'react';
import {MeshProps, useLoader} from '@react-three/fiber';
import {NearestFilter, TextureLoader} from 'three';

interface ImageProps extends MeshProps {
    url: string;
}

/**
 * ThreeJS image component.
 */
export const Image = ({url, ...meshProps}: ImageProps) => {
    const texture = useLoader(TextureLoader, url);
    const image = texture!.image;
    const ratio = image.width / image.height;
    return <mesh {...meshProps}>
        <planeGeometry args={[ratio, 1]}/>
        <meshBasicMaterial
            transparent
            map={texture}
            toneMapped={false}
            map-minFilter={NearestFilter}
            map-magFilter={NearestFilter}
        />
    </mesh>;
};