import { lazy } from "react";

export const Input = lazy(() => import("./Input/Input"));
export const CheckBox = lazy(() => import("./Input/CheckBox"));
export const Table = lazy(() => import("./Table/Table"));

export type { tableHeaders } from "./Table/tableTypes"