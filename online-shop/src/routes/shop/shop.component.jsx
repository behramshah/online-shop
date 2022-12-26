import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/category/category.action';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';

const Shop = () => {   
  const dispatch = useDispatch();

  useEffect (() => {
    const getCategoriesMap = async () => {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(setCategories(categoriesArray));
    }
    getCategoriesMap();
}, [dispatch]);
  
    return (
      <Routes>
          <Route index element={ <CategoriesPreview/>}/>
          <Route path=':category' element={ <Category/>}/>
      </Routes>
    );
  };

export default Shop;