import React from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import { FadeLoader } from 'react-spinners';
import { StatusList } from './StatusList';
import { localized } from '../../localization/components';
import { UnfollowDialog } from '../../Follow/components';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
}));

const _StatusCommentsList = ({
    statuses,
    statusLikePendingMap,
    repostsPendingMap,
    favouriteStatus,
    unfavouriteStatus,
    followStatusAuthor,
    unfollowStatusAuthorWithDialog,
    fetchStatuses,
    pending,
    currentUser,
    hasMore,
    currentStatusUsername,
    unfollowStatusAuthor,
    setUnfollowDialogOpen,
    unfollowDialogOpen,
    l,
}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    {l('status.comments')}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {pending && statuses.length === 0 && <div className={classes.centered}><FadeLoader color={theme.palette.primary.main} /></div>}
            </Grid>
            <Grid item xs={12}>
                {statuses.length === 0 && !pending && <Typography color="textSecondary">{l('status.no-comments')}</Typography>}
                <StatusList
                    statuses={statuses}
                    onFavouriteClick={(statusId, favourited) => (favourited ? favouriteStatus(statusId) : unfavouriteStatus(statusId))}
                    pending={pending}
                    onNextPageRequest={fetchStatuses}
                    onFollowRequest={followStatusAuthor}
                    onUnfollowRequest={unfollowStatusAuthorWithDialog}
                    currentUser={currentUser}
                    displayMenu={Boolean(currentUser)}
                    statusLikePendingMap={statusLikePendingMap}
                    repostsPendingMap={repostsPendingMap}
                    hideThreadLinks
                    hasMore={hasMore}
                />
                <UnfollowDialog
                    username={currentStatusUsername}
                    unfollowAction={unfollowStatusAuthor}
                    unfollowDialogOpen={unfollowDialogOpen}
                    setUnfollowDialogOpen={setUnfollowDialogOpen}
                />
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ statusComments, authorization, createStatus }) => ({
    statuses: statusComments.statuses,
    statusLikePendingMap: statusComments.statusLikePendingMap,
    favouriteStatus: statusComments.favouriteStatus,
    unfavouriteStatus: statusComments.unfavouriteStatus,
    followStatusAuthor: statusComments.followStatusAuthor,
    unfollowStatusAuthorWithDialog: statusComments.unfollowStatusAuthorWithDialog,
    pending: statusComments.pending,
    fetchStatuses: statusComments.fetchStatuses,
    currentUser: authorization.currentUser,
    repostsPendingMap: createStatus.pendingRepostsMap,
    hasMore: statusComments.hasMore,
    currentStatusUsername: statusComments.currentStatusUsername,
    unfollowStatusAuthor: statusComments.unfollowStatusAuthor,
    setUnfollowDialogOpen: statusComments.setUnfollowDialogOpen,
    unfollowDialogOpen: statusComments.unfollowDialogOpen,
});

export const StatusCommentsList = localized(
    inject(mapMobxToProps)(observer(_StatusCommentsList)),
);
