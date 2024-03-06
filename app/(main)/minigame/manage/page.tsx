'use client';

import { useRef, useState, useEffect } from 'react';

// Prime React
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';

// project import
import { CustomToolbar, CustomDataTable, ConfirmDialog } from '@/components';
import { MinigameService } from '@/demo/service/MinigameService';
import { Demo, CustomColumn } from '@/types';
import { formatCurrency, formatDate, covertDateToString } from '@/utils/format';

// ========================|| Minigame manage page ||========================
const MiniGameManagePage = () => {
    let emptyMinigame: Demo.Minigame = {
        id: 0,
        name: '',
        money: 0,
        active_time: covertDateToString(new Date()),
        expiration_time: covertDateToString(new Date())
    };

    const dt = useRef<DataTable<any>>(null);
    const [minigames, setMinigames] = useState(null);
    const [minigame, setMinigame] = useState<Demo.Minigame>(emptyMinigame);
    const [actionType, setActionType] = useState<string>('');
    const [minigameDialog, setMinigameDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [chipsValue, setChipsValue] = useState<any[]>([]);
    const [chipsValue2, setChipsValue2] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        MinigameService.getMinigames().then((data) => setMinigames(data as any));
        setLoading(false);
    }, []);

    // add action
    const handleOpenNew = () => {
        setActionType('new');
        setMinigame(emptyMinigame);
        setMinigameDialog(true);
    };

    // delete action
    const confirmDeleteItem = (minigame: Demo.Minigame) => {
        setMinigame(minigame);
        setDeleteDialog(true);
    };

    // input number handle
    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value || 0;
        let _minigame: Demo.Minigame = { ...minigame };
        _minigame[`${name}`] = val;

        setMinigame(_minigame);
    };

    // input date handle
    const onDateChange = (e: any, name: string) => {
        let _minigame = { ...minigame };
        _minigame[`${name}`] = covertDateToString(e.target.value);
        setMinigame(_minigame);
    };

    // main table column
    const matchNameBody = (rowData: Demo.Minigame) => {
        return (
            <>
                <span className="p-column-title">name</span>
                {rowData.name}
            </>
        );
    };

    const moneyBody = (rowData: Demo.Minigame) => {
        return (
            <>
                <span className="p-column-title">money</span>
                {formatCurrency(rowData.money as number)}
            </>
        );
    };

    const activeTimeBody = (rowData: Demo.Minigame) => {
        return (
            <>
                <span className="p-column-title">active time</span>
                {formatDate(rowData.active_time)}
            </>
        );
    };

    const expirationTimeBody = (rowData: Demo.Minigame) => {
        return (
            <>
                <span className="p-column-title">expiration time</span>
                {formatDate(rowData.expiration_time)}
            </>
        );
    };

    const customColumn: CustomColumn[] = [
        {
            field: 'name',
            header: 'Minigame',
            body: matchNameBody,
            minWidth: '28rem'
        },
        {
            field: 'money',
            header: 'Số tiền',
            body: moneyBody,
            minWidth: '10rem'
        },
        {
            field: 'active_time',
            header: 'Giờ bắt đầu',
            body: activeTimeBody,
            minWidth: '12rem'
        },
        {
            field: 'expiration_time',
            header: 'Giờ kết thúc',
            body: expirationTimeBody,
            minWidth: '12rem'
        }
    ];

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <CustomToolbar dt={dt} onAdd={handleOpenNew} />

                    {/* main table data */}
                    <CustomDataTable
                        dt={dt}
                        tableName="Danh sách minigame"
                        data={minigames}
                        customColumn={customColumn}
                        isLoading={loading}
                        onView={() => {}}
                        onEdit={() => {}}
                        onDelete={confirmDeleteItem}
                    />

                    {/* add/edit match dialog */}
                    <Dialog
                        visible={minigameDialog}
                        style={{ width: '450px' }}
                        header={actionType === 'new' ? 'Tạo minigame' : 'Chỉnh sửa minigame'}
                        modal
                        className="p-fluid"
                        footer={
                            <>
                                <Button
                                    label="Hủy"
                                    icon="pi pi-times"
                                    text
                                    onClick={() => setMinigameDialog(false)}
                                />
                                <Button label="Lưu" icon="pi pi-check" text />
                            </>
                        }
                        onHide={() => setMinigameDialog(false)}
                    >
                        {/* minigame name */}
                        <div className="field">
                            <label htmlFor="name">Tên minigame</label>
                            <InputText id="name" value={minigame.name} />
                        </div>

                        {/* active time / expiration time */}
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="start">Giờ bắt đầu</label>
                                <Calendar
                                    id="start"
                                    showTime
                                    hourFormat="24"
                                    dateFormat="dd/mm/yy"
                                    value={new Date(minigame.active_time)}
                                    onChange={(e) => onDateChange(e, 'active_time')}
                                />
                            </div>

                            <div className="field col">
                                <label htmlFor="end">Giờ kết thúc</label>
                                <Calendar
                                    id="end"
                                    showTime
                                    hourFormat="24"
                                    dateFormat="dd/mm/yy"
                                    value={new Date(minigame.expiration_time)}
                                    onChange={(e) => onDateChange(e, 'expiration_time')}
                                />
                            </div>
                        </div>

                        {/* money */}
                        <div className="field">
                            <label htmlFor="money">Tiền cược</label>
                            <InputNumber
                                id="money"
                                value={minigame.money}
                                onValueChange={(e) => onInputNumberChange(e, 'money')}
                                mode="currency"
                                currency="VND"
                                locale="vi-VN"
                            />
                        </div>

                        {/* option */}
                        <div className="field">
                            <label htmlFor="option" className="mb-3">
                                Danh sách lựa chọn
                            </label>
                            <Chips
                                id="option"
                                value={chipsValue}
                                onChange={(e) => setChipsValue(e.value ?? [])}
                            />
                        </div>

                        {/* update minigame result */}
                        <div className="field">
                            <label htmlFor="correctOption">Lựa chọn đúng</label>
                            <Chips
                                id="correctOption"
                                value={chipsValue2}
                                onChange={(e) => setChipsValue2(e.value ?? [])}
                            />
                        </div>
                    </Dialog>

                    {/* config dialog when delete */}
                    <ConfirmDialog
                        visible={deleteDialog}
                        width={400}
                        confirmMessage={<span>Bạn có chắc chắn muốn xóa minigame này?</span>}
                        onYes={() => {}}
                        onNo={() => setDeleteDialog(false)}
                    />
                </div>
            </div>
        </div>
    );
};

export default MiniGameManagePage;
