// Import React FilePond
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { getFileUpdate } from './UserActions';
import { get } from 'lodash';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
export class FilePondEx extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { file, getFileUpdate } = this.props;
        return (
            <Fragment>
                <FilePond
                    files={file}
                    allowMultiple={true}
                    maxFiles={4}
                    allowFileSizeValidation={true}
                    maxTotalFileSize={'8MB'}
                    server="http://localhost:3000/attachments"
                    onupdatefiles={(files) => {
                        getFileUpdate(files);
                    }}
                >
                </FilePond>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    file: get(state, 'user.file'),
});

const mapDispatchToProps = dispatch => ({
    getFileUpdate: (file) => dispatch(getFileUpdate(file)),
});


export default connect(mapStateToProps, mapDispatchToProps)(FilePondEx);