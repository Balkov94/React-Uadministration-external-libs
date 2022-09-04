import { useEffect, useState } from "react";
import { UserApi } from "../../Rest-APi-Client/client";
import { UserClass } from "../../Rest-APi-Client/shared-types";
import Filters, { IFilterValues } from "../FIlters/Filter";
import RegisterFormMUI, { IFormData } from "../../MUIComponents/RegisterFormMUI/RegisterFormMUI";
import styles from "./AllUsersContainer.module.css"
import UserCardMUI from "../../MUIComponents/UserCardMUI/UserCardMUI";

interface IAllUserContainerProps {
   loggedUser: IFormData;
}


function AllUsersContainer({ loggedUser }: IAllUserContainerProps) {
   const [fetchedUsers, setFetchedUsers] = useState<IFormData[]>([]);
   const [showCreateForm, setShowCreateForm] = useState(false);
   //get all users once
   useEffect(() => {
      UserApi.findAll()
         .then(res => {
            setFetchedUsers(res.reverse());
         })
         .catch(err => alert("ERROR:Coudn't get users from the data!"))
   }, []);

   // users CRUD ___________________________________________________________________
   const handleDeleteUser = (userID: number) => {
      UserApi.deleteById(userID)
         .then(() => {
            setFetchedUsers(fetchedUsers.filter(user => user.id !== userID));
         })
         .catch(err => {
            alert("ERROR: Unsuccessful deletion!");
         })
   }

   const handleEditUser = (editUser: UserClass) => {
      UserApi.update(editUser)
         .then(() => {
            setFetchedUsers(fetchedUsers.map(user => {
               if (user.id === editUser.id) {
                  return editUser;
               }
               return user
            }));
         })
         .catch(err => {
            alert("ERROR: Unsuccessful edition!");
         })
   }

   const handleCreateUser = (newUserObj: IFormData) => {
      UserApi.findAll()
         .then(data => {
            if (data.some(user => user.username === newUserObj.username)) {
               alert("This username is already taken! Choose another one.")
               return;
            }
            UserApi.create(newUserObj)
               .then(res => {
                  alert(`*************************************************************************
						Successful created user - ${newUserObj.username}!`);
                  // setFetchedUsers(fetchedUsers => fetchedUsers.concat(res));
                  //put new user infront of the array
                  setFetchedUsers(fetchedUsers => [res, ...fetchedUsers]);
                  // close createUserForm
                  handleShowCreateForm();
               })
               .catch(err => alert("ERROR: Unsuccessful creation!!!"))
         })
   }
   // _____________________________________________________________________________________
   const handleShowCreateForm = () => {
      setShowCreateForm(false);
   }

   // FILTER handler _______________________________________________________________________
   const [filter, setFilter] = useState<IFilterValues>({
      role: "All", status: "All", searchText: "",
   });
   const handleFilterChanges = (newFilterValues: IFilterValues) => {
      setFilter(newFilterValues);
   }

   // Eachtime filter changed => get new Sorted elements
   const [filtredUsers, setFiltredUsers] = useState<JSX.Element[]>([]);
   useEffect(() => {
      const filtredUsers = fetchedUsers.filter(user => {
         // if filtervalue ==="All" need to return all of curr value
         const role = filter.role === "All" ? user.role : filter.role;
         const status = filter.status === "All" ? user.status : filter.status;
         if (user.id !== loggedUser.id
            && user.role == role
            && user.status == status //StatusEnum return num but from fetch get str FIX -> ==
            && (user.username.toLowerCase().includes(filter.searchText.toLowerCase())
               || ((user.fname.toLowerCase().includes(filter.searchText.toLowerCase())))
               || (user.lname.toLowerCase().includes(filter.searchText.toLowerCase())))) {
            return user;
         }
      }).map((user: IFormData) => {
         return <UserCardMUI
            key={user.id}
            user={user}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
         ></UserCardMUI>
      })

      setFiltredUsers(filtredUsers)
      // setFetchedUsers combine changes of all (dleteUser.CreateUser,editUser)
   }, [filter, fetchedUsers, loggedUser]);

   return (
      <div className={styles.allUsersContainer}>
         <h1 className={styles.userListTitle}>Users list</h1>
         {
            showCreateForm ?
               null
               :
               <button className={styles.createNewUser}
                  onClick={() => setShowCreateForm(showCreateForm => !showCreateForm)}
               > (<i className="fa fa-user-plus" style={{ fontSize: "18px", color: "white" }}>   create new user</i></button>
         }

         {
            showCreateForm
               ? <RegisterFormMUI
                  handleCreateUser={handleCreateUser}
                  isAdminUsingForm={true}
                  handleShowCreateForm={handleShowCreateForm}
               ></RegisterFormMUI>
               : <Filters
                  filterValues={filter}
                  onfilterChange={handleFilterChanges}
               ></Filters>
         }


         {
            // if createUserForm is active dont'show users list (userCard)
            showCreateForm === false
            &&
            <div className={styles.cardWrapper}>
               {
                  (filtredUsers !== undefined && filtredUsers.length > 0)
                     ? filtredUsers
                     : (<h1 style={{ color: "lightgreen" }}>
                        <i className="fa fa-warning" style={{ fontSize: "22px", color: "yellow", paddingRight: "12px" }}></i>
                        There aren't any users with this filter!</h1>)
               }
            </div>
         }

      </div>
   );
}

export default AllUsersContainer;