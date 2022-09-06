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
import { DescriptionType, GenderEnum, IdType, RoleEnum, StatusEnum, TimeOfModificationType, UserClass } from '../../Rest-APi-Client/shared-types';
// react-form-hook (controller)    +  YUP Validation
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ControllerTextFieldInput from '../ControllerTextFieldInput/ControllerTextFieldInput';
import { formsMUIoverride } from '../LoginFormMUI/LoginFormMUI';

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

const schema = yup.object({
   fname: yup.string().required("Required field").min(2,"First name must be at least 2 characters").max(15).matches(/^[a-zA-Z]+$/, "Only letters (EN)"),
   lname: yup.string().required("Required field").min(2,"Last name must be at least 2 characters").max(15).matches(/^[a-zA-Z]+$/, "Only letters (EN)"),
   username: yup.string().required().min(5).max(15).matches(/^[a-zA-Z-0-9]+$/, "Only letters and numbers"),
   password: yup.string().required().min(8).max(15)
   .matches(/^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/, "At Least one special character")
   .matches(/^.*[0-9].*$/, "At Least one digit"),
   confirmPassword: yup.string().required().min(8).max(15)
   .oneOf([yup.ref('password'), null], 'Passwords must match'),
   gender: yup.string(),
   role: yup.string(),
   picture: yup.string().url(),
   description: yup.string().max(512),
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

      // add avatar pictures for default if missing
      const currPicture = data.picture;
      if (currPicture === "") {
         const genderEnumNumber = data.gender as unknown as number;
         if (genderEnumNumber == 1) {
            data.picture =`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLmLRaBUd5SU_6MKZaJcyXuMs6wYP62lGRUw&usqp=CAU`;
            // data.picture = require(`../../images/mavatar.png`);
         }
         else {
            data.picture = `data:image/png;base64,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`;
            // data.picture = require(`../../images/favatar.png`);
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
               <Avatar sx={{ m: 1, bgcolor: '#ffc244'}}><AppRegistrationIcon style={{fontSize:"32px"}}/></Avatar>
               <Typography component="h1" variant="h5">  Register </Typography>

               {/* FORM ______________________________________________________________ */}
               <Box component="form" noValidate
                  onSubmit={handleSubmit(sendFormData)}
                  sx={{
                     mt: 3,
                     ...formsMUIoverride
                  }}
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12} sm={6}>
                        <ControllerTextFieldInput
                           name="fname"
                           label="First name"
                           control={control}
                           error={errors.fname?.message}
                        ></ControllerTextFieldInput>
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <ControllerTextFieldInput
                           name="lname"
                           label="Last name"
                           control={control}
                           error={errors.lname?.message}
                        ></ControllerTextFieldInput>
                     </Grid>

                     <Grid item xs={12} sm={6}>
                        <ControllerTextFieldInput
                           name="username"
                           label="Username"
                           control={control}
                           error={errors.username?.message}
                        ></ControllerTextFieldInput>
                     </Grid>

                     <Grid item xs={12} sm={6}>
                        <FormControl>
                           <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
                           <Controller
                              control={control}
                              name="gender"
                              render={({ field: { onChange, value } }) => (
                                 <Select
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value}
                                    label="Gender"
                                    onChange={onChange}
                                    style={{ height: "59px", paddingTop: "20px",}}
                                    MenuProps={{
                                       sx: {
                                          fontSize: "16px",
                                          "&& .Mui-selected": {
                                             backgroundColor: "gray"
                                          },
                                       }
                                    }}
                                 >
                                    <MenuItem value={GenderEnum.Male} >Male</MenuItem>
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
                           error={errors.password?.message}
                        ></ControllerTextFieldInput>
                     </Grid>
                     <Grid item xs={12}>
                        <ControllerTextFieldInput
                           name="confirmPassword"
                           label="Repeat password"
                           control={control}
                           error={errors.confirmPassword?.message}
                        ></ControllerTextFieldInput>
                     </Grid>
                     {
                        // when register User Default / when admin create user role - OPTIONS 
                        isAdminUsingForm
                        &&
                        <Grid item xs={12}>
                           <FormControl>
                              <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
                              <Controller
                                 control={control}
                                 name="role"
                                 render={({ field: { onChange, value } }) => (
                                    <Select
                                       fullWidth
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
                     }
                     <Grid item xs={12}>
                        <ControllerTextFieldInput
                           name="picture"
                           label="Picture (URL)"
                           control={control}
                           error={errors.picture?.message}
                        ></ControllerTextFieldInput>
                     </Grid>
                     <InputLabel id="description" sx={{ width: "100%", pl: "32px", pr: "32px" }}>Description:</InputLabel>
                     <Grid item xs={12}>
                        <FormControl sx={{ m: 1, minWidth: 60, textAlign: "center" }}>
                           <Controller
                              control={control}
                              name="description"
                              render={({ field: { onChange, value } }) => (
                                 <TextareaAutosize
                                    onChange={onChange}
                                    value={value}
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Not necessary only if you are in the mood &#128516;"
                                    style={{ width: 386, height: 150, margin: "auto" }}
                                    maxLength={512}
                                 />
                              )}
                           />
                           <p style={{color:"red"}}>{errors.description?.message}</p>
                        </FormControl>
                     </Grid>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                     Register
                  </Button>
                  {
                     isAdminUsingForm
                        ? (
                           <Button variant="contained" fullWidth sx={{ mt: 0, mb: 2 }}
                              onClick={handleShowCreateForm}>
                              Close
                           </Button>
                        )
                        : (
                           <Button variant="contained" color="success" fullWidth sx={{ mt: 0, mb: 2 }}
                              onClick={switchForm}>
                              Already have an account? Go to Login!
                           </Button>
                        )
                  }
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}