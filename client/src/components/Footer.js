import { Box, Button, CircularProgress, Paper } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';

function Footer({ history, loading, success, onSubmit }) {
	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700]
			}
		})
	};
	return (
		<Paper className="html_paper_footer_1">
			<Box sx={{ m: 1, position: 'relative' }}>
				<Button variant="contained" sx={buttonSx} disabled={loading} onClick={onSubmit}>
					save
				</Button>
				{loading && (
					<CircularProgress
						size={24}
						sx={{
							color: green[500],
							position: 'absolute',
							top: '50%',
							left: '50%',
							marginTop: '-12px',
							marginLeft: '-12px'
						}}
					/>
				)}
			</Box>
			<Button
				style={{ margin: '0 15px' }}
				onClick={() => {
					if (!loading) history.push('/creative');
				}}
			>
				cancel
			</Button>
		</Paper>
	);
}

export default Footer;
