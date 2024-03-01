import { useState } from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface Country {
    name: string;
    code: string;
}

// =======================|| Chose team dropdown ||=======================
export default function TeamDropdown({ id }: { id: string }) {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const countries: Country[] = [
        { name: 'Albania', code: 'AL' },
        { name: 'Anh', code: 'GB' },
        { name: 'Áo', code: 'AT' },
        { name: 'Bỉ', code: 'BE' },
        { name: 'Bồ Đào Nha', code: 'PT' },
        { name: 'Cộng hòa Séc', code: 'CZ' },
        { name: 'Croatia', code: 'HR' },
        { name: 'Đan Mạch', code: 'DK' },
        { name: 'Đức', code: 'DE' },
        { name: 'Hà Lan', code: 'NL' },
        { name: 'Hungary', code: 'HU' },
        { name: 'Pháp', code: 'FR' },
        { name: 'Romania', code: 'RO' },
        { name: 'Scotland', code: 'GB' },
        { name: 'Serbia', code: 'RS' },
        { name: 'Slovakia', code: 'SK' },
        { name: 'Slovenia', code: 'SI' },
        { name: 'Tây Ban Nha', code: 'ES' },
        { name: 'Thổ Nhĩ Kỳ', code: 'TR' },
        { name: 'Thuỵ Sĩ', code: 'CH' },
        { name: 'Ý', code: 'IT' }
    ];

    const selectedCountryTemplate = (option: Country, props: any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img
                        alt={option.name}
                        src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                        className={`mr-2 flag flag-${option.code.toLowerCase()}`}
                        style={{ width: '18px' }}
                    />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option: Country) => {
        return (
            <div className="flex align-items-center">
                <img
                    alt={option.name}
                    src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                    className={`mr-2 flag flag-${option.code.toLowerCase()}`}
                    style={{ width: '18px' }}
                />
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <Dropdown
            id={id}
            required
            value={selectedCountry}
            onChange={(e: DropdownChangeEvent) => setSelectedCountry(e.value)}
            options={countries}
            optionLabel="name"
            placeholder="Chọn một đội"
            valueTemplate={selectedCountryTemplate}
            itemTemplate={countryOptionTemplate}
            // dropdownIcon={(opts) => {
            //     return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> : <ChevronDownIcon {...opts.iconProps} />;
            // }}
        />
    );
}
