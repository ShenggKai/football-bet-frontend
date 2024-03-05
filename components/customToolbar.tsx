'use client';

import { useState } from 'react';

// Prime React
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

// project import

interface CustomToolbarProps {
    dt: any;
    onAdd: () => void;
}

// type
interface InputValue {
    index: number;
    name: string;
}

const CustomToolbar = ({ dt, onAdd }: CustomToolbarProps) => {
    // dropdown to select season
    const [selectedSeason, setSelectedSeason] = useState(0);

    const seasonValues: InputValue[] = [
        { name: 'EURO 2024', index: 0 },
        { name: 'Champions League 2023', index: 1 },
        { name: 'World Cup 2022', index: 2 }
    ];

    // function
    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    // component come with tool bar
    const leftToolbar = () => {
        return (
            <>
                <div className="my-2">
                    <Dropdown
                        className="w-full md:w-18rem"
                        value={selectedSeason}
                        options={seasonValues}
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
                    onClick={onAdd}
                    className="mr-2 inline-block"
                />
                <Button label="Xuất" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </>
        );
    };

    return <Toolbar className="mb-4" start={leftToolbar} end={rightToolbar}></Toolbar>;
};

export default CustomToolbar;
