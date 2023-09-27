import React from 'react'
import { useEffect,useState,useContext } from 'react'
import { DataGrid, GridColDef, GridRowProps, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import ReorderPointModal from './reorderpointmodal';
import CommentModal from './commentmodal';
import {Tabs, Tab, Button, Box} from '@mui/material';
import { SelectedRowsContext } from '../context/selectcontext'
import axios from "axios";
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function UnderOrderPoint() {

    const [data,setData] = useState<GridRowsProp>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [commentmodalIsOpen, setCommentModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [currentPage, setcurrentPage] = useState(1);
    const [value, setvalue] = useState(0);
    const [category, setCategory] = useState('日本酒');
    const {selectedRows, setSelectedRows} = useContext<any>(SelectedRowsContext)
    const [addItems, setAddItems] = useState<GridRowsProp>([]);
    const [selectedComment, setSelectedComment] = useState('');
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);  
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");


    const mergeProductAndComments = (products,comments) => {
        return products.map(product => {
            const relatedComment = comments.find(comment => comment.product === product.product_code);
            return {
                ...product,
                comment: relatedComment ? 'コメントあり' : 'コメントなし',
                commentText: relatedComment ? relatedComment.text : null
            };
        });
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/selecteditem/');
                const newAddItems = response.data;
                if (JSON.stringify(newAddItems) !== JSON.stringify(addItems)) {
                    setAddItems(newAddItems);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
    
        fetchData(); 
    }, []); 
    
    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/inventory/reorder/?page=${currentPage}&category=${category}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const commentsResponse = await axios.get('http://127.0.0.1:8000/api/comment/');
                const transformedData = data.results.map((item) => ({
                    id: item.id,
                    product_code: item.product.product_code,
                    product_name: item.product.name,
                    inventory: item.current_stock,
                    category: item.product.category,
                    orderpoint: item.reorder_point,
                    disabled: addItems.some(addItem => addItem.product_code === item.product.product_code)
                }));
                const mergedData = mergeProductAndComments(transformedData,commentsResponse.data);
                setData(mergedData);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
    
        fetchInventoryData(); 
    }, [currentPage, category, addItems]); 
    
    function CommentButton({ hasComments, ...props }) {
        const iconColor = hasComments ? "primary" : "disabled";
        return (
            <Button 
                color={hasComments ? "primary" : "inherit"}
                startIcon={<CommentIcon color={iconColor} />}
                {...props}
            >
                コメント
            </Button>
        );
    }

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
        {
            field: 'comment', 
            headerName: 'コメント', 
            flex: 1,
            renderCell: (params) => {
                const commentData = params.row.comment;        
                return (
                    <CommentButton
                    hasComments={params.row.comment !== "コメントなし"}
                    onClick={() => {
                        setSelectedItem(params.row.product_code); 
                        if (params.row.commentText) { 
                            setSelectedComment(params.row.commentText);
                        }
                        setCommentModalIsOpen(true);
                    }}
                />  
                );
            },
        },  
    ]
    const handlePageChange = (newPage) => {
        setcurrentPage(newPage)
    }

    const tabLabels = ["日本酒", "焼酎", "ワイン", "リキュール", "ビール", "スピリッツ", "ノンアルコール", "調味料", "備品"];

    const handleChange = (event,newValue) => {
        console.log(event)
        setvalue(newValue)
        setCategory(tabLabels[newValue])
    }

    const handleRowSelection = (newSelection) => {

        const selectData = data.filter((row) => newSelection.includes(row.id));
        setSelectedRows(selectData);
    };
    
    const newSelectedRows = selectedRows.map(({ id, ...rest }) => rest);

    const handleAddToDatabase = () => {
        newSelectedRows.forEach(row => {
            axios.post('http://127.0.0.1:8000/api/selecteditem/', row)
            .then(data => {
                setSnackbarMessage("アイテムが正常に追加されました。");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
                setIsConfirmOpen(false);
            })
            .catch((error) => {
                setOpenSnackbar(false);
            });
        });
    };
    
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleAddConfirmation = () => {
        setIsConfirmOpen(true);
    }
    const handleCloseConfirmDialog = () => {
        setIsConfirmOpen(false);
    }

    const confirmAdd = () => {
        handleAddConfirmation();
        handleAddToDatabase();
    }


    return (
        <div style={{ height: 'calc(100vh - 120px)', width: '100%' }}>
            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                <Tab label="日本酒"/>
                <Tab label="焼酎"/>
                <Tab label="ワイン"/>
                <Tab label="リキュール"/>
                <Tab label="ビール"/>
                <Tab label="スピリッツ"/>
                <Tab label="ノンアルコール"/>
                <Tab label="調味料"/>
                <Tab label="備品"/>                
            </Tabs>
            <DataGrid
                rows={data}
                columns={columns}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowSelectionModelChange={(setSelection) => handleRowSelection(setSelection)}
                isRowSelectable={(params) => !params.row.disabled}
            />

            <ReorderPointModal
                isOpen={modalIsOpen}
                closeModal={() => setModalIsOpen(false)}
                selectedItem = {selectedItem}
            />

            <CommentModal
                isOpen={commentmodalIsOpen}
                closeModal={() => setCommentModalIsOpen(false)}
                selectedItem = {selectedItem}
                selectcomments= {selectedComment}
            />
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Button variant="contained" color="primary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
                    前へ
                </Button>
                <Box mx={1}></Box>
                <Button variant="contained" color="primary" onClick={() => handlePageChange(currentPage + 1)}>
                    次へ
                </Button>
                <Box mx={1}></Box>
                <Button variant="contained" color="primary" onClick={handleAddConfirmation}>
                    チェックリストに追加
                </Button>
                <Dialog open={isConfirmOpen} onClose={handleCloseConfirmDialog}>
                    <DialogTitle>{"アイテムを追加しますか？"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            選択されたアイテムを追加します。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirmDialog} color="primary">
                        キャンセル
                        </Button>
                        <Button onClick={confirmAdd} color="secondary">
                        追加
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </div>
    )
}

export default UnderOrderPoint