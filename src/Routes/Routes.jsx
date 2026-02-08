// routes/routeConfig.js
import { createBrowserRouter, Navigate } from "react-router";
import PrivateRoute from "./PrivateRoute.jsx";

// Layouts
// import AuthLayout from "../components/Layout/AuthLayout";
import MainLayouts from "../components/Layout/MainLayouts";

// Pages
import PrivacyPolicy from "../components/Footer/PrivacyPolicy.jsx";
import About from "../Pages/About.jsx";
import BeARider from "../Pages/BeARider/BeARider.jsx";
import Coverage from "../Pages/Coverage/Coverage.jsx";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";
import MyProfile from "../Pages/MyProfile/MyProfile.jsx";
import Services from "../Pages/Services/Services.jsx";
import Login from "../Pages/Auth/Login/Login.jsx";
import Register from "../Pages/Auth/Register/Register.jsx";
import ForgotPassword from "../Pages/Auth/ForgotPassword.jsx";
import ResetPassword from "../Pages/Auth/ResetPassword.jsx";
import SendParcel from "../Pages/SendParcel/SendParcel.jsx";
import DashBoardLayout from "../components/Layout/DashBoardLayout.jsx";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels.jsx";
import Payment from "../Pages/Dashboard/Payment/Payment.jsx";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess.jsx";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel.jsx";
import PaymentsHistory from "../Pages/Dashboard/PaymentsHistory/PaymentsHistory.jsx";
import TermsConditions from "../components/Footer/TermsConditions.jsx";
import CookiesPolicy from "../components/Footer/CookiesPolicy.jsx";
import FAQ from "../Pages/Home/Sections/FAQ.jsx";
import WhyChooseUs from "../Pages/Home/Sections/WhyChooseUs.jsx";
import Contact from "../Pages/Contact/Contact.jsx";
import AllLoans from "../Pages/AllLoans/AllLoans.jsx";
import LoanDetails from "../Pages/AllLoans/LoanDetails.jsx";
import ApplyLoan from "../Pages/ApplyLoan/ApplyLoan.jsx";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers.jsx";
import AllLoansAdmin from "../Pages/Dashboard/AllLoansAdmin/AllLoansAdmin.jsx";
import PendingLoans from "../Pages/Dashboard/PendingLoans/PendingLoans.jsx";
import ApprovedLoans from "../Pages/Dashboard/ApprovedLoans/ApprovedLoans.jsx";
import Profile from "../Pages/Dashboard/MyProfile/Profile.jsx";
import LoanApplications from "../Pages/Dashboard/LoanApplications/LoanApplications.jsx";
import MyLoans from "../Pages/Dashboard/MyLoans/MyLoans.jsx";
import AddLoan from "../Pages/Dashboard/AddLoan/AddLoan.jsx";
import ManageLoans from "../Pages/Dashboard/ManageLoans/ManageLoans.jsx";
import AdminRoute from "./AdminRoute.jsx";
import ManagerRoute from "./ManagerRoute.jsx";
import UpdateLoan from "../Pages/Dashboard/UpdateLoan/UpdateLoan.jsx";
import Dashboard from "../Pages/Dashboard/Dashboard.jsx";

// Route definitions // Public routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/privacy", element: <PrivacyPolicy /> },
      { path: "/terms", element: <TermsConditions /> },
      { path: "/cookies", element: <CookiesPolicy /> },
      { path: "/services", element: <Services /> },
      { path: "/faqs", element: <FAQ /> },
      { path: "/why-choose-us", element: <WhyChooseUs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/all-loans", element: <AllLoans /> }, 
      
      
      // fix me  (later add in private route-all these route)  
      { path: "apply-loan/:id", element:<PrivateRoute><ApplyLoan /></PrivateRoute>  },  
      { path: "loan-details/:id", element: <PrivateRoute><LoanDetails /></PrivateRoute>  },

      
      {
        path: "/coverage",
        element: <Coverage />,
        loader: () =>
          fetch("/serviceCenters.json").then((res) => res.json()),
      },

      // Protected routes
      {
        path: "be-a-rider",
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
         loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      
      },
     

      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },

      {
        path: "/myprofile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Dashboard routes
  {
    path: "dashboard", 
    element: (<PrivateRoute>{" "}<DashBoardLayout></DashBoardLayout>{" "} </PrivateRoute>),
    children: [
      // { path: "my-parcels", element: <MyParcels /> },
      // { path: "payment/:id", element: <Payment /> },
      { path: "payment/:loanId", element: <Payment /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-cancel", element: <PaymentCancel /> },
      { path: "update-loan/:loanId", element: <UpdateLoan /> },
      // { path: "payments-history", element: <PaymentsHistory /> },
      // { path: "approve-riders", element: <ApproveRiders /> },


      // admin 
      { path: "manage-users", element:<AdminRoute> <ManageUsers /> </AdminRoute>},
      { path: "all-loan", element:<AdminRoute> <AllLoansAdmin /> </AdminRoute>},
      { path: "loan-applications", element:<AdminRoute> <LoanApplications /> </AdminRoute>},
      
      
      // manager 
      { path: "add-loan", element:<ManagerRoute><AddLoan /></ManagerRoute>  },
      { path: "manage-loans", element: <ManagerRoute> <ManageLoans /> </ManagerRoute>},
      { path: "pending-loans", element:<ManagerRoute> <PendingLoans /> </ManagerRoute>},
      { path: "approved-loans", element:<ManagerRoute> <ApprovedLoans /> </ManagerRoute>},

      // users 
      { path: "my-loans", element:  <MyLoans /> },
      { path: "profile", element:<Profile /> },
      { path: "/dashboard", element:<Dashboard /> },
    ],
  },
]);

export default router;
