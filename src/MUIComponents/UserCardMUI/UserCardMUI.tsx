import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IFormData } from '../RegisterFormMUI/RegisterFormMUI';
import { UserApi } from '../../Rest-APi-Client/client';
import { GenderEnum, RoleEnum, StatusEnum, UserClass } from '../../Rest-APi-Client/shared-types';
import EditFormMUI from '../EditFormMUI/EditFormMUI';

import styles from './UserCardMUI.module.css';
interface ExpandMoreProps extends IconButtonProps {
   expand: boolean;
}

interface IUserCardMUIProps {
   user: IFormData;
   handleDeleteUser(userID: number): void;
   handleEditUser(user: any): void;
}
export default function UserCardMUI({ user, handleDeleteUser, handleEditUser }: IUserCardMUIProps) {
   const [cardMenu, setCardMenu] = React.useState(false);
   const [editMode, setEditMode] = React.useState(false);
   // on/OFF option menu on card (menu->1.Edit 2.Delete)
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
   // Open close EditForm (fixed form div)
   const handleEditMode = () => {
      setEditMode(editMode => !editMode);
      setCardMenu(false);
      // iff edit mode is on block scrolling
      // if (editMode === false) {
      //      document.body.style.overflow = "hidden";
      // }
      // else {
      //      document.body.style.overflow = "visible";
      // }
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
            alert(`***************************************************************************
                                   You edited ${user.username}'s profile.`)			 
         })
         .catch(err => alert(err))
   }
   return (
      <>
         {
            editMode ?
               (<EditFormMUI
                  editUser={user}
                  handleFormData={onEdit}
                  isAdminEdition={true}
                  handleEditMode={handleEditMode}></EditFormMUI>)
               :
               <Card sx={{ maxWidth: 345, paddingBottom: "25px", position: "relative" }}>
                  <CardHeader
                     avatar={
                        <Avatar sx={{ bgcolor: red[300] }} aria-label="recipe">
                           {user.fname[0]}{user.lname[0]}
                        </Avatar>
                     }
                     action={
                        <IconButton aria-label="settings" onClick={handleCardMenu}>
                           <MoreVertIcon />
                        </IconButton>
                     }
                     title={user.username}
                     subheader={`${user.fname} \u00A0\u00A0\ ${user.lname}`}
                  />
                  <CardMedia
                     component="img"
                     height="194"
                     image={user.picture}
                     alt="User profile picture"
                     sx={{ width: '300px' }}
                  />
                  {
                     cardMenu &&
                     (
                        <div className={styles.cardMenu}>
                           <p onClick={handleEditMode}>Edit user</p>
                           <p onClick={onDelete}>Delete user</p>
                        </div>
                     )
                  }
                  <CardContent sx={{ boxShadow: "2px 2px 6px rgb(102, 223, 159)" }}>
                     <p style={{ paddingBottom: "8px" }}>Gender: {GenderEnum[user.gender]}</p>
                     <p style={{ paddingBottom: "8px" }}>Status: {StatusEnum[user.status]}</p>
                     <p style={{ paddingBottom: "8px" }}>Role: {RoleEnum[user.role]}</p>
                     <p style={{ paddingBottom: "8px" }}>Created on: {user.timeOfCreation}</p>
                     <p style={{ paddingBottom: "8px" }}>Edited on: {user.timeOfModification === null ? "none" : user.timeOfModification}</p>
                  </CardContent>
               </Card>

         }
      </>







   );
}
