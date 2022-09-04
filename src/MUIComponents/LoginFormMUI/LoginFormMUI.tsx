import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IFormData } from "../../MUIComponents/RegisterFormMUI/RegisterFormMUI";

// react-form-hook (controller)    +  YUP Validation
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ControllerTextFieldInput from '../ControllerTextFieldInput/ControllerTextFieldInput';
import { alpha, css, InputBase, makeStyles, OutlinedInputProps, responsiveFontSizes } from '@mui/material';
import styled from '@emotion/styled';

import styles from "./styles.module.css";
export interface ILoginFormProps {
   switchForm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
   handleLoginData(formData?: Partial<IFormData>): void;
}

interface ILoginFormInputs {
   username: string,
   password: string
}

const schema = yup.object({
   username: yup.string().required(),
   password: yup.string().required(),
}).required();

const theme = createTheme(
  // {
//    components: {
//       // Name of the component
//       MuiTextField: {
//         styleOverrides: {
//           // Name of the slot
         
//           root: {
//             // Some CSS
//             // height: CARD_CONTENT_HEIGHT,
//             color:"white"
//           },
//         },
//       },
//     },
//   }
);
// ___________________________________
// const styles = (theme:any) => ({
//    multilineColor:{
//        color:'red'
//    }
// });
// _________________________________

export default function LoginFormMUI({ switchForm, handleLoginData }: ILoginFormProps) {
   
   // ______________________________________________________
   const { handleSubmit, control, formState: { errors } } = useForm<ILoginFormInputs>({
      defaultValues: { username: "", password: "" },
      mode: "onChange",
      resolver: yupResolver(schema)

   });
   // ______________________________________________________

   const sendSubmit = (data: ILoginFormInputs, event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
      if (event !== undefined) {
         event.preventDefault();
      }

      handleLoginData(data);
   };

   return (
      <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
               sx={{
                  height: "100vh",
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
                  Login
               </Typography>

               {/* FORM ______________________________________________________ */}
               {/* !!! Controller syntax without GENERIC factory function */}
               <Box component="form" 
               onSubmit={handleSubmit(sendSubmit)} 
               noValidate 
               autoComplete="off"
               sx={{ mt: 1 ,
                  '& .MuiTextField-root': {
                     bgcolor:"black",
                     paddingBottom:"0px",
                    
                   },
                   '& .MuiInputBase-input':{
                     color:"white",
                   },
                   '& > :not(style)': { 
                     borderBottom:"1px solid gray",
                     color:"white"
                    },
                    '& .MuiInputLabel-root': {
                     color:"gray",
                     fontSize:"18px"
                    
                   },
               }}
              
               
               >
                  <Controller
                     control={control}
                     name="username"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth
                           id="username"
                           label="Username"
                           name="username"
                           placeholder='username'
                           color="secondary"
                           value={value}
                           onChange={onChange}
                           error={errors.username?.message ? true : false}
                           helperText={errors.username?.message || ""}
                           // className={styles["MuiInputBase-root"]}
                           // sx={{input:{color:"primary"}}}
                      
                           
                        />
                     )}
                  />
                  {/* <p>{errors.username?.message}</p> */}

                  <ControllerTextFieldInput
                     control={control}
                     name="password"
                     label='Password'
                     error={errors.password?.message}
                  />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Login
                  </Button>
                  <Grid container>
                     <Grid item>
                        <Button variant="contained" fullWidth sx={{ mt: 0, mb: 2 }}
                           onClick={switchForm}>
                           Go to register
                        </Button>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}