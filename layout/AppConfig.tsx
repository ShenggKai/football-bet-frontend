'use client';

import { useContext, useEffect } from 'react';

// project import
import { AppConfigProps } from '@/types';
import { LayoutContext } from '@/layout/context/layoutcontext';

// ========================|| App config ||========================
const AppConfig = (props: AppConfigProps) => {
    const { layoutConfig } = useContext(LayoutContext);

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    };

    useEffect(() => {
        applyScale();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig.scale]);

    return (
        <>
            <button hidden type="button"></button>
        </>
    );
};

export default AppConfig;
