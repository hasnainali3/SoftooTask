import React from 'react';
import renderer from 'react-test-renderer';

import DropDown from '../../../src/components/DropDown';

describe('<DropDown />', () => {
    it('has 2 child', async () => {
        const tree = renderer.create(<DropDown />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});