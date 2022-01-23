import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import styles from '../css/newcampaign.module.css'
import { Paper, Modal, Select, MenuItem, } from '@material-ui/core'
import * as fun from '../api/campaign';
import Lineitemform from "./lineitemform";
import { Alert } from '@material-ui/lab';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from '@material-ui/core';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		},
		table: {
			// minWidth: '55%',
			width: '98%'
		}
	},
	paper: {
		// position: 'absolute',
		width: '50%',
        margin:'auto',
        marginTop:'10%',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: '2% 2% 2% 6%',
	}
}));

export default function ListLineitem() {


    const history=useHistory();
    let { campid } = useParams();
    const classes=useStyles();
    const [campaignName,setcampaignName]=useState('');
    const [lineitems, setlineitems] = useState([]);
    const [sa, setsa] = React.useState('lineitemname');
    const [order, setorder] = React.useState('desc');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [tempdata,settempdata]=useState({});
    const [page, setPage] = useState(0);
    const [show,setShow]=useState(false);
    const [open, setOpen] = React.useState(false);
    const [error, seterror] = useState('');
	const [success, setsuccess] = useState('');
	const handleOpen = (data) => {
		setOpen(true);
		setShow(true)
		settempdata(data);
	};

	const handleClose = () => {
		setOpen(false);
	};

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const data=async()=>{
        const formdata = new FormData();
        formdata.append('campid', campid);
        let res = await fun.createApi(formdata, '/campaign/lineitemslist');
        console.log(res);
        setlineitems(res.data);
    }

    useEffect(async()=>{
        const formdata=new FormData();
        formdata.append('campid',campid);
        let res=await fun.createApi(formdata,'/campaign/getcampaignname');
        console.log(res);
        setcampaignName(res.data.data);
    })

    useEffect(async () => {
        const formdata = new FormData();
        formdata.append('campid', campid)
        let res = await fun.createApi(formdata, '/campaign/lineitemslist');
        console.log(res);
        setlineitems(res.data);
    }, [campid])

    const duplicaterow=async(row)=>{
        const formdata=new FormData();
        formdata.append('_id',row._id);
        let res=await fun.createApi(formdata,'/campaign/duplicatelineitem');
        if(res.data.error){
            return seterror(res.data.error);
        }
        setsuccess(res.data.data);
        data();
    }

    const arrowRetuner = (mode) => {
        if (mode === '1') {
            return <ArrowUpwardRoundedIcon fontSize="small" />;
        } else if (mode === '2') {
            return <ArrowDownwardRoundedIcon fontSize="small" />;
        } else {
            return <ArrowUpwardRoundedIcon fontSize="small" style={{ color: 'lightgrey' }} />;
        }
    };

    const orderSetter = (order, column, data, type) => {
        var dataSort = data;
        // console.log(order, column, data, type);
        dataSort = dataSort.sort(function (a, b) {
            if (type === 'string') {
                var aa = a[column] ? String(a[column]) : null;
                var bb = b[column] ? String(b[column]) : null;
                if (aa === bb) {
                    return 0;
                } else if (aa === null) {
                    return 1;
                } else if (bb === null) {
                    return -1;
                } else if (order === 'asc') {
                    return aa < bb ? -1 : 1;
                } else {
                    return aa < bb ? 1 : -1;
                }
            } else if (type === 'date') {
                var ad = new Date(a[column]);
                var bd = new Date(b[column]);
                if (ad === bd) {
                    return 0;
                } else if (ad === null) {
                    return 1;
                } else if (bd === null) {
                    return -1;
                } else if (order === 'asc') {
                    return ad - bd;
                } else {
                    return bd - ad;
                }
            } else {
                var an = a[column] !== (undefined || null) ? (typeof a[column] === 'number' ? a[column] : null) : null;
                var bn = b[column] !== (undefined || null) ? (typeof b[column] === 'number' ? b[column] : null) : null;
                if (an === bn) {
                    return 0;
                } else if (an === null) {
                    return 1;
                } else if (bn === null) {
                    return -1;
                } else if (order === 'asc') {
                    return an - bn;
                } else {
                    return bn - an;
                }
            }
        });
        return dataSort;
    };

    const tablesorter = (column, type) => {
        var orde = sa === column ? (order === 'asc' ? 'desc' : 'asc') : 'asc';
        setorder(orde);
        setsa(column);
        var setData = orderSetter(orde, column, lineitems, type);
        // var setDatatrus = orderSetter(orde, column, datatrus, type);
        setlineitems(setData);
    };

    return (
        <div>
            <div className={classes.root}>
				{success ? (
					<Alert
						onClose={() => {
							setsuccess('');
						}}
						style={{ margin: '1%' }}
						severity="success"
					>
						{success}
					</Alert>
				) : (
					<React.Fragment />
				)}
				{error ? (
					<Alert
						onClose={() => {
							seterror('');
						}}
						style={{ margin: '1%' }}
						severity="error"
					>
						{error}
					</Alert>
				) : (
					''
				)}
			</div>
            <Paper className={styles.dashboard} elevation={3}>
                <div className={styles.rowdis} >
                    <div className={styles.campname} >
                        <span className={styles.svdf1} >Campaign Name</span>
                    </div>
                    <div>
                        <input className="input" size="30"
                            required={true}
                            value={campaignName}
                        />
                    </div>

                </div>
            </Paper>
            <div className={styles.shgt2} >
                <div style={{ marginLeft: '5px', marginTop: '5px' }} >Line Items Under this Campaign.</div>
            </div>
            <Paper className={styles.dashboard} elevation={3}>
                {/* <div className={styles.coldis} >
                    {lineitems.map(item=>
                        <div>
                            {item.lineitemname}
                        </div>
                    )}

                </div> */}

                <TableContainer style={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {/* <TableCell>{title}</TableCell> */}
                                {<TableCell onClick={() => tablesorter('lineitemname', 'string')} style={{ cursor: 'pointer' }}> LineItem Name {arrowRetuner(sa === 'lineitemname' ? (order === 'asc' ? '1' : '2') : '3')}</TableCell>}
                                {<TableCell onClick={() => tablesorter('lineitemstatus', 'string')} style={{ cursor: 'pointer' }}> Status {arrowRetuner(sa === 'lineitemstatus' ? (order === 'asc' ? '1' : '2') : '3')}</TableCell>}
                                {<TableCell onClick={() => tablesorter('dealid', 'string')} style={{ cursor: 'pointer' }}> DealId {arrowRetuner(sa === 'dealid' ? (order === 'asc' ? '1' : '2') : '3')}</TableCell>}
                                <TableCell style={{ width: '10%' }}>
                                </TableCell>
                                {<TableCell />}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {(lineitems).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.lineitemname ? row.lineitemname : ''}
                                    </TableCell>
                                    <TableCell>{row.lineitemstatus ? row.lineitemstatus : ''}</TableCell>
                                    <TableCell>{row.dealid ? row.dealid : ''}</TableCell>
                                    <TableCell>
                                        <button className="btn" onClick={()=>handleOpen(row)} >
                                            Edit{' '}
                                        </button>
                                    </TableCell>
                                    <TableCell>
                                        <button className="btn" onClick={()=>duplicaterow(row)} >
                                            Duplicate{' '}
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 100, 1000, 10000]}
                    component="div"
                    count={lineitems ? lineitems.length : 0}
                    rowsPerPage={rowsPerPage}
                    //style={{float:'left'}}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                {show ? (
                    <div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <div style={{ maxHeight: '100vh', 'overflow-y': 'auto' }} className={classes.paper}>
                                <h4>Insert Deal Id</h4>
                                <Lineitemform
                                    props={tempdata}
                                    setShow={setShow}
                                    setsuccess={setsuccess}
                                    data1={data}
                                    seterror={seterror}
                                />
                            </div>
                        </Modal>

                    </div>
                ) : (
                    <React.Fragment />
                )}

            </Paper>
            <button onClick={()=>history.push('/dashboard')} style={{marginLeft:'600px'}} >Back to Dashboard</button>
        </div>
    )

}