import React ,{useState, createContext} from "react";

export const SelectedRowsContext = createContext();

export const SelectedRowsProvider = ({children}) => {
    const [selectedRows, setSelectedRows] = useState([]);
    return(
        <>
            <SelectedRowsContext.Provider value={{ selectedRows, setSelectedRows}}>
                {children}
            </SelectedRowsContext.Provider>
        </>
    )
};
