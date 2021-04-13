import React from 'react';
import {shallow,mount} from 'enzyme';

import CustomCheckbox from './Checkbox';
import Tooltip from "../Tooltip/Tooltip";
import { FormControlLabel } from '@material-ui/core';

describe('Checkbox', ()=> {

    afterAll(() => {
        mount.cleanUp();
      });
      
    it('expect to match latest snapshot', () => {
        const wrapper =  mount(<CustomCheckbox errorMessage="Error message" label="label" onChange={()=>{}}/>);
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('expect to render checkbox component', () => {
        expect(shallow(<CustomCheckbox onChange={()=>{}}/>).length).toEqual(1);
    }); 

    it('expect to display error message', () => {
        const wrapper = shallow(<CustomCheckbox errorMessage="Error message" onChange={()=>{}}/>);
        expect(wrapper.find(Tooltip).length).toEqual(1);
    });

    it('expect to not display error message', () => {
        const wrapper = shallow(<CustomCheckbox onChange={()=>{}}/>);
        expect(wrapper.find(Tooltip).length).toEqual(0);
    });

    it('expect to display label', () => {
        const wrapper = shallow(<CustomCheckbox label="custom label" onChange={()=>{}}/>)
        expect(wrapper.find(FormControlLabel).props().label.props.children).toEqual('custom label');
    });

    it('expect to not display label', () => {
        const wrapper = shallow(<CustomCheckbox onChange={()=>{}}/>)
        expect(wrapper.find(FormControlLabel).props().label.props.children.length).toEqual(0);
    });
});