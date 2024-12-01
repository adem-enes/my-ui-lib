interface ValueComparer {
    canCompare: (aValue: any, bValue: any) => boolean;
    compare: (aValue: any, bValue: any) => number;
}

class NumberComparer implements ValueComparer {
    canCompare(aValue: any, bValue: any) {
        return typeof aValue === 'number' && typeof bValue === 'number';
    }

    compare(aValue: any, bValue: any) {
        return aValue - bValue;
    }
}

class StringComparer implements ValueComparer {
    canCompare(aValue: any, bValue: any) {
        return typeof aValue === 'string' && typeof bValue === 'string';
    }

    compare(aValue: any, bValue: any) {
        return aValue.localeCompare(bValue);
    }
}

class DateComparer implements ValueComparer {
    canCompare(aValue: any, bValue: any) {
        return aValue instanceof Date && bValue instanceof Date;
    }

    compare(aValue: any, bValue: any) {
        return aValue.getTime() - bValue.getTime();
    }
}

class BooleanComparer implements ValueComparer {
    canCompare(aValue: any, bValue: any) {
        return typeof aValue === 'boolean' && typeof bValue === 'boolean';
    }

    compare(aValue: any, bValue: any) {
        return aValue === bValue ? 0 : aValue ? 1 : -1;
    }
}

class DefaultComparer implements ValueComparer {
    canCompare(aValue: any, bValue: any) {
        return aValue.toString().localeCompare(bValue.toString());
        // return true;
    }

    compare(aValue: any, bValue: any) {
        return aValue.toString().localeCompare(bValue.toString());
    }
}

const comparers: ValueComparer[] = [
    new NumberComparer(),
    new StringComparer(),
    new DateComparer(),
    new BooleanComparer(),
    new DefaultComparer(),
];

export const compareValues = (aValue: any, bValue: any): number => {
    const comparer = comparers.find(c => c.canCompare(aValue, bValue))!;
    return comparer.compare(aValue, bValue);
};