import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams, roRO } from '@mui/x-data-grid';
import {Tabs, Tab} from '@mui/material';
import Button from '@mui/material/Button';
import CommentModal from './commentmodal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



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
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);  
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const handleDeleteConfirmation = () => {
      setIsConfirmOpen(true);
  }

    const handleCloseConfirmDialog = () => {
      setIsConfirmOpen(false);
  }

  const confirmDelete = () => {
    handleCloseConfirmDialog();
    handleDelete();
}


    const mergeProductAndComments = (products: Product[], comments: Comment[]) => {
        return products.map(product => {
          	const relatedComment = comments.find(comment => comment.product === product.product_code);
          	return {
          	  	...product,
          	  	comment: relatedComment ? 'コメントあり' : 'コメントなし',
          	};
        });
    };

    const fetchAndSetData = () => {
      const fetchSelectedData = axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/selecteditem/`);
      const fetchComments = axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/comment/`);
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
    }

    useEffect(() => {
      fetchAndSetData();
  }, []);

    useEffect(() => {
        if (selectedItem) {
            const relatedComment = comments.find(comment => comment.product === selectedItem.product_code);
            if (relatedComment) {
                setSelectedComment(relatedComment.text);  // 仮にコメントがtextフィールドに保存されているとします。
            } else {
                setSelectedComment(null);
            }
        }
    }, [selectedItem, comments]);

    const handleDelete = () => {
        const deleteProductId = selectedRows.map(row => row.product_code);
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/selecteditem/`,{
            data: {ids:deleteProductId}
        })
        .then(() => {
            const updateData = selectedData.filter(item => !deleteProductId.includes(item.product_code));
            setSelectedData(updateData);
            setSelectedRows([]);
            setSnackbarMessage("アイテムが正常に削除されました。");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
        })
        .catch((error => {
          setOpenSnackbar(false);
        }))
    }

    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
  }


    const handleRowSelectionModelChange = (newSelection:any) => {
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
            <Button variant='contained' color="secondary" onClick={handleDeleteConfirmation}>
                delete Selected
            </Button>
            <CommentModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} selectedItem={selectedItem} selectcomments={selectedComment}/>
            <Dialog open={isConfirmOpen} onClose={handleCloseConfirmDialog}>
              <DialogTitle>{"アイテムを削除しますか？"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                選択されたアイテムを削除します。
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseConfirmDialog} color="primary">
                    キャンセル
                </Button>
                <Button onClick={confirmDelete} color="secondary">
                    削除
                </Button>
            </DialogActions>
            </Dialog>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                {snackbarMessage}
              </Alert>
            </Snackbar>
        </div>
    )
}

export default CheckedItem;
