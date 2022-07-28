import React from 'react';
import {MeshProps, useLoader} from '@react-three/fiber';
import {NearestFilter, TextureLoader} from 'three';

interface ImageProps extends MeshProps {
    /**
     * Image URL address.
     */
    url: string;
    /**
     * Image coordinates represented as tuple of 3 numbers;
     * If passed, would override "position" props.
     */
    coordinates: [number, number, number];
    /**
     * If true, then image would be aligned by bottom. In other words, bottom pixel of image would be at image Y coordinate.
     */
    shouldAlignBottom?: boolean;
}

/**
 * ThreeJS image component.
 */
export const Image = ({
    url,
    shouldAlignBottom = true,
    coordinates,
    position,
    ...meshProps
}: ImageProps) => {
    const texture = useLoader(TextureLoader, url);
    const image = texture!.image;
    const ratio = image.height / image.width;

    const actualCoordinates = coordinates
        ? shouldAlignBottom
            ? [coordinates[0], coordinates[1] + image.height / 2 / image.width, coordinates[2]] as [number, number, number]
            : coordinates
        : null

    return <mesh {...meshProps} position={actualCoordinates || position}>
        <planeGeometry args={[1, ratio]}/>
        <meshBasicMaterial
            transparent
            map={texture}
            toneMapped={false}
            map-minFilter={NearestFilter}
            map-magFilter={NearestFilter}
        />
    </mesh>;
};