import styles from "./Header.module.css";

function Header() { 
     return (
          <header className={styles.header}>
               <h1>TypeScript + React <span style={{fontSize:"20px"}}>+ React-form-hook + YUP + MUI components </span> = Users administration project
               <img src={require('./usersIcon.jpg')}  alt="users-icon" />
               </h1>
          </header>
     );
}

export default Header;

