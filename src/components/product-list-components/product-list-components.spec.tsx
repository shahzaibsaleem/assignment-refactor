import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Posts, Product } from './product-list-components';
import { Product as ProductInterface } from '../../interfaces/product.response.interface';

const mockProducts: ProductInterface[] = [
    {
        title: 'Product 1',
        price: 10.0,
        description: 'This is product 1.',
        rating: { rate: 3 },
        isFavourite: false,
    },
    {
        title: 'Product 2',
        price: 20.0,
        description: 'This is product 2.',
        rating: { rate: 4 },
        isFavourite: true,
    },
];

const mockProduct: ProductInterface = {
    id: 4,
    title: 'Product Title',
    rating: { rate: 4 },
    price: 10.99,
    description: 'Product Description',
    isFavourite: false,
};

const mockOnMarkAsFavourite = jest.fn();

describe('Posts', () => {
    it('renders a list of products', () => {
        render(<Posts products={mockProducts} onMarkAsFavourite={mockOnMarkAsFavourite} />);

        const productTitles = screen.getAllByText(/Product \d/);
        expect(productTitles).toHaveLength(2);
    });

    it('calls onMarkAsFavourite when the favourite button is clicked', () => {
        render(<Posts products={mockProducts} onMarkAsFavourite={mockOnMarkAsFavourite} />);

        const favouriteButtons = screen.getAllByRole('button', { name: /Add to favorites|Remove from favorites/ });
        userEvent.click(favouriteButtons[0]);
        expect(mockOnMarkAsFavourite).toHaveBeenCalledWith(0);
    });
});

describe('Product', () => {
    it('should render the title, rating, price, description, and action bar', () => {
        const { getByText, getByRole } = render(<Product index={0} product={mockProduct} onMarkAsFavourite={() => {}} />);
        expect(getByText('Product Title')).toBeInTheDocument();
        expect(getByText('Rating: 4/5')).toBeInTheDocument();
        expect(getByText('Price: $10.99')).toBeInTheDocument();
        expect(getByText('Description:')).toBeInTheDocument();
        expect(getByText('Product Description')).toBeInTheDocument();
        expect(getByRole('button')).toBeInTheDocument();
    });

    it('should call onMarkAsFavourite when the action bar item is clicked', () => {
        const onMarkAsFavourite = jest.fn();
        const { getByRole } = render(<Product index={0} product={mockProduct} onMarkAsFavourite={onMarkAsFavourite} />);
        fireEvent.click(getByRole('button'));
        expect(onMarkAsFavourite).toHaveBeenCalledWith(4);
    });

    it('should apply "active" class to the action bar item if the product is a favorite', () => {
        const { getByRole } = render(<Product index={0} product={{ ...mockProduct, isFavourite: true }} onMarkAsFavourite={() => {}} />);
        expect(getByRole('button')).toHaveClass('active');
    });
});