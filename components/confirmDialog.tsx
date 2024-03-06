// PrimeReact
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ReactElement } from 'react';

interface ConfirmDialogProps {
    visible: boolean;
    width?: number;
    confirmMessage: ReactElement;
    onYes: () => void;
    onNo: () => void;
}

// =======================|| Confirm dialog ||=======================
export default function ConfirmDialog({
    visible,
    width = 350,
    confirmMessage,
    onYes,
    onNo
}: ConfirmDialogProps) {
    // pop-up footer
    const confirmationDialogFooter = (
        <>
            <Button
                type="button"
                label="Không"
                icon="pi pi-times"
                onClick={() => onNo()}
                text
                autoFocus
            />
            <Button type="button" label="Có" icon="pi pi-check" onClick={onYes} text />
        </>
    );

    return (
        <Dialog
            header="Xác nhận"
            visible={visible}
            onHide={() => onNo()}
            style={{ maxWidth: `${width}px` }}
            modal
            footer={confirmationDialogFooter}
        >
            <div className="flex align-items-center justify-content-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {confirmMessage}
            </div>
        </Dialog>
    );
}
