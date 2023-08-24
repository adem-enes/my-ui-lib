import { useMemo, useState } from "react";
import styles from "./Table.module.css";
import { TableProps, tableHeaders, tableItems } from "./tableTypes";
import Input from "../Input/Input";
import { compareValues } from "../../utils";

// Utility function to convert property path string to array
const getPropertyPathArray = (path: string): string[] => {
    return path.split(".");
};

const isSortable = (sortable: boolean | undefined) => sortable !== false;

type sortType = {
    name: string,
    asc: boolean
}

const Table = ({ footer = undefined, headers, items, searchable = false, ...props }: TableProps) => {
    const [sort, setSort] = useState<sortType>({ name: "", asc: true });
    const [searchText, setSearchText] = useState<string>("");

    const getItemValue = (item: any, header: string) => {
        const headerValuePath = getPropertyPathArray(header);
        return headerValuePath.reduce((value, prop) => value && value[prop], item);
    }

    const renderCellContent = (item: any, header: tableHeaders) => {
        if (header.cellRenderer) {
            const customRendererContent = header.cellRenderer(getItemValue(item, header.value));
            return customRendererContent != null ? customRendererContent : '-';
        }
        return getItemValue(item, header.value);
    }

    const sortBy = (name: string) => {
        name.toString() === sort.name
            ? setSort((prev) => ({ ...prev, asc: !prev.asc }))
            : setSort({ asc: true, name: name.toString() });
    }

    const filterAndSortItems = (data: tableItems[]) => {
        const filteredItems = data.filter(item => {
            return headers.some(header => {
                if (isSortable(header.sortable) && searchText) {
                    const value = getItemValue(item, header.value);
                    return value && value.toString().toLowerCase().includes(searchText.toLowerCase());
                }
                return true;
            });
        });

        if (sort.name) {
            filteredItems.sort((a, b) => {
                const aValue = getItemValue(a, sort.name);
                const bValue = getItemValue(b, sort.name);
                return sort.asc ? compareValues(aValue, bValue) : compareValues(bValue, aValue);
            });
        }

        return filteredItems;
    };

    const visibleItems = useMemo(() => {
        return filterAndSortItems(items);
    }, [items, searchText, sort]);

    return (<div className={styles.container}>
        <div className={styles["table-caption"]}>
            {!!props.caption ? <div><h3>{props.caption}</h3></div> : <div className={styles.caption}></div>}
            {searchable ? <div><Input style={{
                border: "none", borderRadius: 0,
                borderBottom: "1px solid var(--black)",
            }} onChange={(e) => setSearchText((e.target as HTMLInputElement).value)} placeholder="Search" /></div>
                : null}
        </div>
        <div className={styles["table-container"]}>
            <table {...props} className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        {headers.map((header, index) => (
                            (header.isShown !== false) && <th key={index}
                                className={sort.name === header.value.toString() ?
                                    styles[sort.asc ? "th-sort-asc" : "th-sort-desc"] : ""}
                                align={header?.align ? header.align : "left"}
                                onClick={() => isSortable(header.sortable) ? sortBy(header.value) : {}}
                            >
                                {header.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {items.length <= 0 ?
                        (<tr><td colSpan={headers.length} style={{ textAlign: "center" }}>
                            <div>No Items</div>
                        </td></tr>)
                        : visibleItems.map((item, index) => (
                            <tr key={index} className="tr-row">
                                {headers.map((header, i) => (
                                    (header.isShown !== false) && <td key={i}
                                        align={header?.align ? header.align : "left"}>
                                        <div>
                                            {renderCellContent(item, header)}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
                {footer ?? <tfoot>
                    {footer}
                </tfoot>}
            </table>
        </div>
    </div >);
};

export default Table;
