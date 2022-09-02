import styles from "./FormContainer.module.css";
import {
     DescriptionType,
     GenderEnum, IdType,
     RoleEnum, StatusEnum,
     TimeOfModificationType,
     UserClass
} from "../../Rest-APi-Client/shared-types";
import React from "react";

// export interface IFormData {
//      id?: IdType
//      fname: string,
//      lname: string,
//      readonly username: string,
//      password: string,
//      gender: GenderEnum,
//      role: RoleEnum,
//      picture: string,
//      description?: DescriptionType,
//      status: StatusEnum,
//      timeOfCreation: string,
//      timeOfModification: TimeOfModificationType,
// }

// export interface IRegisterFormProps {
//      //switchForm is using only in FormContainer(homepage)
//      switchForm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
//      // handleShowCreateForm in admin creating user (AllUsersContainer)
//      handleShowCreateForm?: () => void;
//      isAdminUsingForm?: boolean;
//      handleCreateUser(formData?: Partial<IFormData>): void;
//      //*Register form is using in home-register & Admin->create new user
//      // with diff props depends on creation
// }


function RegisterForm({ handleCreateUser, isAdminUsingForm, switchForm, handleShowCreateForm }: any) {

     const sendFormData = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          // fname and lname validation
          const firstname = (formData.get("fname"))!.toString();
          const lastName = (formData.get("lname"))!.toString();
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
          const currPicture = formData.get("picture") as string;
          if (currPicture === "") {
               const genderEnumNumber = formData.get("gender") as unknown as number;
               if (genderEnumNumber == 1) {
                    formData.set("picture", require('../../images/mavatar.png'));
               }
               else {
                    formData.set("picture", require('../../images/favatar.png'));
               }
          }

          const newUser = new UserClass(
               undefined,
               formData.get("fname") as string,
               formData.get("lname") as string,
               formData.get("username") as string,
               formData.get("password") as string,
               formData.get("gender") as unknown as number,
               formData.get("role") as unknown as number,
               formData.get("picture") as string,
               formData.get("description") as string,
          )

          handleCreateUser(newUser)
     }

     //* UNCONTROLLED form (all inputs are uncontrolled)
     return (
          <div className={styles.registerForm}>
               <form action="submit" onSubmit={sendFormData}>
                    <div className={styles.formTitle}>
                         <h1>Register</h1>
                         {
                              isAdminUsingForm
                                   ? (<button
                                        className={styles.formSwitchBtn}
                                        onClick={handleShowCreateForm}
                                   >close</button>)
                                   : (
                                        <button
                                             className={styles.formSwitchBtn}
                                             onClick={switchForm}
                                        >go to LOGIN</button>
                                   )
                         }

                    </div>
                    <div>
                         <label htmlFor="fname">*First name: </label>
                         <input type="text" name="fname" id="fname"
                              required={true} maxLength={15} minLength={2}
                              placeholder="John" />
                    </div>
                    <div>
                         <label htmlFor="lname">*Last name: </label>
                         <input type="text" name="lname" id="lname"
                              required={true} maxLength={15} minLength={2}
                              placeholder="Wick" />
                    </div>
                    <div>
                         <label htmlFor="username">*Username:</label>
                         <input type="text" name="username" id="username"
                              maxLength={15} minLength={0} required={true}
                              placeholder="JWick_username" />
                    </div>
                    <div>
                         <label htmlFor="password">*Password:</label>
                         <input type="password" name="password" id="password"
                              required={true} minLength={0} autoComplete="off"
                              placeholder="numbers,sign,letters" />
                    </div>
                    <div>
                         <label htmlFor="confirmPassword">*Repeat password:</label>
                         <input type="password" name="confirmPassword" id="confirmPassword"
                              required={true} minLength={0} autoComplete="off"
                              placeholder="atleast 8 chars" />
                    </div>
                    <div>
                         <label htmlFor="gender">Gender:</label>
                         <select name="gender" id="gender">
                              <option value={GenderEnum.Male}>male</option>
                              <option value={GenderEnum.Female}>female</option>
                         </select>
                    </div>

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

                    <div>
                         <label htmlFor="picture">Picture (URL):</label>
                         <input type="text" name="picture" id="picture" placeholder="image address" />
                    </div>
                    <div>
                         <label htmlFor="description">Description:</label>
                         <textarea name="description" id="desc"
                              cols={20} rows={10} maxLength={512}
                              placeholder="Not necessary only if you are in the mood &#128516;"></textarea >
                    </div>
                    <p style={{ width: "100%", textAlign: "center",paddingBottom:"12px" }}>all fields with * are required</p>
                    <button type="submit">Register</button>
               </form>
          </div>
     )
}

export default RegisterForm;