import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/shop/Action'
import { addProductToCart } from '../../redux/cart/Action'
import { experimentalStyled as styled } from '@mui/material/styles';
import { Container, Box, Paper, Grid, Pagination, Skeleton, Badge, Button } from '@mui/material';
import { placeHolderImage } from '../../assets/images';
import { ArrowRightAlt } from '@mui/icons-material';
import './shop.scss'
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Shop = () => {
    const [hidden, setHidden] = useState({});
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const { page } = params;
    let products = useSelector((state) => state?.products?.items)
    let cart = useSelector((state) => state?.cart)
    let totalPages = useSelector((state) => state?.products?.totalPages)
    let perPage = useSelector((state) => state?.products?.perPage)
    let loading = useSelector((state) => state?.products?.loading)
    let [offSet, setOffset] = useState(page > 0 ? (page - 1) * perPage : 0)
    
    useEffect(() => {
        dispatch(getProducts({ perPage, offSet: offSet, orderby: 'date', order: 'desc', status: 'publish' }))
        setHidden({})
    }, [offSet])

    function changePage(e, val){
        navigate("/shop/page/"+val);
        setOffset((val - 1) * perPage);
    }

    const triggerAddToCart = ( item ) => {
        if(!hidden[item.id]){
            setHidden({ ...hidden, [item.id]: !hidden[item.id] });
        }
        dispatch(addProductToCart({
            item,
            quantity: 1
        }))
    }

    console.log("cart", cart);

    return (
        <Container className="producsGrid" sx={{ mt: 2 }}>
            <h1 className="text-center">Shop</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        (loading ? Array.from(new Array(perPage)) : products)?.map((_, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Box sx={{ width: 1, textAlign: 'center' }}>
                                        { _ ? (
                                            <Badge variant='string' sx={{ height: '40', width: '40', zIndex:0 }} invisible={!_.on_sale} color="primary" badgeContent="SALE !">
                                                <img className='productImage' src={_.images.length > 0 ? _.images[0].src : placeHolderImage} />
                                            </Badge>
                                        ) : (
                                            <Skeleton variant="rectangular" sx={{ width: 1, height: '300px' }} />
                                        )}
                                        { _ ? ( 
                                            <>
                                                <h2>{_.name}</h2>
                                                <span dangerouslySetInnerHTML={{ __html: _.price_html }} />
                                            </>
                                        ) : (
                                            <Box sx={{ pt: 0.5 }}>
                                                <Skeleton />
                                                <Skeleton width="60%" />
                                            </Box>
                                        )}

                                        { _ ? (
                                            <Box sx={{ mt: 2 }}>
                                                { _.type == 'simple' ?
                                                    (<Button onClick={() => triggerAddToCart(_)} variant="contained">Add to Cart</Button>) : (<Button variant="contained">Select Option</Button>)
                                                }
                                                {
                                                    !!hidden[_.id] ? 
                                                        <Button sx={{ ml:2 }} variant="contained">View Cart <ArrowRightAlt /></Button>
                                                    : ''
                                                }
                                            </Box>
                                        ) : (
                                            <Box sx={{ pt: 1}}>
                                                <Skeleton sx={{ width: '40%', height: '70px' }} />
                                            </Box>
                                        ) }
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
            <Box sx={{ textAlign: 'center' }} spacing={2}>
                <Pagination 
                    sx={{ 
                        mt: 3, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: "space-around" 
                    }} 
                    boundaryCount={2} 
                    count={totalPages ? parseInt(totalPages) : 0} 
                    variant="outlined" 
                    color="primary"
                    onChange={changePage} 
                    defaultPage={page ? parseInt(page) : 1}
                    />
            </Box>
        </Container>
    );
}
export default Shop