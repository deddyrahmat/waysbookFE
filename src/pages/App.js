import { useContext, useEffect } from "react";

//Components
import { Routes,setAuthToken, API, AppContext } from '../configs';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  const [state, dispatch] = useContext(AppContext);

  const loadUser = async () => {
    try {
      const response = await API("/check-auth");

      if (response.status === 401) {
        // jika belum ada token user, arahkan ke state error dan lakukan logout maka akan diarahkan ke landing page
        return dispatch({
          type: "AUTH_ERROR",
        });
      }else if (response.status === 200) {

        // set state sesuai data auth user dari token dan jalankan private route
        return dispatch({
          type: "USER_LOADED",
          payload: response.data.data
        });        
      }

      // console.log(state);
      console.log("hasil response",response.data.data);


    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);


  console.log("App state",state);

  return (
      <Routes />
    // <AppContextProvider>
    // </AppContextProvider>
  );
}

export default App;
