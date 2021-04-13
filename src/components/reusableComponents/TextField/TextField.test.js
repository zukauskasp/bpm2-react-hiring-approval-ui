import React from 'react';
import { shallow, mount } from 'enzyme';

import TextField from './TextField';

describe('TextField', () => {

    let wrapper;

    const props = {
        required: false,
        label: "enter number",
        onChange: () => { },
        errorMessage: "Error message",
        rows: 3,
        type: "number"
    }

    beforeEach(() => {
        wrapper = shallow(<TextField {...props} />);
    })

    afterAll(() => {
        mount.cleanUp();
      });

    it('expect to match latest snapshot', () => {
        expect(shallow(<TextField {...props} />).debug()).toMatchSnapshot();
    });

    it('expect to render component', (() => {
        expect(wrapper.length).toEqual(1);
    }));

    it('expect to render correct props', () => {
        expect(mount(<TextField {...props} />).props()).toEqual(props);
    });

    it('expect to add correct classes', () => {
        const readOnly = shallow(<TextField {...props} readonly={true} />);

        expect(readOnly.find('input').prop('className').indexOf('readOnly') > -1).toEqual(true);
    });

    it('expect to simulate event', () => {
        const mockCallBack = jest.fn();

        shallow(<TextField {...props} onChange={mockCallBack} />).find("input").simulate('change');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('expect to render textarea', () => {
        const textArea = shallow(<TextField {...props} textarea={true} />);

        expect(textArea.find('textarea').length).toEqual(1);
    });

    it('expect to render error', () => {
        const textArea = shallow(<TextField {...props} />);

        expect(textArea.find('Message').length).toEqual(1);
    });

});