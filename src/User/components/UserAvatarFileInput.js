import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Avatar, Button, makeStyles } from '@material-ui/core';
import { Photo } from '@material-ui/icons';
import useTheme from '@material-ui/core/styles/useTheme';
import Loader from '../../components/Loader';

const useStyles = makeStyles(theme => ({
    avatarAttachmentPhoto: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarAttachmentContainer: {
        [theme.breakpoints.down('sm')]: {
            background: theme.palette.background.light,
            padding: '8px 24px',
        },
    },
    avatarUploadButton: {
        position: 'absolute',
        width: '120px',
        height: '120px',
        borderRadius: '80px',
        background: 'rgba(34, 34, 34, 0.8)',
    },
    avatarAttachmentDescription: {
        marginTop: '24px',
        '& p': {
            margin: 0,
            color: theme.palette.text.secondary,
            fontSize: '12px',
            fontFamily: 'Museo Sans Cyrl Regular',
        },
        '& span': {
            marginTop: '8px',
            color: theme.palette.text.main,
            fontSize: '16px',
            fontFamily: 'Museo Sans Cyrl Bold',
        },
    },
}));

const _UserAvatarFileInput = ({
    currentUser,
    avatarFileContainer,
    uploadFile,
    l,
}) => {
    const classes = useStyles();
    const theme = useTheme();

    const [value, setValue] = useState(undefined);

    const handleFileAttachment = files => {
        if (files && files.length !== 0) {
            uploadFile(files[0]);
        }
    };

    return (
        <div className={classes.avatarAttachmentContainer}>
            <div className={classes.avatarAttachmentPhoto}>
                <Avatar
                    style={{
                        width: 120,
                        height: 120,
                    }}
                    src={
                        avatarFileContainer
                            ? avatarFileContainer.url
                            : currentUser.avatar
                    }
                />
                <Button
                    disabled={avatarFileContainer && avatarFileContainer.pending}
                    component="label"
                    variant="outlined"
                    classes={{ root: classes.avatarUploadButton }}
                >
                    {avatarFileContainer && avatarFileContainer.pending
                        ? <Loader size="md" />
                        : <Photo style={{ color: '#fff' }} />}
                    <input
                        type="file"
                        value={value}
                        style={{ display: 'none' }}
                        accept="image/png, image/jpg, image/jpeg"
                        onClick={() => setValue('')}
                        onChange={event => handleFileAttachment(event.target.files)}
                    />
                </Button>
            </div>
        </div>
    );
};

const mapMobxToProps = ({ authorization, userAvatarUpload }) => ({
    currentUser: authorization.currentUser,
    avatarFileContainer: userAvatarUpload.avatarFileContainer,
    uploadFile: userAvatarUpload.uploadFile,
});

export const UserAvatarFileInput = inject(mapMobxToProps)(
    observer(_UserAvatarFileInput),
);
