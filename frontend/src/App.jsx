import { Routes,Route, Navigate } from "react-router-dom"
import Homepage from "./pages/home/Homepage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import Loginpage from "./pages/auth/login/Loginpage"
import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanel"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from "./pages/profile/ProfilePage"
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "./components/common/LoadingSpinner"

function App() {
  
  const {data: authUser,isLoading}=useQuery({
    queryKey: ["authUser"] ,              // we use queryKey to give a unique name to our query and refer to it later
    queryFn: async()=>{
      try {
        const res = await fetch("/api/auth/me");
				const data = await res.json();
				if (data.error) return null;

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				// console.log("authUser is here:", data);
				return data;
        
      } catch (error) {
        throw new Error(error)
      }
    },
     retry: false,
  })



  if(isLoading){
    return (
      <div className='h-screen flex justify-center items-center'>
          <LoadingSpinner size='lg'/>
      </div>
    )
  }


  return (

    <div className='flex max-w-6xl mx-auto'>
         
         { authUser && <Sidebar/> }

        <Routes>

        <Route path='/' element={ authUser ? <Homepage /> : <Navigate to="/login" />} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
				<Route path='/login' element={!authUser ? <Loginpage /> : <Navigate to="/" />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to="/login" />}/>
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

        </Routes> 

        { authUser && <RightPanel/> }
        <Toaster/>

    </div>
  )
}

export default App
