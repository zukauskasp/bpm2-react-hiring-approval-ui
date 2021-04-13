import React from 'react';
import { shallow, mount } from 'enzyme';

import Tooltip from './Tooltip';

describe('Tooltip', () => {

    let wrapper;

    const props = {
        text: "This is some message"
    }


    beforeEach(() => {
        wrapper = shallow(<Tooltip {...props} />);
    })

    afterAll(() => {
        mount.cleanUp();
      });

    it('expect to match latest snapshot', () => {
        expect(shallow(<Tooltip {...props} />).debug()).toMatchSnapshot();
    });

    it('expect to render component', (() => {
        expect(wrapper.length).toEqual(1);
    }));


    it('expect to render correct props', () => {
        const defaultProps = {
            messageType: "default",
            text: "This is some message",
            position: "top-left"
        }

        expect(mount(<Tooltip {...props} />).props()).toEqual(defaultProps);
    });

    it('expect to add correct classes', () => {
        const classNames = wrapper.find('div').prop('className');

        expect(classNames.indexOf('tooltip-default') > -1).toEqual(true);
        expect(classNames.indexOf('tooltip-top-left') > -1).toEqual(true);
        expect(classNames.indexOf('tooltip-bottom-left') > -1).toEqual(false);
    });

});