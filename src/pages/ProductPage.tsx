import { useParams } from 'react-router-dom';

import ProductComponent from '../components/ProductComponent';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  //   const [product, setProduct] = useState<Product | null>(null);

  return (
    <div>
      <ProductComponent id={parseInt(id ?? '0')} />
    </div>
  );
};

export default ProductPage;
