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

// default value
ConfirmDialog.defaultProps = {
    width: 350
};

// =======================|| Confirm dialog ||=======================
export default function ConfirmDialog(props: ConfirmDialogProps) {
    // pop-up footer
    const confirmationDialogFooter = (
        <>
            <Button
                type="button"
                label="Không"
                icon="pi pi-times"
                onClick={() => props.onNo()}
                text
                autoFocus
            />
            <Button type="button" label="Có" icon="pi pi-check" onClick={props.onYes} text />
        </>
    );

    return (
        <Dialog
            header="Xác nhận"
            visible={props.visible}
            onHide={() => props.onNo()}
            style={{ maxWidth: `${props.width}px` }}
            modal
            footer={confirmationDialogFooter}
        >
            <div className="flex align-items-center justify-content-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {props.confirmMessage}
            </div>
        </Dialog>
    );
}
