import { useState } from "react";
import { UserApi } from "../../Rest-APi-Client/client";
import { RoleEnum, StatusEnum, UserClass } from "../../Rest-APi-Client/shared-types";
import EditForm from "../AllFormTypes/EditForm";
import { IFormData } from "../../MUIComponents/RegisterFormMUI/RegisterFormMUI";
import styles from "./UserCard.module.css"

interface IUserCardProps {
     user: IFormData;
     handleDeleteUser(userID: number): void;
     handleEditUser(user: any): void;
}

function UserCard({ user, handleDeleteUser, handleEditUser }: IUserCardProps) {
     const [cardMenu, setCardMenu] = useState(false);
     const [editMode, setEditMode] = useState(false);

     // pn/OFF option menu on card (menu->1.Edit 2.Delete)
     const handleCardMenu = () => {
          setCardMenu(cardMenu => !cardMenu);

     }

     const onDelete = () => {
          let text = "Are you sure you want to delete this user?";
          // eslint-disable-next-line no-restricted-globals
          if (confirm(text) === true) {
               handleDeleteUser(user.id as number);
          }

     }

     // Open close EditFOrm (fixed form div)
     const handleEditMode = () => {
          setEditMode(editMode => !editMode);
          setCardMenu(false);
          // iff edit mode is on block scrolling
          if (editMode === false) {
               document.body.style.overflow = "hidden";
          }
          else {
               document.body.style.overflow = "visible";
          }
     }

     const onEdit = (updatedUser: UserClass) => {
          UserApi.update(updatedUser)
               .then(user => {
                    handleEditUser(user);
                    // 1. close cad menu 2.close EditForm 3.on/off scroll
                    setCardMenu(false);
                    setEditMode(editMode => !editMode);
                    // iff edit mode is on block scrolling
                    if (editMode === false) {
                         document.body.style.overflow = "hidden";
                    }
                    else {
                         document.body.style.overflow = "visible";
                    }
                    
                    return user;
               })
               .then(user => {
                    alert(`*************************************************************************
                    You edited ${user.username}'s profile.`)
               })
               .catch(err => alert(err))
     }

     return (
          <>
               {
                    editMode ?
                         (<EditForm
                              editUser={user}
                              handleFormData={onEdit}
                              isAdminEdition={true}
                              handleEditMode={handleEditMode}></EditForm>)
                         :
                         (<div className={styles.card}>
                              <div className={styles.imgContainer}>
                                   <img src={user.picture}
                                        alt="profilePicture"></img>
                              </div>
                              <div className={styles.optionsButton} onClick={handleCardMenu}>
                                   <img src={require("./optIcon.png")} alt="optionsIcon" />
                              </div>
                              {
                                   cardMenu && (<div className={styles.cardMenu}>
                                        <p onClick={handleEditMode}>Edit user</p>
                                        <p onClick={onDelete}>Delete user</p>
                                   </div>)
                              }
                              <div className={styles.userDataContainer}>
                                   <h1>{user.username}</h1>
                                   <p>First name: {user.fname}</p>
                                   <p>Last name: {user.lname}</p>
                                   <p>Username: {user.username}</p>
                                   <p>Role: {RoleEnum[user.role]}</p>
                                   <p>Date of registration:</p>
                                   <p>{user.timeOfCreation}</p>
                                   <p>Date of last modification:</p>
                                   <p>{user.timeOfModification === null ? "none" : user.timeOfModification}</p>
                                   <p className={styles.boldP}>Status: {StatusEnum[user.status]}</p>
                              </div>
                         </div>)
               }
          </>

     );
}

export default UserCard;