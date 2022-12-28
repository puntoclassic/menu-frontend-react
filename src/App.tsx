import { Route, BrowserRouter, Routes } from "react-router-dom";
import SigninPage from "./pages/account/SigninPage";
import AccountPage from "./pages/account/AccountPage";
import CarrelloPage from "./pages/cart/CarrelloPage";
import CategoriaPage from "./pages/CategoriaPage";
import CercaPage from "./pages/CercaPage";
import Error404Page from "./pages/Error404Page";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/account/LoginPage";
import Logout from "./pages/account/LogoutPage";
import VerificaAccountPage from "./pages/account/VerificaAccountPage";
import VerificaAccountTokenPage from "./pages/account/VerificaAccountTokenPage";
import LoginRequiredRoute from "./components/roles/LoginRequiredRoute";
import InformazioniPersonaliPage from "./pages/account/InformazioniPersonaliPage";
import ChangePasswordPage from "./pages/account/ChangePasswordPage";
import ResetPasswordPage from "./pages/account/ResetPasswordPage";
import ResetPasswordTokenPage from "./pages/account/ResetPasswordTokenPage";
import AdminRequiredRoute from "./components/roles/AdminRequiredRoute";
import Error403Page from "./pages/Error403Page";
import AdminCategoryListPage from "./pages/admin/category/AdminCategoryListPage";
import AdminCategoryEditPage from "./pages/admin/category/AdminCategoryEditPage";
import AdminCategoryCreatePage from "./pages/admin/category/AdminCategoryCreatePage";
import AdminCategoryDeletePage from "./pages/admin/category/AdminCategoryDeletePage";
import AdminFoodListPage from "pages/admin/food/AdminListFoodPage";
import AdminCreateFoodPage from "pages/admin/food/AdminCreateFoodPage";
import AdminEditFoodPage from "pages/admin/food/AdminEditFoodPage";
import AdminDeleteFoodPage from "pages/admin/food/AdminDeleteFoodPage";
import ImpostazioniGeneraliPage from "pages/admin/settings/ImpostazioniGeneraliPage";
import AdminOrderStateListPage from "pages/admin/orderState/AdminOrderStateListPage";
import AdminOrderStateCreatePage from "pages/admin/orderState/AdminOrderStateCreatePage";
import AdminOrderStateEditPage from "pages/admin/orderState/AdminOrderStateEditPage";
import AdminOrderStateDeletePage from "pages/admin/orderState/AdminOrderStateDeletePage";
import TipologiaConsegnaPage from "pages/cart/TipologiaConsegnaPage";
import InformazioniConsegnaPage from "pages/cart/InformazioniConsegnaPage";
import RiepilogoOrdinePage from "pages/cart/RiepilogoOrdine";
import CartFilledRequiredRoute from "components/roles/CartFilledRequredRoute";
import { useEffect } from "react";
import { useAppSelector } from "redux/hooks";


function convertToRGB(value: string) {
  if (value.length !== 6) {
    value = value.substring(1, value.length);
  }
  var aRgbHex = value.match(/.{1,2}/g);
  var aRgb = [
    parseInt(aRgbHex![0], 16),
    parseInt(aRgbHex![1], 16),
    parseInt(aRgbHex![2], 16),
  ];
  return aRgb.join(",");
}
function App() {

  const { settings } = useAppSelector((state) => state.app);
  useEffect(() => {
    if (settings.theme_primary_color && settings.theme_secondary_color) {
      document.documentElement.style.setProperty('--bs-primary-rgb', convertToRGB(settings.theme_primary_color));
      document.documentElement.style.setProperty('--bs-secondary-rgb', convertToRGB(settings.theme_secondary_color));
    }

  }, [settings])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage></HomePage>}></Route>
        <Route path="/cerca" element={<CercaPage></CercaPage>}></Route>
        <Route path="/categoria/:slug" element={<CategoriaPage></CategoriaPage>}></Route>
        <Route path="/account">
          <Route element={<LoginRequiredRoute></LoginRequiredRoute>}>
            <Route path="" element={<AccountPage></AccountPage>}></Route>
            <Route path="informazioni-personali" element={<InformazioniPersonaliPage></InformazioniPersonaliPage>}></Route>
            <Route path="cambia-password" element={<ChangePasswordPage></ChangePasswordPage>}></Route>
            <Route element={<CartFilledRequiredRoute></CartFilledRequiredRoute>}>
              <Route path="cassa">
                <Route path="tipologia-consegna" element={<TipologiaConsegnaPage />}></Route>
                <Route path="informazioni-consegna" element={<InformazioniConsegnaPage />}></Route>
                <Route path="riepilogo-ordine" element={<RiepilogoOrdinePage />}></Route>
              </Route>
            </Route>
          </Route>
          <Route path="login" element={<LoginPage></LoginPage>}></Route>
          <Route path="signin" element={<SigninPage></SigninPage>}></Route>
          <Route path="logout" element={<Logout></Logout>}></Route>
          <Route path="verificaAccount" element={<VerificaAccountPage></VerificaAccountPage>}></Route>
          <Route path="verificaAccount/token" element={<VerificaAccountTokenPage></VerificaAccountTokenPage>}></Route>
          <Route path="resetPassword" element={<ResetPasswordPage></ResetPasswordPage>}></Route>
          <Route path="resetPassword/token" element={<ResetPasswordTokenPage></ResetPasswordTokenPage>}></Route>
        </Route>
        <Route path="/amministrazione">
          <Route element={<AdminRequiredRoute></AdminRequiredRoute>}>
            <Route path="categorie">
              <Route path="" element={<AdminCategoryListPage></AdminCategoryListPage>}></Route>
              <Route path="crea" element={<AdminCategoryCreatePage></AdminCategoryCreatePage>}></Route>
              <Route path="modifica/:id" element={<AdminCategoryEditPage></AdminCategoryEditPage>}></Route>
              <Route path="elimina/:id" element={<AdminCategoryDeletePage></AdminCategoryDeletePage>}></Route>
            </Route>
            <Route path="cibi">
              <Route path="" element={<AdminFoodListPage></AdminFoodListPage>}></Route>
              <Route path="crea" element={<AdminCreateFoodPage></AdminCreateFoodPage>}></Route>
              <Route path="modifica/:id" element={<AdminEditFoodPage></AdminEditFoodPage>}></Route>
              <Route path="elimina/:id" element={<AdminDeleteFoodPage></AdminDeleteFoodPage>}></Route>
            </Route>

            <Route path="impostazioni">
              <Route path="generali" element={<ImpostazioniGeneraliPage></ImpostazioniGeneraliPage>}></Route>
              <Route path="statiOrdine">
                <Route path="" element={<AdminOrderStateListPage />}></Route>
                <Route path="crea" element={<AdminOrderStateCreatePage />}></Route>
                <Route path="modifica/:id" element={<AdminOrderStateEditPage />}></Route>
                <Route path="elimina/:id" element={<AdminOrderStateDeletePage />}></Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="/carrello" element={<CarrelloPage></CarrelloPage>}></Route>
        <Route path="/403" element={<Error403Page></Error403Page>}></Route>
        <Route path="*" element={<Error404Page></Error404Page>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
