import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from "@material-ui/core/Grid";

import SingleSelect from '../../../../../reusableComponents/SingleSelect/SingleSelect';
import TextField from '../../../../../reusableComponents/TextField/TextField';
import Button from '../../../../../reusableComponents/Button/Button';
import Icon from "../../../../../reusableComponents/Icon/Icon";

import './dragAndDropArea.scss';


const DragAndDropArea = ({documentTypes,informationTypes}) => {
    const [fileName, setFileName] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [informationType, setInformationType] = useState('');
    const [supplementaryInformation, setSupplementaryInformation] = useState('');



    const onInputChange = (e) => {
        setFileName(e.target.files[0].name);
    }

    const onClose = () => {
        setFileName('');
    }

    return (
        <div className="drag-and-drop-area">
            {
                fileName ?
                <>
                    <div className="file-name">File: {fileName}</div>

                        <div className="upload-container">
                            <Grid container spacing={2}>
                                <Grid item xs>
                                    <SingleSelect
                                        items={documentTypes}
                                        value={documentType}
                                        onChange={e => setDocumentType(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <SingleSelect
                                        items={informationTypes}
                                        value={informationType}
                                        onChange={e => setInformationType(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        type="text"
                                        name="supplementaryInformation"
                                        placeholder="Supplementary information text"
                                        value={supplementaryInformation}
                                        onChange={e => setSupplementaryInformation(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Button
                                        text="Upload"
                                        buttonType="primary"
                                        onClickEvent={() => console.log('action to be added')}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div className="close-button" onClick={onClose}>  &times; </div>
                    </>
                    :
                    <>
                        <input
                            className="upload-input"
                            type="file"
                            onChange={onInputChange}
                        />
                        <div className="content">
                            <Icon icon="upload"
                                className="upload-icon"
                                alt="upload-icon"
                            />
                            <p>Drag files here to upload from the customer folder or browse</p>
                        </div>
                    </>
            }
        </div>
    )
}

DragAndDropArea.propTypes = {
	documentTypes: PropTypes.array.isRequired,
	informationTypes: PropTypes.array.isRequired,
}

export default DragAndDropArea;
