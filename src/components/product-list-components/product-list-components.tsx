import * as React from "react";
import {FaStar} from "react-icons/fa";
import styles from "./product-list-components.module.css";
import {Product as ProductInterface} from "../../interfaces/product.response.interface";

interface IPostsProps {
    products: ProductInterface[];
    onMarkAsFavourite: (id: number) => void;
}

export const Posts: React.FC<IPostsProps> = ({products, onMarkAsFavourite}) => {
    return <div>{
        products
            .map((product, idx) => <Product key={idx} index={idx} product={product}
                                            onMarkAsFavourite={onMarkAsFavourite}/>).reverse()}</div>
}

export const Product: React.FC<{
    index: number;
    product: ProductInterface;
    onMarkAsFavourite: (id: number) => void;
}> = ({product, onMarkAsFavourite}) => {
    const { product: productClass, productBody, actionBarItem, actionBarItemLabel } = styles
    return (
        <span className={productClass} style={{display: 'inline-block', overflowX: 'scroll', float: 'none', clear: 'both'}}>
            <span className={styles['product-title']} style={{overflowX: 'hidden'}}>{product.title}</span>
            <p><strong>Rating: {product.rating ? `${product.rating.rate}/5` : ''}</strong></p>
            <p><b>Price: ${+product.price}</b></p>
            <p className={productBody}>
                <span><b>Description:</b></span><br/>{product.description}
            </p>
            <span className={styles['action_bar']} style={{display: 'table', width: "100%"}}>
                <span
                    role="button"
                    onClick={() => onMarkAsFavourite(product.id || 0)}
                    className={`${actionBarItem} ${product.isFavourite && "active"}`}>
                    <FaStar/>
                    <span className={actionBarItemLabel}>{product.isFavourite ? 'Remove from favorites' : 'Add to favorites'}</span>
                </span>
            </span>
        </span>
    );
};

export default Posts;