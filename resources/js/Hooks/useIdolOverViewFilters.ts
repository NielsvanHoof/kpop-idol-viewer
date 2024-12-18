import { router } from '@inertiajs/react';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';

interface Filters {
    filter: {
        name?: string;
        gender?: string;
        has_group?: boolean;
    };
    sort?: string;
    activeFilters?: string[];
}

export function useIdolOverViewFilters() {
    const [filters, setFilters] = useState<Filters>({
        filter: {
            name: '',
            gender: '',
            has_group: undefined,
        },
        sort: 'name',
        activeFilters: ['all'],
    });

    const reloadWithParams = (
        searchParams: URLSearchParams,
        visitOrReload: 'visit' | 'reload' = 'reload',
    ) => {
        if (visitOrReload === 'visit') {
            router.visit(window.location.pathname, {
                only: ['idols'],
                data: Object.fromEntries(searchParams.entries()),
            });
        } else {
            router.reload({
                only: ['idols'],
                data: Object.fromEntries(searchParams.entries()),
            });
        }
    };

    const debouncedSearch = useCallback(
        debounce((searchValue: string) => {
            const searchParams = new URLSearchParams();
            if (searchValue) {
                searchParams.set('filter[name]', searchValue);
            }
            reloadWithParams(searchParams, 'reload');
        }, 300),
        [],
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters((prev) => ({
            ...prev,
            filter: {
                ...prev.filter,
                name: value,
            },
            activeFilters: ['all'],
        }));
        debouncedSearch(value);
    };

    const handleSort = (value: string) => {
        setFilters((prev) => ({
            ...prev,
            sort: value,
        }));

        const searchParams = new URLSearchParams();
        if (value !== 'name') {
            searchParams.set('sort', value);
        }
        reloadWithParams(searchParams, 'reload');
    };

    const handleGenderFilter = (value: string) => {
        setFilters((prev) => ({
            ...prev,
            filter: {
                ...prev.filter,
                gender: value,
            },
            activeFilters: value ? [value] : ['all'],
        }));

        const searchParams = new URLSearchParams();
        if (value && value !== 'all') {
            searchParams.set('filter[gender]', value);
        }
        reloadWithParams(searchParams, 'reload');
    };

    const handleGroupFilter = (hasGroup: boolean | undefined) => {
        const filterValue =
            hasGroup === true ? 'groups' : hasGroup === false ? 'solo' : 'all';

        setFilters((prev) => ({
            ...prev,
            filter: {
                ...prev.filter,
                has_group: hasGroup,
            },
            activeFilters: filterValue === 'all' ? ['all'] : [filterValue],
        }));

        const searchParams = new URLSearchParams();
        if (hasGroup !== undefined) {
            searchParams.set('filter[has_group]', String(hasGroup));
        }
        reloadWithParams(searchParams, 'reload');
    };
    return {
        filters,
        setFilters,
        handleSearch,
        handleSort,
        handleGenderFilter,
        handleGroupFilter,
        reloadWithParams,
    };
}
