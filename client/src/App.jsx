import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './component/Home';
import Login from './component/Login';
import RegisterUser from './component/RegisterUser';
import { Cart } from './user/Cart';
import { UnAuthorizedUser } from './utility/UnAuthorizedUser';
import { UserLayout } from './layout/UserLayout';
import { AdminLayout } from './layout/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AuthProvider } from './context/userContext';
import { PublicLayout } from './layout/PublicLayout';
import { AdminProductView } from './admin/pages/AdminProductView';
import { AdminProduct } from './admin/Component/AdminProduct';
import { AdminAddProduct } from './admin/Component/AdminAddProduct';
import { AddCategory } from './admin/Component/AddCategory';
import { ViewCategory } from './admin/Component/ViewCategory';
import { ViewProduct } from './user/ViewProduct';
import { CheckOut } from './user/CheckOut';
import { Profile } from './user/Profile';
import { ProductGrid } from './user/ProductGrid';
import { PaymentForm } from './user/PaymentForm';
import { EditCategory } from './admin/Component/EditCategory';
import { FailureUrl } from './user/FailureUrl';
import { SuccessUrl } from './user/SuccessUrl';
import { ShopByCategoryGrid } from './user/ShopByCategoryGrid';
import { ShowProductBySearchGrid } from './user/ShowProductBySearchGrid';
import ViewOrder from './admin/pages/ViewOrder';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        {
          path: '/',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Home />
            </motion.div>
          ),
        },
        {
          path: '/login',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Login />
            </motion.div>
          ),
        },
        {
          path: '/register',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <RegisterUser />
            </motion.div>
          ),
        },
        {
          path: '/cart',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Cart />
            </motion.div>
          ),
        },
        {
          path: '/unAuthorized',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <UnAuthorizedUser />
            </motion.div>
          ),
        },
      ],
    },
    {
      path: '/userhome',
      element: <UserLayout />,
      children: [
        {
          path: '/userhome',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Home />
            </motion.div>
          ),
        },
        {
          path: '/userhome/cart',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Cart />
            </motion.div>
          ),
        },
        {
          path: '/userhome/viewProduct/:productId',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <ViewProduct />
            </motion.div>
          ),
        },
        {
          path: '/userhome/product',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <ProductGrid />
            </motion.div>
          ),
        },
        {
          path: '/userhome/failure',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <FailureUrl />
            </motion.div>
          ),
        },
        {
          path: '/userhome/success',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <SuccessUrl />
            </motion.div>
          ),
        },

        {
          path: '/userhome/ShowProductBySearchGrid/:id',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <ShowProductBySearchGrid />
            </motion.div>
          ),
        },
        {
          path: '/userhome/checkout',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <CheckOut />
            </motion.div>
          ),
        },
        {
          path: '/userhome/ShopByCategoryGrid/:id',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <ShopByCategoryGrid />
            </motion.div>
          ),
        },
        {
          path: '/userhome/paymentForm',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <PaymentForm />
            </motion.div>
          ),
        },
        {
          path: '/userhome/profile',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Profile />
            </motion.div>
          ),
        },
      ],
    },



    // admin route
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          path: '/admin',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <AdminDashboard />
            </motion.div>
          ),
        },
        {
          path: '/admin/viewOrder',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <ViewOrder />
            </motion.div>
          ),
        },
        {
          path: '/admin/product',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <AdminProduct />
            </motion.div>
          ),
        },
        {
          path: '/admin/addProduct',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <AdminAddProduct />
            </motion.div>
          ),
        },
        {
          path: '/admin/productview/:productId',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <AdminProductView />
            </motion.div>
          ),
        },
        {
          path: '/admin/editcategory/:categoryId',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <EditCategory />
            </motion.div>
          ),
        },
        {
          path: '/admin/category',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <ViewCategory />
            </motion.div>
          ),
        },
        {
          path: '/admin/addcategory',
          element: (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <AddCategory />
            </motion.div>
          ),
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
