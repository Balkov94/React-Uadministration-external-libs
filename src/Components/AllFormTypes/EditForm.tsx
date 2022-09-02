import styles from "./FormContainer.module.css";
import {
     GenderEnum,
     RoleEnum,
     StatusEnum,
} from "../../Rest-APi-Client/shared-types";
import React, { useState } from "react";
import { IFormData } from "../../MUIComponents/RegisterFormMUI/RegisterFormMUI";

interface IEditFormProps {
     handleFormData(formData?: Partial<IFormData>): void;
     isAdminEdition?: boolean;
     handleEditMode?: (event?: any) => void;
     editUser?: IFormData;
}




function EditForm({ editUser,
     handleFormData,
     handleEditMode,
     isAdminEdition }: IEditFormProps) {

     // USING props into a local STATE -> because there is A SINGLE SOURCE OF TRUTH
     const [editObject, setEditObject] = useState(editUser)

     const handleInputs = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
          const propName = event.currentTarget.name;
          const newValue = event.currentTarget.value;
          const newObj: any = {
               ...editObject,
               [propName]: newValue,
          }
          setEditObject(newObj)
     }

     const sendFormData = (event: React.FormEvent) => {
          event.preventDefault();
          const updatedUser = { ...editObject, timeOfModification: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}` };

           // fname and lname validation
           const firstname = editObject!.fname.toString().trim();
           const lastName = editObject!.lname.toString().trim()
           let fnameCheck = containsNumber(firstname);
           let lnameCheck = containsNumber(lastName);
           function containsNumber(str:string) {
                return /[^a-zA-ZаА-яЯ]/.test(str);
           }
           if (fnameCheck===true || lnameCheck===true) {
                alert("First name and last name have to contain only letters (EN/BG)");
                return;
           }


          //Password VALIDATION  8chars length - !!! 1 digit , 1 symbol atleast    
          const currPassword = editObject?.password.toString().split("");
          let haveDigit = false;
          let haveSpecialSign = false;
          currPassword?.forEach(char => {
               const currASCIICode = char.charCodeAt(0);
               if (currASCIICode >= 48 && currASCIICode <= 57) {
                    haveDigit = true;
               }
               else if (currASCIICode >= 33 && currASCIICode <= 47
                    || (currASCIICode >= 58 && currASCIICode <= 64)
                    || (currASCIICode >= 91 && currASCIICode <= 95)
                    || (currASCIICode >= 123 && currASCIICode <= 126)) {
                    haveSpecialSign = true;
               }
          })
          if (haveDigit === false || haveSpecialSign === false) {
               alert("Your password must contain atleast one digit and special sign( _ , &, $ etc.)");
               return;
          }

          handleFormData(updatedUser)
          // console.log(updatedUser);

     }
     const clearInputField = (event: React.MouseEvent<HTMLInputElement>) => {
          event.currentTarget.value = "";
     }


     return (
          <div className={styles.editForm}>
               <form action="submit" onSubmit={sendFormData}>
                    <div className={styles.formTitle}>
                         <h1>Edit {editUser?.username}'s profile
                              <button className={styles.formSwitchBtn}
                                   onClick={handleEditMode}
                              >Exit edition</button>
                         </h1>
                    </div>

                    <div>
                         <label htmlFor="fname">First name: </label>
                         <input onChange={handleInputs}
                              type="text" name="fname" id="fname" value={editObject?.fname}
                              required={true} maxLength={15} minLength={2} />
                    </div>
                    <div>
                         <label htmlFor="lname">Last name: </label>
                         <input onChange={handleInputs}
                              type="text" name="lname" id="lname" value={editObject?.lname}
                              required={true} maxLength={15} minLength={2} />
                    </div>
                    <div>
                         <label htmlFor="username">Username:</label>
                         <input onChange={handleInputs}
                              type="text" name="username" id="username"
                              maxLength={15} minLength={0}
                              value={editObject?.username} readOnly={true}
                              className={styles.usernameLOckedField} />

                    </div>
                    {
                         isAdminEdition === undefined ?
                              //undefined - > user edit self 
                              <>
                                   <div>
                                        <label htmlFor="password">Password:</label>
                                        <input onChange={handleInputs} type="text" name="password" id="password"
                                             value={editObject?.password} autoComplete="off"
                                             minLength={0} />
                                   </div>
                                   {/* edit self and you are Admin*/}
                                   {

                                        (RoleEnum[editUser!.role] === "Admin") &&
                                        <>
                                             <div>
                                                  <label htmlFor="status">User status:</label>
                                                  <select onChange={handleInputs} name="status" id="status" defaultValue={editObject?.status}>
                                                       <option value={StatusEnum.Active}>Active</option>
                                                       <option value={StatusEnum.Deactivated}>Deactivated</option>
                                                       <option value={StatusEnum.Suspended}>Suspended</option>
                                                  </select>
                                             </div>
                                             <div>
                                                  <label htmlFor="role">Role:</label>
                                                  <select onChange={handleInputs} name="role" id="role" defaultValue={editObject?.role}>
                                                       <option value={RoleEnum.User}>user</option>
                                                       <option value={RoleEnum.Admin}>admin</option>
                                                  </select>
                                             </div>
                                        </>
                                   }
                              </>

                              :
                              //admin edit other user
                              (<>
                                   <div>
                                        <label htmlFor="status">User status:</label>
                                        <select onChange={handleInputs} name="status" id="status" defaultValue={editObject?.status}>
                                             <option value={StatusEnum.Active}>Active</option>
                                             <option value={StatusEnum.Deactivated}>Deactivated</option>
                                             <option value={StatusEnum.Suspended}>Suspended</option>
                                        </select>
                                   </div>
                                   <div>
                                        <label htmlFor="role">Role:</label>
                                        <select onChange={handleInputs} name="role" id="role" defaultValue={editObject?.role}>
                                             <option value={RoleEnum.User}>user</option>
                                             <option value={RoleEnum.Admin}>admin</option>
                                        </select>
                                   </div>
                              </>)

                    }
                    <div>
                         <label htmlFor="gender">Gender:</label>
                         <select onChange={handleInputs} name="gender" id="gender" defaultValue={editObject?.gender}>
                              <option value={GenderEnum.Male}>male</option>
                              <option value={GenderEnum.Female}>female</option>
                         </select>
                    </div>
                    <div>
                         <label htmlFor="picture">Picture(URL):</label>
                         <input onChange={handleInputs}
                              onClick={(event) => clearInputField(event)}
                              type="text" name="picture" id="picture" value={editObject?.picture} />
                    </div>
                    <div>
                         <label htmlFor="description">Description:</label>
                         <textarea onChange={handleInputs}
                              name="description" id="desc" cols={20} rows={10} value={editObject?.description}
                              maxLength={512}
                              placeholder="Not necessary only if you are in the mood &#128516;"
                         ></textarea>
                    </div>
                    <button type="submit">SAVE</button>
               </form>
          </div>
     )
}

export default EditForm;