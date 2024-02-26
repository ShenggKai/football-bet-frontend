'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import dynamic from 'next/dynamic';

// project import
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';

const StoreProvider = dynamic(() => import('./storeProvider'), {
    ssr: false
});

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <head>
                <link
                    id="theme-css"
                    href={`/themes/lara-light-indigo/theme.css`}
                    rel="stylesheet"
                ></link>
            </head>
            <body>
                <StoreProvider>
                    <PrimeReactProvider>
                        <LayoutProvider>{children}</LayoutProvider>
                    </PrimeReactProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
