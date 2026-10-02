import { Box, Button, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery } from "@mui/material"
import { navBarHeigth, navBarHeigthResponsive } from "../../../pages/HomePage"
import { SectionObserver } from "../../ui/SectionObserver";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { motion } from "motion/react";
import ContactEmergencyTwoToneIcon from '@mui/icons-material/ContactEmergencyTwoTone';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { JornadasValuesInterface, RegistFormInterface } from "../../../interfaces/registro/IRegistForm";
import { initValuesFormJornadas, initValuesFormJornadasErrors } from "../../../helpers/registro/initValues";
import { ReqEventEditions, ReqGenCatalogs } from "../../../interfaces/admin/IAdmin";
import { regexCiudad, regexReg, regexTel } from "../../../helpers/registro/regex";
import { regexRFC } from "../../admin/Login";
import { validateEmailField, validatePersonalInfoOnly } from "../../../helpers/registro/validateRegistForm";
import Swal from "sweetalert2";
import { postPreRegistMail, postRegistMail } from "../../../services/registro/registroService";
import { getCategories, getEventEditions } from "../../../services/admin/adminService";
import dayjs from "dayjs";

const PreRegistro = () => {
	const responsive: boolean = useMediaQuery("(max-width : 1050px)");
	const [catalogs, setCatalogs] = useState<{ categories: ReqGenCatalogs[], modules: ReqGenCatalogs[], workshops: ReqGenCatalogs[], editions: ReqEventEditions[] }>({ categories: [], modules: [], workshops: [], editions: [] });
	const [payload, setPayload] = useState<RegistFormInterface>(initValuesFormJornadas);
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<JornadasValuesInterface>(initValuesFormJornadasErrors);
	const [isFound, setFound] = useState<boolean | null>(null);

	const handleSubmit = async () => {
		setLoading(true);

		if (isFound === null || isFound === true) {
			const { isOk, errors } = validateEmailField(payload.correo);

			if (!isOk) {
				setErrors(errors);
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Verifica los campos e intenta de nuevo',
				});
				setLoading(false);
				return;
			}

			try {
				const recaptchaToken = await window.grecaptcha.execute(import.meta.env.VITE_APP_SITE_KEY, { action: 'submit' });

				const res = await postPreRegistMail(payload.correo, recaptchaToken);

				if (res.data) {
					Swal.fire({
						icon: 'success',
						title: 'Éxito',
						html: 'Gracias por completar su pre-registro. <hr><b>En breve recibirá un correo electrónico con las indicaciones posteriores.<b>',
						confirmButtonColor: '#d3c19b'
					});

					setPayload({ ...initValuesFormJornadas, edicion: catalogs.editions[0].id });
					setFound(null);
				} else if (res.error) {
					console.log(res.error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: res.error.response ? res.error.response.data.msg : 'No se ha podido procesar su solicitud. Intente más tarde',
						showConfirmButton: true,
						confirmButtonColor: '#d37c6b'
					});
					setFound(false);
				}
			} catch (error) {
				console.log(error);
				Swal.fire({
					icon: "error",
					title: "Error",
					text: 'No se ha podido procesar su solicitud. Intente más tarde',
					confirmButtonColor: '#d37c6b'
				});
			} finally {
				setErrors(initValuesFormJornadasErrors);
				setLoading(false);
			}
		} else {
			const { isOk, errors } = validatePersonalInfoOnly(payload);

			if (!isOk) {
				setErrors(errors);
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Verifica los campos e intenta de nuevo',
				});
				setLoading(false);
				return;
			}

			try {
				const recaptchaToken = await window.grecaptcha.execute(import.meta.env.VITE_APP_SITE_KEY, { action: 'submit' });

				const res = await postRegistMail(payload, recaptchaToken);

				if (res.data) {
					Swal.fire({
						icon: 'success',
						title: 'Éxito',
						html: 'Gracias por completar su registro. <hr><b>En breve recibirá un correo electrónico con las indicaciones posteriores.<b>',
						confirmButtonColor: '#d3c19b'
					});

					setPayload({ ...initValuesFormJornadas, edicion: catalogs.editions[0].id });
					setFound(null);
				} else if (res.error) {
					Swal.fire({
						icon: "error",
						title: "Error",
						text: res.error.response ? res.error.response.data.msg : 'No se ha podido procesar su solicitud. Intente más tarde',
						showConfirmButton: true,
						confirmButtonColor: '#d37c6b'
					});
				}
			} catch (err) {
				console.log(err);
				Swal.fire({
					icon: "error",
					title: "Error",
					text: 'No se ha podido procesar su solicitud. Intente más tarde',
					confirmButtonColor: '#d37c6b'
				});
			} finally {
				setErrors(initValuesFormJornadasErrors);
				setLoading(false);
			}
		}
	}

	useEffect(() => {
		getCategories().then(((res: ReqGenCatalogs[]) => {
			setCatalogs(prev => ({ ...prev, categories: res }));
		}));

		getEventEditions().then(((res: ReqEventEditions[]) => {
			setCatalogs(prev => ({ ...prev, editions: res }));
		}));
	}, []);

	useEffect(() => {
		const currentYear: string = dayjs.utc().format('YYYY');
		const currentEdition: ReqEventEditions[] = catalogs.editions.filter((edition: ReqEventEditions) => edition.edicion === currentYear);

		setPayload({ ...payload, edicion: currentEdition[0]?.id });
	}, [catalogs.editions]);

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
				<Grid container sx={{ width: '100%', p: responsive ? 3 : 4 }} spacing={3}>
					<Grid size={12}>
						<Box sx={{ display: 'flex', mb: 2, gap: 0.7 }}>
							<ContactEmergencyTwoToneIcon sx={{ width: 'auto', height: '23px', color: 'background.default' }} />
							<Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: 'text.primary' }}>Información Personal</Typography>
						</Box>
						<TextField
							fullWidth
							label='Correo Electrónico'
							autoComplete="off"
							value={payload.correo}
							onChange={(e) => setPayload({ ...payload, correo: e.target.value })}
							sx={{
								'& .MuiOutlinedInput-root.Mui-focused': {
									'& fieldset': {
										borderColor: 'text.secondary', // Cambia el color del borde
									}
								},
								"& label": {
									color: 'text.primary'
								},
								"& label.Mui-focused": {
									color: 'black'
								}
							}}
							error={errors.correo.error}
							helperText={errors.correo.error ? errors.correo.msg : ''}
						/>
					</Grid>
					<Grid container sx={{ textAlign: 'center', display: (isFound === null || isFound === true) ? 'none' : 'flex' }} size={12} spacing={3}>
						<Divider sx={{ borderColor: 'text.secondary', width: '85%', m: 'auto', mt: 2 }} />
						<Grid size={12} sx={{ mt: 1 }}>
							<Typography mb={3} sx={{ fontSize: '15px', justifyContent: 'center', display: 'flex', color: '#844f2f' }}>
								* Verifique sus datos correctamente ya que se utilizarán para la generación de su constancia.
							</Typography>
							<FormControl fullWidth>
								<InputLabel
									id='cat-select'
									sx={{
										'&.Mui-focused': {
											color: 'black',
										},
										color: '#844f2f'
									}}>
									Categoría *
								</InputLabel>
								<Select
									labelId='cat-select'
									label='Categoría --'
									fullWidth
									value={payload.categoria}
									sx={{
										'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
											borderColor: 'text.secondary'
										}
									}}
									onChange={(e) => setPayload({ ...payload, categoria: e.target.value })}
									error={errors.categoria.error}
								>
									{catalogs.categories.map((cat: ReqGenCatalogs) =>
										<MenuItem key={cat.id} value={cat.nombre}>{cat.nombre}</MenuItem>
									)}
								</Select>
								{
									errors.categoria.error &&
									<FormHelperText sx={{ color: '#d04847' }}>{errors.categoria.msg}</FormHelperText>
								}
							</FormControl>
						</Grid>
						<Grid size={12}>
							<TextField
								fullWidth
								label='Acrónimo * (C. / Dr. / L.E. / Q.C. /  Q.F.B. / Lic. / C.D. / etc - será utilizado para su constancia)'
								autoComplete="off"
								value={payload.acronimo}
								onChange={(e) => setPayload({ ...payload, acronimo: e.target.value.toUpperCase() })}
								sx={{
									'& .MuiOutlinedInput-root.Mui-focused': {
										'& fieldset': {
											borderColor: 'text.secondary', // Cambia el color del borde
										}
									},
									"& label": {
										color: 'text.primary'
									},
									"& label.Mui-focused": {
										color: 'black'
									}
								}}
								error={errors.acronimo.error}
								helperText={errors.acronimo.error ? errors.acronimo.msg : ''}
							/>
						</Grid>
						<Grid size={12}>
							<TextField
								label='Nombre (s) *'
								fullWidth
								autoComplete='off'
								value={payload.nombre}
								sx={{
									'& .MuiOutlinedInput-root.Mui-focused': {
										'& fieldset': {
											borderColor: 'text.secondary', // Cambia el color del borde
										}
									},
									"& label": {
										color: 'text.primary'
									},
									"& label.Mui-focused": {
										color: 'black'
									}
								}}
								onChange={(e) => setPayload({ ...payload, nombre: regexReg.test(e.target.value) ? e.target.value.toUpperCase() : payload.nombre })}
								error={errors.nombre.error}
								helperText={errors.nombre.error ? errors.nombre.msg : ''}
							/>
						</Grid>
						<Grid size={12}>
							<TextField
								label='Apellidos *'
								fullWidth
								autoComplete='off'
								value={payload.apellidos}
								sx={{
									'& .MuiOutlinedInput-root.Mui-focused': {
										'& fieldset': {
											borderColor: 'text.secondary', // Cambia el color del borde
										}
									},
									"& label": {
										color: 'text.primary'
									},
									"& label.Mui-focused": {
										color: 'black'
									}
								}}
								onChange={(e) => setPayload({ ...payload, apellidos: regexReg.test(e.target.value) ? e.target.value.toUpperCase() : payload.apellidos })}
								error={errors.apellidos.error}
								helperText={errors.apellidos.error ? errors.apellidos.msg : ''}
							/>
						</Grid>
						<Grid size={12}>
							<TextField
								label='RFC (opcional)'
								fullWidth
								autoComplete='off'
								value={payload.rfc}
								sx={{
									'& .MuiOutlinedInput-root.Mui-focused': {
										'& fieldset': {
											borderColor: 'text.secondary', // Cambia el color del borde
										}
									},
									"& label": {
										color: 'text.primary'
									},
									"& label.Mui-focused": {
										color: 'black'
									}
								}}
								slotProps={{
									htmlInput: { maxLength: 13 }
								}}
								onChange={(e) => setPayload({ ...payload, rfc: regexRFC.test(e.target.value) ? e.target.value.toUpperCase() : payload.rfc })}
								error={errors.rfc.error}
								helperText={errors.rfc.error ? errors.rfc.msg : ''}
							/>
						</Grid>
						<Grid size={12}>
							<TextField
								label='No. Teléfono *'
								fullWidth
								autoComplete='off'
								value={payload.tel}
								sx={{
									'& .MuiOutlinedInput-root.Mui-focused': {
										'& fieldset': {
											borderColor: 'text.secondary', // Cambia el color del borde
										}
									},
									"& label": {
										color: 'text.primary'
									},
									"& label.Mui-focused": {
										color: 'black'
									}
								}}
								onChange={(e) => setPayload({ ...payload, tel: regexTel.test(e.target.value) ? e.target.value : payload.tel })}
								error={errors.tel.error}
								helperText={errors.tel.error ? errors.tel.msg : ''}
							/>
						</Grid>
						<Grid size={12}>
							<TextField
								label='Ciudad de Procedencia *'
								fullWidth
								autoComplete='off'
								value={payload.ciudad}
								sx={{
									'& .MuiOutlinedInput-root.Mui-focused': {
										'& fieldset': {
											borderColor: 'text.secondary', // Cambia el color del borde
										}
									},
									"& label": {
										color: 'text.primary'
									},
									"& label.Mui-focused": {
										color: 'black'
									}
								}}
								onChange={(e) => setPayload({ ...payload, ciudad: regexCiudad.test(e.target.value) ? e.target.value.toUpperCase() : payload.ciudad })}
								error={errors.ciudad.error}
								helperText={errors.ciudad.error ? errors.ciudad.msg : ''}
							/>
						</Grid>
						<Grid size={12}>
							<TextField
								label='Escuela, Institución o Dependencia (opcional)'
								fullWidth
								autoComplete='off'
								value={payload.dependencia}
								sx={{
									'& .MuiOutlinedInput-root.Mui-focused': {
										'& fieldset': {
											borderColor: 'text.secondary', // Cambia el color del borde
										}
									},
									"& label": {
										color: 'text.primary'
									},
									"& label.Mui-focused": {
										color: 'black'
									}
								}}
								onChange={(e) => setPayload({ ...payload, dependencia: regexCiudad.test(e.target.value) ? e.target.value.toUpperCase() : payload.dependencia })}
								error={errors.dependencia.error}
								helperText={errors.dependencia.error ? errors.dependencia.msg : ''}
							/>
						</Grid>
					</Grid>
					<Grid size={12} textAlign={'center'}>
						<Button loading={loading} variant='contained' onClick={handleSubmit} sx={{ backgroundColor: "text.secondary", ":hover": { backgroundColor: '#b09a6b' }, color: 'primary.main' }}>
							<SendIcon sx={{ mr: 1 }} />
							Enviar
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Stack>
	)
}

export default PreRegistro;
