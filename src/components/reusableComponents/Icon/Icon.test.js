import React from 'react';
import { shallow, mount } from 'enzyme';
import Icon from "./Icon";

describe('Icon', () => {

    const props = {
        icon: "add",
        color: "dark"
    }

    afterAll(() => {
        mount.cleanUp();
      });

    it('expect to match latest snapshot', () => {
        const wrapper = mount(<Icon {...props} />);
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('expect to render Icon component', () => {
        expect(shallow(<Icon {...props} />).length).toEqual(1);
    });

    it('expect to have src generated from the props', () => {
        const wrapper = shallow(<Icon {...props} />);
        expect(wrapper.prop('src')).toEqual(process.env.PUBLIC_URL + '/assets/icons/' + props.icon + '/' + props.color + '.svg');
    });

    it('expect to render default color dark', () => {
        const wrapper = shallow(<Icon icon={props.icon} />);
        expect(wrapper.prop('src')).toEqual(process.env.PUBLIC_URL + '/assets/icons/' + props.icon + '/dark.svg');
    });

    it('expect to render other props correctly', () => {
        const wrapper = shallow(<Icon icon={props.icon} onClick={() => { }} />);
        expect(wrapper.prop('nonExistingProp')).toBeUndefined();
        expect(typeof wrapper.prop('onClick')).toEqual('function');
    });

    it('expect to mock event correctly', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(<Icon icon={props.icon} onClick={mockCallBack} />);
        wrapper.simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

});