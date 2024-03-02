'use client';

// Next.js
import { redirect } from 'next/navigation';

// project import
import { useAppSelector } from '@/lib/store';
import { ChildContainerProps } from '@/types';

// ========================|| Private route ||========================
export default function PrivateRoute({ children }: ChildContainerProps) {
    const authState = useAppSelector((state) => state.auth.authState);

    if (!authState) redirect('/auth/login');

    return children;
}
