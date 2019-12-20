//'use strict';

import React from 'react';
import renderer from 'react-test-renderer';

import Registro from '../src/components/Registro.js';

it('renderiza correctamente', () => {
  const tree = renderer.create(<Registro />).toJSON();
  expect(tree).toMatchSnapshot();
});
