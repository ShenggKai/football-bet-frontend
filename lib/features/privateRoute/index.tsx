'use client';
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/lib/store';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: AppLayoutProps) {
    const authState = useAppSelector((state) => state.auth.authState);

    if (!authState) redirect('/auth/login');

    return children;
}
