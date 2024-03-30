
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register.js'
import HomePage from './pages/Home/HomePage';
import ForgotPasssword from './pages/Auth/ForgotPasssword';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from './pages/Others/Categories.js';
import CategoryProduct from './pages/Others/CategoryProduct.js';
import Search from './pages/Others/Search.js';
import Dashboard from './pages/User/Dashboard.js';
import PrivateRoute from './components/Routes/Private.js';
import Orders from './pages/User/Orders.js';
import Profile from './pages/User/Profile.js';
import Pagenotfound from './pages/Others/Pagenotfound.js';
import CartPage from './pages/Cart/CartPage.js';
import UpdateProduct from './pages/Admin/UpdateProduct.js'
import AdminRoute from './components/Routes/AdminRoute.js';
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import Products from "./pages/Admin/Products.js";
import Users from "./pages/Admin/Users.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import 'react-toastify/dist/ReactToastify.css';

import CreateCategory from './pages/Admin/CreateCategory.js';
import AdminOrders from './pages/Admin/AdminOrders.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}></Route>
        <Route path='/forgot-password' element={<ForgotPasssword />}></Route>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/cart' element={<CartPage />} />

        <Route path='/search' element={<Search />} />
        <Route path="*" element={<Pagenotfound />} />

        {/*private route*/}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
         
        {/* Admin Routes*/}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>




















      </Routes>












    </BrowserRouter>
  )
}

export default App;
