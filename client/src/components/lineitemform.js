import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

export default function Lineitemform({ props, setShow, setsuccess, data1, seterror }) {
	console.log(props._id);
	const [dealid, setdealid] = useState(props.dealid);
    const [lineitemid,setlineitemid]=useState(props._id);
    const [lineitemname,setlineitemname]=useState(props.lineitemname);
	

	function editZipdata() {
		fetch('/campaign/editlineitem', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt')
			},
			body: JSON.stringify({
				dealid,
                lineitemid,
                lineitemname
			})
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					seterror(data.error);
					return console.log(data.error);
				}
				console.log(data);
				setShow(false);
				setsuccess(data.message);
				data1();
			});
	}

	return (
		<div>
			<form style={{ margin: '2%' }} 
            onSubmit={e=>{
                e.preventDefault();
                editZipdata();
            }}
            >
				
				<TextField
					placeholder="Deal Id"
					margin="dense"
					label="DealId"
					style={{ width: '60%' }}
					value={dealid ? dealid : ''}
					required={true}
					onChange={(e) => {
						setdealid(e.target.value);
					}}
				/>
                <br/>
                <TextField
					placeholder="Linitem Name"
					margin="dense"
					label="Lineitemname"
					style={{ width: '60%' }}
					value={lineitemname ? lineitemname : ''}
					required={true}
					onChange={(e) => {
						setlineitemname(e.target.value);
					}}
				/>
				
				
                <button className="btn" type='submit'  style={{ marginTop:'3%',marginLeft:'2%' }} >
				Edit Info
			</button>
			</form>
			
		</div>
	);
}
