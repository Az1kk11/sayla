import React from "react";
import { Container } from "reactstrap";
import '../css/products.css'
import Helmet from "../../Components/Helmet/Helmet";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFailure, getProductsStart, getProductsSuccess } from "../../redux/slice/productsSlice";
import ProductService from "../../redux/services/productsService";
import { useEffect } from "react";
import { ProductsItem } from "../ux";

const Products = () => {
  const { products, isLoading } = useSelector(state => state.product)
  const dispatch = useDispatch()
  console.log(products);

  const getProducts = async () => {
    dispatch(getProductsStart())
    try {
      const response = await ProductService.getProducts()
      dispatch(getProductsSuccess(response.products))
    } catch (error) {
      dispatch(getProductsFailure(error))
    }
  }

  useEffect(() => {
    getProducts()
  }, [])


  return (
    <Helmet title='Products'>
      <section className="products">
        <Container>
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
        </Container>
      </section>
    </Helmet>
  );
};

export default Products;
