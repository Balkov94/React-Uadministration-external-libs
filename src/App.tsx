import Header from './Components/Header/Header';
import style from "./app.module.css"
import Footer from './Components/Footer/Footer';
import FormContainer from './Components/AllFormTypes/FormContainer';
import LoginFormMUI from './MUIComponents/LoginFormMUI/LoginFormMUI';
import RegisterFormMUI from './MUIComponents/RegisterFormMUI/RegisterFormMUI';



function App() {
     return (
          <div className={style.mainAppDiv}>
               <Header></Header>
               <FormContainer></FormContainer>
               {/* <LoginFormMUI></LoginFormMUI> */}
               {/* <RegisterFormMUI></RegisterFormMUI> */}
               <Footer></Footer>       
                      
          </div>

     );
}

export default App;



