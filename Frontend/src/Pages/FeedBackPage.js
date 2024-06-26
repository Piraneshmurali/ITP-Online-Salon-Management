import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Rating from './Rating';
import './product.css';
import Navbar from '../Components/Navbar';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loadingReview, setLoadingReview] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const res = await axios.get(`http://localhost:8000/api/Product/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingReview(true);

        try {
            await axios.post(`http://localhost:8000/api/Product/reviews/${id}`, { rating, comment });

            setLoadingReview(false);
            alert('Review created successfully'); // Modify this as per your requirement
            setRating(0);
            setComment('');
            
            const res = await axios.get(`http://localhost:8000/api/Product/products/${id}`);
            setProduct(res.data);
        } catch (err) {
            setLoadingReview(false);
            alert(err?.response?.data?.message || 'Failed to create review'); // Modify this as per your requirement
        }
    };

   

    return (
        <>
        <Navbar />
        <div className="Pproduct-container">
            <Link className='pgbutton' to='/ProductsView'>
            <TiArrowBack />Back
            </Link>
            {product ? (
                <div className="Pproduct-details">
                    <div className="Pproduct-image">
                        <img src={product.uquantity} alt={product.name} />
                    </div>
                    <div className="Pproduct-info">
                        <h1 className="Pname">{product.name}</h1>
                        <Rating
                            value={product.rating}
                            text={`  ${product.numReviews} reviews`}
                        />
                        <p className="Pcategory">Category: {product.type}</p>
                        <p className="Pquantity">Remaining Quantity: <span style={{ color: product.rquantity === 0 ? 'red' : 'black' }}>{product.rquantity === 0 ? 'Out of Stock' : product.rquantity}</span></p>
                        <p className="Pprice">Price: <span style={{ color: 'red', fontSize: '35px' }}>Rs. {product.totalPrice}</span></p>
                        <div className="Pquantity-control">
                        <div className="Pquant"> Quantity:
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="Pbtn">-</button>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            <button onClick={() => setQuantity(quantity + 1)} className="Pbtn">+</button>
                            </div>
                        </div>
                        <div className="Pbutton">
                        <button onClick={addToCartHandler} className="Pbtn Pbtn-primary">Add to Cart</button>
                        <button onClick={buyNowHandler} className="Pbtn Pbtn-success">Buy Now</button>
                        </div>
                    </div>
                </div>
            ) : loadingReview ? (
                <div>Loading product details...</div>
            ) : error ? (
                <div>Error: {error.message || 'Failed to fetch product details'}</div>
            ) : null}
            <div className="Preview-section">
                <div className="Preview">
                <h2>Reviews & Ratings</h2>
                {product && product.reviews.length === 0 && <div>No Reviews</div>}
                {product && (
                    <div className="Previews">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="Preview-item">
                                <p>{review.comment}</p>
                                <Rating value={review.rating} />
                                
                            </div>
                        ))}
                    </div>
                )}
                </div>
                <div className="Pwrite-review">
                    <h2>Write Your Service Review</h2>
                    {loadingReview && <div>Submitting review...</div>}
                    <form onSubmit={submitHandler}>
                        <div>
                            <label>Rating: </label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                            >
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                            </select>
                        </div>
                        <div>
                            <label>Comment:</label>
                            <textarea
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type='submit' className="PRbtn" disabled={loadingReview}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default Product;
