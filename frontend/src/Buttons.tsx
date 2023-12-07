import { Grid, Button as MButton, IconButton, Typography } from '@mui/material';

export const Button = ({...props}) => (
	<MButton 
		fullWidth 
		variant='contained' size='large' 
	{...props}>
		<Grid container direction="column" alignItems="center" spacing={1}>
			<Grid item>
				<IconButton>{props.icon}</IconButton>
			</Grid>
			<Grid item>
				<Typography variant='caption' fontWeight='bold' fontSize='8px'>{props.children}</Typography>
			</Grid>
		</Grid>
	</MButton>
);
