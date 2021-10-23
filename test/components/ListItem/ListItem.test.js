import React from 'react';
import renderer from 'react-test-renderer';

import ListITem from '../../../src/components/listItem';

describe('<ListITem />', () => {
    it('has 2 child', () => {
        let item = {
            "colour": "Red",
            "id": 5,
            "img": "https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024",
            "name": "Red Pin Stripe Belt T Shirt Dress",
            "price": 17,
        }
        let cart = {}
        const tree = renderer.create(<ListITem item={item} addProduct={() => { }} removeProduct={() => { }} cart={cart} />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});