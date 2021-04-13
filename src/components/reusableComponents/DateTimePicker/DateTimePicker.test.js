import React from 'react';
import {shallow,mount} from 'enzyme';
import DateTimePicker from './DateTimePicker';

describe('DateTimePicker', ()=> {

    afterAll(() => {
        mount.cleanUp();
      });
      
    it('expect to match latest snapshot', () => {
        const wrapper =  mount(<DateTimePicker id="dateTimePickerId" selectedDate={new Date(1650000000000)} setDate={()=>{}}/>);
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('expect to render DateTimePicker', () => {
        expect(shallow(<DateTimePicker id="dateTimePickerId" selectedDate={new Date()} setDate={()=>{}}/>).length).toEqual(1);
    }); 

    it('expect DateTimePicker to have custom date format', () => {
        const wrapper = mount(<DateTimePicker id="dateTimePickerId" selectedDate={new Date(1650000000000)} format={'MM.dd/yyyy HH.mm'} setDate={()=>{}}/>);
        expect(wrapper.props()).toHaveProperty('format', 'MM.dd/yyyy HH.mm');
    }); 

}); 