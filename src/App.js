import LoginPage from "./Components/LoginPage";

import ManageExpense from "./Components/ManageExpense";
import { BrowserRouter,Routes,Route,Link, Navigate } from "react-router-dom";
import Universal from "./Components/Universal";





function App() {

   

  return (
    <>
<BrowserRouter>
<Routes>
<Route path="*" element={<Universal/>}></Route>
  <Route path="/" element={<LoginPage/>} />
 <Route path="/manage" element={ <ManageExpense/> }/>
</Routes>
</BrowserRouter>

    </>
  );
}

export default App;
