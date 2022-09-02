import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';
import { DescriptionType, GenderEnum, IdType, RoleEnum, StatusEnum, TimeOfModificationType, UserClass } from '../../Rest-APi-Client/shared-types';
// react-form-hook (controller)    +  YUP Validation
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ControllerTextFieldInput from '../ControllerTextFieldInput/ControllerTextFieldInput';
import { StringifyOptions } from 'querystring';
import { width } from '@mui/system';

const theme = createTheme();

export interface IFormData {
     id?: IdType
     fname: string,
     lname: string,
     readonly username: string,
     password: string,
     confirmPassword?: string,
     gender: GenderEnum,
     role: RoleEnum,
     picture: string,
     description?: DescriptionType,
     status: StatusEnum,
     timeOfCreation: string,
     timeOfModification: TimeOfModificationType,
}


export interface IRegisterFormProps {
     //switchForm is using only in FormContainer(homepage)
     switchForm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
     // handleShowCreateForm in admin creating user (AllUsersContainer)
     handleShowCreateForm?: () => void;
     isAdminUsingForm?: boolean;
     handleCreateUser(formData?: Partial<IFormData>): void;
     //*Register form is using in home-register & Admin->create new user
     // with diff props depends on creation
}
//matches(/[^a-zA-ZаА-яЯ]/)
const schema = yup.object({
     fname: yup.string().required(),
     lname: yup.string().required(),
     username: yup.string().required(),
     password: yup.string().required(),
     confirmPassword: yup.string().required(),

     gender: yup.string(),
     role: yup.string(),
     pucture: yup.string().url(),
     description: yup.string(),

}).required();

export default function RegisterFormMUI({ handleCreateUser, isAdminUsingForm, switchForm, handleShowCreateForm }: IRegisterFormProps) {
     const { handleSubmit, control, formState: { errors } } = useForm<IFormData>({
          defaultValues: {
               fname: "",
               lname: "",
               username: "",
               password: "",
               confirmPassword: "",
               gender: GenderEnum.Male,
               role: RoleEnum.User,
               picture: "",
               description: "",
          },
          mode: "onChange",
          resolver: yupResolver(schema)

     });
     if (errors) {
          console.log(errors)
     }

     //
     const sendFormData = (data: IFormData, event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
          if (event !== undefined) {
               event.preventDefault();
          }

          // const formData = new FormData(event.currentTarget);
          // // fname and lname validation
          // const firstname = (formData.get("fname"))!.toString();
          // const lastName = (formData.get("lname"))!.toString();
          // let fnameCheck = containsNumber(firstname);
          // let lnameCheck = containsNumber(lastName);
          // function containsNumber(str: string) {
          //      return /[^a-zA-ZаА-яЯ]/.test(str);
          // }
          // if (fnameCheck === true || lnameCheck === true) {
          //      alert("First name and last name have to contain only letters (EN/BG)");
          //      return;
          // }


          //Password VALIDATION  8chars length - !!! 1 digit , 1 symbol atleast    
          // if (formData.get("password") !== formData.get("confirmPassword")) {
          //      alert("Repeat password field doesn't match to password!")
          //      return;
          // }
          // const currPassword = (formData.get("password"))?.toString().split("");
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

          // add avatar pictures for default if missing
          const currPicture = data.picture;
          if (currPicture === "") {
               const genderEnumNumber = data.gender as unknown as number;
               if (genderEnumNumber == 1) {
                    data.picture = "require('../../images/mavatar.png'";
               }
               else {
                    data.picture = "require('../../images/favatar.png'";
               }
          }
          console.log(data)
          const newUser = new UserClass(
               undefined,
               data.fname,
               data.lname,
               data.username,
               data.password,
               data.gender,
               data.role,
               data.picture,
               data.description
          )

          handleCreateUser(newUser)
     }
     //

     return (
          <ThemeProvider theme={theme}>
               <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                         sx={{
                              marginTop: 8,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                         }}
                    >
                         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                              <LockOutlinedIcon />
                         </Avatar>
                         <Typography component="h1" variant="h5">
                              Register
                         </Typography>

                         {/* FORM ______________________________________________________________ */}
                         {
                              isAdminUsingForm
                                   ? (<button
                                        // className={styles.formSwitchBtn}
                                        onClick={handleShowCreateForm}
                                   >close</button>)
                                   : (
                                        <button
                                             // className={styles.formSwitchBtn}
                                             onClick={switchForm}
                                        >go to LOGIN</button>
                                   )
                         }

                         {/* _______________________________________________________________ */}
                         <Box component="form" noValidate
                              onSubmit={handleSubmit(sendFormData)}
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
                                        <FormControl sx={{ m: 1, minWidth: 60 }}>
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
                                   <Grid item xs={12}>
                                        <ControllerTextFieldInput
                                             name="password"
                                             label="Password"
                                             control={control}
                                        ></ControllerTextFieldInput>
                                   </Grid>
                                   <Grid item xs={12}>
                                        <ControllerTextFieldInput
                                             name="confirmPassword"
                                             label="Repeat password"
                                             control={control}
                                        ></ControllerTextFieldInput>
                                   </Grid>
                                   {
                                        // when register User Default / when admin create user role - OPTIONS 
                                        isAdminUsingForm
                                             ? (<div>
                                                  <label htmlFor="role">Role:</label>
                                                  <select name="role" id="role">
                                                       <option value={RoleEnum.User}>user</option>
                                                       <option value={RoleEnum.Admin}>admin</option>
                                                  </select>
                                             </div>)
                                             : (<div>
                                                  <label htmlFor="role">Role:</label>
                                                  <select name="role" id="role" defaultValue={RoleEnum.User}>
                                                       <option value={RoleEnum.User}>user</option>
                                                  </select>
                                             </div>)
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
                                   Register
                              </Button>
                              <Button variant="contained" fullWidth sx={{ mt: 0, mb: 2 }}
                                   onClick={switchForm}>
                                   Already have an account?Go to Login!
                              </Button>
                         </Box>
                    </Box>
               </Container>
          </ThemeProvider>
     );
}