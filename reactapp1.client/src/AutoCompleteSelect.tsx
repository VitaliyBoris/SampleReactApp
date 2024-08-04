import { useEffect, useState } from 'react';
import Select, { SingleValue, Theme } from 'react-select';
import useDebounce from './utils/useDebounce';

export interface AutoCompleteConfiguration {
    apiUrl: string,
    limit: number,
    debounceTimeOut: number
}

type OptionType = { label: string; value: string };

const customTheme = (theme: Theme): Theme => {
    return {
        ...theme,
        colors: {
            ...theme.colors,
            primary: 'rgba(255, 255, 255, 0.87)',
            primary25: 'gray',
            primary50: 'gray',
            primary75: 'gray',
            neutral0: '#242424',
            neutral10: 'rgba(255, 255, 255, 0.87)',
            neutral20: 'rgba(255, 255, 255, 0.87)',
            neutral30: 'rgba(255, 255, 255, 0.87)',
            neutral40: 'rgba(255, 255, 255, 0.87)',
            neutral60: 'rgba(255, 255, 255, 0.87)',
            neutral80: 'rgba(255, 255, 255, 0.87)',
        },
    }
}

export default function useAutoComplete(config: AutoCompleteConfiguration) {
    const [value, setValue] = useState<string>('');
    const [sub, setSub] = useState<string>('');
    const [options, setOptions] = useState<OptionType[]>([]);

    const onChange = (newValue: SingleValue<OptionType>) => {
        if (newValue != null) {
            setValue(newValue.value);
        } else {
            setValue('');
        }
    }

    const onInputChange = (newValue: string) => {
        setSub(newValue);
    }

    const select = <Select
        theme={customTheme}
        options={options}
        onChange={onChange}
        onInputChange={useDebounce(onInputChange, config.debounceTimeOut)}
    />;

    useEffect(() => {
        const fetchData = async (sub: string) => {
            const response = await fetch(`${config.apiUrl}?sub=${sub}&limit=${config.limit}`);
            const data: string[] = await response.json();
            setOptions(data.map<OptionType>(o => { return { value: o, label: o } }));
        };

        if (sub.length != 0) {
            fetchData(sub);
        } else {
            setOptions([]);
        }
    }, [sub, config.apiUrl, config.limit]);

    return [value, select];
}