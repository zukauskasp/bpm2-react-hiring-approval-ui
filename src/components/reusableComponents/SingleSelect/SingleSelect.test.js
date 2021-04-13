import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import SingleSelect from './SingleSelect';

describe('SingleSelect', () => {

    let wrapper;
    let mount;
    let shallow;

    beforeAll(() => {
        shallow = createShallow();
        mount = createMount();
    });

    const list = [
        { name: "one", value: "1" },
        { name: "two", value: "2" },
        { name: "three", value: "3" },
    ]
    const props = {
        items: list,
        required: false,
        label: "Select number",
        onChange: () => { },
        errorMessage: "Error message"
    }

    beforeEach(() => {
        wrapper = shallow(<SingleSelect {...props} />);
    })

    afterAll(() => {
        mount.cleanUp();
    });

    it('expect to match latest snapshot', () => {
        expect(shallow(<SingleSelect {...props} />).debug()).toMatchSnapshot();
    });

    it('expect to render component', (() => {
        expect(wrapper.length).toEqual(1);
    }));

    it('expect to render correct props', () => {
        expect(mount(<SingleSelect {...props} />).props()).toEqual(props);
    });

    it('expect to render default props', () => {
        const mounted = mount(<SingleSelect items={props.items} onChange={props.onChange} />);

        expect(mounted.props().errorMessage).toEqual("");
        expect(mounted.props().label).toEqual("");
    });

    it('expect to render list', () => {
        const mounted = mount(<SingleSelect {...props} />);

        expect(mounted.prop('items').length).toEqual(list.length);
    });


})