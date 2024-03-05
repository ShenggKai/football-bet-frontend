'use client';

import { useState } from 'react';

// PrimeReact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

// project import
import { CustomColumn } from '@/types';

interface CustomDataTableProps {
    data: any;
    tableName: string;
    dt: any;
    customColumn: CustomColumn[];
    isLoading: boolean;
    onView: (rowData: any) => void;
    onEdit: (rowData: any) => void;
    onDelete: (rowData: any) => void;
}

const CustomDataTable = ({
    data: matches,
    tableName,
    dt,
    customColumn,
    isLoading,
    onView,
    onEdit,
    onDelete
}: CustomDataTableProps) => {
    const [selectedProducts, setSelectedProducts] = useState(null);

    // component include with table
    const indexBody = (data: any, props: any) => {
        let index = parseInt(props.rowIndex + 1);
        return (
            <>
                <span>{index}</span>
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">{tableName}</h5>
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

    const actionBody = (rowData: any) => {
        return (
            <>
                <Button
                    icon="pi pi-info"
                    rounded
                    text
                    severity="info"
                    className="mr-2"
                    onClick={() => onView(rowData)}
                />
                <Button
                    icon="pi pi-pencil"
                    rounded
                    text
                    severity="success"
                    className="mr-2"
                    onClick={() => onEdit(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    text
                    severity="warning"
                    onClick={() => onDelete(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={matches}
            selectionMode="single"
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value as any)}
            dataKey="id"
            loading={isLoading}
            paginator
            scrollable
            removableSort
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Hiển thị {first} đến {last} trong {totalRecords} trận đấu"
            emptyMessage="Không tìm thấy trận đấu"
            header={header}
        >
            <Column header="STT" body={indexBody} align="center"></Column>
            {/* custom column */}
            {customColumn.map((column) => (
                <Column
                    key={column.field}
                    field={column.field}
                    header={column.header}
                    body={column.body}
                    headerStyle={{ minWidth: `${column.minWidth}` }}
                    align="center"
                    sortable
                />
            ))}
            <Column
                body={actionBody}
                headerStyle={{ minWidth: '12rem' }}
                frozen
                alignFrozen="right"
                align="center"
            ></Column>
        </DataTable>
    );
};

export default CustomDataTable;
