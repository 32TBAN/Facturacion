import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/"
            element={<App />} >
            <Route index element={<div>Home</div>} />
            <Route path="about" element={<div>About</div>} />
        </Route>
    ),
    { basename: 'facturacion' }
)