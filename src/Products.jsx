import { useEffect, useState } from "react";
import "./Products.css";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPage] = useState(1);
  const fetchProducts = async () => {
    const lists = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await lists.json();
    console.log(data);
    if (data && data.products) {
      setProducts(data.products);
    }
  };
  console.log(products);
  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedPage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== pages
    )
      setPage(selectedPage);
  };

  return (
    <div>
      <h4>Example for Pagination</h4>
      <h1>Products List</h1>
      {products.length > 0 && (
        <div className="products">
          {products.slice(pages * 10 - 10, pages * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span className="texts">{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={pages > 1 ? "" : "pagination__display"}
            onClick={() => selectedPage(pages - 1)}
          >
            ◀️
          </span>

          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={pages === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectedPage(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            className={
              pages < products.length / 10 ? "" : "pagination__display"
            }
            onClick={() => selectedPage(pages + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
};

export default Products;
