import { Stack, useMediaQuery } from "@mui/material"
import { navBarHeigth, navBarHeigthResponsive } from "../../../pages/HomePage"

const PreRegistro = () => {
	const responsive: boolean = useMediaQuery("(max-width : 1050px)");

	return (
		<Stack sx={{ pt: responsive ? `${navBarHeigthResponsive}px` : `${navBarHeigth}px`, mt: 3, mb: 4 }}>


		</Stack>
	)
}

export default PreRegistro;
