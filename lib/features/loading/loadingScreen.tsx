import React from 'react';

// prime react
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';

// project import
import { ChildContainerProps } from '@/types';

export default function LoadingScreen({ children }: ChildContainerProps) {
    return (
        <BlockUI blocked fullScreen template={<ProgressSpinner />}>
            {children}
        </BlockUI>
    );
}
