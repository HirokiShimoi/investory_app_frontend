import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import {Tabs, Tab} from '@mui/material';


function CheckedItem() {
    const [value, setValue] = useState(0);
    const [data,setData] = useState<GridRowsProp>([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/selecteditem/`)
        .then(response => {
            const transformedData = response.data.results.map((item) => ({
                id: item.id, 
                product_code: item.product.product_code,
                product_name: item.product.name,
                inventory: item.current_stock,
                category: item.product.category,
                orderpoint:item.reorder_point,
            }));
            setData(transformedData);
            console.log("Transformed data: ", transformedData);
        })
        .catch(error => {
            console.log('Error fetching selected items:', error);
        });
    }, []
    
    );

    const columns : GridColDef[] = [
        {field: 'product_code', headerName: 'インストア', flex: 1 },
        {field: 'product_name', headerName: '商品名', flex: 2 },
        {field: 'inventory', headerName: '在庫', flex: 1 },
        {field: 'orderpoint', headerName: '発注点', flex:1 },
    ]

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <DataGrid 
                 rows={data}
                 columns={columns}
                 pageSizeOptions={[5, 10]}
                 checkboxSelection
            />
        </div>
    )
}

export default CheckedItem;
