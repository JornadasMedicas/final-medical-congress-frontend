import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material"
import { navBarHeigth, navBarHeigthResponsive } from "../../../pages/HomePage"
import { SectionObserver } from "../../ui/SectionObserver";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { motion } from "motion/react";

const PreRegistro = () => {
	const responsive: boolean = useMediaQuery("(max-width : 1050px)");

	return (
		<Stack sx={{ pt: responsive ? `${navBarHeigthResponsive}px` : `${navBarHeigth}px`, mt: 3, mb: 4 }}>
			<Grid
				container
				component={motion.div}
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease: 'easeOut' }}
				viewport={{ once: true }}
				sx={{
					width: responsive ? '95%' : '850px',
					m: 'auto',
					borderRadius: 5,
					boxShadow: '0 7px 10px 3px rgba(1,18,38, 0.1)',
					gap: 0
				}}
			>
				<Grid size={12} sx={{ height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(90deg, rgba(132, 105, 115, 1) 0%, rgba(84, 14, 38, 1) 48%, rgba(68, 46, 54, 1) 100%);', borderTopLeftRadius: 18, borderTopRightRadius: 15, pt: 4, pb: 4, flexDirection: 'column' }}>
					<SectionObserver sectionId="Registro" />
					<Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
						<ExitToAppIcon sx={{ width: 'auto', height: '30px', color: 'white' }} />
						<Typography sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: responsive ? '23px' : '23px' }}>PRE-REGISTRO</Typography>
					</Box>
				</Grid>
			</Grid>
		</Stack>
	)
}

export default PreRegistro;
