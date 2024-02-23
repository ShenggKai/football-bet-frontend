'use client';

import { Sidebar } from 'primereact/sidebar';
import React, { useContext, useEffect } from 'react';
import { AppConfigProps } from '@/types';
import { LayoutContext } from './context/layoutcontext';

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
            <button className="layout-config-button config-link" type="button">
                <i className="pi pi-cog"></i>
            </button>

            <Sidebar onHide={() => {}} position="right" className="layout-config-sidebar w-20rem"></Sidebar>
        </>
    );
};

export default AppConfig;
