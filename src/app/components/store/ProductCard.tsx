import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
}

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="">
      <div className="">
        <img
          src={product.coverImage}
          alt={product.title}
        
          style={{ objectFit: "cover" }}
        />
      </div>
      <h3 className="text-white">{product.title}</h3>
      <p className="text-secondary">{product.description}</p>
      <div className="d-flex align-items-center justify-content-between mt-3">
        <span className="fw-bold">
          ${product.price.toFixed(2)}
        </span>
        <Link className="btn-full" href={`/checkout/${product.id}`}>
          Buy Now <i className="fa-arrow-right fas" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
