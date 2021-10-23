import React from 'react';
import renderer from 'react-test-renderer';

import App from '../../../src/screens/ProductListing';

describe('<App />', () => {
    it('has 3 child', async () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree.children.length).toBe(3);
    });
});