import * as React from "react";
import Modal from "react-modal";
import {FaTimes} from "react-icons/fa";
import {Button} from "./components/button";
import ProductList from "./components/product-list-components";
import {Form} from "./components/form";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./shopApp.module.css";
import {useEffect, useState} from "react";
import {CreateProduct, Product} from "./interfaces/product.response.interface";
import {fetchProducts, updateProducts} from "./services/api.client";

export const ShopApp: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [favouriteCount, setFavouriteCount] = useState<number>(0);
    const [productCount, setProductCount] = useState<number>(0);

    useEffect(() => {
        document.title = "Droppe refactor app";
    }, [])

    useEffect(() => {
        fetchProducts().then(products => {
            setProducts(products);
            setProductCount(products.length);
        });
    }, []);

    const onAddToFavourite = (productId: number) => {
        // const favouriteProductIndex = products.findIndex(({title}) => title === productTitle);
        // const favouriteProduct = products[favouriteProductIndex];

        const [updatedProducts, updatedFavouritesCount] =
            products.reduce(([products, totalFavourites], product) => {
                if (product.id === productId) {
                    product.isFavourite = !product.isFavourite;
                    totalFavourites = product.isFavourite ? totalFavourites+1 : totalFavourites-1
                }

                return [
                    [
                        ...products,
                        product,
                    ],
                    totalFavourites
                ]
            }, [[], 0] as [Product[], number])

        setProducts(updatedProducts);
        setFavouriteCount(favouriteCount + updatedFavouritesCount);
    }

    const onModalClose = () => setIsOpen(false);

    const onModalOpen = () => setIsOpen(true);

    const onAddProduct = ({title, description, price}: CreateProduct) => {
        const newProduct: Product = {
            title,
            description,
            price,
        };

        setIsOpen(false);
        setMessage('Adding product...')
        setIsMessageVisible(true)
        updateProducts(newProduct).then(({ id}) => {
            const updatedProducts: Product[] = [
                ...products,
                {
                    id,
                    ...newProduct
                }
            ];

            setProducts(updatedProducts);
            setProductCount(updatedProducts.length);

            console.log(updatedProducts);
            setTimeout(() => {
                setIsMessageVisible(false);
                setMessage('');
            }, 2000)
        })
    }

    return (
        <React.Fragment>
            <div className={styles.header}>
                <div className={['container', styles.headerImageWrapper].join(' ')}>
                    <img src={logo} className={styles.headerImage}/>
                </div>
            </div>

            <span className={['container', styles.main].join(' ')} style={{margin: '50px inherit', display: 'flex', justifyContent: 'space-evenly'}}>
               <img src={img1} style={{maxHeight: "15em", display: 'block'}}/>
               <img src={img2} style={{maxHeight: "15rem", display: 'block'}}/>
            </span>

            <div className={['container', styles.main].join(' ')} style={{paddingTop: 0}}>
                <div className={styles.buttonWrapper}>
                    <span role="button">
                        <Button onClick={onModalOpen}>Send product proposal</Button>
                    </span>
                    {isMessageVisible && <div className={styles.messageContainer}><i>{message}</i></div>}
                </div>

                <div className={styles.statsContainer}>
                    <span>Total products: {productCount}</span>
                    {' - '}
                    <span>Number of favorites: {favouriteCount}</span>
                </div>

                {products && !!products.length ? <ProductList products={products} onMarkAsFavourite={onAddToFavourite}/> : <div></div>}
            </div>

            <Modal isOpen={isOpen} className={styles.reactModalContent} overlayClassName={styles.reactModalOverlay}>
                <div className={styles.modalContentHelper}>
                    <div className={styles.modalClose} onClick={onModalClose}><FaTimes/></div>
                    <Form onAddProduct={onAddProduct}/>
                </div>
            </Modal>
        </React.Fragment>
    )
};