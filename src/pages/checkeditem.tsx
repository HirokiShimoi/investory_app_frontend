import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import {Tabs, Tab} from '@mui/material';
import Button from '@mui/material/Button';

type Product = {
    id: number;
    product_code: string;
    product_name: string;
    inventory: number;
    category: string;
    orderpoint: number;
  };
  
  type Comment = {
    product: Product;
  };

function CheckedItem() {
    const [selectedData, setSelectedData] = useState<GridRowsProp>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [selectedRows,setSelectedRows] = useState<any[]>([]);

    const mergeProductAndComments = (products: Product[], comments: Comment[]) => {
        return products.map(product => {
          const relatedComment = comments.find(comment => comment.product.product_code === product.product_code);
          return {
            ...product,
            comment: relatedComment ? 'コメントあり' : 'コメントなし',
          };
        });
      };


    useEffect(() => {
        const fetchSelectedData = axios.get('http://127.0.0.1:8000/api/selecteditem/');
        const fetchComments = axios.get('http://127.0.0.1:8000/api/comment/');
    
        Promise.all([fetchSelectedData, fetchComments])
          .then(([selectedDataRes, commentsRes]) => {
            const transformedData: Product[] = selectedDataRes.data.map((item: Product) => {
              return {
                id: item.id,
                product_code: item.product_code,
                product_name: item.product_name,
                inventory: item.inventory,
                category: item.category,
                orderpoint: item.orderpoint,
              };
            });
            setComments(commentsRes.data);
            const mergedData = mergeProductAndComments(transformedData, commentsRes.data);
            setSelectedData(mergedData);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

    const handleDelete = () => {
        axios.post('http://127.0.0.1:8000/api/deleteItems/',{
            ids: selectedRows
        }).then(() => {
            const updateData = selectedData.filter(item => !selectedRows.includes(item.id));
            setSelectedData(updateData);
            setSelectedRows([]);
        }).catch((error => {
            console.log('Delete failed:', error);
        }))
    }

    const handleRowSelectionModelChange = (newSelection) => {
        setSelectedRows(newSelection);
        console.log(newSelection)

    };

    const columns : GridColDef[] = [
        {field: 'product_code', headerName: 'インストア', flex: 1 },
        {field: 'product_name', headerName: '商品名', flex: 2 },
        {field: 'inventory', headerName: '在庫', flex: 1 },
        {field: 'orderpoint', headerName: '発注点', flex:1 },
        {field: 'comment', headerName: 'コメント', flex: 1 },
    ]

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <DataGrid 
                 rows={selectedData}
                 columns={columns}
                 pageSizeOptions={[5, 10]}
                 checkboxSelection
                 onRowSelectionModelChange={handleRowSelectionModelChange}
            />

            <Button variant='contained' color="secondary" onClick={handleDelete}>
                delete Selected
            </Button>
        </div>
    )
}

export default CheckedItem;