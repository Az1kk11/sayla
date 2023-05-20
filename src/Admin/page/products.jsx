import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductsStart, getProductsSuccess } from "../../redux/slice/productsSlice";
import ProductService from "../../redux/services/productsService";

import Helmet from "../../Components/Helmet/Helmet";
import { ProductsItem } from "../ux";
import { Container, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { toast } from "react-toastify";
import '../css/products.css'

const Products = () => {
  const [item, setItem] = useState()
  const { products, isLoading } = useSelector(state => state.product)
  const dispatch = useDispatch()

  const getProducts = async () => {
    dispatch(getProductsStart())
    try {
      const response = await ProductService.getProducts(item)
      dispatch(getProductsSuccess(response.products))
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getProducts()
  }, [item])

  return (
    <Helmet title='Products'>
      <section className="products">
        <Container className="d-flex align-items-center flex-column">
          <h3>All Products</h3> 
          <div className="bg-table">
            {isLoading ? (
              <h3 className="text-center mt-5" >Loading...</h3>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Company</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => {
                    return (
                      <ProductsItem item={item} key={index} getProducts={getProducts} />
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
          <Pagination size="sm">
            {paginationItem.map(item => (
              <PaginationItem key={item.item} onClick={() => setItem(item.item)}>
                <PaginationLink>
                  {item.item}
                </PaginationLink>
              </PaginationItem>
            ))}
          </Pagination>
        </Container>
      </section>
    </Helmet>
  );
};

export default Products;

const paginationItem = [
  { item: 1 },
  { item: 2 },
  { item: 3 },
  { item: 4 },
  { item: 5 },
  { item: 6 },
  { item: 7 },
  { item: 8 },
  { item: 9 },
  { item: 10 },
]