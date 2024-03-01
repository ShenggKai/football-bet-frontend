'use client';

import React, { useEffect, useRef, useState, useContext } from 'react';

// PrimeReact
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

// project import
import { Demo } from '@/types';
import { MatchService } from '@/demo/service/MatchService';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { TeamDropdown } from '@/components';

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
        team_a: '',
        team_b: '',
        chap: 0,
        money: 0,
        time: '0001/01/01 00:00',
        status: 'Đang diễn ra',
        options: [],
        vote_a_list: [],
        vote_b_list: [],
        vote_draw_list: [],
        score: []
    };

    // dropdown to select season
    const [selectedMatch, setSelectedMatch] = useState(0);

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
    const [products, setProducts] = useState(null);
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
        MatchService.getMatches().then((data) => setProducts(data as any));
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

        if (match.team_a.trim()) {
            let _matches = [...(products as any)];
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

            setProducts(_matches as any);
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
        let _products = (products as any)?.filter((val: any) => val.id !== match.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setMatch(emptyMatch);
        showSuccess('Xoá trận thành công');
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (products as any)?.length; i++) {
            if ((products as any)[i].id === id) {
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
                        value={selectedMatch}
                        options={matchValues}
                        onChange={(e) => setSelectedMatch(e.value)}
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
                <Button label="Thêm" icon="pi pi-plus" severity="success" onClick={openNew} />
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
                {rowData.team_a + ' vs ' + rowData.team_b}
            </>
        );
    };

    const teamABody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">teamA</span>
                {rowData.team_a}
            </>
        );
    };

    const teamBBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">teamB</span>
                {rowData.team_b}
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

    const voteASumBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">voteA</span>
                {rowData.vote_a_list.length}
            </>
        );
    };

    const voteBSumBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">voteB</span>
                {rowData.vote_b_list.length}
            </>
        );
    };

    const voteDrawSumBody = (rowData: Demo.Match) => {
        return (
            <>
                <span className="p-column-title">voteDraw</span>
                {rowData.vote_draw_list.length}
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

    const deleteProductDialogFooter = (
        <>
            <Button
                type="button"
                label="Không"
                icon="pi pi-times"
                onClick={hideDeleteProductDialog}
                text
                autoFocus
            />
            <Button type="button" label="Có" icon="pi pi-check" onClick={deleteItem} text />
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
                        value={products}
                        selectionMode="single"
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value as any)}
                        dataKey="id"
                        paginator
                        scrollable
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Hiển thị {first} đến {last} trong {totalRecords} trận đấu"
                        globalFilter={globalFilter}
                        emptyMessage="Không tìm thấy trận đấu"
                        header={header}
                    >
                        <Column headerStyle={{ width: '1rem' }}></Column>
                        <Column header="STT" body={indexBody} align={'center'}></Column>
                        <Column
                            field="team_a"
                            header="Trận đấu"
                            sortable
                            body={matchNameBody}
                            headerStyle={{ minWidth: '15rem' }}
                            align={'center'}
                        ></Column>
                        <Column
                            field="team_a"
                            header="Team A"
                            sortable
                            body={teamABody}
                            headerStyle={{ minWidth: '10rem' }}
                            align={'center'}
                        ></Column>
                        <Column
                            field="team_b"
                            header="Team B"
                            sortable
                            body={teamBBody}
                            headerStyle={{ minWidth: '10rem' }}
                            align={'center'}
                        ></Column>
                        <Column
                            field="chap"
                            header="A chấp B"
                            sortable
                            body={chapBody}
                            headerStyle={{ minWidth: '8rem' }}
                            align={'center'}
                        ></Column>
                        <Column
                            field="money"
                            header="Số tiền"
                            body={moneyBody}
                            sortable
                            headerStyle={{ minWidth: '10rem' }}
                            align={'center'}
                        ></Column>
                        <Column
                            field="time"
                            header="Giờ bóng lăn"
                            sortable
                            body={timeBody}
                            headerStyle={{ minWidth: '12rem' }}
                            align={'center'}
                        ></Column>
                        <Column
                            field="status"
                            header="Trạng thái"
                            body={statusBody}
                            sortable
                            headerStyle={{ minWidth: '10rem' }}
                            align={'center'}
                        ></Column>
                        <Column
                            field="vote_a_list"
                            header="Lượt vote A"
                            sortable
                            body={voteASumBody}
                            headerStyle={{ minWidth: '10rem' }}
                            align={'center'}
                        ></Column>
                        <Column
                            field="vote_b_list"
                            header="Lượt vote B"
                            sortable
                            body={voteBSumBody}
                            headerStyle={{ minWidth: '10rem' }}
                            align={'center'}
                        ></Column>
                        <Column
                            field="vote_draw_list"
                            header="Lượt vote hòa"
                            sortable
                            body={voteDrawSumBody}
                            headerStyle={{ minWidth: '11rem' }}
                            align={'center'}
                        ></Column>
                        <Column
                            field="score"
                            header="Tỉ số"
                            sortable
                            body={scoreBody}
                            headerStyle={{ minWidth: '6rem' }}
                            align={'center'}
                        ></Column>

                        <Column
                            body={actionBody}
                            headerStyle={{ minWidth: '10rem' }}
                            frozen
                            alignFrozen="right"
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
                        <div className="field">
                            {/* select team */}
                            <div className="formgrid grid mb-2">
                                {/* doi A */}
                                <div className="field col">
                                    <label htmlFor="teamA">Đội A</label>
                                    <TeamDropdown id="teamA" />
                                </div>

                                {/* Doi B */}
                                <div className="field col">
                                    <label htmlFor="teamB">Đội B</label>
                                    <TeamDropdown id="teamB" />
                                </div>
                            </div>

                            {/* keo chap and money*/}
                            <div className="formgrid grid">
                                {/* keo chap */}
                                <div className="field col">
                                    <label htmlFor="chap">A chấp B</label>
                                    <Dropdown
                                        id="chap"
                                        value={selectedChap}
                                        onChange={(e) => setSelectedChap(e.value)}
                                        options={keoChap}
                                        optionLabel="chap"
                                    />
                                </div>

                                {/* money */}
                                <div className="field col">
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
                        </div>

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
                    </Dialog>

                    <Dialog
                        visible={deleteProductDialog}
                        style={{ maxWidth: '590px' }}
                        header="Xác nhận"
                        modal
                        footer={deleteProductDialogFooter}
                        onHide={hideDeleteProductDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i
                                className="pi pi-exclamation-triangle mr-3"
                                style={{ fontSize: '2rem' }}
                            />
                            {match && (
                                <span>
                                    Bạn có chắc chắn muốn xóa trận đấu giữa <b>{match.team_a}</b> và{' '}
                                    <b>{match.team_b}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default MatchPage;
