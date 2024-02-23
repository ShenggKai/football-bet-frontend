/* eslint-disable @next/next/no-img-element */
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { classNames } from 'primereact/utils';
import Link from 'next/link';

// project import
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';

// ==================================|| App Topbar ||==================================
const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar, toggleTheme } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            {/* logo */}
            <Link href="/" className="layout-topbar-logo">
                <img src={`/images/logo.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>Trổ Tài Dự Đoán</span>
            </Link>

            {/* Side bar toggle button */}
            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            {/* toggle button for small screen */}
            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            {/* for large screen */}
            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button" onClick={toggleTheme}>
                    <i className={`pi ${layoutConfig.colorScheme === 'light' ? 'pi-sun' : 'pi-moon'}`}></i>
                    <span>Chế độ {`${layoutConfig.colorScheme === 'light' ? 'sáng' : 'tối'}`}</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Tài khoản</span>
                </button>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
