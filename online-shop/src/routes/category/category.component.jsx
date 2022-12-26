import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/category/category.selector';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, Title } from './category.style';


const Category = () => {

    const categoriesMap = useSelector(selectCategoriesMap);

    const { category } = useParams();
    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect ( () => {

        setProducts(categoriesMap[category]);

    }, [category, categoriesMap])

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            <CategoryContainer>
            {
                products && products.map((product)=> <ProductCard key={product.id} product={product}/>)
            }
        </CategoryContainer>
        </Fragment>        
    )
};

export default Category;