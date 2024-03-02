'use client';

import { useState, createContext, useContext, useEffect } from 'react';

// PrimeReact
import { PrimeReactContext } from 'primereact/api';
import { Toast } from 'primereact/toast';

// project import
import { LayoutState, ChildContainerProps, LayoutConfig, LayoutContextProps } from '@/types';
import { LoadingScreen, ToastMessage } from '@/components';

// ========================|| Layout context ||========================
export const LayoutContext = createContext({} as LayoutContextProps);

// // ========================|| Layout provider ||========================
export const LayoutProvider = ({ children }: ChildContainerProps) => {
    const { toastRef, showSuccess, showInfo, showWarn, showError } = ToastMessage();
    const { changeTheme } = useContext(PrimeReactContext);
    const [themeLight, setThemeLight] = useState(true);
    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14
    });

    const [layoutState, setLayoutState] = useState<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        isLoading: false
    });

    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                overlayMenuActive: !prevLayoutState.overlayMenuActive
            }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive
            }));
        } else {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive
            }));
        }
    };

    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: !prevLayoutState.profileSidebarVisible
        }));
    };

    const setIsLoading = (state: boolean) => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, isLoading: state }));
    };

    // function to change theme (dark/light)
    const _changeTheme = (theme: string, colorScheme: string) => {
        changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, theme, colorScheme }));
        });
    };

    const toggleTheme = () => {
        setThemeLight(!themeLight);

        if (themeLight) _changeTheme('lara-light-indigo', 'light');
        else _changeTheme('lara-dark-indigo', 'dark');
    };

    useEffect(() => {
        setThemeLight(!themeLight);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value: LayoutContextProps = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        showProfileSidebar,
        toggleTheme,
        setIsLoading,
        showSuccess,
        showInfo,
        showWarn,
        showError
    };

    return (
        <LayoutContext.Provider value={value}>
            <Toast ref={toastRef} />
            {layoutState.isLoading ? <LoadingScreen>{children}</LoadingScreen> : children}
        </LayoutContext.Provider>
    );
};
