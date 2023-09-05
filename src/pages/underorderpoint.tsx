import React from 'react'
import { useEffect,useState } from 'react'
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import ReorderPointModal from './reorderpointmodal';
import {Tabs, Tab} from '@mui/material';

function UnderOrderPoint() {

    const [data,setData] = useState<GridRowsProp>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [ currentPage, setcurrentPage ] = useState(1);
    const [value, setvalue] = useState(0);


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/inventory/reorder/?page=${currentPage}`)
        .then(response => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const transformedData = data.results.map((item) => ({
                id: item.id, 
                product_code: item.product.product_code,
                product_name: item.product.name,
                inventory: item.current_stock,
                category: item.product.category,
                orderpoint:item.reorder_point,
            }));
            setData(transformedData);
        })

        .catch(error => {
          console.error('Fetch error:', error);        
        });
    },[currentPage]);

    const columns: GridColDef[] = [
        {field: 'product_code', headerName: 'インストア', flex: 1 },
        {field: 'product_name', headerName: '商品名', flex: 2 },
        {field: 'inventory', headerName: '在庫', flex: 1 },
        {field: 'orderpoint', headerName: '発注点', flex: 1, 
        renderCell: (params) => {
        const openModal = () => {
            console.log(params)
            if (params.row) {
                setSelectedItem(params.row.product_code);
                console.log(selectedItem)
                setModalIsOpen(true);
            } else {
                console.warn('params.row is undefined');
            }
            };
      
            return (
              <div>
                {params.value /* 発注点の値 */}
                <button onClick={openModal} style={{ marginLeft: '10px' }}>
                  ⚙️
                </button>
              </div>
            );
          },
        },  
    ]

    const handlePageChange = (newPage) => {
        setcurrentPage(newPage)
    }

    const handleChange = (event,newValue) => {
        setvalue(newValue)
    }


    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="日本酒"/>
                <Tab label="焼酎"/>
                <Tab label="ワイン"/>
                <Tab label="リキュール"/>
                <Tab label="ビール"/>
                <Tab label="スピリッツ"/>
                <Tab label="名産品"/>
                <Tab label="備品"/>                
            </Tabs>
            <DataGrid 
                 rows={data}
                 columns={columns}
                 pageSizeOptions={[5, 10]}
                 checkboxSelection
            />
            <ReorderPointModal
                isOpen={modalIsOpen}
                closeModal={() => setModalIsOpen(false)}
                selectedItem = {selectedItem}
            />

            <button onClick={() => handlePageChange(currentPage - 1)}>前へ</button>
            <button onClick={() => handlePageChange(currentPage + 1)}>次へ</button>
        </div>
    )
}

export default UnderOrderPoint