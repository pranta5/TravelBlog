import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { persistor, store } from "./redux/store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectRoute from "./components/ProtectRoute.jsx";
import Error404 from "./pages/Error404.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Dashboard from "./pages/Dashborad/Dashboard.jsx";
import PrivacyPolicy from "./pages/policy/PrivacyPolicy.jsx";
import TermsOfService from "./pages/policy/TermsOfService.jsx";
import Request from "./pages/Request.jsx";
import { PersistGate } from "redux-persist/integration/react";


// Lazy load all components
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const AddPost = lazy(() => import("./pages/AddPost.jsx"));
const EditPost = lazy(() => import("./pages/EditPost.jsx"));
const Post = lazy(() => import("./pages/Post.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/blog",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "/gallery",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Gallery />
          </Suspense>
        ),
      },
      
      {
        path: "/about",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contactus",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectRoute authentication={false}>
            <Suspense fallback={<CircularProgress />}>
              <Login />
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectRoute authentication={false}>
            <Suspense fallback={<CircularProgress />}>
              <SignUp />
            </Suspense>
          </ProtectRoute>
        ),
      },

      {
        path: "/add-post",
        element: (
          <ProtectRoute authentication={true}>
            <Suspense fallback={<CircularProgress />}>
              <AddPost />
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectRoute authentication={true}>
            <Suspense fallback={<CircularProgress />}>
              <Dashboard />
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <ProtectRoute authentication={true}>
            <Suspense fallback={<div>Loading...</div>}>
              <EditPost />
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Post />
          </Suspense>
        ),
      },
      {
        path:"/request",
        element: (
            <Request />
        ),
      },
      {
        path:"/privacypolicy",
        element:<PrivacyPolicy/>
      },

      {
        path:"/termsOfservice",
        element:<TermsOfService/>
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
  // </StrictMode>
);