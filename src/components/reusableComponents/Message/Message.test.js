import React from 'react';
import { shallow, mount } from 'enzyme';
import Message, { returnIconByName } from './Message';

describe('Message', () => {

    const onClick = (event) => event;
    let wrapper;
    const props = {
        type: "success",
        text: "This is text",
        onClick: onClick
    }

    beforeEach(() => {
        wrapper = shallow(<Message {...props} />);
    })

    afterAll(() => {
        mount.cleanUp();
      });

    it('expect to match latest snapshot', () => {
        expect(mount(<Message {...props} />).debug()).toMatchSnapshot();
    });

    it('expect to render Message', (() => {
        expect(wrapper.length).toEqual(1);
    }));

    it('expect to render correct props', () => {
        expect(mount(<Message {...props} />).props()).toEqual(props);
    });

    it('expect to have correct classes', (() => {
        const errorMessageWrapper = shallow(<Message type="error" />);

        expect(wrapper.prop('className')).toEqual('notification-wrapper success-message');
        expect(wrapper.find('span').prop('className')).toEqual('grid-item-second');
        expect(wrapper.find('Icon').prop('className').indexOf('icon') > -1).toEqual(true);
        expect(errorMessageWrapper.prop('className')).toEqual('notification-wrapper error-message');
    }));

    it('expect to render default props', () => {
        const defaultProps = {
            type: "default",
            text: "",
        };

        expect(mount(<Message />).props()).toEqual(defaultProps);
    });

    it('expect to simulate event', () => {
        const mockCallBack = jest.fn();

        shallow(<Message onClick={mockCallBack} />).find("Icon").simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('expect returnIconByName to return correct icon name', () => {
        let icon = returnIconByName(props.type);

        expect(icon).toEqual('check');
        expect(icon === "wrong").toEqual(false);
    });

}); 