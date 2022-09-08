import Header from './Components/Header/Header';
import style from "./app.module.css"
import Footer from './Components/Footer/Footer';
import FormContainer from './Components/AllFormTypes/FormContainer';


function App() {
     return (
          <div className={style.mainAppDiv}>
               <Header></Header>
               <FormContainer></FormContainer>
               <Footer></Footer>                           
          </div>

     );
}
export default App;



