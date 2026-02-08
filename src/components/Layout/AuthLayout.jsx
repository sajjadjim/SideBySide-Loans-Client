// import React from 'react';
// import Logo from '../Logo/Logo';
// import { Outlet } from 'react-router';
// import authImage from '../../assets/parcelDelivery.png'

// const AuthLayout = () => {
//     return (
//         <div className='min-h-screen flex'>
//             <div className='flex-1 bg-gray-50 flex flex-col justify-center px-4 sm:px-6 lg:px-8'>
//                     {/* Logo Section */}
//                     <div className='mb-16 ml-32'>
//                         <Logo />
//                     </div>
//                 <div className='w-full max-w-md mx-auto'>
                    
//                     {/* Form Content */}
//                     <div className=''>
//                         <Outlet />
//                     </div>
                  
//                 </div>
//             </div>

//             {/* Right Side - Image */}
//             <div className='hidden lg:flex flex-1 bg-emerald-200/20 relative overflow-hidden'>
//                 {/* Background Pattern (Optional) */}
//                 <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
                
//                 {/* Image Container */}
//                 <div className='relative flex items-center justify-center w-full p-12'>
//                     <div className='relative'>
              
                        
//                         {/* Main Image */}
//                         <img 
//                             className='relative z-10 w-full max-w-lg h-auto drop-shadow-2xl' 
//                             src={authImage} 
//                             alt="Parcel Delivery Service" 
//                         />
//                     </div>
                    
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthLayout;