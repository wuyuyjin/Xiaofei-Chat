import {createRoutesFromElements, Route, createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import LoginAndRegisterPage from "../pages/LoginAndRegisterPage";
import EmailRegister from "../pages/LoginAndRegisterPage/EmailRegister.tsx";
import PhoneRegister from "../pages/LoginAndRegisterPage/PhoneRegister.tsx";
import EmailLogin from "../pages/LoginAndRegisterPage/EmailLogin.tsx";
import PhoneLogin from "../pages/LoginAndRegisterPage/PhoneLogin.tsx";
import MainPage from "../pages/MainPage";
import FrontPage from "../pages/MainPage/FrontPage";
import ChatPage from "../pages/MainPage/ChatPage/index.tsx";
import AISearchQuestionsPage from "../pages/MainPage/AISearchQuestionsPage";
import MainChat from "../pages/MainPage/ChatPage/MainChat.tsx";

const MainRoute = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<App/>}
      >
        <Route index element={<LoginAndRegisterPage/>}/>
        <Route path="/PhoneRegister" element={<PhoneRegister/>}/>
        <Route path="/EmailRegister" element={<EmailRegister/>}/>
        <Route path="/EmailLogin" element={<EmailLogin/>}/>
        <Route path="/PhoneLogin" element={<PhoneLogin/>}/>
        <Route path="MainPage" element={<MainPage/>}>
          <Route index element={<FrontPage/>}/>
          <Route path="AISearchQuestions" element={<AISearchQuestionsPage/>}/>
          <Route path="ChatPage" element={<ChatPage/>}>
            <Route path=":id" element={<MainChat/>}/>
          </Route>
        </Route>
      </Route>
    )
  )

  return {router}
}

export default MainRoute