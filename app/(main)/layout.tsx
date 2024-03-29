// Next.js
import { Metadata } from 'next';

// project import
import Layout from '@/layout/layout';
import { PrivateRoute } from '@/components';
import { ChildContainerProps } from '@/types';

export const metadata: Metadata = {
    title: 'Trổ Tài Dự Đoán',
    description: 'Trang web dự đoán thể thao',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'Trổ Tài Dự Đoán',
        url: '',
        description: 'Trang web dự đoán thể thao',
        images: [
            'https://github.com/ShenggKai/football-bet-frontend/blob/master/public/images/logo.png?raw=true'
        ],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

// ========================|| Main app layout ||========================
export default function AppLayout({ children }: ChildContainerProps) {
    return (
        <Layout>
            <PrivateRoute>{children}</PrivateRoute>
        </Layout>
    );
}
