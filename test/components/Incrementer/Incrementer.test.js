import React from 'react';
import renderer from 'react-test-renderer';

import Incrementer from '../../../src/components/Incrementer';

describe('<Incrementer />', () => {
    it('has 2 child', () => {
        const tree = renderer.create(<Incrementer quantity={0} addProduct={() => { }} removeProduct={() => { }} />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});