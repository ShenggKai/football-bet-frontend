// PrimeReact
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';

// project import
import { ChildContainerProps } from '@/types';

// ========================|| Loading screen ||========================
export default function LoadingScreen({ children }: ChildContainerProps) {
    return (
        <BlockUI blocked fullScreen template={<ProgressSpinner />}>
            {children}
        </BlockUI>
    );
}
