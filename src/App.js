import {
    Outlet,
    RouterProvider,
    createHashRouter,
    useNavigation,
} from "react-router-dom";
import styles from "./App.module.scss";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import Spinner from "./components/Spinner/Spinner";
import Footer from "./components/Footer/Footer";

export const router = createHashRouter(
    [
        {
            path: "/",
            element: <AppContent />,
            errorElement: <Error />,
            children: [
                {
                    path: "",
                    element: <Home />,
                },
            ],
        },
        { path: "/login", element: <Login /> },
    ],
    { path: "/*" }
);

function AppContent() {
    let { state } = useNavigation();
    //devuelve varias cosas del estado de react router
    return (
        <div className={styles.App}>
            <div className={styles.content_wrap}>
                <NavBar />
                {state === "loading" ? <Spinner /> : <Outlet />}
            </div>
            <Footer />
        </div>
    );
}

function App() {
    return <RouterProvider router={router} />;
}

export default App;
