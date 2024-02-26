import React from 'react';
import { BlockUI } from 'primereact/blockui';

// project import
import { ChildContainerProps } from '@/types';

export default function LoadingScreen({ children }: ChildContainerProps) {
    return (
        <BlockUI blocked fullScreen>
            {children}
        </BlockUI>
    );
}
