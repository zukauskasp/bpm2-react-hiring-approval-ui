import React from 'react';
import {shallow,mount} from 'enzyme';
import Modal from './Modal';

describe('Modal', ()=> {
    
    afterAll(() => {
        mount.cleanUp();
      });

    it('expect to match latest snapshot', () => {
        const wrapper =  mount(<Modal onSubmit={()=>{}} title="title" onClose={()=>{}}>Children text</Modal>);
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('expect to render modal component', () => {
        expect(shallow(<Modal onSubmit={()=>{}} onClose={()=>{}}/>).length).toEqual(1);
    }); 

    it('expect to have children rendered', () => {
        const wrapper = shallow(<Modal onSubmit={()=>{}} onClose={()=>{}}>Children text</Modal>);
        expect(wrapper.find('.modal-content-container').contains('Children text')).toEqual(true);
    });

    it('expect to have close icon/img rendered', () => {
        const wrapper = shallow(<Modal onSubmit={()=>{}} onClose={()=>{}}>Children text</Modal>);
        expect(wrapper.find('.close-icon').length).toEqual(1);
    });

});