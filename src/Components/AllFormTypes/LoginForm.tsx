import React, { useState } from "react";
import styles from "./FormContainer.module.css";
import { IFormData } from "../../MUIComponents/RegisterFormMUI/RegisterFormMUI";

export interface ILoginFormProps {
     switchForm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
     handleLoginData(formData?: Partial<IFormData>): void;
}

function LoginForm({ handleLoginData, switchForm }: ILoginFormProps) {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");

     const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
          switch (event.target.name) {
               case 'username':
                    setUsername(event.target.value);
                    break;
               case 'password':
                    setPassword(event.target.value)
                    break;
          }
     }

     const sendFormData = (event: React.FormEvent) => {
          event.preventDefault();
          handleLoginData(
               {
                    username,
                    password
               }
          );
          setUsername("");
          setPassword("");
     }


     return (
          <div className={styles.loginForm}>
               <form action="submit" onSubmit={sendFormData}>
                    <div className={styles.formTitle}>
                         <h1>Login
                              <button className={styles.formSwitchBtn}
                                   onClick={switchForm}
                              >go to register</button>
                         </h1>
                    </div>
                    <div>
                         <label htmlFor="username">Username:</label>
                         <input type="text"
                              name="username"
                              id="username"
                              maxLength={15} minLength={0}
                              required={true}
                              value={username}
                              onChange={handleInputs}
                              placeholder="username"
                         />
                    </div>
                    <div>
                         <label htmlFor="password">Password:</label>
                         <input type="password"
                              name="password"
                              id="password"
                              autoComplete="on"
                              minLength={0}
                              required={true}
                              value={password}
                              onChange={handleInputs}
                              placeholder="password"
                         />
                    </div>
                    <button type="submit"> Login</button>
                    <div className={styles.testTipsContainer}>
                         <p>Tips for test: username:1 x 8 / password:1 x 8 + !</p>


                    </div>
               </form>
          </div>
     );
}

export default LoginForm;