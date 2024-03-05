'use client';

import React, { useEffect, useRef, useState, useContext } from 'react';

// PrimeReact
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { Divider } from 'primereact/divider';

// project import
import { Demo } from '@/types';
import { MatchService } from '@/demo/service/MatchService';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { ConfirmDialog } from '@/components';
import { formatDate, covertDateToString } from '@/utils/format';

// type
interface InputValue {
    index: number;
    name: string;
}

// ========================|| Match page ||========================
/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const MatchPage = () => {
    let emptyMatch: Demo.Match = {
        id: 0,
        chap: '0',
        name: '',
        money: 0,
        time: covertDateToString(new Date()),
        status: 'Sắp diễn ra',
        options: [],
        vote_correct: 0,
        vote_wrong: 0,
        vote_sum: 0,
        score: '0 : 0'
    };

    // dropdown to select season
    const [selectedSeason, setSelectedSeason] = useState(0);

    const matchValues: InputValue[] = [
        { name: 'EURO 2024', index: 0 },
        { name: 'Champions League 2023', index: 1 },
        { name: 'World Cup 2022', index: 2 }
    ];

    const { showError, showSuccess } = useContext(LayoutContext);
    const [matches, setMatches] = useState(null);
    const [matchDetail, setMatchDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState<string>('');
    const [chipsValue, setChipsValue] = useState<any[]>([]);
    const [matchDialog, setMatchDialog] = useState(false);
    const [matchDetailDialog, setMatchDetailDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [match, setMatch] = useState<Demo.Match>(emptyMatch);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    useEffect(() => {
        setLoading(true);
        MatchService.getMatches().then((data) => setMatches(data as any));
        MatchService.getMatchDetail().then((data) => setMatchDetail(data as any));
        // setTimeout(() => {
        setLoading(false);
        // }, 5000);
    }, []);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    };

    const openNew = () => {
        setActionType('new');
        setMatch(emptyMatch);
        setMatchDialog(true);
    };

    const hideDialog = () => {
        setMatchDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const saveMatch = () => {
        showSuccess('Thêm trận thành công');
        setMatchDialog(false);
        // setMatch(emptyMatch);

        console.log(match);
    };

    const editMatch = (match: Demo.Match) => {
        setActionType('edit');
        setMatch({ ...match });
        setMatchDialog(true);
    };

    const viewMatch = (match: Demo.Match) => {
        setActionType('info');
        setMatch({ ...match });
        setMatchDetailDialog(true);
    };

    const confirmDeleteItem = (match: Demo.Match) => {
        setMatch(match);
        setDeleteProductDialog(true);
    };

    const deleteItem = () => {
        let _products = (matches as any)?.filter((val: any) => val.id !== match.id);
        setMatches(_products);
        setDeleteProductDialog(false);
        setMatch(emptyMatch);
        showSuccess('Xoá trận thành công');
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const onDateChange = (e: any) => {
        let _match = { ...match };
        _match['time'] = covertDateToString(e.target.value);
        setMatch(_match);
    };

    const onInputTextChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        name: string
    ) => {
        const val = (e.target && e.target.value) || '';
        let _match = { ...match };
        _match[`${name}`] = val;

        setMatch(_match);
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value || 0;
        let _match: Demo.Match = { ...match };
        _match[`${name}`] = val;

        setMatch(_match);
    };

    const leftToolbar = () => {
        return (
            <>
                <div className="my-2">
                    <Dropdown
                        className="w-full md:w-18rem"
                        value={selectedSeason}
                        options={matchValues}
                        onChange={(e) => setSelectedSeason(e.value)}
                        optionValue="index"
                        optionLabel="name"
                        placeholder="Select"
                    />
                </div>
            </>
        );
    };

    const rightToolbar = () => {
        return (
            <>
                <Button
                    label="Thêm"
                    icon="pi pi-plus"
                    severity="success"
                    onClick={openNew}
                    className="mr-2 inline-block"
                />
                <Button label="Xuất" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </>
        );
    };

    const indexBody = (data: any, props: any) => {
        let index = parseInt(props.rowIndex + 1);
        return (
            <>
                <span>{index}</span>
            </>
        );
    };

    const matchNameBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">name</span>
                {rowData.name}
            </>
        );
    };

    const moneyBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">money</span>
                {formatCurrency(rowData.money as number)}
            </>
        );
    };

    const chapBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">chap</span>
                {rowData.chap}
            </>
        );
    };

    const timeBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">time</span>
                {formatDate(rowData.time)}
            </>
        );
    };

    const voteCorrectBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">voteCorrect</span>
                {rowData.vote_correct}
            </>
        );
    };

    const voteWrongBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">voteWrong</span>
                {rowData.vote_wrong}
            </>
        );
    };

    const voteSumBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">voteSum</span>
                {rowData.vote_sum}
            </>
        );
    };

    const scoreBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">score</span>
                {rowData.score}
            </>
        );
    };

    const actionBody = (rowData: Demo.Match) => {
        return (
            <>
                <Button
                    icon="pi pi-info"
                    rounded
                    text
                    severity="info"
                    className="mr-2"
                    onClick={() => viewMatch(rowData)}
                />
                <Button
                    icon="pi pi-pencil"
                    rounded
                    text
                    severity="success"
                    className="mr-2"
                    onClick={() => editMatch(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    text
                    severity="warning"
                    onClick={() => confirmDeleteItem(rowData)}
                />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Danh sách trận đấu</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => console.log(e.currentTarget.value)}
                    placeholder="Tìm kiếm"
                />
            </span>
        </div>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" start={leftToolbar} end={rightToolbar}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={matches}
                        selectionMode="single"
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value as any)}
                        dataKey="id"
                        loading={loading}
                        paginator
                        scrollable
                        removableSort
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Hiển thị {first} đến {last} trong {totalRecords} trận đấu"
                        globalFilter={globalFilter}
                        emptyMessage="Không tìm thấy trận đấu"
                        header={header}
                    >
                        <Column header="STT" body={indexBody} align={'center'}></Column>
                        <Column
                            field="name"
                            header="Trận đấu"
                            sortable
                            body={matchNameBody}
                            headerStyle={{ minWidth: '17rem' }}
                            align="center"
                        ></Column>
                        <Column
                            field="chap"
                            header="Tỉ lệ chấp"
                            sortable
                            body={chapBody}
                            headerStyle={{ minWidth: '9rem' }}
                            align="center"
                        ></Column>
                        <Column
                            field="money"
                            header="Số tiền"
                            body={moneyBody}
                            sortable
                            headerStyle={{ minWidth: '10rem' }}
                            align="center"
                        ></Column>
                        <Column
                            field="time"
                            header="Giờ bóng lăn"
                            sortable
                            body={timeBody}
                            headerStyle={{ minWidth: '12rem' }}
                            align="center"
                        ></Column>
                        <Column
                            field="score"
                            header="Tỉ số"
                            sortable
                            body={scoreBody}
                            headerStyle={{ minWidth: '6rem' }}
                            align="center"
                        ></Column>
                        <Column
                            field="vote_correct"
                            header="Vote đúng"
                            sortable
                            body={voteCorrectBody}
                            headerStyle={{ minWidth: '9rem' }}
                            align="center"
                        ></Column>
                        <Column
                            field="vote_wrong"
                            header="Vote sai"
                            sortable
                            body={voteWrongBody}
                            headerStyle={{ minWidth: '8rem' }}
                            align="center"
                        ></Column>
                        <Column
                            field="vote_sum"
                            header="Tổng vote"
                            sortable
                            body={voteSumBody}
                            headerStyle={{ minWidth: '9rem' }}
                            align="center"
                        ></Column>
                        <Column
                            body={actionBody}
                            headerStyle={{ minWidth: '12rem' }}
                            frozen
                            alignFrozen="right"
                            align="center"
                        ></Column>
                    </DataTable>

                    {/* match detail dialog */}
                    <Dialog
                        visible={matchDialog}
                        style={{ width: '450px' }}
                        header={actionType === 'new' ? 'Tạo trận đấu' : 'Chỉnh sửa trận đấu'}
                        modal
                        className="p-fluid"
                        footer={
                            <>
                                <Button label="Hủy" icon="pi pi-times" text onClick={hideDialog} />
                                <Button label="Lưu" icon="pi pi-check" text onClick={saveMatch} />
                            </>
                        }
                        onHide={hideDialog}
                    >
                        {/* Ten tran dau */}
                        <div className="field">
                            <label htmlFor="name">Tên trận đấu</label>
                            <InputText id="name" value={match.name} />
                        </div>

                        {/* ti le chap */}
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="chap">Tỉ lệ chấp</label>
                                <InputText
                                    id="chap"
                                    value={match.chap}
                                    onChange={(e) => onInputTextChange(e, 'chap')}
                                />
                            </div>

                            {/* money */}
                            <div className="field col">
                                <label htmlFor="money">Tiền cược</label>
                                <InputNumber
                                    id="money"
                                    value={match.money}
                                    onValueChange={(e) => onInputNumberChange(e, 'money')}
                                    mode="currency"
                                    currency="VND"
                                    locale="vi-VN"
                                />
                            </div>
                        </div>

                        {/* time */}
                        <div className="field">
                            <label htmlFor="description">Thời điểm bóng lăn</label>
                            <Calendar
                                showTime
                                hourFormat="24"
                                dateFormat="dd/mm/yy"
                                value={new Date(match.time)}
                                onChange={(e) => onDateChange(e)}
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

                        <Divider />

                        {/* cap nhat tran dau */}
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="chap">Tỉ số</label>
                                <InputText
                                    id="chap"
                                    value={match.score}
                                    onChange={(e) => onInputTextChange(e, 'score')}
                                />
                            </div>

                            {/* money */}
                            <div className="field col">
                                <label htmlFor="money">Lựa chọn đúng</label>
                                <Chips
                                    id="money"
                                    value={chipsValue}
                                    onChange={(e) => setChipsValue(e.value ?? [])}
                                />
                            </div>
                        </div>
                    </Dialog>

                    {/* detail dialog */}
                    <Dialog
                        visible={matchDetailDialog}
                        style={{ width: '750px' }}
                        header={`${match.name} - ${formatDate(match.time)}`}
                        modal
                        onHide={() => setMatchDetailDialog(false)}
                    >
                        {matchDetail && (
                            <DataTable
                                value={matchDetail}
                                tableStyle={{ minWidth: '50rem' }}
                                emptyMessage="Không tìm thấy trận đấu"
                            >
                                <Column field="member_name" header="Người chơi"></Column>
                                <Column field="vote_time" header="Thời gian vote"></Column>
                                <Column field="member_option" header="Lựa chọn"></Column>
                                <Column field="vote_status" header="Trạng thái"></Column>
                            </DataTable>
                        )}
                    </Dialog>

                    <ConfirmDialog
                        visible={deleteProductDialog}
                        width={590}
                        confirmMessage={<span>Bạn có chắc chắn muốn xóa trận đấu này?</span>}
                        onYes={deleteItem}
                        onNo={hideDeleteProductDialog}
                    />
                </div>
            </div>
        </div>
    );
};

export default MatchPage;
