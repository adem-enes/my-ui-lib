import React, { useMemo, useState } from "react";
import styles from "./Table.module.css";
import { TableProps, tableHeaders } from "./tableTypes";
import Input from "../Input/Input";

const isSortable = (sortable: boolean | undefined) => (sortable || sortable === undefined) ? true : false;
type sortType = {
    name: string,
    asc: boolean
}

const Table = ({ footer = undefined, headers, items, searchable = false, ...props }: TableProps) => {
    const columns = headers.map(h => { return { ...h, value: h.value.split('.') } })
    const [sort, setSort] = useState<sortType>({ name: "", asc: true });
    const [searchText, setSearchText] = useState<string>("");


    const getItemValue = (value: any, header: string[]) => {
        if (header.length === 1) return value[header[0]];
        else if (header.length > 1) {
            let finalValue = value;
            for (let i = 0; i < header.length; i++)
                finalValue = finalValue[header[i]]
            return finalValue;
        }
        return null;
    }

    const getCellValue = (item: any, header: any) => {
        if (!!header.type) return header.type(getItemValue(item, header.value));
        return getItemValue(item, header.value);
    }

    const sortBy = (name: string[]) => {
        name.toString() === sort.name
            ? setSort({ ...sort, asc: !sort.asc })
            : setSort({ asc: true, name: name.toString() });
        // filterTable();
    }

    const filterTable = useMemo(() => items.filter(item => {
        let value;
        columns.forEach(h => isSortable(h.sortable)
            && getItemValue(item, h.value)?.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
            && (value = item)
        );
        return value;
    }), [searchText]);

    return (<div className={styles.container}>
        <div className={styles["table-caption"]}>
            {!!props.caption ? <div><h3>{props.caption}</h3></div> : <div className={styles.caption}></div>}
            {searchable ? <div><Input style={{ border: "none", borderBottom: "1px solid var(--black)", borderRadius: 0 }}
                onChange={(e) => setSearchText((e.target as HTMLInputElement).value)} placeholder="Search" /></div> : null}
        </div>
        <div className={styles["table-container"]}>
            <table {...props} className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        {columns.map((header, index) => (
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
                    {filterTable.map((item, index) => (
                        <tr key={index} className="tr-row">
                            {columns.map((header, i) => (
                                (header.isShown !== false) && <td key={i}
                                    align={header?.align ? header.align : "left"}>
                                    <div>
                                        {getCellValue(item, header)}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

                {footer ?? <tfoot>
                    {footer}
                </tfoot>}
            </table>
        </div>
    </div >);
};

export default Table;
