// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA

// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//   // [::1] is the IPv6 localhost address.
//   window.location.hostname === '[::1]' ||
//   // 127.0.0.1/8 is considered localhost for IPv4.
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//   )
// );

// export function register(config) {
//   if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//     // The URL constructor is available in all browsers that support SW.
//     const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
//     if (publicUrl.origin !== window.location.origin) {
//       // Our service worker won't work if PUBLIC_URL is on a different origin
//       // from what our page is served on. This might happen if a CDN is used to
//       // serve assets; see https://github.com/facebook/create-react-app/issues/2374
//       return;
//     }

//     window.addEventListener('load', () => {
//       const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

//       if (isLocalhost) {
//         // This is running on localhost. Let's check if a service worker still exists or not.
//         checkValidServiceWorker(swUrl, config);

//         // Add some additional logging to localhost, pointing developers to the
//         // service worker/PWA documentation.
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             'This web app is being served cache-first by a service ' +
//             'worker. To learn more, visit http://bit.ly/CRA-PWA'
//           );
//         });
//       } else {
//         // Is not localhost. Just register service worker
//         registerValidSW(swUrl, config);
//       }
//     });
//   }

//   // Wasi Work

//   else {
//     console.log('Wont Register SW Current Port', process.env.NODE_ENV)
//   }

//   // Wasi Work
// }

// function registerValidSW(swUrl, config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then(registration => {

//       // Wasi Work

//       console.log('SW Registered')

//       // Wasi Work


//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === 'installed') {
//             if (navigator.serviceWorker.controller) {
//               // At this point, the updated precached content has been fetched,
//               // but the previous service worker will still serve the older
//               // content until all client tabs are closed.
//               console.log(
//                 'New content is available and will be used when all ' +
//                 'tabs for this page are closed. See http://bit.ly/CRA-PWA.'
//               );

//               // Execute callback
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               // At this point, everything has been precached.
//               // It's the perfect time to display a
//               // "Content is cached for offline use." message.
//               console.log('Content is cached for offline use.');

//               // Execute callback
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch(error => {
//       console.error('Error during service worker registration:', error);
//     });
// }

// function checkValidServiceWorker(swUrl, config) {
//   // Check if the service worker can be found. If it can't reload the page.
//   fetch(swUrl)
//     .then(response => {
//       // Ensure service worker exists, and that we really are getting a JS file.
//       const contentType = response.headers.get('content-type');
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf('javascript') === -1)
//       ) {
//         // No service worker found. Probably a different app. Reload the page.
//         navigator.serviceWorker.ready.then(registration => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         // Service worker found. Proceed as normal.
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         'No internet connection found. App is running in offline mode.'
//       );
//     });
// }

// export function unregister() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then(registration => {
//       registration.unregister();
//     });
//   }
// }




// Wasi Work

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }


// var cacheName = 'Vendor-v1'

// var cacheFiles = [
//   '/',
//   './logo.svg',
//   './index.js',
//   './index.css',
//   './Routers/adminRoutes.js',
//   './Routers/mainRoutes.js',
//   './Routers/routes.js',
//   './History.History.js',
//   './Container/container/container.css',
//   './Container/container/container.js',
//   './Config/Firebase/firebase.js',
//   './App/App.css',
//   './App/App.js',
//   './App/App.test.js',
//   './Assets/sweetalert/animate.css',

//   // './Component/FabIcon/fabIcon.js',
//   // './Component/FabIcon/fabIcon.js',
//   './Component/Admin/AdminMessages/AllChats.js',
//   './Component/Admin/AdminMessages/AllChats.css',
//   './Component/Admin/ChatUser/ChatUser.js',
//   './Component/Admin/Orders/OrderCard.js',
//   './Component/Admin/Orders/OrderCard.css',
//   './Component/Admin/Orders/OrderDetails.js',
//   './Component/Admin/Orders/OrderSeller.js',
//   './Component/Admin/ProductCard/ProductCard.js',
//   './Component/Admin/ProductCard/ProductCard.css',
//   './Component/Admin/Slider/Banner.js',
//   './Component/Admin/Slider/Banner.css',
//   './Component/Admin/Slider/EditBanner.js',
//   './Component/Admin/UserCard/SellerCard.js',
//   './Component/Admin/UserCard/UserCard.js',
//   './Component/Admin/UserCard/UserCard.css',
//   './Component/Admin/Warning/Warning.js',
//   // './Component/Admin/fabIcon.js',



//   './Component/Card/card.js',
//   './Component/Card/card.css',
//   './Component/ChatBox/ChatBox.js',
//   './Component/ChatBox/Message.js',
//   './Component/ChatBox/Message.css',
//   './Component/EditProfile/EditProfile.js',
//   './Component/EditProfile/EditProfile.css',
//   './Component/FabIcon/fabIcon.js',
//   './Component/FabIcon/fabIcon.css',
//   './Component/Featured/featured.js',
//   './Component/Featured/featured.css',
//   './Component/FrontPage/FrontPage.js',
//   './Component/Orders/Order/Orders.js',
//   './Component/Orders/Order/order.css',
//   './Component/Orders/OrderHistory/orderHistory.js',
//   './Component/Orders/OrderHistory/orderHistory.css',
//   './Component/Pager/Pager.js',
//   './Component/Pager/Pager.css',
//   './Component/ProductForm/ProductForm.js',
//   './Component/ProductForm/ProductForm.css',
//   './Component/ProductPage/ProductPage.js',
//   './Component/ProductPage/product.css',
//   './Component/SignupComp/Country.js',
//   './Component/SignupComp/MobileCode.js',


//   './Component/Slider/slider.js',
//   './Component/Slider/slider.css',
//   './Component/Vendor/vendor.js',
//   './Component/Vendor/vendor.css',
// ]

// self.addEventListener("install", event => {
//   console.log("Installed");

//   event.waitUntil(
//     caches.open(cacheName)
//       .then(cache =>
//         fetch("/dist/pwa-manifest.json")
//           .then(response => response.json())
//           .then(assets =>
//             cache.addAll(cacheFiles)
//           )
//       ).then(() => self.skipWaiting())
//       .catch(err => console.log)
//   );
// });


// self.addEventListener('fetch', event => {
//   console.log('Fetch')
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       return response || fetch(event.request);
//     })
//       .catch(e => { console.error("Error on the cache", e) })
//   );
// });

// self.addEventListener("activate", event => {
//   const cacheWhitelist = [cacheName];
//   event.waitUntil(
//     caches.keys()
//       .then(keyList =>
//         Promise.all(keyList.map(key => {
//           if (!cacheWhitelist.includes(key)) {
//             return caches.delete(key);
//           }
//         }))
//       )
//       .then(() => self.clients.claim())
//   );
// });

// Wasi Work 



// importScripts('bower_components/sw-toolbox/sw-toolbox.js');  // Update path to match your own setup.










