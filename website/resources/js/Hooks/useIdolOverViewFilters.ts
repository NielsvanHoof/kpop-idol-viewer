import { router } from '@inertiajs/react';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Filters {
    filter: {
        name?: string;
        gender?: string;
        has_group?: boolean;
    };
    activeFilters: string[];
}

export function useIdolOverViewFilters() {
    const [filters, setFilters] = useState<Filters>({
        filter: {
            name: '',
            gender: '',
            has_group: undefined,
        },
        activeFilters: ['all'],
    });

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                router.reload({
                    reset: ['idols'],
                    data: { 'filter[name]': value },
                });
            }, 300),
        [],
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleSearch = useCallback(
        (value: string) => {
            setFilters((prev) => ({
                ...prev,
                filter: {
                    ...prev.filter,
                    name: value,
                },
            }));
            debouncedSearch(value);
        },
        [debouncedSearch],
    );

    const handleGenderFilter = useCallback((value: string) => {
        setFilters((prev) => ({
            ...prev,
            filter: {
                ...prev.filter,
                gender: value === 'all' ? '' : value,
            },
            activeFilters: value === 'all' ? ['all'] : [value],
        }));

        router.reload({
            data: value === 'all' ? {} : { 'filter[gender]': value },
        });
    }, []);

    const handleGroupFilter = useCallback((hasGroup: boolean | undefined) => {
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

        router.reload({
            data:
                hasGroup === undefined
                    ? {}
                    : { 'filter[has_group]': String(hasGroup) },
        });
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
            filter: {
                name: '',
                gender: '',
                has_group: undefined,
            },
            activeFilters: ['all'],
        });

        router.visit(route('idols.index'), {
            data: {},
        });
    }, []);

    return {
        filters,
        handleSearch,
        handleGenderFilter,
        handleGroupFilter,
        resetFilters,
    };
}
