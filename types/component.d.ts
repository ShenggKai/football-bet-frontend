export interface CustomColumn {
    field: string;
    header: string;
    body: any;
    minWidth: string;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
}
