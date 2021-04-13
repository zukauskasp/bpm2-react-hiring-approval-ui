import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import Table from './Table';
import Pagination from "./TablePagination";

describe('Table', () => {

    let wrapper;
    let mount;
    let shallow;
    let list = [
        { jobTitle: "Softwere engineer", departament: "Test departament", position: "SENIOR", salaryRange: "2000-3000 EUR", date: "2020-03-20" },
        { jobTitle: "Softwere engineer", departament: "Test departament", position: "JUNIOR", salaryRange: "2000-3000 EUR", date: "2020-03-20" },
        { jobTitle: "Softwere engineer", departament: "Test departament", position: "MID", salaryRange: "2000-3000 EUR", date: "2020-03-20" },
        { jobTitle: "Softwere engineer khlgk jgkfld", departament: "Test departament", position: "MID", salaryRange: "2000-3000 EUR 111111111", date: "2020-03-20" },
        { jobTitle: "Softwere engineer", departament: "Test departament", position: "SENIOR", salaryRange: "2000-3000 EUR", date: "2020-03-20" },
        { jobTitle: "Softwere engineer", departament: "Test departament", position: "JUNIOR", salaryRange: "2000-3000 EUR", date: "2020-03-20" },
        { jobTitle: "Softwere engineer", departament: "Test departament", position: "MID", salaryRange: "2000-3000 EUR", date: "2020-03-20" },
        { jobTitle: "Softwere engineer khlgk jgkfld", departament: "Test departament", position: "MID", salaryRange: "2000-3000 EUR 111111111", date: "2020-03-20" },
    ];
    let data = [];
    const titles = ["Job description", "Departament longer title", "Position", "Salary (range)", "Start date"];

    beforeAll(() => {
        shallow = createShallow();
        mount = createMount();
        list.map((value, key) => data.push({ id: key, isChecked: false, data: value, expandableData: "" }));

    });

    const props = {
        selectionTable: true,
        expandableTable: false,
        data: data,
        setData: () => { },
        titles: titles,
        copyAction: null,
        editAction: () => { },
        deleteAction: () => { }
    }

    const paginationProps = {
        resultsCount: list.length,
        filteredDataCount: 5,
        onChangeRowsPerPage: () => { },
        setRowsPerPage: () => { },
        setPage: () => { }
    }

    beforeEach(() => {
        wrapper = shallow(<Table {...props} />);
    })

    afterAll(() => {
        mount.cleanUp();
      });

    it('expect to match latest snapshot', () => {
        expect(shallow(<Table {...props} />).debug()).toMatchSnapshot();
    });

    it('expect to render table', (() => {
        expect(wrapper.length).toEqual(1);
    }));

    it('expect to render correct props', () => {
        expect(mount(<Table {...props} />).props()).toEqual(props);
    });

    it('expect to render default props', () => {
        const mounted = mount(<Table titles={props.titles} setData={props.setData} />);

        expect(mounted.props().data).toEqual([]);
    });

    it('expect to render list', () => {
        const mounted = mount(<Table {...props} />);

        expect(mounted.prop('data').length).toEqual(list.length);
    });


    it('expect to render pagination', () => {
        const wrapper = shallow(<Pagination {...paginationProps} />);

        expect(wrapper.length).toEqual(1);
    })


    it('expect to render default props', () => {
        const mounted = mount(<Pagination {...paginationProps} />);

        expect(mounted.props().page).toEqual(1);
        expect(mounted.props().rowsPerPage).toEqual(5);
        expect(mounted.props().rowsPerPageOptions).toEqual([5, 10, 20]);
    });


    it('expect to render correct rows count according to pagination rules', () => {
        var length = list.length <= paginationProps.filteredDataCount ? list.length : paginationProps.filteredDataCount;

        expect(wrapper.childAt(0).childAt(0).childAt(1).children().length).toEqual(length);
    });


    it('expect to render icons correncly', () => {
        const mounted = mount(<Pagination {...paginationProps} />);
        const wrapper = shallow(<Pagination {...paginationProps} />);
        const page = mounted.prop('page');
        const resultsCount = mounted.prop('resultsCount');
        const rowsPerPage = mounted.prop('rowsPerPage')

        if (page - 1 > 0) {
            expect(wrapper.find({ 'icon': 'back' }).length).toEqual(1);
        }

        if (resultsCount / rowsPerPage > page) {
            expect(wrapper.find({ 'icon': 'next' }).length).toEqual(1);
        }

    });

})