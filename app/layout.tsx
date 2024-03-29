'use client';

// prime react
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

// next
import dynamic from 'next/dynamic';

// project import
import { LayoutProvider } from '@/layout/context/layoutcontext';
import '@/styles/layout/layout.scss';
import '@/styles/demo/Demos.scss';
import { ChildContainerProps } from '@/types';

const StoreProvider = dynamic(() => import('./storeProvider'), {
    ssr: false
});

// ========================|| Root layout ||========================
export default function RootLayout({ children }: ChildContainerProps) {
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
