import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from './Button';
import Icon from "../Icon/Icon";

describe('Button', () => {

    afterAll(() => {
        mount.cleanUp();
    });

    it('expect to match latest snapshot', () => {
        const wrapper = mount(<Button icon="add" buttonType="secondary" onClickEvent={() => { }} />);
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('expect to render button component', () => {
        expect(shallow(<Button onClickEvent={() => { }} />).length).toEqual(1);
    });

    it('expect to have text from props', () => {
        const wrapper = shallow(<Button text="Button text" onClickEvent={() => { }} />);
        expect(wrapper.contains('Button text')).toEqual(true);
    });

    it('expect to have custom icon element rendered', () => {
        const wrapper = shallow(<Button icon="add" buttonType="secondary" background='light' onClickEvent={() => { }} />);
        expect(wrapper.find(Icon)).toHaveLength(1);
    });

    it('expect icon name is equal to button props', () => {
        const wrapper = shallow(<Button icon="add" buttonType="secondary" background='light' onClickEvent={() => { }} />);
        expect(wrapper.find(Icon).prop('icon')).toEqual('add')
    });

    it('expect to don"t have image element rendered', () => {
        const wrapper = mount(<Button buttonType="secondary" onClickEvent={() => { }} />);
        expect(wrapper.find('.basicIcon').length).toEqual(0);
    });
});