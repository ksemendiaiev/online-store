import React, {useContext} from 'react';
import {Routes,  Route, Navigate} from 'react-router-dom'  //Заменил Switch na Routes and Redirect on Navigate.
import {authRoutes, publicRoutes} from "../routes";
import {ADMIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import Shop from "../pages/Shop";       //Because of update react-router-dom on 6th version

const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component/>} />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component/>} />
            )}
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />}/>
        </Routes>
    );
};

export default AppRouter;