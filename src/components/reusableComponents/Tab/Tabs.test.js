import React from 'react';
import TabsComponent from "./Tabs";
import { createShallow } from '@material-ui/core/test-utils';


describe('TabsComponent', () => {

    let shallow;
    let wrapper;

    beforeAll(() => {
        shallow = createShallow();
    });

    const firstTab = () => {
        return (
            <div>First tab</div>
        )
    }

    const SecondTab = () => {
        return (
            <div>Second tab</div>
        )
    }

    const tabConfig = [
        {
            tabName: "First tab",
            component: firstTab
        },
        {
            tabName: "Second tab",
            component: SecondTab
        }
    ];


    beforeEach(() => {
        wrapper = shallow(<TabsComponent tabConfig={tabConfig} taskId="1" />);
    })

    it('expect to match latest snapshot', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('expect to render Tabs component', () => {
        expect(wrapper.length).toEqual(1);
    });


    it('expect to render correct tabs', () => {
        expect(wrapper.find({ label: tabConfig[0].tabName }).length).toEqual(1);
        expect(wrapper.find({ label: tabConfig[1].tabName }).length).toEqual(1);
        expect(wrapper.find({ label: "non existing label" }).length).toEqual(0);
    });

    it('expect to render correct component for given tab index', () => {
        expect(wrapper.find('TabPanel').find({ index: 0 }).find("firstTab").debug()).toEqual('<firstTab taskId="1" />');
        expect(wrapper.find('TabPanel').find({ index: 1 }).find("firstTab").length).toEqual(0);
    });

});