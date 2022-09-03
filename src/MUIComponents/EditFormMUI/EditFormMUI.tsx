import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';
import { GenderEnum,  RoleEnum, StatusEnum, } from '../../Rest-APi-Client/shared-types';
import { IFormData } from '../RegisterFormMUI/RegisterFormMUI';
// react-form-hook (controller)    +  YUP Validation
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ControllerTextFieldInput from '../ControllerTextFieldInput/ControllerTextFieldInput';
import styles from "./overrideMUIStyles.module.css"; //some little override -> main BOX container

const theme = createTheme();

//matches(/[^a-zA-ZаА-яЯ]/)
const schema = yup.object({
	fname: yup.string().required(),
	lname: yup.string().required(),
	username: yup.string().required(),
	password: yup.string().required(),

	gender: yup.string(),
	role: yup.string(),
	pucture: yup.string().url(),
	description: yup.string(),
}).required();

interface IEditFormProps {
	handleFormData(formData?: Partial<IFormData>): void;
	isAdminEdition?: boolean;
	handleEditMode?: (event?: any) => void;
	editUser?: IFormData;
}

export default function EditFormMUI({ editUser, handleFormData, handleEditMode, isAdminEdition }: IEditFormProps) {
	const { handleSubmit, control, formState: { errors } } = useForm<IFormData>({
		defaultValues: {
			fname: editUser?.fname,
			lname: editUser?.lname,
			username: editUser?.username,
			password: editUser?.password,
			gender: editUser?.gender,
			role: editUser?.role,
			status: editUser!.status,
			picture: editUser?.picture,
			description: editUser?.description,
		},
		mode: "onChange",
		resolver: yupResolver(schema)

	});

	const sendFormData = (data: IFormData, event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
		if (event !== undefined) {
			event.preventDefault();
		}
		let updatedUser = {
			...editUser,
			...data,
			timeOfModification: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
		}
		handleFormData(updatedUser);

		// const updatedUser = { ...editObject, timeOfModification: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}` };

		//  // fname and lname validation
		//  const firstname = editObject!.fname.toString().trim();
		//  const lastName = editObject!.lname.toString().trim()
		//  let fnameCheck = containsNumber(firstname);
		//  let lnameCheck = containsNumber(lastName);
		//  function containsNumber(str:string) {
		//       return /[^a-zA-ZаА-яЯ]/.test(str);
		//  }
		//  if (fnameCheck===true || lnameCheck===true) {
		//       alert("First name and last name have to contain only letters (EN/BG)");
		//       return;
		//  }


		// //Password VALIDATION  8chars length - !!! 1 digit , 1 symbol atleast    
		// const currPassword = editObject?.password.toString().split("");
		// let haveDigit = false;
		// let haveSpecialSign = false;
		// currPassword?.forEach(char => {
		//      const currASCIICode = char.charCodeAt(0);
		//      if (currASCIICode >= 48 && currASCIICode <= 57) {
		//           haveDigit = true;
		//      }
		//      else if (currASCIICode >= 33 && currASCIICode <= 47
		//           || (currASCIICode >= 58 && currASCIICode <= 64)
		//           || (currASCIICode >= 91 && currASCIICode <= 95)
		//           || (currASCIICode >= 123 && currASCIICode <= 126)) {
		//           haveSpecialSign = true;
		//      }
		// })
		// if (haveDigit === false || haveSpecialSign === false) {
		//      alert("Your password must contain atleast one digit and special sign( _ , &, $ etc.)");
		//      return;
		// }


		// console.log(updatedUser);

	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box className={styles.editForm}
				// sx={{
				// 	paddingTop: "200px",
				// 	paddingBottom: "40px",
				// 	width: "100%",
				// 	display: "flex",
				// 	flexDirection:"column",
				// 	justifyContent: "center",
				// 	alignItems: "center",
				// 	textAlign: "center",
				// 	zIndex: "10",
				// 	top: "0",
				// 	bottom: "0",
				// 	position: "fixed",
				// 	overflowY: "scroll",
				// 	overflowX: "hidden",

				// 	backgroundColor:"black",
				// 	backgroundSize: "contain",

				// }}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Edit user - {editUser?.username}
					</Typography>

					{/* FORM ______________________________________________________________ */}
					<Box component="form" noValidate onSubmit={handleSubmit(sendFormData)}
						sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<ControllerTextFieldInput
									name="fname"
									label="First name"
									control={control}
								></ControllerTextFieldInput>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControllerTextFieldInput
									name="lname"
									label="Last name"
									control={control}
								></ControllerTextFieldInput>
							</Grid>

							<Grid item xs={12} sm={6}>
								<ControllerTextFieldInput
									name="username"
									label="Username"
									control={control}
								></ControllerTextFieldInput>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FormControl sx={{ m: 1, minWidth: 80 }}>
									<InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
									<Controller
										control={control}
										name="gender"
										render={({ field: { onChange, value } }) => (
											<Select
												autoWidth
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={value}
												label="Gender"
												onChange={onChange}
											>
												<MenuItem value={GenderEnum.Male}>Male</MenuItem>
												<MenuItem value={GenderEnum.Female}>Female</MenuItem>
											</Select>
										)}
									/>
								</FormControl>
							</Grid>
							{
								isAdminEdition === undefined ?
									<><Grid item xs={12}>
										<ControllerTextFieldInput
											name="password"
											label="Password"
											control={control}
										></ControllerTextFieldInput>
									</Grid>

										{
											(RoleEnum[editUser!.role] === "Admin") &&
											<><Grid item xs={12} sm={6}>
												<FormControl sx={{ m: 1, }}>
													<InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
													<Controller
														control={control}
														name="role"
														render={({ field: { onChange, value } }) => (
															<Select
																autoWidth
																labelId="demo-simple-select-label"
																id="demo-simple-select"
																value={value}
																label="Role"
																onChange={onChange}
															>
																<MenuItem value={RoleEnum.User}>User</MenuItem>
																<MenuItem value={RoleEnum.Admin}>Admin</MenuItem>
															</Select>
														)}
													/>
												</FormControl>
											</Grid>
												<Grid item xs={12} sm={6}>
													<FormControl sx={{ m: 1, }}>
														<InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
														<Controller
															control={control}
															name="status"
															render={({ field: { onChange, value } }) => (
																<Select
																	autoWidth
																	labelId="demo-simple-select-label"
																	id="demo-simple-select"
																	value={value}
																	label="Status"
																	onChange={onChange}
																>
																	<MenuItem value={StatusEnum.Active}>Active</MenuItem>
																	<MenuItem value={StatusEnum.Deactivated}>Deactivated</MenuItem>
																	<MenuItem value={StatusEnum.Suspended}>Syspended</MenuItem>
																</Select>
															)}
														/>
													</FormControl>
												</Grid></>
										}
									</>
									// If Admins is editing someone else
									:
									<><Grid item xs={12} sm={6}>
										<FormControl sx={{ m: 1, }}>
											<InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
											<Controller
												control={control}
												name="role"
												render={({ field: { onChange, value } }) => (
													<Select
														autoWidth
														labelId="demo-simple-select-label"
														id="demo-simple-select"
														value={value}
														label="Role"
														onChange={onChange}
													>
														<MenuItem value={RoleEnum.User}>User</MenuItem>
														<MenuItem value={RoleEnum.Admin}>Admin</MenuItem>
													</Select>
												)}
											/>
										</FormControl>
									</Grid>
										<Grid item xs={12} sm={6}>
											<FormControl sx={{ m: 1, }}>
												<InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
												<Controller
													control={control}
													name="status"
													render={({ field: { onChange, value } }) => (
														<Select
															autoWidth
															labelId="demo-simple-select-label"
															id="demo-simple-select"
															value={value}
															label="Status"
															onChange={onChange}
														>
															<MenuItem value={StatusEnum.Active}>Active</MenuItem>
															<MenuItem value={StatusEnum.Deactivated}>Deactivated</MenuItem>
															<MenuItem value={StatusEnum.Suspended}>Syspended</MenuItem>
														</Select>
													)}
												/>
											</FormControl>
										</Grid></>

							}
							<Grid item xs={12}>
								<ControllerTextFieldInput
									name="picture"
									label="Picture (URL)"
									control={control}
								></ControllerTextFieldInput>
							</Grid>
							<InputLabel id="description" sx={{ width: "100%", pl: "32px" }}>Description:</InputLabel>
							<Grid item xs={12}>
								<FormControl sx={{ m: 1, minWidth: 60, margin: "auto" }}>
									<Controller
										control={control}
										name="description"
										render={({ field: { onChange, value } }) => (
											<TextareaAutosize
												onChange={onChange}
												value={value}
												aria-label="minimum height"
												minRows={3}
											/>
										)}
									/>
								</FormControl>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
							save
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}