import React from 'react'
import { useEffect,useState } from 'react'
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import ReorderPointModal from './reorderpointmodal';

function UnderOrderPoint() {

    const [data,setData] = useState<GridRowsProp>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");

    const updateReorderPoint = (newReorderPoint) => {
        // APIを呼び出して発注点を更新するロジック
        console.log(`新しい発注点: ${newReorderPoint}`);
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/inventory/reorder/')
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
          console.error('Fetch error:', error);        });
    },[]);

    const columns: GridColDef[] = [
        {field: 'product_code', headerName: 'インストア', flex: 1 },
        {field: 'product_name', headerName: '商品名', flex: 2 },
        {field: 'inventory', headerName: '在庫', flex: 1 },
        {field: 'orderpoint', headerName: '発注点', flex: 1, renderCell: (params) => {
        const openModal = (params) => {
            console.log(params)
            if (params.row) {
                setSelectedItem(params.row.product_code);
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

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <DataGrid 
                 rows={data}
                 columns={columns}
                 pageSizeOptions={[5, 10]}
                 checkboxSelection
            />
            <ReorderPointModal
                isOpen={modalIsOpen}
                closeModal={() => setModalIsOpen(false)}
                updateReorderPoint={updateReorderPoint}
                selectedItem = {selectedItem}
            />
        </div>
    )
}

export default UnderOrderPoint