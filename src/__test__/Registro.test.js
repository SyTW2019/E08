import React from 'react';
import renderer from 'react-test-renderer';

import {Registro} from '../components/Registro';

describe('App', () => {
    test('render matches snapshot', () => {
        const component = renderer.create(<Registro/>);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });
});
