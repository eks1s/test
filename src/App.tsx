import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./routers/PrivateRoute";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Post from "./pages/Post";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./store/userSlice";
import PrivateLayout from "./routers/PrivateLayout";
import About from "./pages/About";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser(currentUser));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        element={
          <PrivateRoute>
            <PrivateLayout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Posts />} />
        <Route path="/:id" element={<Post />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
