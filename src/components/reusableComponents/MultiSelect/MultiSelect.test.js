import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import MultiSelect from './MultiSelect';

describe('MultiSelect', () => {

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
        list: list,
        label: "Select number",
        onChange: () => { },
        errorMessage: "Error message"
    }

    beforeEach(() => {
        wrapper = shallow(<MultiSelect {...props} />);
    })

    afterAll(() => {
        mount.cleanUp();
      });

    it('expect to match latest snapshot', () => {
        expect(shallow(<MultiSelect {...props} />).debug()).toMatchSnapshot();
    });

    it('expect to render MultiSelect', (() => {
        expect(wrapper.length).toEqual(1);
    }));

    it('expect to render correct props', () => {
        expect(mount(<MultiSelect {...props} />).props()).toEqual(props);
    });

    it('expect to render default props', () => {
        const mounted = mount(<MultiSelect list={props.list} onChange={props.onChange} />);

        expect(mounted.props().errorMessage).toEqual("");
        expect(mounted.props().label).toEqual("");
    });

    it('expect to render list', () => {
        const mounted = mount(<MultiSelect {...props} />);

        expect(mounted.prop('list').length).toEqual(list.length);
    });

    it('expect to render label and error message correctly', () => {
        let mounted = mount(<MultiSelect list={props.list} onChange={props.onChange} />);
        expect(mounted.prop('label')).toEqual('');
        expect(mounted.prop('errorMessage')).toEqual('');

        mounted = mount(<MultiSelect {...props} />);
        expect(mounted.prop('label')).toEqual(props.label);
        expect(mounted.prop('errorMessage')).toEqual(props.errorMessage);
    });

}) 