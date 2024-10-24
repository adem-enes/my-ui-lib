import { lazy } from "react";

export const Input = lazy(() => import("./Input/Input"));
export const CheckBox = lazy(() => import("./Input/CheckBox"));
export const Table = lazy(() => import("./Table/Table"));
export const Form = lazy(() => import("./Form/Form"));
export const Popover = lazy(() => import("./Popover/Popover"));
export const ActionList = lazy(() => import("./Popover/ActionList"));

export type { tableHeaders } from "./Table/tableTypes"