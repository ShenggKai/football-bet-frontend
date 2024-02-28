// Next.js
import { Metadata } from 'next';

// project import
import AppConfig from '@/layout/AppConfig';

interface SimpleLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Trổ Tài Dự Đoán',
    description: 'Trang web dự đoán thể thao'
};

// ========================|| Simple layout ||========================
export default function SimpleLayout({ children }: SimpleLayoutProps) {
    return (
        <>
            {children}
            <AppConfig simple />
        </>
    );
}
