import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import RadioButton from './RadioButton';

describe('RadioButton', () => {

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
        { name: "three", value: "3", disabled: true },
    ]

    const props = {
        items: list,
        label: "Select number",
        onChange: () => { },
        selectedItem: "",
        errorMessage: "Error message"
    }

    beforeEach(() => {
        wrapper = shallow(<RadioButton {...props} />);
    })

    afterAll(() => {
        mount.cleanUp();
      });

    it('expect to match latest snapshot', () => {
        expect(shallow(<RadioButton {...props} />).debug()).toMatchSnapshot();
    });

    it('expect to render RadioButton', (() => {
        expect(wrapper.length).toEqual(1);
    }));

    it('expect to render correct props', () => {
        expect(mount(<RadioButton {...props} />).props()).toEqual(props);
    });

    it('expect to render default props', () => {
        const mounted = mount(<RadioButton items={props.items} onChange={props.onChange} selectedItem={props.selectedItem} />);

        expect(mounted.props().errorMessage).toEqual("");
        expect(mounted.props().label).toEqual("");
    });

    it('expect to find correct radio buttons', () => {
        expect(wrapper.childAt(1).children().length).toEqual(props.items.length);
        expect(wrapper.childAt(1).find({ disabled: true }).length).toEqual(1);
    });
})