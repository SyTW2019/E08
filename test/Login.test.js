'use strict';

import React from 'react';
import renderer from 'react-test-renderer';

import Login_test from '../src/components/Login.js';

it('renderiza correctamente el login', () => {
  const tree = renderer.create( <Login /> ).toJSON();
  expect(tree).toMatchSnapshot();
});
