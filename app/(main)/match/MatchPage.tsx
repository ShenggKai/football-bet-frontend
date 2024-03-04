'use client';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { Demo } from '@/types';
import { MatchService } from '@/demo/service/MatchService';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { ConfirmDialog } from '@/components';
import { InputValue } from './page';

// ========================|| Match page ||========================
/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
export const MatchPage = () => {
    let emptyMatch: Demo.Match = {
        id: 0,
        chap: 0,
        name: '',
        money: 0,
        time: '0001/01/01 00:00',
        status: 'Đang diễn ra',
        options: [],
        vote_correct: 0,
        vote_wrong: 0,
        vote_sum: 0,
        score: []
    };

    // dropdown to select season
    const [selectedSeason, setSelectedSeason] = useState(0);

    const matchValues: InputValue[] = [
        { name: 'EURO 2024', index: 0 },
        { name: 'Champions League 2023', index: 1 },
        { name: 'World Cup 2022', index: 2 }
    ];

    const keoChap = [
        { chap: '0' },
        { chap: '0.5' },
        { chap: '1' },
        { chap: '1.5' },
        { chap: '2' },
        { chap: '2.5' },
        { chap: '3' },
        { chap: '3.5' },
        { chap: '4' },
        { chap: '4.5' },
        { chap: '5' },
        { chap: '5.5' },
        { chap: '6' },
        { chap: '6.5' },
        { chap: '7' },
        { chap: '7.5' },
        { chap: '8' },
        { chap: '8.5' },
        { chap: '9' },
        { chap: '9.5' },
        { chap: '10' }
    ];

    const { showError, showSuccess } = useContext(LayoutContext);
    const [matches, setMatches] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chipsValue, setChipsValue] = useState<any[]>([]);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [match, setMatch] = useState<Demo.Match>(emptyMatch);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const [selectedChap, setSelectedChap] = useState(0);
    const [calendarValue, setCalendarValue] = useState<any>(null);

    useEffect(() => {
        setLoading(true);
        MatchService.getMatches().then((data) => setMatches(data as any));
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
        setMatch(emptyMatch);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (match.name.trim()) {
            let _matches = [...(matches as any)];
            let _match = { ...match };
            if (match.id) {
                const index = findIndexById(match.id.toString());

                _matches[index] = _match;
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'match Updated',
                    life: 3000
                });
            } else {
                // _match.id = createId();
                _matches.push(_match);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'match Created',
                    life: 3000
                });
            }

            setMatches(_matches as any);
            setProductDialog(false);
            setMatch(emptyMatch);
        }
    };

    const editProduct = (match: Demo.Match) => {
        setMatch({ ...match });
        setProductDialog(true);
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

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (matches as any)?.length; i++) {
            if ((matches as any)[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const onCategoryChange = (e: RadioButtonChangeEvent) => {
        let _match = { ...match };
        _match['status'] = e.value;
        setMatch(_match);
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    // const onInputChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    //     match_name: string
    // ) => {
    //     const val = (e.target && e.target.value) || '';
    //     let _match = { ...match };
    //     _match[`${match_name}`] = val;
    //     setMatch(_match);
    // };
    // const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
    //     const val = e.value || 0;
    //     let _match = { ...match };
    //     _match[`${name}`] = val;
    //     setMatch(_match);
    // };
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
                {rowData.chap as number}
            </>
        );
    };

    const timeBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">time</span>
                {rowData.time}
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
                {rowData.score[0] + ' : ' + rowData.score[1]}
            </>
        );
    };

    const statusBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {/* sap dien ra: yellow, dang dien ra: green, da ket thuc: red */}
                <span
                    className={`match-badge status-${
                        rowData.status === 'Sắp diễn ra'
                            ? 'yellow'
                            : rowData.status === 'Đang diễn ra'
                            ? 'green'
                            : 'red'
                    }`}
                >
                    {rowData.status}
                </span>
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
                    onClick={() => editProduct(rowData)}
                />
                <Button
                    icon="pi pi-pencil"
                    rounded
                    text
                    severity="success"
                    className="mr-2"
                    onClick={() => editProduct(rowData)}
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

    const productDialogFooter = (
        <>
            <Button label="Hủy" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Lưu" icon="pi pi-check" text onClick={saveProduct} />
        </>
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
                            headerStyle={{ minWidth: '19rem' }}
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
                            field="status"
                            header="Trạng thái"
                            body={statusBody}
                            sortable
                            headerStyle={{ minWidth: '10rem' }}
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

                    <Dialog
                        visible={productDialog}
                        style={{ width: '450px' }}
                        header="Tạo trận đấu"
                        modal
                        className="p-fluid"
                        footer={productDialogFooter}
                        onHide={hideDialog}
                    >
                        {/* name and money*/}
                        <div className="formgrid grid">
                            {/* Ten tran dau */}
                            <div className="field col-8">
                                <label htmlFor="name">Tên trận đấu</label>
                                <InputText id="name" />
                            </div>

                            {/* money */}
                            <div className="field col-4">
                                <label htmlFor="money">Tiền cược</label>
                                <InputNumber
                                    id="money"
                                    value={match.money}
                                    // onValueChange={(e) => onInputNumberChange(e, 'price')}
                                    mode="currency"
                                    currency="VND"
                                    locale="vi-VN"
                                />
                            </div>
                        </div>
                        {/* {submitted && !match.team_a && (
                    <small className="p-invalid">Name is required.</small>
                )} */}
                        {/* date time */}
                        <div className="field">
                            <label htmlFor="description">Thời điểm bóng lăn</label>
                            <Calendar
                                showTime
                                hourFormat="24"
                                dateFormat="dd/mm/yy"
                                value={calendarValue}
                                onChange={(e) => setCalendarValue(e.value ?? null)}
                            />
                        </div>
                        status
                        <div className="field">
                            <label className="mb-3">Trạng thái</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-4">
                                    <RadioButton
                                        inputId="status1"
                                        name="status"
                                        value="Sắp diễn ra"
                                        onChange={onCategoryChange}
                                        checked={match.status === 'Sắp diễn ra'}
                                    />
                                    <label htmlFor="status1">Sắp diễn ra</label>
                                </div>
                                <div className="field-radiobutton col-4">
                                    <RadioButton
                                        inputId="status2"
                                        name="status"
                                        value="Đang diễn ra"
                                        onChange={onCategoryChange}
                                        checked={match.status === 'Đang diễn ra'}
                                    />
                                    <label htmlFor="status2">Đang diễn ra</label>
                                </div>
                                <div className="field-radiobutton col-4">
                                    <RadioButton
                                        inputId="status3"
                                        name="status"
                                        value="Đã kết thúc"
                                        onChange={onCategoryChange}
                                        checked={match.status === 'Đã kết thúc'}
                                    />
                                    <label htmlFor="status3">Đã kết thúc</label>
                                </div>
                            </div>
                        </div>
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
