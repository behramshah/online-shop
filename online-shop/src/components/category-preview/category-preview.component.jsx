import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';
import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from './category-preview.styles';

const CategoryPreview = ({ title, products }) => (
  <CategoryPreviewContainer>
    <h2>
      <Title to={title} className='title'>{title.toUpperCase()}</Title>
    </h2>
    <Preview>
      {products
        .filter((_, idx) => idx < 4)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </Preview>
  </CategoryPreviewContainer>
);

export default CategoryPreview;