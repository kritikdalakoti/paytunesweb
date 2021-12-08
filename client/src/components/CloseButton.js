import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import '../App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

function SnackbarCloseButton({ snackbarKey }) {
	const { closeSnackbar } = useSnackbar();

	return (
		<IconButton onClick={() => closeSnackbar(snackbarKey)}>
			<ClearIcon sx={{ color: 'white' }} />
		</IconButton>
	);
}

export default SnackbarCloseButton;
