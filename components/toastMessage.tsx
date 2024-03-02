'use client';

import { useRef } from 'react';

// PrimeReact
import { Toast } from 'primereact/toast';

// ========================|| Toast message ||========================
function ToastMessage() {
    const toast = useRef<Toast>(null);

    const showSuccess = (message: string) => {
        toast.current?.show({
            severity: 'success',
            summary: 'Thành công',
            detail: message,
            life: 3000
        });
    };

    const showInfo = (message: string) => {
        toast.current?.show({
            severity: 'info',
            summary: 'Thông báo',
            detail: message,
            life: 3000
        });
    };

    const showWarn = (message: string) => {
        toast.current?.show({
            severity: 'warn',
            summary: 'Cảnh báo',
            detail: message,
            life: 3000
        });
    };

    const showError = (message: string) => {
        toast.current?.show({
            severity: 'error',
            summary: 'Lỗi',
            detail: message,
            life: 3000
        });
    };

    return { toastRef: toast, showSuccess, showInfo, showWarn, showError };
}

export default ToastMessage;
