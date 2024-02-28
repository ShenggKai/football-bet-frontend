'use client';

// Next.js
import { redirect } from 'next/navigation';

// project import
import { useAppSelector } from '@/lib/store';

interface AppLayoutProps {
    children: React.ReactNode;
}

// ========================|| Private route ||========================
export default function PrivateRoute({ children }: AppLayoutProps) {
    const authState = useAppSelector((state) => state.auth.authState);

    if (!authState) redirect('/auth/login');

    return children;
}
