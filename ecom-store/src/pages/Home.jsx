import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const url = `http://localhost:5000/products`;
  const fetchProducts = async () => {
    try {
      setLoader(true);
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setProduct(data);
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return <div>error occured!</div>;
  }

  if (loader) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2} size={12}>
          {product && product.length
            ? product.map((p, index) => (
                <Grid item size={4} key={index}>
                  <ProductCard {...p} />
                </Grid>
              ))
            : null}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
