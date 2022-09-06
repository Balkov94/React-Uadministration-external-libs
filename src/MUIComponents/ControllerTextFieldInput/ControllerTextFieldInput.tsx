import TextField, { TextFieldPropsSizeOverrides } from '@mui/material/TextField';
import { Control, Controller, FieldPath, FieldValues, Path, RegisterOptions } from "react-hook-form";
import React from "react";

interface FormInputTextProps<TFieldValues extends FieldValues> {
   name: Path<TFieldValues>;
   control: Control<TFieldValues, any>;
   label: string;
   rules?: Omit<RegisterOptions<TFieldValues, FieldPath<TFieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
   disabled?: boolean;
   size?: 'small' | 'medium';
   error?: string | undefined;
   type?: string;
   readOnly?: boolean;

   resetImgURl?: () => void;
   defaultValue?: string;
}


function ControllerTextFieldInput<TFieldValues extends FieldValues>(
   {
      name,
      control,
      label,
      rules = {},
      disabled = false,
      size = 'medium',
      error = undefined,
      type,
      readOnly,

   }: FormInputTextProps<TFieldValues>) {


   return (
      (
         <Controller
            name={name}
            control={control}
            render={({ field }) =>
               <TextField
                  label={readOnly?(label+"-unchangeable*"):label}
                  disabled={disabled}
                  size={size}
                  type={type}
                  error={!!error}
                  helperText={error || ''} placeholder={name}  
                  inputProps={{ readOnly}}
                  {...field} 
               />
            }
            rules={rules}
         />
      )
   )
}

export default ControllerTextFieldInput