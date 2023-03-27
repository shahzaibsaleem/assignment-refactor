import * as React from "react";
import {Button} from "../button/button";
import styles from "./form.module.css";
import {useState} from "react";
import {Product} from "../../interfaces/product.response.interface";

type IFormProps = {
    onAddProduct: (payload: Product) => void;
}

export const Form: React.FC<IFormProps> = ({onAddProduct}) => {
    const formRef = React.useRef<HTMLFormElement>(null);

    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [description, setDescription] = useState<string>('');

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!title) {
            alert("Your product needs a title");
            return;
        }

        if (!description || (typeof price === 'undefined' || isNaN(price))) {
            alert("Your product needs some content");
            return;
        }

        onAddProduct({title, description, price});

        formRef.current?.reset();
    };

    return (
        <form className={styles.form} onSubmit={(event) => handleSubmit(event)} ref={formRef}>
            <span className={styles.label}>Product title: *</span>

            <input placeholder="Title..." value={title} className={styles.input}
                onChange={event => setTitle(event.target.value)}/>

            <span className={styles.label}>Product details: *</span>

            <input placeholder="Price..." className={styles.input} value={price} type="number"
                onChange={event => setPrice(event.target.value ? parseFloat(event.target.value) : undefined)}/>

            <textarea placeholder="Start typing product description here..."
                value={description} className={styles.textarea}
                onChange={event => setDescription(event.target.value)}
            />

            <Button>Add a product</Button>
        </form>
    );
};
