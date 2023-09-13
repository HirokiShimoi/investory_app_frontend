import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams, roRO } from '@mui/x-data-grid';
import {Tabs, Tab} from '@mui/material';
import Button from '@mui/material/Button';
import CommentModal from './commentmodal';

type Product = {
    id: number;
    product_code: number;
    product_name: string;
    inventory: number;
    category: string;
    orderpoint: number;
  };
  
type Comment = {
  id: number;
  text: string;
  created_at: string;
  product: number; 
  };

function CheckedItem() {
    const [selectedData, setSelectedData] = useState<GridRowsProp>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [selectedRows,setSelectedRows] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Product | null>(null);
    const [selectedComment, setSelectedComment] = useState<string | null>(null);

    const mergeProductAndComments = (products: Product[], comments: Comment[]) => {
        return products.map(product => {
          	const relatedComment = comments.find(comment => comment.product === product.product_code);
            console.log(comments)
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
            	console.log("Fetched data and comments: ", selectedDataRes.data, commentsRes.data); // この行を追加
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
            console.log('Comments data:', commentsRes.data);
          	})	
          	.catch(error => {
            	console.error('Error fetching data:', error);
          	});
      }, []);

      useEffect(() => {
        if (selectedItem) {
            const relatedComment = comments.find(comment => comment.product === selectedItem.product_code);
            if (relatedComment) {
                setSelectedComment(relatedComment.text);  // 仮にコメントがtextフィールドに保存されているとします。
                console.log('Setting selectedComment:', relatedComment.text); // 追加
            } else {
                setSelectedComment(null);
            }
        }
    }, [selectedItem, comments]);

    useEffect(() => {
      console.log("Updated selectedComment is: ", selectedComment);
  }, [selectedComment]);

    const handleDelete = () => {
        const deleteProductId = selectedRows.map(row => row.product_code);
        axios.delete('http://127.0.0.1:8000/api/selecteditem/',{
            data: {ids:deleteProductId}
        })
        .then(() => {
            const updateData = selectedData.filter(item => !selectedRows.includes(item.id));
            setSelectedData(updateData);
            setSelectedRows([]);
        })
        .catch((error => {
            console.log('Delete failed:', error);
        }))
    }

    const handleRowSelectionModelChange = (newSelection:any) => {
        console.log("newSelection: ", newSelection);
        const rowSelectdata = selectedData.filter((row) => newSelection.includes(row.id));
        setSelectedRows(rowSelectdata);
    };

    const columns : GridColDef[] = [
        {field: 'product_code', headerName: 'インストア', flex: 1 },
        {field: 'product_name', headerName: '商品名', flex: 2 },
        {field: 'inventory', headerName: '在庫', flex: 1 },
        {field: 'orderpoint', headerName: '発注点', flex:1 },
        {field: 'comment', headerName: 'コメント', flex: 1, renderCell: (params) => {
          const commentData = params.row.comment;
          return (
            <span onClick={() => {
              setSelectedItem(params.row);
              setIsModalOpen(true);
              console.log(params.row)
            }}>
              {commentData}
            </span>
          )
        }},
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
            <CommentModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} selectedItem={selectedItem} selectcomments={selectedComment}/>
        </div>
    )
}

export default CheckedItem;
