import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.util';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.actions';

const  App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{ 
    const unsubscribe = onAuthStateChangedListener((user)=>{ 
        if (user) {
            createUserDocumentFromAuth(user);
          }
        dispatch(setCurrentUser(user));
    }); 

    return unsubscribe;
}, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index path='/' element={<Home/>}/>
        <Route path='shop/*' element={<Shop />} />
        <Route index path='auth' element={<Authentication/>}/>
        <Route index path='checkout' element={<Checkout/>}/>
      </Route>
    </Routes>  
  );
}

export default App;
